import { Rating } from "../components";
import { useState } from "react";

export default function Home() {
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
