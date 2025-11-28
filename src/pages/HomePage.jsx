import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import '../styles/style.scss';
import {motion, AnimatePresence} from 'framer-motion';
import ReactPaginate from 'react-paginate';
import {useCard3DEffect} from '../hooks/useCard3DEffect';
import {getImageUrl} from '../utils/getImageUrl';

function HomePage () {
  const [courses, setCourses] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [currentPage, setCurrentPage] = useState (0);
  const [pageReady, setPageReady] = useState (true);

  const itemsPerPage = 6;

  useEffect (() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosClient.get (
          '/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01'
        );
        setCourses (res.data);
      } catch (err) {
        console.error ('Lỗi khi tải danh sách khóa học:', err);
      } finally {
        setLoading (false);
      }
    };

    fetchCourses ();
  }, []);
  useCard3DEffect ();

  const offset = currentPage * itemsPerPage;
  const currentCourses = courses.slice (offset, offset + itemsPerPage);
  const pageCount = Math.ceil (courses.length / itemsPerPage);

  const handlePageClick = event => {
    if (event.selected === currentPage) return; // tránh click lại trang hiện tại

    setPageReady (false); // tạm tắt render để tránh lag
    setTimeout (() => {
      setCurrentPage (event.selected);
      setPageReady (true);
      window.scrollTo ({top: 0, behavior: 'smooth'});
    }, 100);
  };

  if (loading)
    return (
      <div style={{textAlign: 'center', padding: '50px'}}>
        <img
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="loading"
          width="60"
        />
        <p>Đang tải khóa học...</p>
      </div>
    );

  return (
    <div className="home-page">
      {/* 🟢 Banner */}
      <section className="banner">
        <div className="banner-content">
          <h1>
            Học Lập Trình Cùng <span>CyberSoft</span>
          </h1>
          <p>Khóa học chất lượng, cập nhật xu hướng công nghệ mới nhất</p>
          <Link to="/tim-kiem?tenKhoaHoc=" className="btn-start">
            Khám phá khóa học
          </Link>
        </div>
      </section>

      {/* 🟢 Danh sách khóa học */}
      <section className="course-section">
        <h2>Khóa học nổi bật</h2>

        <AnimatePresence mode="wait">
          {pageReady &&
            <motion.div
              key={currentPage} // buộc re-render mỗi lần đổi trang
              className="course-list"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.4}}
            >
              {currentCourses.map ((c, i) => (
                <motion.div
                  key={c.maKhoaHoc}
                  className="course-card"
                  initial={{opacity: 0, y: 30}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: i * 0.05}}
                >
                  <img
                    src={getImageUrl (c.hinhAnh)}
                    alt={c.tenKhoaHoc}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = getImageUrl (null);
                    }}
                  />

                  <div className="card-info">
                    <h4>{c.tenKhoaHoc}</h4>
                    <p>{c.moTa}</p>
                    <Link
                      to={`/khoa-hoc/${c.maKhoaHoc}`}
                      className="btn-detail"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>}
        </AnimatePresence>

        {/* 🟢 Phân trang */}
        <ReactPaginate
          previousLabel={'«'}
          nextLabel={'»'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          forcePage={currentPage}
        />
      </section>
    </div>
  );
}

export default HomePage;
