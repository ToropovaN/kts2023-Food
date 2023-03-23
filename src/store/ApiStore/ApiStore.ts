import axios from "axios";

import { ApiResponse, RequestParams, StatusHTTP } from "./types";

export default class ApiStore {
  readonly baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async request<SuccessT, ErrorT = any>(
    params: RequestParams
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    let url = this.baseUrl + params.endpoint;

    try {
      const response = await axios(url);

      return {
        success: response.status === StatusHTTP.Ok,
        data: await response.data,
        status: response.status,
      };
    } catch (e) {
      return {
        success: false,
        data: null,
        status: "UNEXPECTED_ERROR",
      };
    }
  }
}
