import classes from './StatModule.module.css';

export default function StatModule({ Title, Value, Display }) {
	return (
		<div className={Display ? classes.statModuleOuterDisplay : classes.statModuleOuter}>
		<span className={classes.value}>{Value}</span>
			<span className={classes.title}>{Title}</span>
		</div>
	)
}