path_books = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\books-data.js"
with open(path_books, "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace(
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1529124430i/28257707.jpg",
    "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg"
)

c = c.replace(
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684949511i/40534545.jpg",
    "https://m.media-amazon.com/images/I/71tbalAHYCL._AC_UF1000,1000_QL80_.jpg"
)

with open(path_books, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated books-data.js")

path_app = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\app.js"
with open(path_app, "r", encoding="utf-8") as f:
    c2 = f.read()

c2 = c2.replace(
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1529452814i/40581403.jpg",
    "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg"
)
c2 = c2.replace(
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1529124430i/28257707.jpg",
    "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg"
)
c2 = c2.replace(
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684949511i/40534545.jpg",
    "https://m.media-amazon.com/images/I/71tbalAHYCL._AC_UF1000,1000_QL80_.jpg"
)

with open(path_app, "w", encoding="utf-8") as f:
    f.write(c2)

print("Updated app.js")
