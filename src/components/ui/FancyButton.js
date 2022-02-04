import { createTheme, ThemeProvider, Button } from "@mui/material";

export default function FancyButton({ children, onClick }) {
  const bgRGBA = localStorage.colorTheme === "dark" ? "255" : "0";

  const theme = createTheme({
    palette: {
      mode: localStorage.colorTheme,
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
            fontWeight: 600,
            marginBottom: "0.5rem",
            justifyContent: "left",
            padding: "0.5rem 1.5rem",
            textTransform: "none",
            backgroundColor: `rgba(${bgRGBA}, ${bgRGBA}, ${bgRGBA}, 0.05)`,
            color: getComputedStyle(document.body).getPropertyValue("--text"),
            marginRight: "0.5rem"
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={onClick}>{children}</Button>
    </ThemeProvider>
  );
}
