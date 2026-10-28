import re

with open(r'C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\app.js', 'r', encoding='utf-8') as f:
    app_text = f.read()

with open(r'C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\index.html', 'r', encoding='utf-8') as f:
    html_text = f.read()

# find all $("#...") or document.querySelector("#...")
queries = re.findall(r'\$\(["\']#([^"\']+)["\']\)\.([a-zA-Z0-9_]+)', app_text)
for q_id, prop in queries:
    if f'id="{q_id}"' not in html_text and f"id='{q_id}'" not in html_text:
        print(f"ERROR: $('#{q_id}').{prop} will crash because id '{q_id}' does not exist in HTML!")

print("Direct queries checked.")
