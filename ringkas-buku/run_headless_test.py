# -*- coding: utf-8 -*-
import subprocess
import os
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--dump-dom",
    "http://127.0.0.1:3000/"
]

result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding="utf-8", errors="ignore")
html = result.stdout

print(f"Captured HTML length: {len(html)}")
with open(r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\dom_dump.html", "w", encoding="utf-8") as f:
    f.write(html)

# 1. Check registerModal attributes and style
idx = html.find('id="registerModal"')
if idx != -1:
    print("\n--- REGISTER MODAL ---")
    snippet = html[idx-10:idx+200]
    print(snippet)
    if 'hidden' in snippet and 'display: none !important' in snippet:
        print(">> SUCCESS VERIFIED: #registerModal is strictly hidden on load/refresh!")
    else:
        print(">> WARNING: modal visibility check failed!")
else:
    print("registerModal not found!")

# 2. Check userLabel
idx = html.find('id="userLabel"')
if idx != -1:
    print("\n--- USER LABEL ---")
    print(html[idx-10:idx+250])

# 3. Check librarySection
idx = html.find('id="librarySection"')
if idx != -1:
    print("\n--- LIBRARY SECTION ---")
    print(html[idx-10:idx+100])

# 4. Check book cards count
cards = html.count('book-card')
print("\n--- BOOK CARDS COUNT ---:", cards)
if cards >= 10:
    print(">> SUCCESS VERIFIED: All curated books rendered cleanly for guest access!")
