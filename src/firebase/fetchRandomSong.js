import { getDatabase, ref, child, get } from "firebase/database";

export default function fetchRandomSong() {
	return new Promise(resolve => {
		const dbRef = ref(getDatabase());
		get(child(dbRef, `songs/numSongs`)).then(snapshot => {
			const numSongs = snapshot.val();
			let randomSongNum = Math.floor(Math.random() * numSongs - 1);
			if (randomSongNum === -1) randomSongNum = 0;
			get(child(dbRef, `songs/songList/${randomSongNum}`)).then(randomSong => {
				randomSong = randomSong.val();
				resolve([randomSong, randomSongNum]);
			})
		});
	});
}