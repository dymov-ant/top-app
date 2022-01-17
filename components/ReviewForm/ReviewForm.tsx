import cn from "classnames";
import { ReviewFormProps } from "./ReviewForm.props";
import { Rating } from "../Rating/Rating";
import { Button, Input, Textarea } from "../UI";
import CloseIcon from "./close.svg";
import styles from "./ReviewForm.module.css";

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps) => {
  return (
    <>
      <div
        className={ cn(styles.form, className) }
        { ...props }
      >
        <Input
          placeholder="Имя"
        />
        <Input
          className={styles.title}
          placeholder="Заголовок отзыва"
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Rating rating={0}/>
        </div>
        <Textarea
          className={styles.description}
          placeholder="Текс отзыва"
        />
        <div className={styles.submit}>
          <Button variant="primary">
            Отправить
          </Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      <div className={styles.success}>
        <p className={styles.successTitle}>Ваш отзыв отправлен</p>
        <p className={styles.successText}>Спасибо, ваш отзыв будет опубликован после проверки.</p>
        <CloseIcon className={styles.close}/>
      </div>
    </>
  );
};