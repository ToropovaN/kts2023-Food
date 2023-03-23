import { useCallback } from "react";

import Card from "components/Card/Card";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { RecipesListModel } from "store/models/Recipe/Recipe";

import { useAppContext } from "../../App/App";
import styles from "./Grid.module.scss";

export type GridProps = {
  list: RecipesListModel[];
};
const Grid = ({ list }: GridProps) => {
  const recipesStore = useAppContext().rootStore.recipesStore;
  const navigate = useNavigate();
  const onClick = useCallback(
    (id: string) => {
      navigate("/recipe/" + id);
    },
    [navigate]
  );

  return (
    <div className={styles.grid}>
      {list.map((recipe: RecipesListModel) => (
        <Card
          key={recipe.id}
          recipe={recipe}
          onClick={onClick}
          favourite={recipesStore.favourites.includes(recipe.id)}
          onFavourite={recipesStore.setFavourite}
        ></Card>
      ))}
    </div>
  );
};

export default observer(Grid);
