import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";
import Menu from "../../components/Menu/Menu";
import Logo from "../logo.svg";
import styles from "./Sidebar.module.css";

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} { ...props }>
      <Logo/>
      <div>search</div>
      <Menu/>
    </div>
  );
};