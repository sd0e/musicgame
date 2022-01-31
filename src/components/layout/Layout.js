import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ThemeProvider,
  SwipeableDrawer,
  NavMenu,
  IconButton,
  Button,
  createTheme
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import classes from "./Layout.module.css";
import LeftMenu from "./LeftMenu";

export default function Layout({ children }) {
  let navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);
  const [compactMode, setCompactMode] = useState(window.innerWidth <= 405);
  const [navBarOpen, setNavBarOpen] = useState(false);

  const checkIsMobile = () => {
    const windowWidth = window.innerWidth;
    const desktopMinWidth = 870;
    const compactModeMaxWidth = 405;

    if (windowWidth >= desktopMinWidth && isMobile) setIsMobile(false);
    else if (windowWidth < desktopMinWidth && !isMobile) setIsMobile(true);

    if (windowWidth <= compactModeMaxWidth && !compactMode)
      setCompactMode(true);
    else if (windowWidth > compactModeMaxWidth && compactMode)
      setCompactMode(false);
  };

  window.addEventListener("resize", checkIsMobile, true);

  if (window.location.href.includes("/?/")) {
    const newPath = window.location.href.split("/?/")[1];
    navigate(newPath);
  }

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#cccccc"
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            display: "inline-block",
            marginLeft: "1.25rem",
            fontSize: "1.15rem",
            fontFamily: `"Inter", sans-serif`,
            fontWeight: 500,
            textTransform: "none"
          }
        }
      }
    }
  });

  if (!isMobile) {
    return (
      <table className={classes.tableOuter}>
        <tr>
          <th className={classes.leftMenu}>
            <LeftMenu />
          </th>
          <th className={classes.mainContent}>{children}</th>
        </tr>
      </table>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <SwipeableDrawer
          anchor="left"
          open={navBarOpen}
          onClose={() => setNavBarOpen(false)}
          onOpen={() => setNavBarOpen(true)}
        >
          <div className={classes.mobileNavMenuHolder}>
            <LeftMenu
              Mobile
              OnChoice={() => setNavBarOpen(false)}
              CompactMode={compactMode}
            />
          </div>
        </SwipeableDrawer>
        <header className={classes.mobileHeader}>
          <div className={classes.mobileHeaderLeft}>
            <IconButton
              size="medium"
              onClick={() => setNavBarOpen(true)}
              aria-label="open menu"
            >
              <Menu fontSize="medium" style={{ color: "#cccccc" }} />
            </IconButton>
            <Button onClick={() => navigate("/")} aria-label="home">
              Music Game
            </Button>
          </div>
        </header>
        <div className={classes.mobileContentOuter}>
          <div className={classes.mobileContent}>{children}</div>
        </div>
      </ThemeProvider>
    );
  }
}
