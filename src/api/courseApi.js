import axiosClient from "./axiosClient";

const GROUP_ID = "GP01";

const courseApi = {
  // Lấy danh sách tất cả khóa học
  getAllCourses() {
    return axiosClient.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${GROUP_ID}`);
  },

  // Lấy thông tin chi tiết khóa học
  getCourseDetail(maKhoaHoc) {
    return axiosClient.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
  },

  // Đăng ký khóa học (cần đăng nhập)
  dangKyKhoaHoc(data) {
    return axiosClient.post("/QuanLyKhoaHoc/DangKyKhoaHoc", data);
  },

  // Hủy ghi danh khóa học
  huyGhiDanh(data) {
    return axiosClient.post("/QuanLyKhoaHoc/HuyGhiDanh", data);
  },
};

export default courseApi;
