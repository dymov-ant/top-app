import cn from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ReviewProps } from "./Review.props";
import { Rating } from "../Rating/Rating";
import UserIcon from "./user.svg";
import styles from "./Review.module.css";

export const Review = ({ review, className, ...props }: ReviewProps) => {
  const { name, title, description, rating, createdAt } = review;
  return (
    <div
      className={ cn(styles.review, className) }
      { ...props }
    >
      <UserIcon />
      <div className={styles.title}>
        <span className={ styles.userName }>{ name }:</span>&nbsp;&nbsp;
        <span>{ title }</span>
      </div>
      <span className={ styles.date }>
        { format(new Date(createdAt), "dd MMMM yyyy", { locale: ru }) }
      </span>
      <div className={styles.rating}>
        <Rating rating={rating}/>
      </div>
      <p className={styles.description}>
        {description}
      </p>
    </div>
  );
};