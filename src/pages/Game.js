import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Favorite } from "@mui/icons-material";

import FancyButton from "../components/ui/FancyButton";
import fetchRandomSong from "../firebase/fetchRandomSong";
import classes from "./Game.module.css";
import NameModule from "../components/ui/NameModule";
import StatModule from "../components/ui/StatModule";
import fetch from "../firebase/fetch";
import write from "../firebase/write";

export default function Game() {
  const [signedIn, setSignedIn] = useState("Loading");
  const [currentSong, setCurrentSong] = useState("Loading");
  const [hearts, setHearts] = useState(2);
  const [nameInput, setNameInput] = useState('');
  const [currentSongCompleted, setCurrentSongCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState('Loading');

  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(user);
        fetch(`/user/${user.uid}/highscore`).then(userHighscore => setHighscore(userHighscore));
        fetch(`/user/${user.uid}/currentGame`).then(currentGame => {
          if (currentGame !== null) {
            setScore(currentGame.score);
            fetch(`/songs/songList/${currentGame.songIdx}`).then(song => setCurrentSong(song));
          } else {
            fetchRandomSong().then(randomSongArr => {
              const randomSong = randomSongArr[0];
              const randomSongIdx = randomSongArr[1];
              console.log(signedIn, signedIn.uid);
              write(`/user/${user.uid}/currentGame`, {
                score: 0,
                songIdx: randomSongIdx
              });
            });
          }
        } );
      }
      else setSignedIn("signedOut");
    });
  }, []);

  const completed = completedSong => {
    setNameInput('');
    if (completedSong.trim() === currentSong.name.trim()) {
      setCurrentSongCompleted(true);
      let newScore;
      if (hearts === 2) newScore = score + 3;
      else newScore = score + 1;
      setScore(newScore);
      setHearts(2);
        fetchRandomSong().then(randomSongArr => {
          const randomSong = randomSongArr[0];
          const randomSongIdx = randomSongArr[1];
          write(`/user/${signedIn.uid}/currentGame`, {
            score: newScore,
            songIdx: randomSongIdx
          }).then(() => {
            setCurrentSong(randomSong);
            setCurrentSongCompleted(false);
          });
        });
    } else {
      setHearts(hearts - 1);
      if (hearts === 1) {
        fetch(`/user/${signedIn.uid}/numGames`).then(numGames => {
          write(`/user/${signedIn.uid}/game/${numGames}`, {
            score: score,
            date: new Date().getTime()
          }).then(() => {
            write(`/user/${signedIn.uid}/numGames`, numGames + 1).then(() => {
              fetch(`/user/${signedIn.uid}/highscore`).then(highscore => {
                write(`/user/${signedIn.uid}/currentGame`, null).then(() => {
                  if (score > highscore || highscore === null) {
                    write(`/user/${signedIn.uid}/highscore`, score).then(() => {
                      write(`/leaderboard/${signedIn.uid}`, {
                        name: signedIn.displayName,
                        highscore: score
                      }).then(() => {
                        navigate('/results');
                      });
                    });
                  } else {
                    navigate('/results');
                  }
                });
              });
            });
          });
        });
      }
    }
  }

  if (signedIn === "Loading") {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  } else if (signedIn === "signedOut") {
    return (
      <div>
        <h3>You must sign in</h3>
        <FancyButton onClick={() => navigate("/account")}>Sign In</FancyButton>
      </div>
    );
  } else {
    return (
      <div className={classes.gameContainer}>
        <input type="text" className={classes.coverInput} value={nameInput} onChange={e => setNameInput(e.target.value)} autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        { currentSong === "Loading" ?
          <h3>Loading...</h3>
        :
          <div className={classes.gameOuter}>
            <div></div>
            <div>{ !currentSongCompleted && <NameModule Name={nameInput} FullName={currentSong.name} Artist={currentSong.artist} onComplete={completed} /> }</div>
            <div className={classes.gameBottom}>
              <div>
                <Favorite className={classes.heart} />
                <Favorite className={hearts === 1 ? [classes.heart, classes.faded].join(' ') : classes.heart} />
              </div>
              <div>
                <StatModule Title="Highscore" Value={highscore} />
                <StatModule Title="Points" Value={score} />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
