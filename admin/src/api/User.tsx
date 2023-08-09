// import axios from "axios";
import axiosClient from "./axiosClient";
import { ParamType } from "../types/type";

export class UserAPIAdmin {
  static getUsers(): Promise<any> {
    const url = "api/v1/user/get-user";
    return axiosClient.get(url);
  }

  static editStatus(id: number, param: ParamType): Promise<any> {
    const url = `api/v1/user/edit-status/${id}`;
    return axiosClient.patch(url, param);
  }
  static countFollowed(): Promise<any> {
    const url = `api/v1/follow/count-user-followed`;
    return axiosClient.get(url);
  }
  static countFollowOther(): Promise<any> {
    const url = `api/v1/follow/count-followed-other`;
    return axiosClient.get(url);
  }
}
