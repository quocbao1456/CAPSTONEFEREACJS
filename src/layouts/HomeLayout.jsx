import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "20px" }}>
        <Outlet />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
};

export default HomeLayout;
