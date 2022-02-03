import { useState } from "react";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import { MusicNote, Home, Palette, BarChart, AccountCircle, Settings } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./LeftMenu.module.css";
import ButtonText from "../ui/ButtonText";

export default function LeftMenu({ Mobile, OnChoice, Status, Theme, changeTheme }) {
  const location = useLocation();
  let navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: Theme,
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884"
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
            marginBottom: "0.5rem",
            justifyContent: "left",
            padding: "0.5rem 1.5rem",
            textTransform: "none",
            color: Theme === 'dark' ? '#f2f2f2' : '#0e0e0e',
          }
        }
      }
    }
  });

  const goTo = path => {
    Mobile && OnChoice();
    navigate(path);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.leftMenuOuterHolder}>
        <div>
          { !Mobile && <span className={classes.gameTitle}>
            <MusicNote fontSize="small" />
            <span className={classes.gameTitleText}>Music Game</span>
          </span> }
          <Button variant={location.pathname === '/' && 'contained'} sx={location.pathname === '/' && { color: '#f2f2f2' }} onClick={() => goTo('/')}>
            <ButtonText Icon={Home} Name="Home" />
          </Button>
          <Button variant={location.pathname === '/leaderboard' && 'contained'} sx={location.pathname === '/leaderboard' && { color: '#f2f2f2' }} onClick={() => goTo('/leaderboard')}>
            <ButtonText Icon={BarChart} Name="Leaderboard" />
          </Button>
          <Button variant={location.pathname === '/settings' && 'contained'} sx={location.pathname === '/settings' && { color: '#f2f2f2' }} onClick={() => goTo('/settings')}>
            <ButtonText Icon={Settings} Name="Settings" />
          </Button>
        </div>
        <div>
          <Button variant={location.pathname === '/account' && 'contained'} sx={location.pathname === '/account' && { color: '#f2f2f2' }} onClick={() => goTo('/account')}>
            <ButtonText Icon={AccountCircle} Name={Status === 'loading' ? 'Loading' : (Status === 'signedOut' ? 'Sign In' : 'Account Settings')} />
          </Button>
          <Button onClick={() => {changeTheme(); if (Mobile) OnChoice()}}>
            <ButtonText Icon={Palette} Name="Theme" />
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
