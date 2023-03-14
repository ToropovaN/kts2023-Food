import { useCallback } from "react";

import classNames from "classnames";
import Button from "components/Button/Button";
import IconBack from "components/Icons/IconBack";
import IconCheck from "components/Icons/IconCheck";
import IconLike from "components/Icons/IconLike";
import IconPlus from "components/Icons/IconPlus";
import IconRecipeMark from "components/Icons/IconRecipeMark";
import IconTime from "components/Icons/IconTime";
import Loader, { LoaderSize } from "components/Loader/Loader";
import SmallCard from "components/SmallCard/SmallCard";
import Meta from "config/MetaConfig";
import { Option } from "config/types";
import parse from "html-react-parser";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import { useAppContext } from "../../App";
import Cuisine from "./components/Cuisine/Cuisine";
import Skeleton from "./components/Skeleton/Skeleton";
import styles from "./DetailRecipe.module.scss";

const DetailRecipe = () => {
  const { id } = useParams<{ id: string }>();

  const recipesStore = useAppContext().recipesStore;
  const queryStore = useAppContext().queryStore;
  const navigate = useNavigate();

  const recipe = recipesStore.recipe;
  const loading = !(recipe && recipesStore.meta === Meta.success);

  if (
    id &&
    recipesStore.recipe?.id !== id &&
    recipesStore.meta !== Meta.loading
  )
    recipesStore.getRecipe(id, queryStore.APIDetailQueryString());

  const goBack = useCallback(() => {
    runInAction(() => {
      if (recipesStore.list.length === 0)
        recipesStore.getRecipesList(queryStore.APIListQueryString());
    });
    navigate(-1);
  }, [navigate, recipesStore, queryStore.APIListQueryString]);

  const findByCuisine = useCallback(
    (cuisine: Option) => {
      queryStore.setQueryParam({
        param: "cuisines",
        value: [cuisine],
      });
      navigate({
        pathname: "/recipes",
        search: queryStore.appQueryString(),
      });
      recipesStore.getRecipesList(queryStore.APIListQueryString());
    },
    [navigate, recipesStore, queryStore]
  );

  return (
    <div className={styles.detailRecipe}>
      {!loading && (
        <>
          <Button className={styles.detailRecipe_backButton} onClick={goBack}>
            <IconBack />
          </Button>
          <Button
            className={styles.detailRecipe_favouriteButton}
            onClick={() => recipesStore.setFavourite(recipe)}
          >
            {recipesStore.favourites.includes(recipe.id) ? (
              <IconCheck stroke="#ff0000" />
            ) : (
              <IconPlus stroke="#ff0000" />
            )}
          </Button>
        </>
      )}
      {!loading ? (
        <img
          className={styles.detailRecipe_image}
          src={recipe.image}
          alt={recipe.title}
        />
      ) : (
        <div
          className={classNames(
            styles.detailRecipe_image,
            styles.detailRecipe_imageLoading
          )}
        >
          <Loader size={LoaderSize.l} className={"white"} />
        </div>
      )}

      <div className={styles.detailRecipe_content}>
        <div className={styles.detailRecipe_scrollTool}>
          <svg
            viewBox="0 0 375 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 188,0 C 107.362,0 29.546841,2.432628 6.7070312,3.2109375 2.9481413,3.3390327 0,6.3406204 0,10 v 5 H 376 V 10 C 376,6.3406205 373.05197,3.3390327 369.29297,3.2109375 346.45297,2.4326278 268.638,0 188,0 Z" />
          </svg>
        </div>

        <div className={styles.detailRecipe_info}>
          {!loading ? (
            <>
              <h1>{recipe.title}</h1>
              {recipe.marks.length ? (
                <div className={styles.detailRecipe_marks}>
                  {recipe.marks.map((name) => (
                    <IconRecipeMark name={name} key={name} />
                  ))}
                </div>
              ) : null}
              <div className={styles.detailRecipe_stats}>
                <div className={styles.detailRecipe_statsItem}>
                  <IconTime />
                  {recipe.minutes + " minutes"}
                </div>
                <div className={styles.detailRecipe_statsItem}>
                  <IconLike />
                  {recipe.likes + " likes"}
                </div>
              </div>

              <div className={styles.detailRecipe_text}>
                {parse(recipe.text)}
              </div>

              {recipe.cuisines.length > 0 && (
                <div className={styles.detailRecipe_text}>
                  <b>Cuisines:</b>{" "}
                  {recipe.cuisines.map((cuisine) => (
                    <Cuisine
                      key={cuisine}
                      name={cuisine}
                      onClick={(cuisineOption) => findByCuisine(cuisineOption)}
                    />
                  ))}
                </div>
              )}

              {recipe.ingredients.length ? (
                <>
                  <h2>Ingredients:</h2>
                  <div className={styles.detailRecipe_smallCardsBlock}>
                    {recipe.ingredients.map((ingredient) =>
                      ingredient.id > 0 ? (
                        <SmallCard
                          key={ingredient.id}
                          amount={
                            parseFloat(ingredient.amount.toFixed(2)) +
                            " " +
                            ingredient.unit
                          }
                          path={recipesStore.ingredientPath}
                          image={ingredient.image}
                          title={capitalizeFirstLetter(ingredient.nameClean)}
                        ></SmallCard>
                      ) : null
                    )}
                  </div>
                </>
              ) : null}
              {recipe.equipment.length ? (
                <>
                  <h2>Equipment:</h2>
                  <div className={styles.detailRecipe_smallCardsBlock}>
                    {recipe.equipment.map((equipment) => (
                      <SmallCard
                        key={equipment.id}
                        path={recipesStore.EquipmentPath}
                        image={equipment.image}
                        title={capitalizeFirstLetter(equipment.name)}
                      ></SmallCard>
                    ))}
                  </div>
                </>
              ) : null}
              {recipe.instructions && (
                <>
                  <h2>Instructions:</h2>
                  <div className={styles.detailRecipe_text}>
                    {parse(recipe.instructions)}
                  </div>
                </>
              )}
            </>
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(DetailRecipe);
