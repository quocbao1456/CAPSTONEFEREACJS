// ✅ src/utils/getImageUrl.js
export const getImageUrl = img => {
  // Nếu không có hình thì trả về ảnh mặc định
  if (!img) return '/no-image.svg';

  // Nếu đã là đường dẫn đầy đủ thì giữ nguyên
  if (img.startsWith ('http')) return img;

  // ✅ Base URL đúng là "hinhanh" (không phải "hinh-anh")
  return `https://elearningnew.cybersoft.edu.vn/hinhAnh/${img}`;
};
