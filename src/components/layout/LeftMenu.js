import { Button, ThemeProvider, createTheme, Tooltip } from "@mui/material";
import {
  MusicNote,
  Home,
  Palette,
  BarChart,
  AccountCircle,
  Settings,
  AdminPanelSettings
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./LeftMenu.module.css";
import ButtonText from "../ui/ButtonText";

export default function LeftMenu({
  Mobile,
  OnChoice,
  Status,
  Theme,
  changeTheme
}) {
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
    typography: {
      fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`
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
            color: Theme === "dark" ? "#f2f2f2" : "#0e0e0e"
          }
        }
      }
    }
  });

  const goTo = (path) => {
    Mobile && OnChoice();
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.leftMenuOuterHolder}>
        <div>
          {!Mobile && (
            <span className={classes.gameTitle}>
              <MusicNote fontSize="small" />
              <span className={classes.gameTitleText}>Music Game</span>
            </span>
          )}
          <Button
            variant={location.pathname === "/" ? "contained" : undefined}
            sx={location.pathname === "/" ? { color: "#f2f2f2" } : undefined}
            onClick={() => goTo("/")}
          >
            <ButtonText Icon={Home} Name="Home" />
          </Button>
          <Button
            variant={
              location.pathname === "/leaderboard" ? "contained" : undefined
            }
            sx={
              location.pathname === "/leaderboard"
                ? { color: "#f2f2f2" }
                : undefined
            }
            onClick={() => goTo("/leaderboard")}
          >
            <ButtonText Icon={BarChart} Name="Leaderboard" />
          </Button>
          <Button
            variant={
              location.pathname === "/settings" ? "contained" : undefined
            }
            sx={
              location.pathname === "/settings"
                ? { color: "#f2f2f2" }
                : undefined
            }
            onClick={() => goTo("/settings")}
          >
            <ButtonText Icon={Settings} Name="Settings" />
          </Button>
        </div>
        <div>
          {Status !== "loading" &&
            Status !== "signedOut" &&
            Status.uid === "sVLlgCZSzgYXCReiUZOc71YMqDK2" && (
              <Button
                variant={
                  location.pathname === "/admin" ? "contained" : undefined
                }
                sx={
                  location.pathname === "/admin"
                    ? { color: "#f2f2f2" }
                    : undefined
                }
                onClick={() => goTo("/admin")}
              >
                <ButtonText Icon={AdminPanelSettings} Name="Admin Console" />
              </Button>
            )}
          <Button
            variant={location.pathname === "/account" ? "contained" : undefined}
            sx={
              location.pathname === "/account"
                ? { color: "#f2f2f2" }
                : undefined
            }
            onClick={() => goTo("/account")}
          >
            <ButtonText
              Icon={AccountCircle}
              Name={
                Status === "loading"
                  ? "Loading"
                  : Status === "signedOut"
                  ? "Sign In"
                  : "Account Settings"
              }
            />
          </Button>
          <Tooltip
            title={
              location.pathname === "/game"
                ? "Theme cannot be changed while game in progress"
                : "Change theme"
            }
          >
            <span>
              <Button
                onClick={() => {
                  if (location.pathname !== "/game") {
                    changeTheme();
                    if (Mobile) OnChoice();
                  } else {
                    alert("Please finish game first");
                  }
                }}
                disabled={location.pathname === "/game"}
              >
                <ButtonText Icon={Palette} Name="Theme" />
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
    </ThemeProvider>
  );
}
