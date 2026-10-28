import os
import zipfile

source_dir = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku"
dist_zip = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\ringkas-buku-deploy.zip"

include_files = [
    "index.html",
    "styles.css",
    "app.js",
    "books-data.js",
    "summarizer.js",
    "config.js",
    "DESIGN.md"
]

with zipfile.ZipFile(dist_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
    for filename in include_files:
        filepath = os.path.join(source_dir, filename)
        if os.path.exists(filepath):
            zipf.write(filepath, arcname=filename)
            print(f"Added {filename} ({os.path.getsize(filepath):,} bytes)")

print(f"\nBundle created: {dist_zip} ({os.path.getsize(dist_zip):,} bytes)")
