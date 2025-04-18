import http.server
import socketserver
import json
import requests
import logging
import cgi

logging.basicConfig(
    filename="/var/log/telegram_sender.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

PORT = 8000  # Порт для HTTP-сервера


class TelegramHandler(http.server.BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        logging.info("OPTIONS request handled successfully")

    def do_POST(self):
        try:
            # Установите заголовок CORS в начале обработки запроса
            self.send_header("Access-Control-Allow-Origin", "*")
            ctype, pdict = cgi.parse_header(self.headers.get("Content-Type"))
            if ctype == "application/json":
                content_length = int(self.headers.get("Content-Length"))
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode("utf-8"))

                name = data.get("name")
                email = data.get("email")
                phone = data.get("phone")
                comment = data.get("comment")

                bot_token = "7639197628:AAG3_sbUb2hs6xSoHmruMv_kteFvw2fBASk"  # Замените на токен вашего бота
                chat_id = "820559840"  # Замените на ID чата

                message = f"Новая заявка:\nИмя: {name}\nEmail: {email}\nТелефон: {phone}\nКомментарий: {comment}"
                url = f"https://api.telegram.org/bot{bot_token}/sendMessage?chat_id={chat_id}&text={message}"

                try:
                    logging.info(f"Отправка сообщения в Telegram: {url}")  # Log the URL
                    response = requests.get(url)
                    response.raise_for_status()
                    self.send_response(200)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(
                        bytes(
                            json.dumps(
                                {
                                    "status": "success",
                                    "message": "Уведомление успешно отправлено!",
                                }
                            ),
                            "utf-8",
                        )
                    )
                    logging.info("Сообщение успешно отправлено в Telegram!")

                except requests.exceptions.RequestException as e:
                    self.send_response(500)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(
                        bytes(
                            json.dumps(
                                {
                                    "status": "error",
                                    "message": f"Ошибка при отправке уведомления в Telegram: {str(e)}",
                                }
                            ),
                            "utf-8",
                        )
                    )
                    logging.error(
                        f"Ошибка при отправке уведомления в Telegram: {str(e)}"
                    )
        except Exception as e:
            logging.exception(f"Общая ошибка при обработке POST-запроса: {e}")

    def do_GET(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("Сервер работает!", "utf-8"))


# Запуск сервера
handler = TelegramHandler
with socketserver.TCPServer(("", PORT), handler) as httpd:
    print(f"Сервер запущен на порту {PORT}")
    httpd.serve_forever()
