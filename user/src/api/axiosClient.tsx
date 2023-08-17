import axios, {
  AxiosResponse,
  // InternalAxiosRequestConfig,
} from "axios";
import jwtDecode from "jwt-decode";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
//tạo api refreshToken
axiosClient.defaults.withCredentials = true;
axios.defaults.withCredentials = true;
const refreshToken = async (): Promise<string | undefined> => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/user/refresh-token",
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("token", res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
axiosClient.interceptors.request.use(
  async (config) => {
    let token: any;
    try {
      let date = new Date(); // Tạo ngày giờ hiện tại kiểm tra
      token = await localStorage.getItem("token");
      const decodedToken = await jwtDecode<any>(token); // Giải mã token
      console.log(decodedToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        // Kiểm tra xem giờ hết hạn token vs giờ hiện tại nếu hết thì gọi api refresh để nhận token mới
        const data = await refreshToken();
        token = data;
      }
    } catch (e) {
      // Xử lý lỗi nếu có
    }

    if (token !== null)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
