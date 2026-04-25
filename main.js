const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => menu.classList.toggle("open"));
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const slides = Array.from(document.querySelectorAll(".hero-slide"));
if (slides.length > 1) {
  let activeIndex = 0;
  setInterval(() => {
    slides[activeIndex].classList.remove("active");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add("active");
  }, 6000);
}

const galleryGrid = document.getElementById("galleryGrid");
if (galleryGrid) {
  const galleryFiles = Array.from(
    { length: 42 },
    (_, i) => `assets/gallery/work-${String(i + 1).padStart(3, "0")}.jpg`
  );

  galleryFiles.forEach((src, index) => {
    const link = document.createElement("a");
    link.href = src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `MAG Mekanik referans görseli ${index + 1}`;
    img.loading = "lazy";

    link.appendChild(img);
    galleryGrid.appendChild(link);
  });
}
