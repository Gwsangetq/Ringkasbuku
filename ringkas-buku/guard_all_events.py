import re

path = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\app.js"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
for idx, line in enumerate(lines):
    # Match patterns like $("#xyz").onclick = ... or $("#xyz").oninput = ...
    # where it is NOT already preceded by if ($("#xyz"))
    m = re.match(r'^(\s*)(\$\(["\']#[\w-]+["\']\))\.(on\w+)\s*=\s*(.*)', line)
    if m:
        indent = m.group(1)
        selector = m.group(2)
        event = m.group(3)
        rest = m.group(4)
        wrapped = f"{indent}if ({selector}) {selector}.{event} = {rest}\n"
        print(f"Guarded line {idx+1}: {selector}.{event}")
        new_lines.append(wrapped)
    else:
        new_lines.append(line)

with open(path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("All event handlers guarded successfully.")
