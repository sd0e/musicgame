import { useNavigate } from 'react-router-dom';

import classes from "./Layout.module.css";
import LeftMenu from "./LeftMenu";

export default function Layout({ children }) {
  let navigate = useNavigate();

  if (window.location.href.includes('/?/')) {
    const newPath = window.location.href.split('/?/')[1];
    navigate(newPath);
  }

  return (
    <table className={classes.tableOuter}>
      <tr>
        <th className={classes.leftMenu}>
          <LeftMenu />
        </th>
        <th className={classes.mainContent}>
          { children }
        </th>
      </tr>
    </table>
  );
}
