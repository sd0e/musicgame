import classes from "./ButtonText.module.css";

export default function ButtonText({ Icon, Name }) {
  return (
    <div className={classes.buttonTextOuter}>
      <Icon fontSize="12px" />
      <span className={classes.name}>{Name}</span>
    </div>
  );
}
