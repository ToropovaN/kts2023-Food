import React from "react";

import Button from "components/Button/Button";
import IconSearch from "components/Icons/IconSearch";
import Input from "components/Input/Input";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../../../App";
import styles from "./Search.module.scss";

const Search = () => {
  const recipesStore = useAppContext().recipesStore;
  const queryStore = useAppContext().queryStore;
  const navigate = useNavigate();

  const onChange = (newStr: string) => {
    queryStore.setQueryParam({ param: "query", value: newStr });
    navigate({
      pathname: "",
      search: queryStore.appQueryString(),
    });
  };

  const startSearch = () => {
    recipesStore.getRecipesList(queryStore.APIListQueryString());
  };

  return (
    <div className={styles.search}>
      <Input
        value={queryStore.query}
        placeholder={"For example: " + queryStore.exampleQuery}
        onChange={onChange}
        enter={startSearch}
      />
      <Button onClick={startSearch}>
        <IconSearch />
      </Button>
    </div>
  );
};

export default observer(Search);
