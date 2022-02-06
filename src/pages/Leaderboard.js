import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import fetch from "../firebase/fetch";
import StatModule from "../components/ui/StatModule";
import classes from './Leaderboard.module.css';

export default function Leaderboard() {
    const [user, setUser] = useState('Loading');
    const [highscore, setHighscore] = useState('Loading');
    const [numGames, setNumGames] = useState('Loading');

    useEffect(() => {const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetch(`/user/${user.uid}/highscore`).then(tempHighscore => {
                    if (tempHighscore !== null) setHighscore(tempHighscore);
                    else setHighscore(0);
                });
                fetch(`/user/${user.uid}/numGames`).then(tempNumGames => setNumGames(tempNumGames));
            }
            else setUser("signedOut");
        });
    }, []);

    return (
        <div>
            <h3>Leaderboard</h3>
            { user !== 'signedOut' && user !== 'Loading' && <div className={classes.outerContainer}>
                <span className={classes.outerContainerTitle}>Your Games</span>
                <StatModule Title="Highscore" Value={highscore} Display />
                <StatModule Title="Games" Value={numGames} Display />
            </div> }
            <div className={classes.outerContainer}>
                <span className={classes.outerContainerTitle}>Global Leaderboard</span>
            </div>
        </div>
    );
}