import { useCallback } from "react";

import Background from "components/Background/Background";
import BookButton, { BookButtonOffset } from "components/BookButton/BookButton";
import Grid from "components/Grid/Grid";
import NotFound from "components/NotFound/NotFound";
import Pagination from "components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { RecipesListModel } from "store/models/Recipe/Recipe";

import { useAppContext } from "../../App";
import styles from "./Favourites.module.scss";

const Favourites = () => {
  const queryStore = useAppContext().rootStore.queryStore;
  const navigate = useNavigate();

  const page =
    Number(queryStore.serializeQueryString(useLocation().search)["page"]) || 0;

  const pagesOnChange = useCallback(
    (page: number) => {
      navigate({
        pathname: "",
        search: "?page=" + (page + 1),
      });
    },
    [navigate]
  );

  const favourites: RecipesListModel[] = [];

  for (let key in window.localStorage) {
    if (key.includes("recipe_"))
      favourites.push(JSON.parse(window.localStorage[key]));
  }

  const currentPageFavourites = favourites.slice(12 * page, 12 * page + 12);

  return (
    <div className={styles.favourites}>
      <Background />
      <div className={styles.favourites_content}>
        <h2>My CookBook</h2>
        {favourites.length > 0 ? (
          <>
            <Grid list={currentPageFavourites}></Grid>{" "}
            <Pagination
              current={page + 1}
              total={Math.ceil(favourites.length / 12)}
              onChange={pagesOnChange}
            />
          </>
        ) : (
          <NotFound />
        )}
        <BookButtonOffset />
      </div>
      <BookButton
        onClick={() =>
          navigate({
            pathname: "/recipes",
            search: queryStore.appQueryString(),
          })
        }
        open
      />
    </div>
  );
};

export default Favourites;
