import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { withLayout } from "../../hoc/WithLayout";
import { MenuItem } from "../../interfaces/menu.interfase";
import { TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";

const firstCategory = 0;

function Course({menu, page, products}: CourseProps): JSX.Element {
  return (
    <>
      <ul>
        { products && products.map(product => <li key={product._id}>{product.title}: {product.price}</li>) }
      </ul>
    </>
  );
}

export default withLayout(Course);

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
    firstCategory,
  });

  return {
    paths: menu.flatMap(menuItem => menuItem.pages.map(pageItem => "/courses/" + pageItem.alias)),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
    firstCategory,
  });

  const {data: page} = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias);

  const {data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find/", {
    category: page.category,
    limit: 10,
  });

  return {
    props: {
      menu,
      firstCategory,
      page,
      products,
    },
  };
};