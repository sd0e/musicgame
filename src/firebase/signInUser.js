import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const signInUser = (option, email, password) => {
	return new Promise((resolve, reject) => {
		if (option === 'signIn') {
			signInWithEmailAndPassword(auth, email, password)
				.then((result) => {
					const user = result.user;
					resolve(user);
				}).catch((error) => {
					const errorMessage = error.message;
					console.log(errorMessage);
					reject(errorMessage);
				});
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then((result) => {
					const user = result.user;
					resolve(user);
				}).catch((error) => {
					const errorMessage = error.message;
					console.log(errorMessage);
					reject(errorMessage);
				});
		}
	});
}

export default signInUser;