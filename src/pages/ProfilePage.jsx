import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaBook,
  FaCog,
} from "react-icons/fa";
import "../styles/profile.scss";
import { getImageUrl } from "../utils/getImageUrl";
import { toast } from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";




function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [confirmModal, setConfirmModal] = useState({ show: false, course: null });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await userApi.thongTinTaiKhoan();
        setUserInfo(res.data);
      } catch {
        alert("Vui lòng đăng nhập lại!");
      }
    };
    fetchInfo();
  }, []);

  if (!userInfo)
    return (
      <div className="profile-loading">
        <img
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="loading"
          width="60"
        />
        <p>Đang tải thông tin học viên...</p>
      </div>
    );

  // animation chung cho các tab
  const tabMotion = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };



  
  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="profile-banner">
        <h2>Hồ sơ học viên</h2>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <FaUserCircle className="avatar" />
            <h3>{userInfo.hoTen}</h3>
            <p className="username">@{userInfo.taiKhoan}</p>
          </div>

          {/* Tabs */}
          <div className="profile-tabs">
            <button
              className={activeTab === "info" ? "active" : ""}
              onClick={() => setActiveTab("info")}
            >
              Thông tin cá nhân
            </button>
            <button
              className={activeTab === "courses" ? "active" : ""}
              onClick={() => setActiveTab("courses")}
            >
              Khóa học
            </button>
            <button
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => setActiveTab("settings")}
            >
              Cài đặt
            </button>
          </div>

          {/* Nội dung từng tab */}
          <AnimatePresence mode="wait">
            {activeTab === "info" && (
              <motion.div
                key="info"
                variants={tabMotion}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="tab-content"
              >
                <h4>Thông tin cá nhân</h4>
                <ul>
                  <li>
                    <FaEnvelope /> {userInfo.email}
                  </li>
                  <li>
                    <FaPhone /> {userInfo.soDT}
                  </li>
                  <li>
                    <FaIdBadge /> Nhóm: {userInfo.maNhom}
                  </li>
                </ul>
              </motion.div>
            )}

            {activeTab === "courses" && (
              <motion.div
                key="courses"
                variants={tabMotion}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="tab-content"
              >
                <h4>Khóa học đã ghi danh</h4>
                {userInfo.chiTietKhoaHocGhiDanh.length === 0 ? (
                  <p>Bạn chưa ghi danh khóa học nào.</p>
                ) : (
                  <div className="course-grid">
                    {userInfo.chiTietKhoaHocGhiDanh.map((kh, i) => (
  <motion.div
    key={kh.maKhoaHoc}
    className="course-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  >
    <img
      src={getImageUrl(kh.hinhAnh)}
      alt={kh.tenKhoaHoc}
      className="course-image"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = getImageUrl(null);
      }}
    />
    <div className="card-info">
      <h5>{kh.tenKhoaHoc}</h5>
      <p>
        <FaBook /> Giảng viên: {kh.nguoiTao?.hoTen || "CyberSoft"}
      </p>
      <div className="card-actions">
        <a href={`/khoa-hoc/${kh.maKhoaHoc}`} className="btn btn-detail">
          Xem chi tiết
        </a>
        <button
  className="btn btn-cancel"
  onClick={() =>
    setConfirmModal({ show: true, course: kh })
  }
>
  Hủy ghi danh
</button>

      </div>
    </div>
  </motion.div>
))}

                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "settings" && (
  <motion.div
    key="settings"
    variants={tabMotion}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="tab-content settings-tab"
  >
    <h4>Cài đặt tài khoản</h4>
    <p>Cập nhật thông tin cá nhân của bạn tại đây.</p>

    <motion.form
      className="settings-form"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("🎉 Cập nhật thông tin thành công!");
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="input-group">
        <FaUserCircle />
        <input
          type="text"
          placeholder="Họ tên"
          defaultValue={userInfo.hoTen}
        />
      </div>

      <div className="input-group">
        <FaEnvelope />
        <input
          type="email"
          placeholder="Email"
          defaultValue={userInfo.email}
        />
      </div>

      <div className="input-group">
        <FaPhone />
        <input
          type="text"
          placeholder="Số điện thoại"
          defaultValue={userInfo.soDT}
        />
      </div>

      <div className="input-group">
        <FaIdBadge />
        <input
          type="password"
          placeholder="Mật khẩu mới (tuỳ chọn)"
        />
      </div>

      <button type="submit">Lưu thay đổi</button>
    </motion.form>
  </motion.div>
)}

          </AnimatePresence>
        </div>
      </div>
      <ConfirmModal
  show={confirmModal.show}
  message={`Bạn có chắc muốn hủy ghi danh khóa học "${confirmModal.course?.tenKhoaHoc}" không?`}
  onConfirm={async () => {
    if (!confirmModal.course) return;
    try {
      await userApi.huyGhiDanh({ maKhoaHoc: confirmModal.course.maKhoaHoc });
      toast.success("✅ Đã hủy ghi danh thành công!");
      setUserInfo((prev) => ({
        ...prev,
        chiTietKhoaHocGhiDanh: prev.chiTietKhoaHocGhiDanh.filter(
          (kh) => kh.maKhoaHoc !== confirmModal.course.maKhoaHoc
        ),
      }));
    } catch {
      toast.error("❌ Hủy ghi danh thất bại. Vui lòng thử lại!");
    } finally {
      setConfirmModal({ show: false, course: null });
    }
  }}
  onCancel={() => setConfirmModal({ show: false, course: null })}
/>

    </motion.div>
  );
}

export default ProfilePage;
