/**
 * JEHAN RADITYA - PORTFOLIO INTERACTIVITY SCRIPT
 * Modern Vanilla JavaScript (ES6+)
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Dark / Light Theme System with LocalStorage
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  // Toggle Theme
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Hamburger Menu
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      hamburgerBtn.classList.toggle("active");
      hamburgerBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close mobile menu when clicking nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !navMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target) &&
        navMenu.classList.contains("open")
      ) {
        navMenu.classList.remove("open");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Active Nav Link on Scroll (IntersectionObserver)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -60% 0px",
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 4. Typewriter Effect
  // --------------------------------------------------------------------------
  const typewriterEl = document.getElementById("typewriter");
  if (typewriterEl) {
    const words = [
      "Web Developer",
      "Front-End Enthusiast",
      "Photographer & Visual Creator",
      "Lifelong Tech Learner",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDelay = 1800;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeoutDuration = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        timeoutDuration = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeoutDuration = 400;
      }

      setTimeout(typeEffect, timeoutDuration);
    }

    typeEffect();
  }

  // --------------------------------------------------------------------------
  // 5. Scroll Reveal Animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Hanya animasikan sekali
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 6. Portfolio Category Filter
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterVal === "all" || category === filterVal) {
          card.classList.remove("hidden");
          setTimeout(() => {
            card.classList.add("active");
          }, 50);
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 7. Lightbox Modal for Project Images
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxOverlay = document.querySelector(".lightbox-overlay");
  const zoomBtns = document.querySelectorAll(".zoom-btn");

  function openLightbox(imgSrc, title, desc) {
    if (!lightboxModal) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightboxModal.classList.add("active");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // cegah background scroll
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("active");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightboxImg.src = "";
    }, 200);
  }

  zoomBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const imgSrc = btn.getAttribute("data-full");
      const title = btn.getAttribute("data-title");
      const desc = btn.getAttribute("data-desc");
      openLightbox(imgSrc, title, desc);
    });
  });

  // Also open lightbox when clicking card image wrapper
  document.querySelectorAll(".project-media-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("click", () => {
      const btn = wrapper.querySelector(".zoom-btn");
      if (btn) {
        const imgSrc = btn.getAttribute("data-full");
        const title = btn.getAttribute("data-title");
        const desc = btn.getAttribute("data-desc");
        openLightbox(imgSrc, title, desc);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      lightboxModal &&
      lightboxModal.classList.contains("active")
    ) {
      closeLightbox();
    }
  });

  // --------------------------------------------------------------------------
  // 8. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. Modern Contact Form Submission with Formspree
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");
  const formResult = document.getElementById("form-result");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic Validation
      if (!name || !email || !message) {
        showFormAlert(
          "Mohon lengkapi nama, email, dan pesan Anda sebelum mengirim.",
          "error"
        );
        return;
      }

      // Email Format Check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormAlert(
          "Format email tidak valid. Silakan periksa kembali.",
          "error"
        );
        return;
      }

      // Send to Formspree
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Mengirim Pesan...</span>`;

      try {
        const formData = new FormData(contactForm);
        const endpoint =
          contactForm.getAttribute("action") ||
          "https://formsubmit.co/ajax/Jehanraditya03@gmail.com";

        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json().catch(() => ({}));

        // Cek jika butuh aktivasi pertama kali
        if (
          data &&
          data.message &&
          (data.message.includes("Activation") ||
            data.message.includes("Activate"))
        ) {
          showFormAlert(
            `📩 <strong>Formulir membutuhkan aktivasi!</strong> Link aktivasi telah dikirim ke <em>Jehanraditya03@gmail.com</em>. Silakan buka Gmail Anda dan klik tombol <strong>"Activate Form"</strong> agar pesan otomatis masuk.`,
            "success"
          );
          contactForm.reset();
        } else if (
          response.ok &&
          (data.success === "true" ||
            data.success === true ||
            data.ok ||
            !data.errors)
        ) {
          showFormAlert(
            `🎉 Terima kasih, <strong>${name}</strong>! Pesan Anda telah berhasil terkirim ke <em>Jehanraditya03@gmail.com</em>. Kami akan segera merespons ke <em>${email}</em>.`,
            "success"
          );
          contactForm.reset();
        } else {
          if (data && data.errors && data.errors.length > 0) {
            const errMsgs = data.errors.map((err) => err.message).join(", ");
            showFormAlert(`Gagal mengirim: ${errMsgs}`, "error");
          } else {
            showFormAlert(
              "Terjadi kendala saat mengirim pesan. Silakan hubungi langsung ke Jehanraditya03@gmail.com.",
              "error"
            );
          }
        }
      } catch (error) {
        showFormAlert(
          "Gagal terhubung ke server. Pastikan koneksi internet aktif, atau kirim email langsung ke Jehanraditya03@gmail.com.",
          "error"
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  function showFormAlert(message, type) {
    if (!formResult) return;
    formResult.innerHTML = message;
    formResult.className = `form-alert ${type}`;

    setTimeout(() => {
      if (type === "success") {
        formResult.classList.remove("success");
        formResult.style.display = "none";
      }
    }, 9000);
  }
});
