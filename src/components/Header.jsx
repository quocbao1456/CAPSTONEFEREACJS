import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { motion } from "framer-motion";
import { FaUserCircle, FaSearch, FaSignOutAlt, FaUser, FaChevronDown } from "react-icons/fa";
import "../styles/style.scss";

function Header() {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch danh mục
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi khi load danh mục:", err);
      }

      const savedUser = localStorage.getItem("cybersoft_user");
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    fetchData();

    // Hiệu ứng header khi scroll
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/tim-kiem?tenKhoaHoc=${keyword}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("cybersoft_user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      const el = document.querySelector('.user-info');
      if (!el) return;
      if (!el.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <motion.div
        className="logo"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Link to="/">Cyber<span>Soft</span></Link>
      </motion.div>

        {/* Menu */}
        <nav className={mobileOpen ? 'open' : ''}>
      <ul className="nav-list">
    {categories.map((c) => {
      const isActive = location.pathname.includes(c.maDanhMuc);
      return (
        <li key={c.maDanhMuc} className="nav-item">
          <Link to={`/danh-muc/${c.maDanhMuc}`} className={isActive ? "active" : ""}>
            {c.tenDanhMuc}
            {isActive && (
              <motion.div
                layoutId="underline" // 👈 underline chia sẻ layoutId để di chuyển mượt
                className="nav-underline"
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              />
            )}
          </Link>
        </li>
      );
    })}
  </ul>
</nav>

      {/* Right controls: search + auth (grouped so they sit at right column) */}
      <div className="right-controls">
        <form onSubmit={handleSearch} className="search-box">
          <motion.div
            className="search-container"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              placeholder="Tìm khóa học..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </motion.div>
        </form>

        {/* User */}
        <div className="auth-btns">
          {user ? (
            <motion.div
              className="user-info"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => setDropdownOpen((s) => !s)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setDropdownOpen((s) => !s); }}
            >
              <FaUserCircle className="avatar" />
              <div className="user-menu-compact">
                <span className="name">{user.hoTen || user.taiKhoan}</span>
                <FaChevronDown className={`chev ${dropdownOpen ? 'open' : ''}`} />
              </div>
              <div className={`user-dropdown ${dropdownOpen ? 'show' : ''}`}>
                <Link to="/ho-so" onClick={() => setDropdownOpen(false)}>
                  <FaUser /> Hồ sơ
                </Link>
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Đăng xuất
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              <Link to="/dang-nhap" className="btn-auth primary">Đăng nhập</Link>
              <Link to="/dang-ky" className="btn-auth outline">Đăng ký</Link>
            </>
          )}
        </div>

        {/* Hamburger for mobile */}
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((s) => !s)}
        >
          <span className={mobileOpen ? 'open' : ''} />
        </button>
      </div>



      {/* (search + auth moved into .right-controls) */}
    </motion.header>
  );
}

export default Header;
