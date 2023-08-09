import axiosClient from "./axiosClient";
import { ParamType } from "../types/type";

import { Name } from "../models/todo";

export class ImageAPIAdmin {
  static getAllImages(): Promise<Array<Name>> {
    const url: string = "/api/v1/image/get-image";
    return axiosClient.get(url);
  }
  static getImageById(id: number): Promise<any> {
    const url: string = `/api/v1/image/get-image-byId/${id}`;
    return axiosClient.get(url);
  }
  static editImagebyId(id: number, param: ParamType): Promise<any> {
    const url = `api/v1/image/edit-image-id/${id}`;
    return axiosClient.patch(url, param);
  }
}
