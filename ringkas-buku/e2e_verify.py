import sys
import io
import time
from playwright.sync_api import sync_playwright

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

def log(msg):
    print(msg, flush=True)

def run_e2e_tests():
    console_errors = []
    
    with sync_playwright() as p:
        log("Launching Chromium...")
        browser = p.chromium.launch(channel="chrome", headless=True)
        
        # 1. MOBILE TEST (375x812)
        log("=== TEST 1: MOBILE VIEWPORT (375x812) ===")
        context_mobile = browser.new_context(
            viewport={"width": 375, "height": 812},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1"
        )
        page_mobile = context_mobile.new_page()
        page_mobile.on("console", lambda msg: console_errors.append(f"Mobile Console [{msg.type}]: {msg.text}") if msg.type == "error" else None)
        page_mobile.on("pageerror", lambda err: console_errors.append(f"Mobile PageError: {err}"))
        
        page_mobile.goto("http://localhost:3000/?t=" + str(time.time()), wait_until="domcontentloaded", timeout=15000)
        time.sleep(1.5)
        
        # Verify horizontal scroll width
        scroll_width = page_mobile.evaluate("() => document.documentElement.scrollWidth")
        client_width = page_mobile.evaluate("() => document.documentElement.clientWidth")
        log(f"Mobile Scroll Width: {scroll_width}px (Client Width: {client_width}px)")
        assert scroll_width <= client_width, f"HORIZONTAL OVERFLOW DETECTED! scrollWidth {scroll_width} > clientWidth {client_width}"
        log("[PASS] Zero horizontal overflow on Mobile (375px)")
        
        # Verify 2-column grid in #bookGrid
        grid_cols = page_mobile.evaluate("""() => {
            const grid = document.querySelector('#bookGrid');
            if (!grid) return null;
            return window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
        }""")
        log(f"Mobile Book Grid Columns count: {grid_cols}")
        assert grid_cols == 2, f"Expected 2 columns on mobile grid, got {grid_cols}"
        log("[PASS] Book Grid correctly reflows to 2 columns on mobile")
        
        page_mobile.screenshot(path="C:/Users/kumala/.gemini/antigravity/scratch/ringkas-buku/test_mobile_catalog.png")
        
        # Open a book on mobile
        first_read_btn = page_mobile.locator(".book-grid-card .book-grid-btn").first
        first_read_btn.click()
        time.sleep(1)
        
        # Check that reader is open on mobile
        reader_visible = page_mobile.is_visible("#readerSection")
        assert reader_visible, "Reader Section should be visible after clicking read"
        log("[PASS] Mobile Reader view opens smoothly")
        
        page_mobile.screenshot(path="C:/Users/kumala/.gemini/antigravity/scratch/ringkas-buku/test_mobile_reader.png")
        context_mobile.close()
        
        # 2. DESKTOP TEST (1280x800)
        log("\n=== TEST 2: DESKTOP VIEWPORT (1280x800) ===")
        context_desktop = browser.new_context(viewport={"width": 1280, "height": 800})
        page_desktop = context_desktop.new_page()
        page_desktop.on("console", lambda msg: console_errors.append(f"Desktop Console [{msg.type}]: {msg.text}") if msg.type == "error" else None)
        page_desktop.on("pageerror", lambda err: console_errors.append(f"Desktop PageError: {err}"))
        
        page_desktop.goto("http://localhost:3000/?t=" + str(time.time()), wait_until="domcontentloaded", timeout=15000)
        time.sleep(1.5)
        
        # Open book on desktop
        page_desktop.locator(".book-grid-card .book-grid-btn").first.click()
        time.sleep(1)
        
        # Verify reader max-width constraint per DESIGN.md
        reader_width = page_desktop.evaluate("""() => {
            const el = document.querySelector('#readerSection');
            return el.getBoundingClientRect().width;
        }""")
        log(f"Desktop Reader Container Width: {reader_width}px (Target <= 820px)")
        assert reader_width <= 820, f"Reader width too wide for comfortable reading: {reader_width}px"
        log("[PASS] Desktop reading measure correctly constrained per DESIGN.md")
        
        # Test Font Sizer A+ and A-
        initial_scale = page_desktop.evaluate("() => document.getElementById('fontSizeDisplay').textContent.trim()")
        log(f"Initial Font Scale: {initial_scale}")
        
        page_desktop.click("#fontIncBtn")
        time.sleep(0.3)
        scale_after_inc = page_desktop.evaluate("() => document.getElementById('fontSizeDisplay').textContent.trim()")
        log(f"Font Scale after A+: {scale_after_inc}")
        assert "110%" in scale_after_inc or "1.1" in scale_after_inc, f"Expected 110%, got {scale_after_inc}"
        
        page_desktop.click("#fontDecBtn")
        time.sleep(0.3)
        scale_after_dec = page_desktop.evaluate("() => document.getElementById('fontSizeDisplay').textContent.trim()")
        log(f"Font Scale after A-: {scale_after_dec}")
        assert "100%" in scale_after_dec, f"Expected 100%, got {scale_after_dec}"
        log("[PASS] Font sizer A- and A+ working with dynamic scaling")
        
        # Test Sepia Theme Switcher
        page_desktop.click("button[data-theme='sepia']")
        time.sleep(0.5)
        has_sepia_class = page_desktop.evaluate("() => document.querySelector('#readerSection').classList.contains('theme-sepia')")
        assert has_sepia_class, "Reader wrapper should have theme-sepia class"
        
        # Check computed background color in sepia mode (accordion body should NOT be stark #ffffff)
        page_desktop.evaluate("""() => {
            const firstAcc = document.querySelector('.chapter-accordion-item');
            if (firstAcc) firstAcc.classList.add('open');
        }""")
        time.sleep(0.3)
        acc_body_bg = page_desktop.evaluate("""() => {
            const body = document.querySelector('.chapter-accordion-body');
            return body ? window.getComputedStyle(body).backgroundColor : null;
        }""")
        log(f"Sepia Accordion Body Background: {acc_body_bg}")
        # RGB for #f8ecce is rgb(248, 236, 206)
        assert "255, 255, 255" not in str(acc_body_bg), f"Sepia accordion body should not be pure white! Got {acc_body_bg}"
        log("[PASS] Sepia Mode colors harmonized (Warm Paper cream, not white)")
        
        # Test Interactive Checklist
        ck_item = page_desktop.locator("#checklistBox .checklist-item input[type='checkbox']").first
        if ck_item.count() > 0:
            ck_item.click()
            time.sleep(0.3)
            parent_has_checked = page_desktop.evaluate("""() => {
                const parent = document.querySelector('#checklistBox .checklist-item');
                return parent ? parent.classList.contains('checked') : false;
            }""")
            log(f"Checklist item checked state: {parent_has_checked}")
            assert parent_has_checked, "Checklist item parent should have .checked class after click"
            log("[PASS] Interactive Checklist toggle works smoothly without reload")
        
        page_desktop.screenshot(path="C:/Users/kumala/.gemini/antigravity/scratch/ringkas-buku/test_desktop_sepia_reader.png")
        context_desktop.close()
        browser.close()
        
        # 3. VERIFY CONSOLE ERRORS
        log("\n=== TEST 3: CONSOLE ERRORS CHECK ===")
        real_errors = [e for e in console_errors if "favicon" not in e.lower()]
        if real_errors:
            log(f"FAILED with {len(real_errors)} console error(s):")
            for err in real_errors:
                log(f" - {err}")
            sys.exit(1)
        else:
            log("[PASS] ZERO console errors detected on both PC and Mobile viewports!")
            log("\nALL AUTOMATED TESTS PASSED WITH 100% SUCCESS!")

if __name__ == "__main__":
    run_e2e_tests()
