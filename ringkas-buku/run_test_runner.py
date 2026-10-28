# -*- coding: utf-8 -*-
import subprocess
import time
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# Give the page a couple of seconds to run all async assertion steps
time.sleep(1)

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--virtual-time-budget=5000",
    "--dump-dom",
    "http://127.0.0.1:3000/test_runner.html"
]

res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding="utf-8", errors="ignore")
dom = res.stdout

idx1 = dom.find('<div id="testLog"')
idx2 = dom.find('</div>', idx1)
if idx1 != -1 and idx2 != -1:
    log_content = dom[idx1:idx2]
    # Clean tags
    import re
    text = re.sub(r'<[^>]+>', '', log_content)
    print("=== TEST RUNNER OUTPUT ===")
    print(text.strip())
else:
    print("Test log container not found in DOM!")
    print("DOM length:", len(dom))

if "ALL_TESTS_PASSED_8_OF_8" in dom:
    print("\n>>> CONFIRMED: ALL_TESTS_PASSED_8_OF_8 in title! <<<")
else:
    print("\nTitle check:", [line for line in dom.splitlines() if "<title>" in line])
