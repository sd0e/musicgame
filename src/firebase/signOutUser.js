import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const signOutUser = () => {
	return new Promise(resolve => {
		signOut(auth).then(() => resolve());
	});
}

export default signOutUser;