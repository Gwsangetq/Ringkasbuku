import re
import urllib.request

path = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\books-data.js"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

urls = re.findall(r'"coverUrl":\s*"([^"]+)"', c)
print(f"Total covers found: {len(urls)}")

for i, u in enumerate(urls):
    req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            print(f"[{i+1}] {resp.status} - {u[:50]}")
    except Exception as e:
        print(f"[{i+1}] ERR: {e} - {u}")
