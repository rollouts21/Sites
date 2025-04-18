document.addEventListener("DOMContentLoaded", function () {
  // Смена темы
  let themeToggle = document.querySelector(".theme-toggle");
  let mobileThemeToggle = document.querySelector(".mobile-menu .theme-toggle");
  let isDarkTheme = localStorage.getItem("darkTheme") === "true";

  // Функция для применения темы
  function applyTheme() {
    const body = document.body;
    if (isDarkTheme) {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
    updateThemeIcons();
  }

  // Функция для обновления иконок темы
  function updateThemeIcons() {
    themeToggle = document.querySelector(".theme-toggle");
    mobileThemeToggle = document.querySelector(".mobile-menu .theme-toggle");

    if (themeToggle) {
      themeToggle.innerHTML = isDarkTheme
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
    if (mobileThemeToggle) {
      mobileThemeToggle.innerHTML = isDarkTheme
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
  }

  // Применяем тему при загрузке страницы
  applyTheme();

  // Функция для смены темы
  function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    localStorage.setItem("darkTheme", isDarkTheme);
    applyTheme();
  }

  // Слушатели для смены темы
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", toggleTheme);
  }

  // Popup для политики конфиденциальности
  const privacyLink = document.querySelector(".privacy-link");
  if (privacyLink) {
    const privacyPopup = document.getElementById("privacy");
    const closePopupButton = document.querySelector(".close-button");
    const understoodButton = document.querySelector(".understood");

    privacyLink.addEventListener("click", function (e) {
      e.preventDefault();
      privacyPopup.style.display = "flex";
    });

    closePopupButton.addEventListener("click", function () {
      privacyPopup.style.display = "none";
    });

    understoodButton.addEventListener("click", function () {
      privacyPopup.style.display = "none";
    });
  }

  // Smooth scroll для навигации
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
  // Слайдер (код слайдера не меняется)
  const slider = document.querySelector(".slider");
  if (slider) {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    const prevButton = document.querySelector(".slider-control.prev");
    const nextButton = document.querySelector(".slider-control.next");

    function showSlide(n) {
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[n].classList.add("active");
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      slider.scrollTo({
        left: slides[currentSlide].offsetLeft,
        behavior: "smooth",
      });
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
      slider.scrollTo({
        left: slides[currentSlide].offsetLeft,
        behavior: "smooth",
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", prevSlide);
    }

    if (nextButton) {
      nextButton.addEventListener("click", nextSlide);
    }

    showSlide(currentSlide);
  }

  // Мобильное меню (код мобильного меню не меняется)
  const burgerMenu = document.querySelector(".burger-menu");
  if (burgerMenu) {
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeMobileMenu = document.querySelector(".close-mobile-menu");

    burgerMenu.addEventListener("click", function () {
      mobileMenu.classList.add("active");
    });

    closeMobileMenu.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
    });
  }

  // Получаем элементы формы и кнопки
  const form = document.getElementById("telegramForm");
  if (form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const formElements = form.querySelectorAll("input, textarea, .privacy");

    // Обработчик отправки формы
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Предотвращаем стандартную отправку формы

      const formData = new FormData(form);
      const jsonData = JSON.stringify(Object.fromEntries(formData));
      // Функция для отправки запроса
      const sendRequest = async () => {
        try {
          const response = await fetch("https://api.akxmai.ru", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://akxmai.ru",
            },
            body: jsonData,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Success:", data);
          // Проверяем, что ответ содержит ожидаемые данные
          if (data && data.status === "success") {
            formElements.forEach((element) => {
              element.style.display = "none";
            });
            submitButton.textContent =
              "Спасибо, мы свяжемся с вами в ближайшее время";
          } else {
            console.error("Ошибка: Неверный ответ от сервера:", data);
            // Обработка ошибки (например, отображение сообщения об ошибке)
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      sendRequest();
    });
  }
});
