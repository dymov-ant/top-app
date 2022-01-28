import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from "react";
import cn from "classnames";
import { RatingProps } from "./Rating.props";
import StarIcon from "./star.svg";
import styles from "./Rating.module.css";

export const Rating = forwardRef(({
                                    rating,
                                    setRating,
                                    isEditable = false,
                                    error,
                                    ...props
                                  }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const changeDisplay = (i: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(i);
  };

  const handleSpace = (e: KeyboardEvent<HTMLSpanElement>, i: number) => {
    if (e.code !== "Space" || !setRating) {
      return;
    }
    setRating(i);
  };

  const constructRating = (currentRating: number) => {
    const updateArray = ratingArray.map((r, i) => {
      return (
        <span
          className={ cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          }) }
          onMouseEnter={ () => changeDisplay(i + 1) }
          onMouseLeave={ () => changeDisplay(rating) }
          onClick={ () => onClick(i + 1) }
        >
          <StarIcon
            onKeyDown={ (e: KeyboardEvent<HTMLSpanElement>) => isEditable && handleSpace(e, i + 1) }
            tabIndex={ isEditable ? 0 : -1 }
          />
        </span>
      );
    });

    setRatingArray(updateArray);
  };

  useEffect(() => {
    constructRating(rating);
  }, [rating]);


  return (
    <div className={cn(styles.ratingWrapper, {[styles.error]: error})} { ...props } ref={ ref }>
      { ratingArray.map((r, i) => (<span key={ i }>{ r }</span>)) }
      { error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});