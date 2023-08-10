import axiosClient from "./axiosClient";

export class CommentAPI {
  static getLoveComments() {
    const url = "api/v1/comment/get-love-comment";
    return axiosClient.get(url);
  }
  static getLikeComments() {
    const url = "api/v1/comment/get-like-comment";
    return axiosClient.get(url);
  }
  static getAllComments() {
    const url = "api/v1/comment/get-all-comment";
    return axiosClient.get(url);
  }
  static postComment(params) {
    const url = `api/v1/comment/add-comment`;
    return axiosClient.post(url, params);
  }
  static getLikeLoveComments() {
    const url = `api/v1/comment/get-like-love-comment`;
    return axiosClient.get(url);
  }
  static deleteLikeAtComment(id) {
    const url = `api/v1/comment/delete-like-comment/${id}`;
    return axiosClient.delete(url);
  }
  static postLikeAtComment(params) {
    const url = `api/v1/comment/add-like-comment`;
    return axiosClient.post(url, params);
  }
}
