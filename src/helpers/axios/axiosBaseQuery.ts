import { IMeta } from "../../types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { instance as axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      meta?: IMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          contentType: contentType || "application/json",
        },
        withCredentials: true,
      });
      return result;
    } catch (axiosError) {
      let err = axiosError as AxiosError & {
        statusCode: number;
        message: string;
        success: boolean;
        errorMessages: Array<any>;
      };
      console.log(err);
      const error = {
        status: err.response?.status || err?.statusCode || 400,
        data: err.response?.data || err.message,
        message: err.response?.data || err.message,
        success: err?.success,
        errorMessages: err?.errorMessages,
      };
      return {
        error: error,
      };
      //   return {
      //     error: {
      //       status: err.response?.status,
      //       data: err.response?.data || err.message,
      //     },
      //   };
    }
  };
