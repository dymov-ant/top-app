import cn from "classnames";
import {format} from "date-fns";
import { FooterProps } from "./Footer.props";
import { Text } from "../../components/UI";
import styles from "./Footer.module.css";

export const Footer = ({className, ...props}: FooterProps): JSX.Element => {
  return (
    <footer { ...props } className={cn(className, styles.footer)}>
      <Text className={styles.copy}>OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены</Text>
      <a className={styles.link} target="_blank" href="#">Пользовательское соглашение</a>
      <a className={styles.link} target="_blank" href="#">Политика конфиденциальности</a>
    </footer>
  );
};