import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">VizGo</Link>
        </li>
        <li>
          <a href="https://github.com/VizGoHub/VizGo/blob/main/README.md">Docs</a>
        </li>
        <li>
          <a href="https://github.com/VizGoHub/VizGo">Github</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
