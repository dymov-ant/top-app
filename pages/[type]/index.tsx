import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { withLayout } from "../../hoc/WithLayout";
import { MenuItem } from "../../interfaces/menu.interfase";
import { firstLevelMenu } from "../../helpers/helpers";
import { getMenuByFirstCategory } from "../../api/menu";

function Type({ firstCategory }: TypeProps) {
  return (
    <>
      Type: { firstCategory }
    </>
  );
}

export default withLayout(Type);

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(menuItem => `/${ menuItem.route }`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
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

  const { data: menu, status: menuStatus } = await getMenuByFirstCategory(firstCategoryItem.id);

  if (menu.length === 0 || menuStatus !== 200) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  };
};