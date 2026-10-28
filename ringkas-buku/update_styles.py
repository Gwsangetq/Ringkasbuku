import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

path = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\styles.css"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# Replace the dark theme block and expand sepia theme
old_sepia_block = """/* THEME: SEPIA (WARM PAPER / KINDLE STYLE) */
.reader-wrapper.theme-sepia {
  background-color: #fbf0d9 !important;
  color: #2d241e !important;
}

.reader-wrapper.theme-sepia .sticky-reader-header,
.reader-wrapper.theme-sepia .reader-ergonomics-bar,
.reader-wrapper.theme-sepia .reader-review-section,
.reader-wrapper.theme-sepia .chapter-accordion-header,
.reader-wrapper.theme-sepia .framework-card {
  background-color: #f4e8cc !important;
  border-color: #e5d5b3 !important;
  color: #2d241e !important;
}

.reader-wrapper.theme-sepia .callout-quote {
  background-color: #f2e2be !important;
  border-left-color: #b45309 !important;
  color: #3b2a1a !important;
}

/* Dark theme removed per user preference */

.reader-wrapper.theme-dark .sticky-reader-header,
.reader-wrapper.theme-dark .reader-ergonomics-bar,
.reader-wrapper.theme-dark .reader-review-section,
.reader-wrapper.theme-dark .chapter-accordion-header,
.reader-wrapper.theme-dark .framework-card,
.reader-wrapper.theme-dark .suggest-textarea {
  background-color: #1f1f1f !important;
  border-color: #333333 !important;
  color: #f5f5f5 !important;
}

.reader-wrapper.theme-dark #bookTitle,
.reader-wrapper.theme-dark .reader-block-title {
  color: #ffffff !important;
}

.reader-wrapper.theme-dark .callout-quote {
  background-color: #262626 !important;
  border-left-color: #10b981 !important;
  color: #f3f4f6 !important;
}

.reader-wrapper.theme-dark .reader-audio-bar {
  background-color: #064e3b !important;
  border-color: #047857 !important;
  color: #a7f3d0 !important;
}"""

new_sepia_block = """/* THEME: SEPIA (WARM PAPER / KINDLE STYLE — HARMONIZED ERGONOMICS) */
.reader-wrapper.theme-sepia {
  background-color: #fbf0d9 !important;
  color: #2d241e !important;
  border-color: #e5d5b3 !important;
}

.reader-wrapper.theme-sepia .sticky-reader-header,
.reader-wrapper.theme-sepia .reader-ergonomics-bar,
.reader-wrapper.theme-sepia .reader-review-section,
.reader-wrapper.theme-sepia .chapter-accordion-header,
.reader-wrapper.theme-sepia .chapter-accordion-item,
.reader-wrapper.theme-sepia .big-idea-box,
.reader-wrapper.theme-sepia .framework-detail-card,
.reader-wrapper.theme-sepia .checklist-guide-card,
.reader-wrapper.theme-sepia .framework-card {
  background-color: #f4e8cc !important;
  border-color: #e5d5b3 !important;
  color: #2d241e !important;
}

.reader-wrapper.theme-sepia .chapter-accordion-body {
  background-color: #f8ecce !important;
  border-top-color: #e5d5b3 !important;
  color: #2d241e !important;
}

.reader-wrapper.theme-sepia .chapter-points-list {
  color: #3b2a1a !important;
}

.reader-wrapper.theme-sepia .chapter-takeaway {
  background-color: #f2e2be !important;
  border-color: #dec99e !important;
  color: #3b2a1a !important;
}

.reader-wrapper.theme-sepia .checklist-item {
  background-color: #f8ecce !important;
  border-color: #e5d5b3 !important;
  color: #2d241e !important;
}

.reader-wrapper.theme-sepia .checklist-item.checked label,
.reader-wrapper.theme-sepia .checklist-item.checked span {
  color: #8c7e6c !important;
}

.reader-wrapper.theme-sepia .callout-quote {
  background-color: #f2e2be !important;
  border-left-color: #b45309 !important;
  color: #3b2a1a !important;
}

.reader-wrapper.theme-sepia .reader-audio-bar {
  background-color: #f0e2c2 !important;
  border-color: #dec99e !important;
  color: #2d241e !important;
}

.reader-wrapper.theme-sepia .audio-info strong {
  color: #2d241e !important;
}

.reader-wrapper.theme-sepia .audio-info span {
  color: #736758 !important;
}

.reader-wrapper.theme-sepia .mode-toggle-group {
  background-color: #ecdcb9 !important;
  border-color: #dec99e !important;
}

.reader-wrapper.theme-sepia .mode-toggle-btn {
  color: #574b3d !important;
}

.reader-wrapper.theme-sepia .mode-toggle-btn.active {
  background-color: #0f766e !important;
  color: #ffffff !important;
}

.reader-wrapper.theme-sepia .theme-btn,
.reader-wrapper.theme-sepia .font-btn {
  background-color: #f4e8cc !important;
  border-color: #dec99e !important;
  color: #2d241e !important;
}

.reader-wrapper.theme-sepia .theme-btn.active {
  background-color: #0f766e !important;
  color: #ffffff !important;
  border-color: #0f766e !important;
}

.reader-wrapper.theme-sepia .suggest-textarea {
  background-color: #f8ecce !important;
  border-color: #dec99e !important;
  color: #2d241e !important;
}

.reader-wrapper.theme-sepia .btn-share-copy {
  background-color: #f4e8cc !important;
  border-color: #dec99e !important;
  color: #2d241e !important;
}"""

# Normalize CRLF
c_norm = c.replace('\r\n', '\n')
old_sepia_norm = old_sepia_block.replace('\r\n', '\n')

if old_sepia_norm in c_norm:
    c_norm = c_norm.replace(old_sepia_norm, new_sepia_block)
    print("Replaced sepia block successfully")
else:
    print("Warning: old sepia block not matched exactly")

# Also ensure .checklist-item.checked label has strike-through
old_ck = """.checklist-item.checked span {
  text-decoration: line-through;
  color: #8c7e6c;
}"""
new_ck = """.checklist-item.checked label,
.checklist-item.checked span {
  text-decoration: line-through;
  color: #8c7e6c;
}"""
old_ck_norm = old_ck.replace('\r\n', '\n')
if old_ck_norm in c_norm:
    c_norm = c_norm.replace(old_ck_norm, new_ck)
    print("Updated checklist-item strike-through")

with open(path, "w", encoding="utf-8") as f:
    f.write(c_norm)

print("styles.css update completed")
