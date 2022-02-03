import React, { lazy, Suspense, useState, useLayoutEffect, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from './firebase/initialize';

import "./styles.css";
import Layout from "./components/layout/Layout";
import Loading from "./pages/Loading";
const Home = lazy(() => import("./pages/Home"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));

export default function App() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('loading');
  const [theme, setTheme] = useState(localStorage.colorTheme ? localStorage.colorTheme : 'dark');

  useEffect(() => {
    const firebase = firebaseApp;

    const auth = getAuth();
    setProgress(20);
    onAuthStateChanged(auth, user => {
      setProgress(100);
      if (user) {
        setStatus(user)
      } else {
        setStatus('signedOut')
      }
    });
  }, []);
  
  document.documentElement.style.setProperty(
    "--bg",
    theme === "dark" ? "#0e0e0e" : "#f2f2f2"
  );
  document.documentElement.style.setProperty(
    "--text",
    theme === "dark" ? "#f2f2f2" : "#0e0e0e"
  );

  const Loader = ({ children }) => {
    setProgress(20);
  
    useLayoutEffect(() => {
      setProgress(100);
    }, []);
  
    return children;
  }

  const changeStatus = changedStatus => {
    setStatus(changedStatus);
  }
  
  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
    localStorage.colorTheme = newTheme;

    document.documentElement.style.setProperty(
      "--bg",
      theme === "dark" ? "#0e0e0e" : "#f2f2f2"
    );
    document.documentElement.style.setProperty(
      "--text",
      theme === "dark" ? "#f2f2f2" : "#0e0e0e"
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <LoadingBar color="#002884" progress={progress} height={3} waitingTime={500} loaderSpeed={500} />
        <Layout Status={status} Theme={theme} changeTheme={changeTheme}>
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
                <Route exact path="/account" element={
                  <Loader>  
                    <Account onStatusChange={changeStatus} setProgress={setProgress} Status={status} />
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
