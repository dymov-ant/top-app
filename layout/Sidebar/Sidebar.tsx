import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";
import Menu from "../../components/Menu/Menu";
import Logo from "../logo.svg";
import styles from "./Sidebar.module.css";
import { Search } from "../../components";

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} { ...props }>
      <Logo/>
      <Search/>
      <Menu/>
    </div>
  );
};