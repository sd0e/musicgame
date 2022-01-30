import React, { lazy, Suspense, useState, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import "./styles.css";
import Layout from "./components/layout/Layout";
import Loading from "./pages/Loading";
const Home = lazy(() => import("./pages/Home"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Settings = lazy(() => import("./pages/Settings"));

export default function App() {
  const [progress, setProgress] = useState(0);
  
  if (!localStorage.colorTheme) localStorage.colorTheme = "dark";
  document.documentElement.style.setProperty(
    "--bg",
    localStorage.colorTheme === "dark" ? "#0e0e0e" : "#f2f2f2"
  );
  document.documentElement.style.setProperty(
    "--text",
    localStorage.colorTheme === "dark" ? "#f2f2f2" : "#0e0e0e"
  );

  const Loader = ({ children }) => {
    setProgress(0);
  
    useLayoutEffect(() => {
      setProgress(100);
    }, []);
  
    return children;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <LoadingBar color="#002884" progress={progress} height={3} waitingTime={500} loaderSpeed={500} />
        <Layout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route exact path="/" element={
                  <Loader>
                    <Home />
                  </Loader>
                } />
                <Route exact path="/leaderboard" element={
                  <Loader>
                    <Leaderboard />
                  </Loader>
                } />
                <Route exact path="/settings" element={
                  <Loader>  
                    <Settings />
                  </Loader>
                } />
                <Route exact path="*" element={
                  <Loader>
                    <Home />
                  </Loader>
                } />
              </Routes>
            </Suspense>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
