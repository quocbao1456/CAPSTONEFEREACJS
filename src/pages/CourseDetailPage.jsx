import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { motion } from "framer-motion";
import {
  toast,
  ToastContainer,
  Slide,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/style.scss";
import { getImageUrl } from "../utils/getImageUrl";

function CourseDetailPage() {
  const { maKhoaHoc } = useParams();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch dữ liệu khóa học
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get(
          `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
        );
        setCourse(res.data);

        const savedUser = localStorage.getItem("cybersoft_user");
        if (savedUser) {
          const u = JSON.parse(savedUser);
          setUser(u);

          const enrolledRes = await axiosClient.post(
            "/QuanLyNguoiDung/ThongTinTaiKhoan",
            null,
            { headers: { Authorization: `Bearer ${u.accessToken}` } }
          );
          const found = enrolledRes.data.chiTietKhoaHocGhiDanh.some(
            (kh) => kh.maKhoaHoc === maKhoaHoc
          );
          setIsEnrolled(found);
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết khóa học:", err);
      }
    };
    fetchData();
  }, [maKhoaHoc]);

  // Toast config
  const toastConfig = {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    theme: "colored",
  };

  // Ghi danh
  const handleEnroll = async () => {
    if (!user) {
      toast.warning("⚠️ Vui lòng đăng nhập để ghi danh!", toastConfig);
      return;
    }

    setLoading(true);
    try {
      await axiosClient.post("/QuanLyKhoaHoc/DangKyKhoaHoc", {
        maKhoaHoc,
        taiKhoan: user.taiKhoan,
      });

      toast.success("🎉 Ghi danh thành công!", toastConfig);
      setIsEnrolled(true);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("❌ Ghi danh thất bại! Vui lòng thử lại.", toastConfig);
    } finally {
      setLoading(false);
    }
  };

  // Hủy ghi danh
  const handleCancel = async () => {
    setLoading(true);
    try {
      await axiosClient.post("/QuanLyKhoaHoc/HuyGhiDanh", {
        maKhoaHoc,
        taiKhoan: user.taiKhoan,
      });

      toast.info("🚫 Hủy ghi danh thành công!", toastConfig);
      setIsEnrolled(false);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("⚠️ Hủy ghi danh thất bại!", toastConfig);
    } finally {
      setLoading(false);
    }
  };

  if (!course)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <img
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="loading"
          width="60"
        />
        <p>Đang tải khóa học...</p>
      </div>
    );

  return (
    <motion.div
      className="course-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />

      <div className="detail-header">
        <img
          src={getImageUrl(course.hinhAnh)}
          alt={course.tenKhoaHoc}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getImageUrl(null);
          }}
        />
        <div className="info">
          <h2>{course.tenKhoaHoc}</h2>
          <p>
            <strong>Mô tả:</strong> {course.moTa}
          </p>
          <p>
            <strong>Người tạo:</strong> {course.nguoiTao?.hoTen}
          </p>

          {
            user ? (
              isEnrolled ? (
                <button
                  className="btn-cancel"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Hủy ghi danh"}
                </button>
              ) : (
                <button
                  className="btn-enroll"
                  onClick={handleEnroll}
                  disabled={loading}
                >
                  {loading ? "Đang ghi danh..." : "Ghi danh ngay"}
                </button>
              )
            ) : (
              <button
                className="btn-enroll"
                onClick={() => navigate('/dang-nhap')}
              >
                Đăng nhập để ghi danh
              </button>
            )
          }
        </div>
      </div>
    </motion.div>
  );
}

export default CourseDetailPage;
