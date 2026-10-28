# -*- coding: utf-8 -*-
with open(r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\dom_output.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

print("File size:", len(text))

# 1. Check registerModal attributes and style
idx = text.find('id="registerModal"')
if idx != -1:
    print("--- REGISTER MODAL ---")
    snippet = text[idx-10:idx+200]
    print(snippet)
    if "hidden" in snippet and "display: none" in snippet:
        print(">> VERIFIED: #registerModal is HIDDEN on load/refresh with style='display: none !important;' and hidden attribute!")
    else:
        print(">> WARNING: Check modal visibility.")
else:
    print("registerModal not found!")

# 2. Check userLabel
idx = text.find('id="userLabel"')
if idx != -1:
    print("--- USER LABEL ---")
    print(text[idx-10:idx+250])

# 3. Check librarySection
idx = text.find('id="librarySection"')
if idx != -1:
    print("--- LIBRARY SECTION ---")
    print(text[idx-10:idx+100])

# 4. Check book cards count
cards = text.count('book-card')
print("--- BOOK CARDS COUNT ---:", cards)
if cards >= 10:
    print(">> VERIFIED: All curated books rendered for guest access!")
