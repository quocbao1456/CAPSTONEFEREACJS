import axios from "axios";

// ✅ Token Cybersoft được trung tâm cấp
const CYBERSOFT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaWlUZGUiOiIxNzc0MjI0MDAwMDAwIiwibmJmIjoxNzQ3MjQyMDAwLCJleHAiOjE3NzQzNzE2MDB9.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g";

// ✅ Tạo instance axios mặc định
const axiosClient = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api",
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: CYBERSOFT_TOKEN, // Token này luôn bắt buộc
  },
});

// ✅ Interceptor — tự động gắn token người dùng (nếu có)
axiosClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("cybersoft_user") || "null");
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Interceptor — xử lý lỗi trả về
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu token hết hạn hoặc không hợp lệ → đăng xuất
    if (error.response?.status === 401) {
      localStorage.removeItem("cybersoft_user");
      window.location.href = "/dang-nhap";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
