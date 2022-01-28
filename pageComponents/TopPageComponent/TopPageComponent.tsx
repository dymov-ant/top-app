import React, { useEffect, useReducer } from "react";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Tag, Title } from "../../components/UI";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { Advantages, HHData, Sort } from "../../components";
import { SortEnum } from "../../components/Sort/Sort.props";
import { sortReducer } from "./sort.reducer";
import { Product } from "../../components/Product/Product";
import styles from "./TopPageComponent.module.css";

const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
    products,
    sort: SortEnum.Rating,
  });

  useEffect(() => {
    dispatchSort({ type: "refresh", newState: products });
  }, [products]);

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  return (
    <div>
      <div className={ styles.title }>
        <Title tag="h1">{ page.title }</Title>
        { sortedProducts && <Tag color="gray" size="middle">{ sortedProducts.length }</Tag> }
        <Sort sort={ sort } setSort={ setSort }/>
      </div>
      <div>
        { sortedProducts && sortedProducts.map(product => <Product key={ product._id } product={ product }/>) }
      </div>
      <div className={ styles.hhTitle }>
        <Title tag="h2">Вакансии - { page.category }</Title>
        <Tag color="red" size="middle">hh.ru</Tag>
      </div>
      { firstCategory === TopLevelCategory.Courses && page.hh && <HHData { ...page.hh }/> }
      {
        page.advantages && page.advantages.length > 0 && <>
          <Title tag="h2">Преимущества</Title>
          <Advantages advantages={ page.advantages }/>
        </>
      }
      { page.seoText && <div className={ styles.seo } dangerouslySetInnerHTML={ { __html: page.seoText } }/> }
      <Title tag="h2">Получаемые навыки</Title>
      { page.tags.map(tag => <Tag key={ tag } color="primary">{ tag }</Tag>) }
    </div>
  );
};

export default TopPageComponent;
