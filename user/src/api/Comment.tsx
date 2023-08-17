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
  static postComment(params: any) {
    const url = `api/v1/comment/add-comment`;
    return axiosClient.post(url, params);
  }
  static postRepComment(params: any) {
    const url = `api/v1/comment/add-rep-comment`;
    return axiosClient.post(url, params);
  }
  static getLikeLoveComments() {
    const url = `api/v1/comment/get-like-love-comment`;
    return axiosClient.get(url);
  }
  static deleteLikeAtComment(id: number) {
    const url = `api/v1/comment/delete-like-comment/${id}`;
    return axiosClient.delete(url);
  }
  static postLikeAtComment(params: any) {
    const url = `api/v1/comment/add-like-comment`;
    return axiosClient.post(url, params);
  }
  static getRepCommentById(id: number) {
    const url = `/api/v1/comment/get-reps-comment/${id}`;
    return axiosClient.get(url);
  }
  static getAllRepComment() {
    const url = "api/v1/comment/get-all-rep-comment";
    return axiosClient.get(url);
  }
}
