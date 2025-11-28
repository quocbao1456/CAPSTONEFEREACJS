import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaArrowLeft } from "react-icons/fa";
import "../styles/auth.scss";

function RegisterPage() {
  const [form, setForm] = useState({
    hoTen: "",
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "GP01",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/QuanLyNguoiDung/DangKy", form);
      toast.success("🎉 Đăng ký thành công!");
      setTimeout(() => navigate("/dang-nhap"), 1500);
    } catch {
      toast.error("❌ Tài khoản đã tồn tại hoặc dữ liệu không hợp lệ!");
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-center" />
      <Link to="/" className="back-home">
        <FaArrowLeft /> Trang chủ
      </Link>

      <div className="auth-card">
        <h1 className="brand-title">CyberSoft</h1>
        <h2>Tạo tài khoản mới</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser />
            <input name="hoTen" placeholder="Họ tên" onChange={handleChange} />
          </div>
          <div className="input-group">
            <FaUser />
            <input name="taiKhoan" placeholder="Tài khoản" onChange={handleChange} />
          </div>
          <div className="input-group">
            <FaLock />
            <input
              type="password"
              name="matKhau"
              placeholder="Mật khẩu"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaEnvelope />
            <input name="email" placeholder="Email" onChange={handleChange} />
          </div>
          <div className="input-group">
            <FaPhone />
            <input name="soDT" placeholder="Số điện thoại" onChange={handleChange} />
          </div>

          <button type="submit">Đăng ký</button>
        </form>

        <p className="auth-link">
          Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link>
        </p>
      </div>
    </motion.div>
  );
}

export default RegisterPage;
