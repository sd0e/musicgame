import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getDatabase, ref, child, remove } from "firebase/database";

const deleteUserAccount = () => {
	return new Promise(resolve => {
		// user not authenticated recently enough; signs in again
		const email = window.prompt('Please confirm your email');
		const password = window.prompt('Please confirm your password');

		const credential = EmailAuthProvider.credential(
			email,
			password
		);

		const uid = getAuth().currentUser.uid;
		const db = getDatabase();
		remove(child(ref(db), `/user/${uid}`)).then(() => {
			remove(child(ref(db), `/leaderboard/${uid}`)).then(() => {
				reauthenticateWithCredential(getAuth().currentUser, credential).then(() => {
					deleteUser(getAuth().currentUser)
					.then(() => {
						resolve();
					});
				});
			});
		});
	});
}

export default deleteUserAccount;