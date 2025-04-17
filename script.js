document.addEventListener('DOMContentLoaded', function() {
    // Смена темы
    let themeToggle = document.querySelector('.theme-toggle');
    let mobileThemeToggle = document.querySelector('.mobile-menu .theme-toggle');
    let isDarkTheme = localStorage.getItem('darkTheme') === 'true';

    // Функция для применения темы
    function applyTheme() {
        const body = document.body;
        if (isDarkTheme) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        updateThemeIcons();
    }

    // Функция для обновления иконок темы
    function updateThemeIcons() {
        themeToggle = document.querySelector('.theme-toggle');
        mobileThemeToggle = document.querySelector('.mobile-menu .theme-toggle');

        if (themeToggle) {
            themeToggle.innerHTML = isDarkTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
        if (mobileThemeToggle) {
            mobileThemeToggle.innerHTML = isDarkTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }

    // Применяем тему при загрузке страницы
    applyTheme();

    // Функция для смены темы
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        localStorage.setItem('darkTheme', isDarkTheme);
        applyTheme();
    }

    // Слушатели для смены темы
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // Popup для политики конфиденциальности
    const privacyLink = document.querySelector('.privacy-link');
    if (privacyLink) {
        const privacyPopup = document.getElementById('privacy');
        const closePopupButton = document.querySelector('.close-popup');
        const understoodButton = document.querySelector('.understood');

        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyPopup.style.display = 'flex';
        });

        closePopupButton.addEventListener('click', function() {
            privacyPopup.style.display = 'none';
        });

        understoodButton.addEventListener('click', function() {
            privacyPopup.style.display = 'none';
        });
    }
// Smooth scroll для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Слайдер (код слайдера не меняется)
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        const prevButton = document.querySelector('.slider-control.prev');
        const nextButton = document.querySelector('.slider-control.next');

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[n].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
            slider.scrollTo({
                left: slides[currentSlide].offsetLeft,
                behavior: 'smooth'
            });
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
            slider.scrollTo({
                left: slides[currentSlide].offsetLeft,
                behavior: 'smooth'
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }

        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        showSlide(currentSlide);
    }

    // Мобильное меню (код мобильного меню не меняется)
    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeMobileMenu = document.querySelector('.close-mobile-menu');

        burgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });

        closeMobileMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }

    // Получаем элементы формы и кнопки
    const form = document.getElementById('telegramForm');
    if (form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const formElements = form.querySelectorAll('input, textarea, .privacy');

        // Обработчик отправки формы
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            const formData = new FormData(form);

            fetch('check_the_telegram.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data); // Вывод ответа от сервера

                    // Скрываем элементы формы
                    formElements.forEach(element => {
                        element.style.display = 'none';
                    });

                    // Изменяем текст кнопки
                    submitButton.textContent = "Спасибо! Мы свяжемся с вами в ближайшее время";
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    // Обработка ошибки (например, отображение сообщения об ошибке)
                });
        });
    }
});