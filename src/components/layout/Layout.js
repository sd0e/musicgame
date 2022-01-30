import classes from "./Layout.module.css";
import LeftMenu from "./LeftMenu";

export default function Layout({ children }) {
  return (
    <table className={classes.tableOuter}>
      <tr>
        <th className={classes.leftMenu}>
          <LeftMenu />
        </th>
      </tr>
    </table>
  );
}
