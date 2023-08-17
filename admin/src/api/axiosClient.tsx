import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token: string | null = null;
    try {
      const tokenJson = await localStorage.getItem("token");
      token = JSON.parse(tokenJson || null);
    } catch (e) {
      console.log(e);
    }

    if (token !== null)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);
// after send request
// làm điều gì đso sau khi respon trả về
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
