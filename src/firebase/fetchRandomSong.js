import { getDatabase, ref, child, get } from "firebase/database";

export default function fetchRandomSong() {
	return new Promise(resolve => {
		const dbRef = ref(getDatabase());
		get(child(dbRef, `songs/numSongs`)).then(snapshot => {
			const numSongs = snapshot.val();
			let randomSong = Math.floor(Math.random() * numSongs - 1);
			if (randomSong === -1) randomSong = 0;
			get(child(dbRef, `songs/songList/${randomSong}`)).then(randomSong => {
				randomSong = randomSong.val();
				resolve(randomSong);
			})
		});
	});
}