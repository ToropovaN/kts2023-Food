import { Option } from "config/types";

export type QueryParams = {
  cuisine?: string;
  addRecipeInformation?: boolean;
  apiKey?: string;
  offset?: number;
  query?: string;
  number?: number;
  page?: number;
  addRecipeNutrition?: boolean;
  includeNutrition?: boolean;
  sort?: string;
  sortDirection?: string;
};

export type SetQueryParamData =
  | { param: "query"; value: string }
  | { param: "cuisines"; value: Option[] }
  | { param: "page"; value: number }
  | { param: "sort"; value: Option }
  | { param: "ascSortDir"; value: boolean };
