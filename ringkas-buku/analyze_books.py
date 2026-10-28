import re

with open(r'C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\books-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's see how many objects in BOOKS_DATA
# Find book chunks
chunks = text.split("id: '")
print(f"Total chunks: {len(chunks)-1}")

for i, ch in enumerate(chunks[1:], 1):
    book_id = ch.split("'")[0]
    title_match = re.search(r"title:\s*['\"]([^'\"]+)['\"]", ch)
    title = title_match.group(1) if title_match else "Unknown"
    
    # count sections in highlightLengkap
    subjudul_count = len(re.findall(r"subjudul:\s*", ch))
    chapters_count = len(re.findall(r"judul:\s*", ch))
    
    # approximate word count of the chunk
    words = len(ch.split())
    print(f"[{i}] {book_id}: {title} | Words: {words} | Subjuduls: {subjudul_count} | Chapters: {chapters_count}")
