# Check broken keys in summarizer.js and app.js
import re

def fix_broken_keys(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for broken keys like subtitle":, principle":, goodTactic":, badTactic":
    # where there is no opening quote or identifier
    fixed = re.sub(r'(\s+)subtitle\":', r'\1subtitle:', content)
    fixed = re.sub(r'(\s+)principle\":', r'\1principle:', fixed)
    fixed = re.sub(r'(\s+)goodTactic\":', r'\1goodTactic:', fixed)
    fixed = re.sub(r'(\s+)badTactic\":', r'\1badTactic:', fixed)

    if fixed != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(fixed)
        print(f"Fixed broken keys in {filepath}")
    else:
        print(f"No broken keys in {filepath}")

fix_broken_keys(r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\summarizer.js")
fix_broken_keys(r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\app.js")
