import { Link } from "@workspace/ui";
import { AppRoute } from "src/router";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  routes: AppRoute[];
  basePath: string;
};

export const Sidebar = ({ routes, basePath }: SidebarProps) => {
  return (
    <nav className={styles.sidebar}>
      <ul>
        {routes.map((route, index) => {
          if (route.index) return null;
          return (
            <li key={route.to ?? index}>
              <Link 
              to={`${basePath}/${route.to}`} 
              appearance="ghost"
              animation="left"
              className={styles.link}
              >
                {route.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
