import { callApi } from "@/axios/callApi";
import {
  API_AUTH_CHECK_CODE,
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
  API_AUTH_SEND_MAIL,
  API_INFOR_SEARCH,
  DELETE_METHOD,
  GET_METHOD,
  POST_METHOD,
} from "./type";

type LoginType = {
  username: string;
  password: string;
};
export const loginApi = async (data: LoginType) => {
  const response = await callApi(API_AUTH_LOGIN, POST_METHOD, data);
  if (typeof window === "undefined") {
    return;
  } else {
    localStorage.setItem("access_token", response?.accesstoken);
  }
  return response;
};

type RegisterType = {
  fullname: string;
  email: string;
  username: string;
  password: string;
};

export const registerApi = async (data: RegisterType) => {
  await callApi(API_AUTH_REGISTER, POST_METHOD, data);
};

export const senMailApi = async (data: any) => {
  return await callApi(API_AUTH_SEND_MAIL, GET_METHOD, data);
};

export const checkCodeApi = async (data: any) => {
  return await callApi(API_AUTH_CHECK_CODE, GET_METHOD, data);
};

export const getHistory = async (data: string) => {
  return await callApi(API_INFOR_SEARCH.replace('{{USERID}}', data), GET_METHOD)
}

export const deleteHistory = async (data: string, keyword: string) => {
  return await callApi(`${API_INFOR_SEARCH.replace('{{USERID}}', data)}&keyword=${keyword}`, DELETE_METHOD)
}