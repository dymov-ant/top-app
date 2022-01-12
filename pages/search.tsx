import { GetStaticProps } from "next";
import axios from "axios";
import { withLayout } from "../hoc/WithLayout";
import { MenuItem } from "../interfaces/menu.interfase";

function Search() {
  return (
    <>
      search
    </>
  );
}

export default withLayout(Search);

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
    firstCategory,
  });

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};