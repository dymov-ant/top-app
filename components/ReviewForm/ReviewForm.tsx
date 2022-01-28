import cn from "classnames";
import { useForm, Controller } from "react-hook-form";
import { ReviewFormProps } from "./ReviewForm.props";
import { Rating } from "../Rating/Rating";
import { Button, Input, Textarea } from "../UI";
import CloseIcon from "./close.svg";
import { IReviewForm } from "./ReviewForm.interface";
import styles from "./ReviewForm.module.css";
import { sendReview } from "../../api/product";
import { useState } from "react";

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps) => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: IReviewForm) => {
    try {
      setIsLoading(true);
      const { data: dataMessage, status } = await sendReview({ ...data, productId });
      if (status === 201 && dataMessage.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError("Что-то пошло не так, обновите страницу");
      }
    } catch (e) {
      setError("Что-то пошло не так, обновите страницу");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div
        className={ cn(styles.form, className) }
        { ...props }
      >
        <Input
          { ...register("name", { required: { value: true, message: "Заполните имя" } }) }
          placeholder="Имя"
          error={ errors.name }
        />
        <Input
          { ...register("title", { required: { value: true, message: "Заполните заголовок" } }) }
          className={ styles.title }
          placeholder="Заголовок отзыва"
          error={ errors.title }
        />
        <div className={ styles.rating }>
          <span>Оценка:</span>
          <Controller
            control={ control }
            rules={ { required: { value: true, message: "Укажите рейтинг" } } }
            render={ ({ field }) =>
              <Rating
                isEditable
                rating={ field.value }
                setRating={ field.onChange }
                error={ errors.rating }
              />
            }
            name="rating"
          />
        </div>
        <Textarea
          { ...register("description", { required: { value: true, message: "Заполните отзыв" } }) }
          className={ styles.description }
          placeholder="Текс отзыва"
          error={ errors.description }
        />
        <div className={ styles.submit }>
          <Button variant="primary" disabled={ isLoading }>
            Отправить
          </Button>
          <span className={ styles.info }>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      { isSuccess && <div className={ cn(styles.success, styles.panel) }>
        <p className={ styles.panelTitle }>Ваш отзыв отправлен</p>
        <p className={ styles.panelText }>Спасибо, ваш отзыв будет опубликован после проверки.</p>
        <CloseIcon className={ styles.close } onClick={() => setIsSuccess(false)} />
      </div> }
      { error && <div className={ cn(styles.error, styles.panel) }>
        <p className={ styles.panelTitle }>Произошла ошибка</p>
        <p className={ styles.panelText }>{error}</p>
        <CloseIcon className={ styles.close } onClick={() => setError(null)} />
      </div> }
    </form>
  );
};