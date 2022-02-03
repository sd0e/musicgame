import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyAdVW2dBlv50x0UNZ5aecjGlv-bYkr4wTY",
	authDomain: "music-game-c85e9.firebaseapp.com",
	databaseURL: "https://music-game-c85e9-default-rtdb.firebaseio.com",
	projectId: "music-game-c85e9",
	storageBucket: "music-game-c85e9.appspot.com",
	messagingSenderId: "278868928810",
	appId: "1:278868928810:web:42fd0d400fe1bd98f01653"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;