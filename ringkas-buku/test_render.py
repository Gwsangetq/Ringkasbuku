import json

with open(r'C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\books-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('[')
end = text.rfind(']') + 1
books = json.loads(text[start:end])

print(f"Loaded {len(books)} books.")
for i, b in enumerate(books):
    try:
        title = b.get('title')
        slug = b.get('slug')
        isPublic = b.get('isPublic')
        author = b.get('author')
        pitch = b.get('pitch')
        bigIdea = b.get('bigIdea')
        appRating = b.get('appRating')
        appVerdict = b.get('appVerdict')
        # check if any required field is missing or weird
        print(f"[{i+1}] {slug} | isPublic: {isPublic} | title: {title}")
    except Exception as e:
        print(f"Error in book {i}: {e}")
