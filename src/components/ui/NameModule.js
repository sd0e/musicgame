import classes from './NameModule.module.css';

export default function NameModule({ Name, FullName, Artist, onComplete }) {
	const currentIdx = Name.length;

	const words = FullName.split(' ');
	let wordsSplit = [];
	words.forEach(word => wordsSplit.push(word.split('')));
	
	let totalIdx = 0;
	let formedWord = '';
	wordsSplit.forEach((wordSplit) => {
		wordSplit.forEach((letter, idxWordSplit) => {
			if (idxWordSplit !== 0) {
				if (totalIdx < currentIdx) {
					formedWord += Name.split('')[totalIdx];
				} else if (totalIdx === currentIdx) {
					formedWord += '|';
				} else {
					formedWord += '_';
				}
				totalIdx += 1;
			} else {
				formedWord += letter;
			}
		});
		formedWord += ' ';
	});
	formedWord.slice(0, -1);

	const wordIncomplete = formedWord.includes('|');
	if (!wordIncomplete) onComplete(formedWord);

	return (
		<div className={classes.nameModuleOuter}>
			{ wordIncomplete ?
				<span className={classes.songName}>
					<span>{formedWord.split('|')[0]}</span>
					<span className={classes.wordMiddle}></span>
					{ formedWord.split('|')[1].split('').map((letter, idx) => {
						return <span className={letter === '_' ? classes.incompletedWord : undefined} key={`letter${letter}${idx}`}>{letter}</span>
					}) }
				</span>
			:
				<span className={classes.songName}>{formedWord}</span>
			}
			<span className={classes.songArtist}>{Artist}</span>
		</div>
	)
}