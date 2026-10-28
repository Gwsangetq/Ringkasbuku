import json

with open(r'C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\books-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('[')
end = text.rfind(']') + 1
books = json.loads(text[start:end])

# Let's inspect all fields of each book
for idx, b in enumerate(books):
    slug = b['slug']
    title = b['title']
    author = b.get('author', 'Penulis')
    cat = b.get('category', 'Pengembangan Diri')
    pitch = b.get('pitch', '')
    bigIdea = b.get('bigIdea', '')
    appRating = b.get('appRating', '4,8/5')
    appVerdict = b.get('appVerdict', '')
    
    # Check if anything is None
    print(f"Book {idx}: {slug} | title: {title[:20]} | appVerdict: {appVerdict}")
