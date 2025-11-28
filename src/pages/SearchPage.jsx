import {useEffect, useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import '../styles/style.scss';
import {getImageUrl} from '../utils/getImageUrl';

function SearchPage () {
  const [courses, setCourses] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);

  // Lấy query từ URL
  const query = new URLSearchParams (useLocation ().search);
  const keyword = query.get ('tenKhoaHoc') || '';

  useEffect (
    () => {
      const fetchCourses = async () => {
        setLoading (true);
        try {
          const url = keyword
            ? `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyword}&MaNhom=GP01`
            : `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`;
          const res = await axiosClient.get (url);
          setCourses (res.data);
          setError (null);
        } catch (err) {
          console.error ('Lỗi khi tải danh sách:', err);
          setError ('Không thể tải danh sách khóa học.');
        } finally {
          setLoading (false);
        }
      };

      fetchCourses ();
    },
    [keyword]
  );

  if (loading) return <p style={{padding: '40px'}}>Đang tải kết quả...</p>;
  if (error) return <p style={{padding: '40px'}}>{error}</p>;

  return (
    <div className="search-page">
      <h2>
        Kết quả tìm kiếm cho: <em>{keyword || 'Tất cả khóa học'}</em>
      </h2>

      {courses.length === 0
        ? <p>Không tìm thấy khóa học nào phù hợp.</p>
        : <div className="course-list">
            {courses.map (c => (
              <div key={c.maKhoaHoc} className="course-card">
                <img
                  src={getImageUrl (c.hinhAnh)}
                  alt={c.tenKhoaHoc}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = getImageUrl (null);
                  }}
                />
                <h4>{c.tenKhoaHoc}</h4>
                <p>{c.moTa}</p>
                <Link to={`/khoa-hoc/${c.maKhoaHoc}`} className="btn-detail">
                  Xem chi tiết
                </Link>
              </div>
            ))}
          </div>}
    </div>
  );
}

export default SearchPage;
