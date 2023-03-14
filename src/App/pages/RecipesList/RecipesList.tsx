import React, { useCallback } from "react";

import classNames from "classnames";
import BookButton, { BookButtonOffset } from "components/BookButton/BookButton";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import Grid from "components/Grid/Grid";
import IconSort from "components/Icons/IconSort";
import Loader, { LoaderSize } from "components/Loader/Loader";
import MultiDropdown from "components/MultiDropdown/MultiDropdown";
import Pagination from "components/Pagination/Pagination";
import Cuisines from "config/cuisineConfig";
import Meta from "config/MetaConfig";
import SortBy from "config/sortConfig";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { SetQueryParamData } from "store/QueryStore/types";

import { useAppContext } from "../../../App/App";
import Background from "../../../components/Background/Background";
import NotFound from "../../../components/NotFound/NotFound";
import Search from "./components/Search/Search";
import styles from "./RecipesList.module.scss";

const RecipesList = () => {
  const recipesStore = useAppContext().recipesStore;
  const queryStore = useAppContext().queryStore;
  const navigate = useNavigate();

  queryStore.setStoreFromQueryString(
    useLocation().search,
    recipesStore.meta,
    recipesStore.getRecipesList
  );

  const queryOnChange = useCallback(
    (data: SetQueryParamData) => {
      runInAction(() => {
        queryStore.setQueryParam(data);
        navigate({
          pathname: "",
          search: queryStore.appQueryString(),
        });
      });
      recipesStore.getRecipesList(queryStore.APIListQueryString());
    },
    [navigate, recipesStore, queryStore]
  );

  return (
    <div className={styles.recipesList}>
      <Background />
      <div className={styles.recipesList_content}>
        <div className={styles.recipesList_header}>
          <Search />
          <div className={styles.recipesList_categories}>
            <MultiDropdown
              options={Cuisines}
              value={queryStore.cuisines}
              onChange={(cuisines) => {
                queryOnChange({ param: "cuisines", value: cuisines });
              }}
              pluralizeOptions={(value) => {
                if (value.length === 0) return "Pick cuisines";
                else
                  return queryStore.cuisines.map((opt) => opt.value).join(", ");
              }}
            ></MultiDropdown>
            <div className={styles.recipesList_sort}>
              <Button
                className={classNames(
                  styles.recipesList_sortButton,
                  !queryStore.ascSortDir &&
                    styles["recipesList_sortButton-rotate"]
                )}
                onClick={() =>
                  runInAction(() => {
                    queryOnChange({
                      param: "ascSortDir",
                      value: !queryStore.ascSortDir,
                    });
                  })
                }
              >
                <IconSort />
              </Button>

              <Dropdown
                value={queryStore.sort}
                options={SortBy}
                onChange={(sort) =>
                  queryOnChange({ param: "sort", value: sort })
                }
                pluralizeOptions={(value) => "by " + value.value}
              ></Dropdown>
            </div>
          </div>
        </div>

        {recipesStore.meta === Meta.loading &&
        recipesStore.list.length === 0 ? (
          <div className={styles.recipesList_loading}>
            <Loader size={LoaderSize.m} />
          </div>
        ) : (
          <>
            {recipesStore.list.length === 0 ? (
              <div className={styles.recipesList_loading}>
                <NotFound />
              </div>
            ) : (
              <Grid list={recipesStore.list} />
            )}
            <Pagination
              current={queryStore.page + 1}
              total={Math.ceil(recipesStore.totalResults / queryStore.perPage)}
              onChange={(page) => {
                queryOnChange({ param: "page", value: page });
              }}
            />
          </>
        )}
        <BookButtonOffset />
      </div>
      <BookButton onClick={() => navigate("/favourites")} />
    </div>
  );
};

export default observer(RecipesList);
