from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    page = b.new_page()
    page.on("response", lambda res: print("RESPONSE:", res.status, res.url) if res.status >= 400 else None)
    page.goto("http://localhost:3000/", wait_until="domcontentloaded")
    page.wait_for_timeout(2000)
    b.close()
