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

export type SetQueryParamData = {
  query?: string;
  cuisines?: Option[];
  page?: number;
  sort?: Option;
  ascSortDir?: boolean;
};

export const QueryParamsFromSet = (set: SetQueryParamData): QueryParams => {
  return {
    query: set.query,
    cuisine: set.cuisines?.map((c) => c.key).join(","),
    page: set.page,
    sort: set.sort?.key,
    sortDirection: set.ascSortDir ? "asc" : "",
  };
};
