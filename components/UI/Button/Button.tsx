import cn from "classnames";
import { ButtonProps } from "./Button.props";
import ArrowIcon from "./arrow.svg";
import styles from "./Button.module.css";

export const Button = ({variant, arrow = "none", children, className, ...props}: ButtonProps): JSX.Element => {
  return (
    <button
      className={ cn(styles.button, className, {
        [styles.primary]: variant === "primary",
        [styles.ghost]: variant === "ghost",
      }) }
      { ...props }
    >
      { children }
      { arrow !== "none" && <span className={ cn(styles.arrow, {
        [styles.down]: arrow === "down",
      }) }>
        <ArrowIcon />
      </span> }
    </button>
  );
};