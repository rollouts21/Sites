import http.server
import socketserver
import json
import requests
from urllib.parse import urlparse, parse_qs

PORT = 8000  # Порт для HTTP-сервера


class TelegramHandler(http.server.BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        content_length = int(self.headers["Content-Length"])
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

        except requests.exceptions.RequestException as e:
            self.send_response(500)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(
                bytes(
                    json.dumps({"status": "error", "message": f"Ошибка: {str(e)}"}),
                    "utf-8",
                )
            )

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
