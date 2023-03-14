export type RequestParams = {
  method: string;
  endpoint: string;
};

export enum StatusHTTP {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  NotFound = 404,
  BadGateway = 502,
}

export type ApiResponse<SuccessT, ErrorT> =
  | {
      success: true;
      data: SuccessT;
      status: StatusHTTP;
    }
  | {
      success: false;
      data: ErrorT;
      status: StatusHTTP;
    }
  | {
      success: false;
      data: null;
      status: "UNEXPECTED_ERROR";
    };
