import Meta from "config/MetaConfig";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import ApiStore from "store/ApiStore/ApiStore";
import { ApiResponse } from "store/ApiStore/types";
import {
  normalizeRecipe,
  normalizeRecipesList,
  RecipeApi,
  RecipeModel,
  RecipesListApi,
  RecipesListModel,
} from "store/models/Recipe/Recipe";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/Collection";

type PrivateFields = "_meta" | "_list" | "_recipe" | "_favourites";

export default class RecipesStore {
  private readonly apiStore = new ApiStore("https://api.spoonacular.com/");

  public readonly ingredientPath: string =
    "https://spoonacular.com/cdn/ingredients_100x100/";
  public readonly EquipmentPath: string =
    "https://spoonacular.com/cdn/equipment_100x100/";

  private _meta: Meta = Meta.initial;
  private _list: CollectionModel<string, RecipesListModel> =
    getInitialCollectionModel();
  private _favourites: string[] = [];
  private _recipe: RecipeModel | null = null;
  private _totalResults: number = 0;

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _recipe: observable,
      _meta: observable,
      _favourites: observable,

      list: computed,
      recipe: computed,
      meta: computed,
      favourites: computed,

      setFavourite: action,
      getRecipesList: action,
      getRecipe: action,
    });

    runInAction(() => {
      for (let key in window.localStorage) {
        if (key.includes("recipe_"))
          this._favourites.push(key.replace("recipe_", ""));
      }
    });
  }

  get list(): RecipesListModel[] {
    return linearizeCollection(this._list);
  }
  get recipe(): RecipeModel | null {
    return this._recipe;
  }
  get meta(): Meta {
    return this._meta;
  }

  get favourites(): string[] {
    return this._favourites;
  }

  get totalResults(): number {
    return this._totalResults;
  }

  public setFavourite = (recipe: RecipesListModel) => {
    const index = this._favourites.indexOf(recipe.id);
    if (index >= 0) {
      this._favourites.splice(index, 1);
      window.localStorage.removeItem("recipe_" + recipe.id);
    } else {
      this._favourites.push(recipe.id);
      window.localStorage.setItem(
        "recipe_" + recipe.id,
        JSON.stringify(recipe)
      );
    }
  };

  public getRecipesList = async (queryString: string): Promise<void> => {
    if (this._meta !== Meta.loading) {
      this._meta = Meta.loading;
      this._list = getInitialCollectionModel();

      let result: ApiResponse<
        { totalResults: number; results: RecipesListApi[] },
        null
      > = await this.apiStore.request({
        method: "get",
        endpoint: "/recipes/complexSearch" + queryString,
      });

      runInAction(() => {
        if (result.success) {
          try {
            this._totalResults = result.data.totalResults;
            this._meta = Meta.success;
            const list = result.data.results.map(normalizeRecipesList);
            this._list = normalizeCollection(list, (listItem) => listItem.id);
          } catch (e) {
            this._meta = Meta.error;
          }
        } else {
          this._meta = Meta.error;
          this._list = getInitialCollectionModel();
        }
      });
    }
  };

  public getRecipe = async (id: string, queryString: string): Promise<void> => {
    if (this._meta !== Meta.loading) {
      this._meta = Meta.loading;

      let result: ApiResponse<RecipeApi, null> = await this.apiStore.request({
        method: "get",
        endpoint: "/recipes/" + id + "/information" + queryString,
      });

      runInAction(() => {
        if (result.success) {
          try {
            this._meta = Meta.success;
            this._recipe = normalizeRecipe(result.data);
          } catch (e) {
            this._meta = Meta.error;
            this._recipe = null;
          }
        } else {
          this._meta = Meta.error;
          this._recipe = null;
        }
      });
    }
  };
}
