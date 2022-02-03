import { getAuth, deleteUser } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
console.log(user);

const deleteUserAccount = () => {
	return new Promise(resolve => {
		deleteUser(user).then(() => resolve());
	});
}

export default deleteUserAccount;