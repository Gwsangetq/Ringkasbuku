import re
import json

with open(r'C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\books-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('[')
end_idx = text.rfind(']') + 1
clean_json = text[start_idx:end_idx]
data = json.loads(clean_json)

print(f"TOTAL BOOKS: {len(data)}\n" + "="*80)
total_library_words = 0

for i, b in enumerate(data, 1):
    slug = b["slug"]
    title = b["title"]
    hl_count = len(b.get("highlightLengkap", []))
    ch_count = len(b.get("chapters", []))
    fw_count = len(b.get("frameworkData", []))
    ck_count = len(b.get("checklistActions", []))
    
    # Calculate word count in this book
    raw_str = json.dumps(b, ensure_ascii=False)
    words = len(raw_str.split())
    total_library_words += words
    
    # highlight words
    hl_words = sum(len(sec["body"].split()) for sec in b.get("highlightLengkap", []))
    
    print(f"[{i:2}] {slug:24} | Parts: {hl_count} ({hl_words:4} kata) | Bab: {ch_count} | Fw: {fw_count} | Ck: {ck_count} | Total Kata: {words}")

print("="*80)
print(f"TOTAL KATA DI SELURUH PERPUSTAKAAN: {total_library_words} kata")
