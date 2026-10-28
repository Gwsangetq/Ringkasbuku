import glob
import re

for js_path in glob.glob(r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\*.js"):
    with open(js_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    for idx, line in enumerate(lines):
        # Check for unquoted word followed by quote colon, e.g. foo":
        # but ignore if preceded by quote like "foo": or 'foo':
        match = re.search(r'(?<!["\w\'-])([a-zA-Z_]\w*)\":', line)
        if match:
            print(f"Potential broken key in {js_path}:{idx+1} -> {line.strip()}")

print("Syntax check pattern scan complete.")
