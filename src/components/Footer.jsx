import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import "../styles/style.scss";

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="footer-container">
        {/* Logo & giới thiệu */}
        <motion.div
          className="footer-section about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>
            <Link to="/" className="footer-logo">
              Cyber<span>Soft</span>
            </Link>
          </h2>
          <p>
            Nền tảng đào tạo lập trình hiện đại hàng đầu Việt Nam.  
            Cập nhật xu hướng công nghệ mới nhất, hướng đến học viên thực chiến.
          </p>
        </motion.div>

        {/* Liên kết nhanh */}
        <motion.div
          className="footer-section links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/danh-muc/FrontEnd">Lập trình Frontend</Link></li>
            <li><Link to="/danh-muc/BackEnd">Lập trình Backend</Link></li>
            <li><Link to="/danh-muc/FullStack">Full Stack</Link></li>
            <li><Link to="/ho-so">Hồ sơ của tôi</Link></li>
          </ul>
        </motion.div>

        {/* Thông tin liên hệ */}
        <motion.div
          className="footer-section contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Liên hệ</h3>
          <ul>
            <li><FaEnvelope /> contact@cybersoft.edu.vn</li>
            <li><FaPhone /> 0123 456 789</li>
          </ul>

          <div className="social-icons">
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p>© {new Date().getFullYear()} CyberSoft Academy. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
