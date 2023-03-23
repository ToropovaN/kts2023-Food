import QueryStore from "store/QueryStore/QueryStore";
import RecipesStore from "store/RecipesStore/RecipesStore";

class RootStore {
  readonly recipesStore = new RecipesStore();
  readonly queryStore = new QueryStore();
}

export const rootStore = new RootStore();
