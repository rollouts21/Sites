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

    if ($response && $response['ok']) {
        echo "Уведомление успешно отправлено в Telegram!";
    } else {
        echo "Ошибка при отправке уведомления в Telegram.";
    }
} else {
    echo "Некорректный запрос.";
}
?>