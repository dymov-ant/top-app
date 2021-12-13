import { useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import { Rating } from "../components";
import { withLayout } from "../hoc/WithLayout";
import { MenuItem } from "../interfaces/menu.interfase";

function Home({menu}: HomeProps) {
  const [rating, setRating] = useState(4);
  return (
    <>
      <Rating rating={ 1 } isEditable/>
      <Rating rating={ 2 }/>
      <Rating rating={ 3 }/>
      <Rating rating={ rating } isEditable setRating={ setRating }/>
      <Rating rating={ 5 }/>

      <ul>
        { menu.map(menuItem => <li key={ menuItem._id.secondCategory }>{ menuItem._id.secondCategory }</li>) }
      </ul>
    </>
  );
}

export default withLayout(Home);

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