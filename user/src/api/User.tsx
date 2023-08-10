import axios from "axios";
import axiosClient from "./axiosClient";

export class UserAPI {
  // API đăng ký
  static register(param: any): Promise<any> {
    const url = "http://localhost:4000/api/v1/user/register";
    return axios.post(url, param);
  }
  //   API đăng nhập
  static login(param: any): Promise<any> {
    const url = "/api/v1/user/login";
    return axiosClient.post(url, param);
  }

  static getUsers(): Promise<any> {
    const url = "api/v1/user/get-user";
    return axiosClient.get(url);
  }
  static editUsername(id: number, param: any): Promise<any> {
    const url = `api/v1/user/edit-user/${id}`;
    return axiosClient.patch(url, param);
  }
  static getUserById(id: number): Promise<any> {
    const url = `/api/v1/user/get-user-byid/${id}`;
    return axiosClient.get(url);
  }
}
