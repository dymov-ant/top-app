import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interfase";
import { firstLevelMenu } from "../../helpers/helpers";
import styles from "./Menu.module.css";

const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(menuItem => {
      if (menuItem._id.secondCategory === secondCategory) {
        menuItem.isOpened = !menuItem.isOpened;
      }
      return menuItem;
    }));
  };

  const buildFirstLevel = () => {
    return (
      <>
        { firstLevelMenu.map(menuItem =>
          <div key={ menuItem.route }>
            <Link href={ `/${ menuItem.route }` }>
              <a>
                <div className={ cn(styles.firstLevel, {
                  [styles.firstLevelActive]: menuItem.id === firstCategory,
                }) }>
                  { menuItem.icon }
                  <span>{ menuItem.name }</span>
                </div>
              </a>
            </Link>
            { menuItem.id === firstCategory && buildSecondLevel(menuItem) }
          </div>,
        ) }
      </>
    );
  };

  const buildSecondLevel = (menuItemProps: FirstLevelMenuItem) => {
    return (
      <div className={ styles.secondBlock }>
        { menu.map(menuItem => {
          if (menuItem.pages.map(page => page.alias).includes(router.asPath.split("/")[2])) {
            menuItem.isOpened = true;
          }
          return <div key={ menuItem._id.secondCategory }>
            <div className={ styles.secondLevel } onClick={ () => openSecondLevel(menuItem._id.secondCategory) }>
              { menuItem._id.secondCategory }
            </div>
            <div className={ cn(styles.secondLevelBlock, {
              [styles.secondLevelBlockOpened]: menuItem.isOpened,
            }) }>
              { buildThirdLevel(menuItem.pages, menuItemProps.route) }
            </div>
          </div>;
        }) }
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map(pageItem =>
        <Link href={ `/${ route }/${ pageItem.alias }` } key={ `/${ route }/${ pageItem.alias }` }>
          <a className={ cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${ route }/${ pageItem.alias }` === router.asPath,
          }) }>
            { pageItem.title }
          </a>
        </Link>,
      )
    );
  };

  return (
    <div className={ styles.menu }>
      { buildFirstLevel() }
    </div>
  );
};

export default Menu;
