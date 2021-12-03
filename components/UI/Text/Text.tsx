import cn from "classnames";
import { TextProps } from "./Text.props";
import styles from "./Text.module.css";

export const Text = ({size = "middle", children, className, ...props}: TextProps) => {
  return (
    <p
      className={ cn(styles.p, className, {
        [styles.small]: size === "small",
        [styles.middle]: size === "middle",
        [styles.large]: size === "large",
      }) }
      { ...props }
    >
      { children }
    </p>
  );
};