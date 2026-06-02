document.documentElement.classList.add("reveal-ready");

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

const slides = Array.from(document.querySelectorAll(".hero-slide"));
if (slides.length > 1) {
  let activeSlide = 0;
  window.setInterval(() => {
    slides[activeSlide].classList.remove("active");
    activeSlide = (activeSlide + 1) % slides.length;
    slides[activeSlide].classList.add("active");
  }, 6500);
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 80}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const galleryGrid = document.getElementById("galleryGrid");
if (galleryGrid) {
  const galleryCategories = ["yangin", "havalandirma", "mekanik", "sihhi"];
  const galleryFiles = Array.from(
    { length: 42 },
    (_, index) => `assets/gallery/work-${String(index + 1).padStart(3, "0")}.jpg`
  );

  galleryFiles.forEach((src, index) => {
    const category = galleryCategories[index % galleryCategories.length];
    const link = document.createElement("a");
    link.className = "gallery-item reveal";
    link.href = src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.dataset.category = category;

    const image = document.createElement("img");
    image.src = src;
    image.alt = `MAG Mekanik saha uygulaması ${index + 1}`;
    image.loading = "lazy";

    link.appendChild(image);
    galleryGrid.appendChild(link);
  });

  galleryGrid.querySelectorAll(".reveal").forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 60}ms`;
    if ("IntersectionObserver" in window) {
      const galleryObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.04 }
      );
      galleryObserver.observe(item);
    } else {
      item.classList.add("in-view");
    }
  });

  document.querySelectorAll("[data-gallery-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.galleryFilter;
      document.querySelectorAll("[data-gallery-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      galleryGrid.querySelectorAll(".gallery-item").forEach((item) => {
        item.classList.toggle("hide", filter !== "all" && item.dataset.category !== filter);
      });
    });
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const note = document.getElementById("formNote");

    if (!name || !phone || !message) {
      if (note) note.textContent = "Lütfen ad soyad, telefon ve proje notu alanlarını doldurun.";
      return;
    }

    const whatsappMessage = [
      "Merhaba, magmekanik.com üzerinden bilgi almak istiyorum.",
      `Ad Soyad: ${name}`,
      `Telefon: ${phone}`,
      service ? `İlgilendiğim hizmet: ${service}` : "",
      `Proje Notu: ${message}`,
    ].filter(Boolean).join("\n");

    if (note) note.textContent = "Talebiniz WhatsApp mesajına dönüştürüldü. Göndermek için açılan ekrandan devam edin.";
    window.open(`https://wa.me/905349350100?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer");
  });
}
