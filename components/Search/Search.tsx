import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import cn from "classnames";
import { SearchProps } from "./Search.props";
import { Button, Input } from "../UI";
import GlassIcon from "./glass.svg";
import styles from "./Search.module.css";

export const Search = ({ className, ...props }: SearchProps) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onKeyDownHandler = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      goToSearch();
    }
  };

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  return (
    <div className={ cn(styles.search, className) } { ...props }>
      <Input
        className={ styles.input }
        placeholder="Поиск"
        onChange={ onChangeHandler }
        onKeyDown={ onKeyDownHandler }
        value={ search }
      />
      <Button
        variant="primary"
        className={ styles.button }
        onClick={ goToSearch }
      >
        <GlassIcon/>
      </Button>
    </div>
  );
};