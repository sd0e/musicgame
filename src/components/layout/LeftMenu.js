import { Button, ThemeProvider, createTheme } from "@mui/material";
import { MusicNote, Home, Palette } from "@mui/icons-material";

import classes from "./LeftMenu.module.css";
import ButtonText from "../ui/ButtonText";

export default function LeftMenu() {
  const changeTheme = () => {
    localStorage.colorTheme =
      localStorage.colorTheme === "dark" ? "light" : "dark";
    document.documentElement.style.setProperty(
      "--bg",
      localStorage.colorTheme === "dark" ? "#0e0e0e" : "#f2f2f2"
    );
    document.documentElement.style.setProperty(
      "--text",
      localStorage.colorTheme === "dark" ? "#f2f2f2" : "#0e0e0e"
    );
  };

  const theme = createTheme({
    palette: {
      mode: localStorage.colorTheme,
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: getComputedStyle(document.body).getPropertyValue("--text")
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Inter",
            fontWeight: 600,
            borderRadius: "0rem 0.5rem 0.5rem 0rem",
            width: "100%",
            marginBottom: "1.5rem",
            justifyContent: "left",
            padding: "0.5rem 1.5rem",
            textTransform: "none"
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.leftMenuOuterHolder}>
        <div>
          <span className={classes.gameTitle}>
            <MusicNote fontSize="small" />
            <span className={classes.gameTitleText}>Music Game</span>
          </span>
          <Button variant="contained">
            <ButtonText Icon={Home} Name="Test Push Again" />
          </Button>
        </div>
        <Button onClick={changeTheme}>
          <ButtonText Icon={Palette} Name="Theme" />
        </Button>
      </div>
    </ThemeProvider>
  );
}
