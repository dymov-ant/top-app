import cn from "classnames";
import { TagProps } from "./Tag.props";
import styles from "./Tag.module.css";

export const Tag = ({color = "ghost", size = "middle", href, className, children, ...props}: TagProps) => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.small]: size === "small",
        [styles.middle]: size === "middle",
        [styles.ghost]: color === "ghost",
        [styles.red]: color === "red",
        [styles.gray]: color === "gray",
        [styles.green]: color === "green",
        [styles.primary]: color === "primary",
      })}
      {...props}
    >
      {
        href
          ? <a href={href}>{children}</a>
          : <>{children}</>
      }
    </div>
  );
};