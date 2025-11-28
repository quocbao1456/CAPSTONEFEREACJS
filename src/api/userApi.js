import axiosClient from "./axiosClient";

const userApi = {
  // 🔹 Lấy thông tin tài khoản
  thongTinTaiKhoan: () => {
    return axiosClient.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },

  // 🔹 Đăng ký tài khoản
  dangKy: (data) => {
    return axiosClient.post("/QuanLyNguoiDung/DangKy", data);
  },

  // 🔹 Đăng nhập tài khoản
  dangNhap: (data) => {
    return axiosClient.post("/QuanLyNguoiDung/DangNhap", data);
  },

  // 🔹 Hủy ghi danh (SỬA ĐOẠN NÀY)
  huyGhiDanh: async ({ maKhoaHoc }) => {
    const user = JSON.parse(localStorage.getItem("cybersoft_user"));
    if (!user) throw new Error("Chưa đăng nhập");

    const payload = {
      maKhoaHoc: maKhoaHoc.trim(),
      taiKhoan: user.taiKhoan.trim(),
    };

    return axiosClient.post("/QuanLyKhoaHoc/HuyGhiDanh", payload, {
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
  },
};

export default userApi;
