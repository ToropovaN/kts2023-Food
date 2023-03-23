import React, { useCallback } from "react";

import Button from "components/Button/Button";
import IconSearch from "components/Icons/IconSearch";
import Input from "components/Input/Input";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../../../App";
import styles from "./Search.module.scss";

const Search = () => {
  const recipesStore = useAppContext().rootStore.recipesStore;
  const queryStore = useAppContext().rootStore.queryStore;
  const navigate = useNavigate();

  const onChange = useCallback(
    (newStr: string) => {
      queryStore.setQueryParam({ query: newStr });
      navigate({
        pathname: "",
        search: queryStore.appQueryString(),
      });
    },
    [queryStore, navigate]
  );

  const startSearch = useCallback(() => {
    queryStore.setQueryParam({ page: 0 });
    navigate({
      pathname: "",
      search: queryStore.appQueryString(),
    });
    recipesStore.getRecipesList(queryStore.APIListQueryString());
  }, [recipesStore, queryStore, navigate]);

  return (
    <div className={styles.search}>
      <Input
        value={
          queryStore.query === queryStore.exampleQuery ? "" : queryStore.query
        }
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
