import http.server
import socketserver
import os
import sys
import json
import re
import urllib.parse

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
USER_DATA_DIR = os.path.join(DIRECTORY, "user_data")
os.makedirs(USER_DATA_DIR, exist_ok=True)

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path.startswith("/log_error"):
            print(">>> BROWSER ERROR:", self.path, flush=True)
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"OK")
            return

        if self.path.startswith("/api/sync_books"):
            parsed = urllib.parse.urlparse(self.path)
            params = urllib.parse.parse_qs(parsed.query)
            email = params.get("email", [""])[0].strip()
            books = []
            if email:
                safe_email = re.sub(r'[^a-zA-Z0-9_.-]', '_', email)
                file_path = os.path.join(USER_DATA_DIR, f"books_{safe_email}.json")
                if os.path.exists(file_path):
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            books = json.load(f)
                    except Exception as e:
                        print("Error reading sync books:", e, flush=True)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(books, ensure_ascii=False).encode("utf-8"))
            return

        super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/sync_books"):
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode("utf-8"))
                email = data.get("email", "").strip()
                books = data.get("books", [])
                if email:
                    safe_email = re.sub(r'[^a-zA-Z0-9_.-]', '_', email)
                    file_path = os.path.join(USER_DATA_DIR, f"books_{safe_email}.json")
                    with open(file_path, "w", encoding="utf-8") as f:
                        json.dump(books, f, ensure_ascii=False, indent=2)
                    print(f">>> [SYNC] Saved {len(books)} books for {email}", flush=True)

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(b'{"status": "ok"}')
            except Exception as e:
                print("Error saving sync books:", e, flush=True)
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        super().do_POST()

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

# Bind to 0.0.0.0 agar bisa diakses oleh HP yang satu jaringan Wi-Fi
if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Server aktif! Buka dari HP di: http://192.168.169.101:{PORT}", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
