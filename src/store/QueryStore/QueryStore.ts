import Cuisines from "config/cuisineConfig";
import Meta from "config/MetaConfig";
import SearchExamples from "config/searchExamplesConfig";
import SortBy from "config/sortConfig";
import { Option } from "config/types";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { QueryParams, QueryParamsFromSet, SetQueryParamData } from "./types";

type PrivateFields = "_query" | "_cuisines" | "_page" | "_sort" | "_ascSortDir";

export default class QueryStore {
  //private readonly _apiKey: string = "28b96fa1642b4476a009370856802fc5";
  //private readonly _apiKey: string = "2b3ebd57937747a190f2244ab2423918";
  private readonly _apiKey: string = "990490df808e4307a3e4bf98147bbdfb";
  //private readonly _apiKey: string = "fabcd272022f46da9d568d3a96b807b5";
  //private readonly _apiKey: string = "60626dc7d5f849c2acb8caaa7f487570";
  //private readonly _apiKey: string = "d782d0a8a41a4f1e862d7118dedee920";

  private _query: string = "";
  private _exampleQuery: string = "";
  private _cuisines: Option[] = [];
  private _page: number = 0;
  private _perPage: number = 12;
  private _sort: Option = SortBy[0];
  private _ascSortDir: boolean = false;

  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _query: observable,
      _page: observable,
      _cuisines: observable,
      _sort: observable,
      _ascSortDir: observable,

      query: computed,
      cuisines: computed,
      page: computed,
      sort: computed,
      ascSortDir: computed,

      setStoreFromQueryString: action,
      setQueryParam: action,
      appQueryString: action,
      APIListQueryString: action,
      APIDetailQueryString: action,
    });

    runInAction(() => {
      this._exampleQuery =
        SearchExamples[Math.floor(Math.random() * SearchExamples.length)];
    });
  }

  get query(): string {
    return this._query;
  }
  get exampleQuery(): string {
    return this._exampleQuery;
  }
  get cuisines(): Option[] {
    return this._cuisines;
  }
  get page(): number {
    return this._page;
  }
  get perPage(): number {
    return this._perPage;
  }
  get sort(): Option {
    return this._sort;
  }
  get ascSortDir(): boolean {
    return this._ascSortDir;
  }

  public appQueryString(): string {
    let result = "";
    runInAction(() => {
      result = this.createQueryString({
        query: this._query || this._exampleQuery,
        cuisine: this._cuisines.map((opt) => opt.value).join(","),
        page: this._page,
        sort: this._sort.value === SortBy[0].value ? "" : this._sort.value,
        sortDirection: this._ascSortDir ? "asc" : "",
      });
    });
    return result;
  }

  public APIListQueryString(): string {
    let result = this.createQueryString({
      addRecipeInformation: true,
      apiKey: this._apiKey,
      query: this._query !== "" ? this._query : this._exampleQuery,
      cuisine: this._cuisines.map((opt) => opt.value).join(","),
      number: this._perPage,
      offset: this._page * this._perPage,
      addRecipeNutrition: true,
      sort: this._sort.value,
      sortDirection: this._ascSortDir ? "asc" : "desc",
    });
    return result;
  }

  public APIDetailQueryString(): string {
    let result = this.createQueryString({
      includeNutrition: true,
      apiKey: this._apiKey,
    });
    return result;
  }

  public setQueryParam = (data: SetQueryParamData) => {
    runInAction(() => {
      if (data.page || data.page === 0) this._page = data.page;
      if (data.query || data.query === "") this._query = data.query;
      if (data.cuisines) this._cuisines = data.cuisines;
      if (data.sort) this._sort = data.sort;
      if (data.ascSortDir) this._ascSortDir = data.ascSortDir;
    });
  };

  public setStoreFromQueryString = (
    query: string,
    meta: Meta,
    onUpdate: (queryString: string) => Promise<void>
  ) => {
    if (meta !== Meta.loading) {
      const newData = this.serializeQueryString(query);
      if (
        this.createQueryString(QueryParamsFromSet(newData)).slice(1) !==
          this.appQueryString().slice(1) ||
        meta === Meta.initial
      ) {
        runInAction(() => {
          this._query = newData.query || this._exampleQuery;
          this._cuisines = newData.cuisines || [];
          this._page = newData.page || 0;
          this._sort = newData.sort || SortBy[0];
          this._ascSortDir = newData.ascSortDir || false;
          onUpdate(this.APIListQueryString());
        });
      }
    }
  };

  public createQueryString = (newQueryParams: QueryParams): string => {
    let params: string[] = [];
    Object.entries(newQueryParams).forEach(([key, value]) => {
      if (value) {
        if (key === "page") value = String(Number(value) + 1);
        if (!(key === "page" && value <= 1))
          params.push(
            `${key}=${
              typeof value === "string" ? encodeURI(value) : value.toString()
            }`
          );
      }
    });
    return "?" + params.join("&");
  };

  public serializeQueryString = (queryString: string): SetQueryParamData => {
    if (queryString !== "") {
      const pairs = queryString.slice(1).split("&");
      const result: SetQueryParamData = {};
      pairs.forEach((pair) => {
        const values = pair.split("=");
        switch (values[0]) {
          case "page": {
            result.page = Number(values[1]) - 1 > 0 ? Number(values[1]) - 1 : 0;
            break;
          }
          case "cuisine": {
            const newCuisines: Option[] = [];
            values[1].split(",").forEach((cuisineToSearch) => {
              const cuisine = Cuisines.find(
                (c) => c.key === decodeURI(cuisineToSearch)
              );
              if (cuisine) newCuisines.push(cuisine);
            });
            result.cuisines = newCuisines;
            break;
          }
          case "query": {
            result.query = decodeURI(values[1]);
            break;
          }
          case "sort": {
            result.sort = SortBy.find((s) => s.key === decodeURI(values[1]));
            break;
          }
          case "sortDirection": {
            result.ascSortDir = values[1] === "asc" ? true : false;
            break;
          }
        }
      });
      return result;
    } else return {};
  };
}
