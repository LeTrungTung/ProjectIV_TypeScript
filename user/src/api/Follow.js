import axiosClient from "./axiosClient";

export class FollowAPI {
  static getAllFollow_User() {
    const url = `/api/v1/follow/get-follow-user`;
    return axiosClient.get(url);
  }
  static getUserFollowed(id) {
    const url = `/api/v1/follow/get-userbyid-followed/${id}`;
    return axiosClient.get(url);
  }
  static getUserFolloweOther(id) {
    const url = `/api/v1/follow/get-userbyid-follow-other/${id}`;
    return axiosClient.get(url);
  }

  static deleteFollowed(id) {
    const url = `/api/v1/follow/delete-follow-byid/${id}`;
    return axiosClient.delete(url);
  }
  static addFollowed(params) {
    const url = "/api/v1/follow/add-follow-other";
    return axiosClient.post(url, params);
  }
}
