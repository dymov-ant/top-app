import React from "react";
import cn from "classnames";
import { SortEnum, SortProps } from "./Sort.props";
import SortIcon from "./SortIcon.svg";
import styles from "./Sort.module.css";

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {

  return (
    <div className={ cn(styles.sort, className) } { ...props }>
      <span
        onClick={ () => setSort(SortEnum.Rating) }
        className={ cn({
          [styles.active]: sort === SortEnum.Rating,
        }) }
      >
        <SortIcon className={ styles.icon }/>
        По рейтингу
      </span>
      <span
        onClick={ () => setSort(SortEnum.Price) }
        className={ cn({
          [styles.active]: sort === SortEnum.Price,
        }) }
      >
        <SortIcon className={ styles.icon }/>
        По цене
      </span>
    </div>
  );
};