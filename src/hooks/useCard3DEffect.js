import { useEffect } from "react";

/**
 * 🌀 Hook tạo hiệu ứng 3D chuyển động theo chuột cho các thẻ có class "course-card"
 */
export const useCard3DEffect = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".course-card");

    const handleMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    };

    const handleEnter = (card) => {
      card.style.transition = "transform 0.15s ease";
      card.style.transform = "rotate3d(1,1,0,8deg) scale(1.03)";
    };

    const handleLeave = (card) => {
      card.style.transition = "transform 0.5s ease";
      card.style.transform = "rotate3d(0,0,0,0deg) scale(1)";
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => handleMove(e, card));
      card.addEventListener("mouseenter", () => handleEnter(card));
      card.addEventListener("mouseleave", () => handleLeave(card));
    });

    // 🧹 Dọn dẹp khi component unmount
    return () => {
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true)); // Gỡ event tránh memory leak
      });
    };
  }, []);
};
