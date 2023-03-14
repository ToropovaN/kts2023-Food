import { memo, useState } from "react";

import classNames from "classnames";
import Button from "components/Button/Button";
import IconMinus from "components/Icons/IconCheck";
import IconPlus from "components/Icons/IconPlus";
import { RecipesListModel } from "store/models/Recipe/Recipe";

import styles from "./Card.module.scss";

export type CardProps = {
  recipe: RecipesListModel;
  onClick: (str: string) => void;
  favourite: boolean;
  onFavourite: (recipe: RecipesListModel) => void;
};

const Card = ({ recipe, onClick, favourite, onFavourite }: CardProps) => {
  const [buttonFloat, setButtonFloat] = useState(false);
  const buttonAnimation = () => {
    setButtonFloat(true);
    setTimeout(() => setButtonFloat(false), 700);
  };

  return (
    <div className={styles.card} onClick={() => onClick(recipe.id)}>
      <div className={styles.card_imgBlock}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className={styles.card_img}
        />
      </div>
      <div className={styles.card_title}>{recipe.title}</div>
      <div className={styles.card_subtitle}>{recipe.source}</div>
      <div className={styles.card_content}>
        <div className={styles.card_min}>{`${Math.round(
          recipe.nutrientAmount
        )} ${recipe.nutrientUnit}`}</div>
        <Button
          className={classNames(
            styles.card_roundButton,
            favourite && styles["card_roundButton-remove"],
            favourite && buttonFloat && styles["card_roundButton-active"]
          )}
          onClick={(e) => {
            buttonAnimation();
            e.stopPropagation();
            onFavourite(recipe);
          }}
        >
          {favourite ? <IconMinus /> : <IconPlus />}
        </Button>
      </div>
    </div>
  );
};

export default memo(Card);
