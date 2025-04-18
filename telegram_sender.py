import http.server
import socketserver
import json
import requests
from urllib.parse import urlparse, parse_qs

PORT = 8000


class TelegramHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        content_lenght = int(self.headers["Content-Lenght"])
        post_data = self.rfile.read(content_lenght)
        data = json.loads(post_data.decode("utf-8"))

        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        comment = data.get("comment")

        bot_token = ""
        chat_id = ""

        message = (
            f"Новая заявка: {name}\nEmail {email}\nPhone {phone}\nComment {comment}"
        )
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
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("Сервер работает!", "utf-8"))


# Запуск сервера
handler = TelegramHandler
with socketserver.TCPServer(("", PORT), handler) as httpd:
    print(f"Сервер запущен на порту {PORT}")
    httpd.serve_forever()
