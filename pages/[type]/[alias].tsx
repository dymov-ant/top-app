import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { withLayout } from "../../hoc/WithLayout";
import { MenuItem } from "../../interfaces/menu.interfase";
import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { TopPageComponent } from "../../pageComponents";
import { getMenuByFirstCategory } from "../../api/menu";
import { getPageByAlias } from "../../api/page";
import { getProductsByCategory } from "../../api/product";

function TopPage({ products, page, firstCategory }: TopPageProps): JSX.Element {
  return (
    <TopPageComponent
      page={ page }
      products={ products }
      firstCategory={ firstCategory }
    />
  );
}

export default withLayout(TopPage);

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  page: TopPageModel;
  products: ProductModel[];
  firstCategory: TopLevelCategory;
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const menuItem of firstLevelMenu) {
    const { data: menu } = await getMenuByFirstCategory(menuItem.id);
    paths = paths.concat(menu.flatMap(item => item.pages.map(pageItem => `/${ menuItem.route }/${ pageItem.alias }`)));
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find(menu => menu.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: menu, status: menuStatus } = await getMenuByFirstCategory(firstCategoryItem.id);

    if (menu.length === 0 || menuStatus !== 200) {
      return {
        notFound: true,
      };
    }

    const { data: page, status: pageStatus } = await getPageByAlias(params.alias as string);

    if (pageStatus !== 200) {
      return {
        notFound: true,
      };
    }

    const { data: products, status: productsStatus } = await getProductsByCategory(page.category);

    if (productsStatus !== 200) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};