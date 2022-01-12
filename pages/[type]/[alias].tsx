import { withLayout } from "../../hoc/WithLayout";
import { MenuItem } from "../../interfaces/menu.interfase";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { ParsedUrlQuery } from "querystring";
import { TopPageComponent } from "../../pageComponents";

function TopPage({ products, page, firstCategory }: TopPageProps): JSX.Element {
  return (
    <TopPageComponent
      page={page}
      products={products}
      firstCategory={firstCategory}
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
    const { data: menu } = await axios.post<MenuItem[]>(`${ process.env.NEXT_PUBLIC_DOMAIN }/api/top-page/find`, {
      firstCategory: menuItem.id,
    });
    paths = paths.concat(menu.flatMap(item => item.pages.map(pageItem => `/${menuItem.route}/${ pageItem.alias }`)));
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
    const { data: menu } = await axios.post<MenuItem[]>(`${ process.env.NEXT_PUBLIC_DOMAIN }/api/top-page/find`, {
      firstCategory: firstCategoryItem.id,
    });

    if (menu.length === 0) {
      return {
        notFound: true,
      };
    }

    const { data: page } = await axios.get<TopPageModel>(`${ process.env.NEXT_PUBLIC_DOMAIN }/api/top-page/byAlias/${ params.alias }`);

    const { data: products } = await axios.post<ProductModel[]>(`${ process.env.NEXT_PUBLIC_DOMAIN }/api/product/find`, {
      category: page.category,
      limit: 10,
    });

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