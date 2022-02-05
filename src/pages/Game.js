import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Favorite } from "@mui/icons-material";

import FancyButton from "../components/ui/FancyButton";
import fetchRandomSong from "../firebase/fetchRandomSong";
import classes from "./Game.module.css";
import NameModule from "../components/ui/NameModule";
import StatModule from "../components/ui/StatModule";

export default function Game() {
  const [signedIn, setSignedIn] = useState("Loading");
  const [currentSong, setCurrentSong] = useState("Loading");
  const [hearts, setHearts] = useState(2);
  const [nameInput, setNameInput] = useState('');
  const [currentSongCompleted, setCurrentSongCompleted] = useState(false);
  const [score, setScore] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) setSignedIn(user);
      else setSignedIn("signedOut");
    });

    fetchRandomSong().then(randomSong => setCurrentSong(randomSong));
  }, []);

  const completed = completedSong => {
    setNameInput('');
    if (completedSong.trim() === currentSong.name.trim()) {
      setCurrentSongCompleted(true);
      if (hearts === 2) setScore(score + 3);
      else setScore(score + 1);
      setHearts(2);
      fetchRandomSong().then(randomSong => {
        setCurrentSong(randomSong);
        setCurrentSongCompleted(false);
      });
    } else {
      setHearts(hearts - 1);
      if (hearts === 1) {
        navigate('/results');
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
                <StatModule Title="Points" Value={score} />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
