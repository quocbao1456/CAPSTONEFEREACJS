import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import "../styles/auth.scss";

function LoginPage() {
  const [form, setForm] = useState({ taiKhoan: "", matKhau: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/QuanLyNguoiDung/DangNhap", form);
      localStorage.setItem("cybersoft_user", JSON.stringify(res.data));
      toast.success("🎉 Đăng nhập thành công!");
      setTimeout(() => navigate("/"), 1200);
    } catch {
      toast.error("❌ Sai tài khoản hoặc mật khẩu!");
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
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="brand-title">CyberSoft</h1>
          <h2>Đăng nhập tài khoản</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser />
              <input
                name="taiKhoan"
                type="text"
                placeholder="Tài khoản"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <FaLock />
              <input
                name="matKhau"
                type="password"
                placeholder="Mật khẩu"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Đăng nhập</button>
          </form>

          <p className="auth-link">
            Chưa có tài khoản? <Link to="/dang-ky">Đăng ký ngay</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
