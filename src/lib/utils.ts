import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function imageLocation(urlImage: string) {
  var url_token = urlImage.split("?");
  var url = url_token[0].split("/");
  var filePath = url[url.length - 1].replaceAll("%2F", "/");

  return filePath;
}

export function sanitizeString(
  str: string,
  removeSpecialChar?: boolean
): string {
  if (!str) {
    return "";
  }
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ă|Ằ|Ắ|Ẳ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẻ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/, "E");
  str = str.replace(/e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ỉ|Ị/g, "I");
  str = str.replace(/i|ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ổ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ở|Ợ/g, "O");
  str = str.replace(/o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, "U");
  str = str.replace(/u|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỷ|Ỵ/g, "Y");
  str = str.replace(/y|ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");

  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // tone characters
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  // Loại bỏ dấu câu và khoảng trắng
  if (removeSpecialChar) {
    str = str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s]/g, "");
  }
  return str;
}
