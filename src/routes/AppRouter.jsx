import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import SearchPage from "../pages/SearchPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import ProfilePage from "../pages/ProfilePage";

// 🧩 Component bọc để thêm hiệu ứng mỗi khi đổi route
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* ⬇ Đây là nơi thêm đoạn motion.div này ⬇ */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="page-transition"
      >
        {/*  Routes nằm bên trong motion.div  */}
        <Routes location={location}>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/danh-muc/:maDanhMuc" element={<CategoryPage />} />
            <Route path="/tim-kiem" element={<SearchPage />} />
            <Route path="/khoa-hoc/:maKhoaHoc" element={<CourseDetailPage />} />
            <Route path="/ho-so" element={<ProfilePage />} />
          </Route>

          {/* Auth */}
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function AppRouter() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default AppRouter;
