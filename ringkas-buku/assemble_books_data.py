# assemble_books_data.py
import json

import build_books # has books[0] (atomic habits)
import data_psychology_of_money
import data_deep_work
import data_bodo_amat
import data_rich_dad
import data_mindset
import data_power_of_habit
import data_thinking_fast
import data_eat_that_frog
import data_ikigai

all_books = [
    build_books.books[0], # Atomic Habits
    data_psychology_of_money.book,
    data_deep_work.book,
    data_bodo_amat.book,
    data_rich_dad.book,
    data_mindset.book,
    data_power_of_habit.book,
    data_thinking_fast.book,
    data_eat_that_frog.book,
    data_ikigai.book
]

print(f"Total books gathered: {len(all_books)}")

# Format into clean JavaScript
js_content = "// 10 Buku Viral Perpustakaan Ringkasan — Standar Mutlak Kualitas Tinggi (15-20 Menit Nyata & Bab Naratif)\n\n"
js_content += "const SEED_BOOKS = " + json.dumps(all_books, ensure_ascii=False, indent=2) + ";\n"

output_path = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\books-data.js"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully written to {output_path}")
