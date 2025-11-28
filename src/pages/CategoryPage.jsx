import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import ReactPaginate from 'react-paginate';
import {motion, AnimatePresence} from 'framer-motion';
import '../styles/style.scss';
import {getImageUrl} from '../utils/getImageUrl';

function CategoryPage () {
  const {maDanhMuc} = useParams ();
  const [courses, setCourses] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [currentPage, setCurrentPage] = useState (0);
  const [pageReady, setPageReady] = useState (true);

  const itemsPerPage = 6;

  // 🧩 Lấy danh sách khóa học theo danh mục
  useEffect (
    () => {
      const fetchCourses = async () => {
        try {
          setLoading (true);
          const res = await axiosClient.get (
            `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`
          );
          setCourses (res.data);
          setCurrentPage (0); // ✅ reset về trang đầu khi đổi danh mục
        } catch (err) {
          console.error ('Lỗi khi tải khóa học:', err);
        } finally {
          setLoading (false);
        }
      };

      fetchCourses ();
    },
    [maDanhMuc]
  );

  // 🧩 Tính toán phân trang
  const offset = currentPage * itemsPerPage;
  const currentCourses = courses.slice (offset, offset + itemsPerPage);
  const pageCount = Math.ceil (courses.length / itemsPerPage);

  // 🧩 Xử lý đổi trang
  const handlePageClick = event => {
    if (event.selected === currentPage) return; // tránh reload lại trang hiện tại

    // Dừng render animation cũ, mượt hơn
    setPageReady (false);
    setTimeout (() => {
      setCurrentPage (event.selected);
      setPageReady (true);
      window.scrollTo ({top: 0, behavior: 'smooth'});
    }, 100);
  };

  // 🧩 Hiển thị loading
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
    <div className="category-page" style={{padding: '40px'}}>
      <h2>Khóa học thuộc danh mục: {maDanhMuc}</h2>

      {/* Hiệu ứng mượt khi đổi trang */}
      <AnimatePresence mode="wait">
        {pageReady &&
          <motion.div
            key={currentPage} // buộc re-render khi đổi trang
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
                  <Link to={`/khoa-hoc/${c.maKhoaHoc}`} className="btn-detail">
                    Xem chi tiết
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>}
      </AnimatePresence>

      {/* ✅ Phân trang */}
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
    </div>
  );
}

export default CategoryPage;
