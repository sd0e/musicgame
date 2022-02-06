import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const write = (path, data) => {
	return new Promise(resolve => {
		const db = getDatabase();
		set(ref(db, path), data).then(() => resolve('completed'));
	});
}

export default write;