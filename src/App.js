import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

export default function App() {
  if (!localStorage.colorTheme) localStorage.colorTheme = "dark";
  document.documentElement.style.setProperty(
    "--bg",
    localStorage.colorTheme === "dark" ? "#0e0e0e" : "#f2f2f2"
  );
  document.documentElement.style.setProperty(
    "--text",
    localStorage.colorTheme === "dark" ? "#f2f2f2" : "#0e0e0e"
  );

  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}
