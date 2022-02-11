import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  createTheme,
  IconButton
} from "@mui/material";
import { Delete } from "@mui/material";
import fetch from "../firebase/fetch";
import write from "../firebase/write";

export default function Admin({ Status }) {
  const [songs, setSongs] = useState("loading");

  const ready =
    Status !== "loading" &&
    Status !== "signedOut" &&
    Status.uid === "sVLlgCZSzgYXCReiUZOc71YMqDK2";

  const readyToggle = useRef(ready);

  const getDep = () => {
    if (readyToggle.current) return 1;
    if (ready) readyToggle.current = true;
    return 0;
  };

  const createData = (songName, songIdx, songArtist) => {
    return { songName, songIdx, songArtist };
  };

  useEffect(() => {
    if (!ready) return;
    fetch(`/songs/songList`).then((fetchedSongs) => {
      console.log(fetchedSongs);
      let rows = [];
      for (let idx = 0; idx < fetchedSongs.length; idx++) {
        const song = fetchedSongs[idx];
        console.log(song.name, idx, song.artist);
        rows.push(createData(song.name, idx, song.artist));
      }
      console.log(rows);
      setSongs(rows);
    });
  }, [getDep()]);

  const theme = createTheme({
    palette: {
      mode: "dark"
    },
    typography: {
      fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`
    }
  });

  const removeSong = (songIdx) => {
    if (ready) {
      write(`/songs/songList/${songIdx}`, null).then(() => {
        fetch(`/songs/songList`).then((fetchedSongs) => {
          let rows = [];
          for (let idx = 0; idx < fetchedSongs.length; idx++) {
            const song = fetchedSongs[idx];
            console.log(song.name, idx, song.artist);
            rows.push(createData(song.name, idx, song.artist));
          }
          setSongs(rows);
        });
      });
    }
  };

  if (ready) {
    return (
      <ThemeProvider theme={theme}>
        <h3>Songs</h3>
        {typeof songs !== "string" && (
          <TableContainer>
            <Table sx={{ maxWidth: "30rem" }} aria-label="song list">
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {songs.map((row) => {
                  return (
                    <TableRow
                      key={row.songIdx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.songIdx}
                      </TableCell>
                      <TableCell>{row.songName}</TableCell>
                      <TableCell>{row.songArtist}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeSong(row.songIdx)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </ThemeProvider>
    );
  } else {
    return <h3>You are not authorised to view this content</h3>;
  }
}
