import classes from './StatModule.module.css';

export default function StatModule({ Title, Value }) {
	return (
		<div className={classes.statModuleOuter}>
		<span className={classes.value}>{Value}</span>
			<span className={classes.title}>{Title}</span>
		</div>
	)
}