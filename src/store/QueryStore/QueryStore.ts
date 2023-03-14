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

import { QueryParams, SetQueryParamData } from "./types";

type PrivateFields = "_query" | "_cuisines" | "_page" | "_sort" | "_ascSortDir";

export default class QueryStore {
  //private readonly _apiKey: string = "28b96fa1642b4476a009370856802fc5";
  //private readonly _apiKey: string = "2b3ebd57937747a190f2244ab2423918";
  //private readonly _apiKey: string = "990490df808e4307a3e4bf98147bbdfb";
  //private readonly _apiKey: string = "fabcd272022f46da9d568d3a96b807b5";
  //private readonly _apiKey: string = "60626dc7d5f849c2acb8caaa7f487570";
  private readonly _apiKey: string = "d782d0a8a41a4f1e862d7118dedee920";

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
        query: this._query,
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

  public setQueryParam = ({ param, value }: SetQueryParamData) => {
    runInAction(() => {
      if (param === "page") {
        if (this._query === "") this._query = this._exampleQuery;
        this._page = value;
      } else {
        this._page = 0;
      }
      if (param === "query") this._query = value;
      if (param === "cuisines") this._cuisines = value;
      if (param === "sort") this._sort = value;
      if (param === "ascSortDir") this._ascSortDir = value;
    });
  };

  public setStoreFromQueryString = (
    query: string,
    meta: Meta,
    onUpdate: (queryString: string) => Promise<void>
  ) => {
    if (
      this.createQueryString(this.serializeQueryString(query)).slice(1) !==
        this.appQueryString().slice(1) ||
      meta === Meta.initial
    ) {
      const newData = this.serializeQueryString(query);

      const newCuisines: Option[] = [];
      if (newData["cuisine"]) {
        newData["cuisine"].split(",").forEach((newCuisine) => {
          newCuisines.push({
            key: decodeURI(newCuisine),
            value: decodeURI(newCuisine),
          });
        });
      }

      runInAction(() => {
        this._cuisines = newCuisines;
        this._query = newData["query"] || "";
        this._page = Number(newData["page"]) || 0;
        this._sort =
          SortBy.find((sort) => sort.value === newData["sort"]) || SortBy[0];
        this._ascSortDir = newData["sortDirection"] === "asc" ? true : false;
        onUpdate(this.APIListQueryString());
      });
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

  public serializeQueryString = (
    queryString: string
  ): Record<string, string> => {
    if (queryString !== "") {
      const pairs = queryString.slice(1).split("&");
      const result: Record<string, string> = {};
      pairs.forEach((pair) => {
        const values = pair.split("=");
        if (values[0] === "page")
          values[1] =
            Number(values[1]) - 1 > 0 ? String(Number(values[1]) - 1) : "";
        if (values[0] && values[1]) result[values[0]] = decodeURI(values[1]);
      });
      return result;
    } else return {};
  };
}
