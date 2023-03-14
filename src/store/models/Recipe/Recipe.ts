import removeDuplicates from "utils/removeDuplicates";

export type Ingredient = {
  id: number;
  nameClean: string;
  image: string;
  amount: number;
  unit: string;
};

export type Equipment = {
  id: number;
  name: string;
  image: string;
};

export type Nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type RecipeApi = {
  id: string;
  title: string;
  readyInMinutes: number;
  image: string;
  sourceName: string;
  aggregateLikes: number;
  summary: string;

  glutenFree: boolean;
  dairyFree: boolean;
  cheap: boolean;
  vegetarian: boolean;
  vegan: boolean;
  veryPopular: boolean;

  cuisines: string[];
  dishTypes: string[];
  extendedIngredients: Ingredient[];
  instructions: string;
  analyzedInstructions: Array<{
    steps: Array<{
      number: number;
      step: string;
      equipment: Equipment[];
    }>;
  }>;
  nutrition: {
    nutrients: Nutrient[];
  };
};

export enum MarkName {
  glutenFree = "glutenFree",
  dairyFree = "dairyFree",
  cheap = "cheap",
  vegetarian = "vegetarian",
  vegan = "vegan",
  veryPopular = "veryPopular",
}

export type RecipeModel = {
  id: string;
  title: string;
  minutes: number;
  image: string;
  source: string;
  likes: number;
  text: string;
  marks: MarkName[];
  cuisines: string[];
  types: string[];
  ingredients: Ingredient[];
  instructions: string;
  equipment: Equipment[];
  nutrientAmount: number;
  nutrientUnit: string;
};

export type RecipesListApi = {
  id: string;
  title: string;
  readyInMinutes: number;
  image: string;
  sourceName: string;
  nutrition: {
    nutrients: Nutrient[];
  };
};
export type RecipesListModel = {
  id: string;
  title: string;
  minutes: number;
  image: string;
  source: string;
  nutrientAmount: number;
  nutrientUnit: string;
};

export const normalizeRecipesList = (
  from: RecipesListApi
): RecipesListModel => {
  const nutrient = from.nutrition.nutrients.find(
    (n) => n.name === "Calories"
  ) || { amount: 0, unit: "" };
  return {
    id: from.id.toString(),
    title: from.title,
    minutes: from.readyInMinutes,
    image: from.image,
    source: from.sourceName,
    nutrientAmount: nutrient.amount,
    nutrientUnit: nutrient.unit,
  };
};

export const normalizeRecipe = (from: RecipeApi): RecipeModel => {
  const nutrient = from.nutrition.nutrients.find(
    (n) => n.name === "Calories"
  ) || { amount: 0, unit: "" };
  const equipment: Equipment[] = [];
  from.analyzedInstructions.forEach((instruction) => {
    instruction.steps.forEach((step) => {
      step.equipment.forEach((from) => {
        if (!equipment.find((item) => item.id === from.id))
          equipment.push({
            id: from.id,
            name: from.name,
            image: from.image,
          });
      });
    });
  });
  return {
    id: from.id.toString(),
    title: from.title,
    minutes: from.readyInMinutes,
    image: from.image,
    source: from.sourceName,
    likes: from.aggregateLikes,
    text: from.summary,
    marks: (() => {
      let marks = [];
      if (from.vegan) marks.push(MarkName.vegan);
      if (from.vegetarian) marks.push(MarkName.vegetarian);
      if (from.glutenFree) marks.push(MarkName.glutenFree);
      if (from.dairyFree) marks.push(MarkName.dairyFree);
      if (from.cheap) marks.push(MarkName.cheap);
      if (from.veryPopular) marks.push(MarkName.veryPopular);
      return marks;
    })(),
    cuisines: from.cuisines,
    types: from.dishTypes,
    ingredients: removeDuplicates(from.extendedIngredients),
    instructions: from.instructions,
    equipment: equipment,
    nutrientAmount: nutrient.amount,
    nutrientUnit: nutrient.unit,
  };
};
