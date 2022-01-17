import React, { useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { ProductProps } from "./Product.props";
import { Button, Card, Divider, Tag } from "../UI";
import { Rating } from "../Rating/Rating";
import { declOfNum, priceRu } from "../../helpers/helpers";
import styles from "./Product.module.css";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";

export const Product = ({ product, className, ...props }: ProductProps) => {
  const [isReviewOpened, setIsReviewOpened] = useState(false);

  return (
    <>
      <Card className={ cn(styles.product, className) }>
        <div className={ styles.logo }>
          <Image
            src={ process.env.NEXT_PUBLIC_DOMAIN + product.image }
            alt={ product.title }
            width={ 70 }
            height={ 70 }
          />
        </div>
        <div className={ styles.title }>{ product.title }</div>
        <div className={ styles.price }>
          { priceRu(product.price) }
          { product.oldPrice &&
            <Tag className={ styles.oldPrice } color="green">{ priceRu(product.price - product.oldPrice) }</Tag> }
        </div>
        <div className={ styles.credit }>
          { priceRu(product.credit) }
          /<span className={ styles.month }>мес</span>
        </div>
        <div className={ styles.rating }><Rating rating={ product.reviewAvg ?? product.initialRating }/></div>
        <div className={ styles.tags }>
          { product.categories.map(item => <Tag className={ styles.category } color="ghost" key={ item }>{ item }</Tag>) }
        </div>
        <div className={ styles.priceTitle }>цена</div>
        <div className={ styles.creditTitle }>в кредит</div>
        <div
          className={ styles.rateTitle }
        >
          { product.reviewCount } { declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"]) }
        </div>
        <Divider className={ styles.hr }/>
        <div className={ styles.description }>{ product.description }</div>
        <div className={ styles.feature }>
          { product.characteristics.map(char =>
            <div className={ styles.characteristics } key={ char.name }>
              <span className={ styles.characteristicsName }>{ char.name }</span>
              <span className={ styles.characteristicsDots }/>
              <span className={ styles.characteristicsValue }>{ char.value }</span>
            </div>,
          ) }
        </div>
        <div className={ styles.advBlock }>
          { product.advantages && <div className={ styles.advantages }>
            <div className={ styles.advTitle }>Преимущества</div>
            { product.advantages }
          </div> }
          { product.disadvantages && <div className={ styles.disadvantages }>
            <div className={ styles.advTitle }>Недостатки</div>
            { product.disadvantages }
          </div> }
        </div>
        <Divider className={ cn(styles.hr, styles.hr2) }/>
        <div className={ styles.actions }>
          <Button variant="primary">
            Узнать подробнее
          </Button>
          <Button
            variant="ghost"
            arrow={isReviewOpened ? "down" : "right"}
            className={ styles.reviewBtn }
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <Card color="blue" className={cn(styles.reviews, {
        [styles.opened]: isReviewOpened,
        [styles.closed]: !isReviewOpened,
      })}>
        {product.reviews.map(review =>
          <>
            <Review key={review._id} review={review}/>
            <Divider/>
          </>
        )}
        <ReviewForm productId={product._id}/>
      </Card>
    </>
  );
};