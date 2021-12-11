import { useState } from "react";
import { Rating } from "../components";
import { withLayout } from "../hoc/WithLayout";

function Home() {
  const [rating, setRating] = useState(4);
  return (
    <>
      <Rating rating={ 1 } isEditable/>
      <Rating rating={ 2 }/>
      <Rating rating={ 3 }/>
      <Rating rating={ rating } isEditable setRating={setRating}/>
      <Rating rating={ 5 }/>
    </>
  );
}

export default withLayout(Home);