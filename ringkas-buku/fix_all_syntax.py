import re
import glob

# 1. Fix app.js
app_path = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\app.js"
with open(app_path, "r", encoding="utf-8") as f:
    app_content = f.read()

# Remove dangling HTML block in app.js
bad_block = '''    <article class="book-card" style="border-top-color: var(--teal);">
      <h3>${b.title}</h3>
      <p class="book-card-author">Buku privat  hanya kamu yang bisa mengakses</p>
      <button class="btn-primary" onclick="openBook('${b.slug}')">Buka Ringkasan</button>
    </article>
  `).join("");
}'''

if bad_block in app_content:
    app_content = app_content.replace(bad_block, "")
    print("Removed bad HTML block from app.js")
else:
    # Try regex if exact match fails due to line endings
    pattern = r'\n\s*<article class="book-card" style="border-top-color: var\(--teal\);">.*?\n\s*\}\n'
    sub_res, count = re.subn(pattern, "\n", app_content, flags=re.DOTALL)
    if count > 0:
        app_content = sub_res
        print(f"Removed bad HTML block from app.js using regex (count: {count})")
    else:
        print("Warning: bad HTML block not found in app.js")

# Fix broken keys in all JS files
for js_path in glob.glob(r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\*.js"):
    with open(js_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace broken keys
    fixed = re.sub(r'(\s+)subtitle\":', r'\1subtitle:', content)
    fixed = re.sub(r'(\s+)principle\":', r'\1principle:', fixed)
    fixed = re.sub(r'(\s+)goodTactic\":', r'\1goodTactic:', fixed)
    fixed = re.sub(r'(\s+)badTactic\":', r'\1badTactic:', fixed)

    if fixed != content or js_path == app_path:
        with open(js_path, "w", encoding="utf-8") as f:
            f.write(fixed if js_path != app_path else re.sub(r'(\s+)subtitle\":', r'\1subtitle:', 
                   re.sub(r'(\s+)principle\":', r'\1principle:', 
                   re.sub(r'(\s+)goodTactic\":', r'\1goodTactic:', 
                   re.sub(r'(\s+)badTactic\":', r'\1badTactic:', app_content)))))
        print(f"Updated {js_path}")

print("Fix completed.")
