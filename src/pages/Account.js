import { useState } from "react";
import { createTheme, ThemeProvider, TextField, Button } from "@mui/material";

import signInUser from "../firebase/signInUser";
import signOutUser from "../firebase/signOutUser";
import deleteUserAccount from "../firebase/deleteUserAccount";
import classes from './Account.module.css';

export default function Account({ onStatusChange, setProgress, Status }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = () => {
		setProgress(20);
		signInUser('signIn', email, password).then(user => {
			setProgress(100);
			onStatusChange(user);
		});
	}

	const signUp = () => {
		setProgress(20);
		signInUser('signUp', email, password).then(user => {
			setProgress(100);
			onStatusChange(user);
		});
	}

	const signOut = () => {
		setProgress(20);
		signOutUser().then(() => {
			setProgress(100);
			onStatusChange('signedOut');
		});
	}

	const confirmDelete = () => {
		if (window.confirm('Are you sure you want to delete your account?')) {
			deleteUserAccount().then(() => signOut());
		}
	}

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
			fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
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
						color: getComputedStyle(document.body).getPropertyValue('--text'),
						marginRight: "0.5rem",
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						marginRight: "0.5rem",
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<h3>Account</h3>
			{ Status === 'signedOut' ?
				<div>
					<form style={{ marginBottom: "1.5rem" }}>
						<TextField type="text" label="Email" value={email} onInput={e => setEmail(e.target.value)} autoComplete="username" variant="outlined" />
						<TextField type="password" label="Password" value={password} onInput={e => setPassword(e.target.value)} autoComplete="current-password" variant="outlined" />
					</form>
					<Button onClick={signIn}>Sign In</Button>
					<Button onClick={signUp}>Sign Up</Button>
				</div>
			:
				<div>
					<h2>Welcome back</h2>
					<span className={classes.email}>{Status.email}</span>
					<Button onClick={signOut}>Sign Out</Button>
					<Button onClick={confirmDelete}>Delete Account</Button>
				</div>
			}
		</ThemeProvider>
	);
}