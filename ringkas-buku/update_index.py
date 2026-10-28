import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

path = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\index.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

target = '<link rel="stylesheet" href="styles.css?v=19">'
replacement = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&display=swap" rel="stylesheet">\n'
    '<link rel="stylesheet" href="styles.css?v=20">'
)

if target in c:
    c = c.replace(target, replacement)
c = c.replace('config.js?v=19', 'config.js?v=20')
c = c.replace('books-data.js?v=19', 'books-data.js?v=20')
c = c.replace('summarizer.js?v=19', 'summarizer.js?v=20')
c = c.replace('app.js?v=19', 'app.js?v=20')

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated index.html successfully")
