// export const API = "https://kltn2024.onrender.com";
export const API = process.env.NEXT_PUBLIC_API_REST;

//auth
export const API_AUTH_LOGIN = `${API}/login`;
export const API_AUTH_REGISTER = `${API}/register`;
export const API_AUTH_LOGOUT = `${API}/logout`;
export const API_AUTH_SEND_MAIL = `${API}/forgotpassword`;
export const API_AUTH_CHECK_CODE = `${API}/verification-code`;
export const API_INFOR_SEARCH = `${API}/infosearch?userId={{USERID}}`
export const API_REFRESH_TOKEN = `${API}/refreshtoken`
export const API_RESET_PASSWORD = `${API}/resetpassword`

export const GET_METHOD = "GET";
export const POST_METHOD = "POST";
export const PUT_METHOD = "PUT";
export const DELETE_METHOD = "DELETE";

export type ApiResponse = {
  data: object;
};
