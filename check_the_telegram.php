<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $comment = $_POST["comment"];

    // Telegram Bot token и chat ID
    $botToken = "7639197628:AAG3_sbUb2hs6xSoHmruMv_kteFvw2fBASk";
    $chatId = "820559840";

    // Формируем сообщение
    $message = "Новая заявка:\n";
    $message .= "Имя: " . $name . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Телефон: " . $phone . "\n";
    $message .= "Комментарий: " . $comment . "\n";

    // Отправляем сообщение в Telegram
    $url = "https://api.telegram.org/bot" . $botToken . "/sendMessage?chat_id=" . $chatId . "&text=" . urlencode($message);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);

    // Обработка ответа от Telegram API (необязательно)
    $response = json_decode($result, true);
}
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AKXMAI Studio - Дизайн, код и немного магии</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <meta name="description" content="AKXMAI Studio - профессиональные услуги по созданию сайтов и Telegram ботов. Дизайн, код и немного магии!">
    <meta name="keywords" content="создание сайтов, Telegram боты, веб-разработка, дизайн, AKXMAI Studio">
</head>

<body>
<header class="sticky-top">
    <nav>
        <div class="logo">
            <span>AKXMAI Studio</span>
        </div>
        <button class="burger-menu">
            <i class="fas fa-bars"></i>
        </button>
        <div class="nav-links">
            <a href="index.html">Главная</a>
            <a href="about.html">О нас</a>
            <a href="contacts.html">Контакты</a>
            <a href="#order" class="order-btn">Заказать сайт</a>
            <div class="theme-toggle">
                <i class="fas fa-moon"></i>
            </div>
        </div>
    </nav>
</header>

<main>
    <section class="slider">
        <div class="slide active">
            <h2>Быстрое выполнение</h2>
            <p>Мы делаем сайты быстро и качественно</p>
            <a href="#order" class="order-btn">Заказать сайт</a>
        </div>
        <div class="slide">
            <h2>Уникальный дизайн</h2>
            <p>Каждый сайт создается в индивидуальном стиле</p>
            <a href="#order" class="order-btn">Заказать сайт</a>
        </div>
        <div class="slide">
            <h2>Продвижение</h2>
            <p>Мы помогаем вашему сайту быть на вершине</p>
            <a href="#order" class="order-btn">Заказать сайт</a>
        </div>
    </section>

    <section class="projects">
        <h2>Последние проекты</h2>
        <div class="project-grid">
            <div class="project">
                <div class="project-image"></div>
                <h3>Проект 1</h3>
                <p>Описание проекта</p>
            </div>
            <div class="project">
                <div class="project-image"></div>
                <h3>Проект 2</h3>
                <p>Описание проекта</p>
            </div>
            <div class="project">
                <div class="project-image"></div>
                <h3>Проект 3</h3>
                <p>Описание проекта</p>
            </div>
        </div>
    </section>

    <section class="contact-form" id="order">
        <div class="form-wrapper">
            <h2>Оставьте заявку</h2>
            <form action="index.php" method="POST">
                <input type="text" name="name" placeholder="Имя" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="tel" name="phone" placeholder="Телефон" required>
                <input type="text" name="comment" placeholder="Комментарий">
                <div class="privacy">
                    <label>
                        <input type="checkbox" required> Согласен на обработку персональных данных и&nbsp;<a
                            href="#privacy" class="privacy-link">политику конфиденциальности</a>
                    </label>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    </section>
</main>

<footer>
    <div class="footer-content">
        <div class="footer-section about">
            <h3>AKXMAI Studio</h3>
            <p>Дизайн, код и немного магии.</p>
        </div>
        <div class="footer-section links">
            <h3>Быстрые ссылки</h3>
            <ul>
                <li><a href="index.html">Главная</a></li>
                <li><a href="about.html">О нас</a></li>
                <li><a href="contacts.html">Контакты</a></li>
                <li><a href="#order">Заказать сайт</a></li>
            </ul>
        </div>
        <div class="footer-section contact">
            <h3>Контакты</h3>
            <p>Email: info@akxmai.com</p>
            <p>Телефон: +7 (XXX) XXX-XX-XX</p>
        </div>
        <div class="footer-section newsletter">
            <h3>Подпишитесь на рассылку</h3>
            <form>
                <input type="email" placeholder="Ваш email" required>
                <button type="submit">Подписаться</button>
            </form>
        </div>
        <div class="footer-section social">
            <h3>Мы в социальных сетях</h3>
            <div class="social-links">
                <a href="#" target="_blank" aria-label="Telegram"><i class="fab fa-telegram"></i></a>
                <a href="#" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            </div>
        </div>
    </div>
    <div class="copyright">
        &copy; 2024 AKXMAI Studio. Все права защищены.
    </div>
</footer>

<!-- Всплывающие окна -->
<div class="popup" id="privacy">
    <div class="popup-content">
        <span class="close-popup">&times;</span>
        <h2>Политика конфиденциальности</h2>
        <p>Настоящая политика конфиденциальности применяется к данным, которые пользователи предоставляют при использовании
            сайта AKXMAI Studio. Мы обязуемся защищать вашу приватность и обеспечивать безопасность ваших персональных
            данных.</p>
        <p>Персональные данные, которые мы собираем:</p>
        <ul>
            <li>Имя</li>
            <li>Электронная почта</li>
            <li>Телефонный номер</li>
            <li>Время для обратной связи</li>
            <li>Любые дополнительные комментарии или информация, которую вы предоставляете добровольно</li>
        </ul>
        <p>Как мы используем ваши данные:</p>
        <ul>
            <li>Для обработки вашей заявки и предоставления запрашиваемых услуг</li>
            <li>Для связи с вами и предоставления информации о статусе вашего заказа</li>
            <li>Для отправки вам уведомлений и важных обновлений</li>
        </ul>
        <p>Мы не передаем ваши данные третьим лицам без вашего согласия, кроме случаев, предусмотренных
            законодательством Российской Федерации.</p>
        <p>Ваши права:</p>
        <ul>
            <li>Вы имеете право на доступ к своим персональным данным</li>
            <li>Вы имеете право на исправление или обновление своих данных</li>
            <li>Вы имеете право на удаление своих данных</li>
            <li>Вы имеете право отказаться от обработки данных</li>
        </ul>
        <p>Для реализации своих прав вы можете связаться с нами через указанные контактные данные.</p>
        <p>Мы принимаем все необходимые меры для защиты ваших данных от несанкционированного доступа, утечек, изменения
            или уничтожения.</p>
        <p>Сайт может использовать файлы cookie для улучшения пользовательского опыта. Используя сайт, вы соглашаетесь с
            использованием cookie.</p>
        <p>В случае изменений в политике конфиденциальности, мы опубликуем обновленную версию на этом сайте.</p>
        <p>С последними изменениями ознакомились: [Дата]</p>
        <div class="popup-controls">
            <button class="understood">Понятно</button>
        </div>
    </div>
</div>
<div class="mobile-menu">
    <div class="mobile-menu-content">
        <button class="close-mobile-menu">&times;</button>
        <a href="index.html">Главная</a>
        <a href="about.html">О нас</a>
        <a href="contacts.html">Контакты</a>
        <a href="#order" class="order-btn">Заказать сайт</a>
        <div class="theme-toggle">
            <i class="fas fa-moon"></i>
        </div>
    </div>
</div>

<script src="script.js"></script>
</body>

</html>
