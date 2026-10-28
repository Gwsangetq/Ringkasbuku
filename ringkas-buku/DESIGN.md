---
name: "RingkasBuku Editorial Design System"
version: "1.0.0"
style: "Literary Editorial & Warm Kindle Modernism"
colors:
  primary: "#0f766e"          # Deep Heritage Teal
  primary-hover: "#0d655e"    # Dark Teal
  primary-light: "#f0fdfa"    # Soft Mint Tint
  background: "#faf7f0"       # Warm Cream / Natural Paper (Never harsh #fff)
  surface: "#ffffff"          # Clean Book Paper Card
  surface-sepia: "#fbf7ee"    # Warm Sepia Kindle Paper
  text-main: "#1f1b16"        # Deep Charcoal Ink (WCAG AAA)
  text-muted: "#736758"       # Warm Slate Muted
  text-subtle: "#a89f91"      # Subtle Caption
  border-light: "#e8e1d1"     # Subtle Book Edge Border
  border-pill: "#e0d7c3"      # Pill Outline
  accent-gold: "#d97706"      # Deep Amber Gold (Book Awards / Stars)
  accent-gold-bg: "#fef3c7"   # Warm Gold Highlight
  purple-quote: "#7c3aed"     # Editorial Pull Quote Accent
  danger: "#dc2626"           # Error / Alert
typography:
  font-display: "Newsreader, Merriweather, Georgia, serif"
  font-sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  font-mono: "ui-monospace, 'SFMono-Regular', Menlo, Monaco, monospace"
  line-height-body: 1.75
  line-height-heading: 1.25
  max-measure: "68ch"
spacing:
  unit: "4px"
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  xxl: "40px"
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "22px"
  full: "9999px"
shadows:
  subtle: "0 2px 8px rgba(31, 27, 22, 0.04)"
  card: "0 4px 16px rgba(31, 27, 22, 0.06)"
  modal: "0 25px 60px rgba(15, 23, 42, 0.25)"
---

# RingkasBuku — Design Guidelines & Taste Standards (DESIGN.md)

> "Desain yang hebat terasa seperti dirancang dengan penuh kesadaran oleh desainer manusia, bukan cetakan generik kecerdasan buatan."

Dokumen ini adalah acuan baku (*source of truth*) seluruh keputusan visual, antarmuka (UI), tipografi, palet warna, dan tata letak untuk **RingkasBuku**. Setiap perubahan antarmuka, penambahan fitur, atau pembuatan komponen baru **wajib** mematuhi aturan di bawah ini.

---

## 1. Visual Personality & Filosofi Desain
- **Karakter Utama:** *Literary Editorial, Warm, Sophisticated, and Thoughtful*.
- **Referensi Visual:** Buku fisik terbitan *Stripe Press*, majalah sastra *The Paris Review*, dan ergonomi membaca hangat *Kindle Oasis Paperwhite*.
- **Anti-Slop Guarantee:** 
  - Tidak ada gradien ungu-neon murahan ala template AI SaaS 2023.
  - Tidak ada bayangan melayang berlebihan (*excessive glowing drop-shadows*).
  - Tidak ada badge emoji berkilau (✨) di sembarang tempat.
  - Tidak ada background putih klinis yang menyilaukan mata pembaca di malam hari.

---

## 2. Palet Warna & Hierarki Warna
- **Latar Belakang (`background: #faf7f0`):** Selalu gunakan warna krem kertas hangat alami. Warna ini mereduksi ketegangan mata saat membaca intisari buku 15–20 menit.
- **Kartu & Permukaan (`surface: #ffffff`):** Gunakan putih murni dengan bingkai halus `1px solid var(--border-light)`.
- **Warna Aksen Utama (`primary: #0f766e`):** Hijau teal elegan warisan pustaka untuk tombol tindakan utama, progress bar, dan status aktif.
- **Tinta Teks (`text-main: #1f1b16`):** Tinta arang gelap dengan rasio kontras tinggi di atas latar krem (memenuhi standar WCAG AAA).

---

## 3. Tipografi Editorial
- **Judul & Headline:** Wajib menggunakan tipografi Serif berwibawa (`Newsreader`, `Merriweather`, `Georgia`). Letter spacing dibuat rapat (`-0.02em`) untuk kesan editorial cetak.
- **Teks Narasi Buku (Isi Ringkasan):** 
  - Line-height longgar (`1.75` hingga `1.8`) agar baris bacaan tidak bertumpuk di mata pembaca.
  - Lebar bacaan maksimal dibatasi (`max-width: 68ch`) untuk mencegah mata lelah melintasi layar yang terlalu lebar.
  - Mendukung skala dinamis via pengatur ukuran huruf A- / A+ (`--reader-scale`).
- **Antarmuka & Tombol (UI Elements):** Gunakan sans-serif modern yang tajam dan bersih dengan `font-weight: 600` agar label terbaca jelas dalam ukuran kecil.

---

## 4. Standar Tata Letak Mobile-First
- **Zero Horizontal Overflow:** Seluruh halaman, kontainer filter, dan baris kategori wajib memiliki perlindungan `overflow-x: hidden` di tingkat halaman, dan `overflow-x: auto` dengan scrollbar tak kasat mata di tingkat baris filter.
- **Grid Buku di Layar HP:** Wajib menggunakan `repeat(2, minmax(0, 1fr))` dengan gap proporsional (10–12px) agar 2 kartu buku tertata rapi tanpa terpotong di tepi kanan layar HP.
- **Zona Sentuhan Jari (*Touch Target*):** Tombol tindakan penting di HP memiliki tinggi minimal 42px agar mudah ditekan ibu jari.

---

## 5. Komponen Buku & Sampul
- **Rasio Sampul Buku:** Pertahankan rasio emas buku standar (2:3 / aspect-ratio: 2 / 3).
- **Sampul Buku Kustom (SVG Jacket):** Jika pengguna mengunggah buku tanpa file cover resmi, otomatis buat jaket buku elegan berbasis SVG dengan gradien kaya (Zamrud, Midnight Blue, Burgundy) berbingkai foil emas dan tipografi klasik, bukan sekadar kotak placeholder kosong.

---

## 6. Perpustakaan Referensi & UI Inspirasi
Untuk memperkaya interaksi dan komponen web di masa mendatang, rujuk perpustakaan terkurasi berikut (dari kurasi Miqdad Badjuber):
- **UI Library & Components:** [uiverse.io](https://uiverse.io) | [beautifului.dev](https://beautifului.dev) | [motion-primitives.com](https://motion-primitives.com) | [transitions.dev](https://transitions.dev) | [ui-layouts.com](https://ui-layouts.com)
- **Background & Gradient Generators:** [neat.firecms.co](https://neat.firecms.co) | [feralui.dev/gradients](https://feralui.dev/gradients) | [patterncraft.store](https://patterncraft.store)
- **Design Spec Generators:** [designmd.co](https://www.designmd.co) | [context.dev/free-tools/design-md-generator](https://www.context.dev/free-tools/design-md-generator)

---

## 7. Do's and Don'ts (Prinsip Mutlak)
- ✅ **DO:** Pertahankan nuansa buku cetak fisik yang hangat, tenang, dan berbobot.
- ✅ **DO:** Pastikan setiap tombol memiliki status hover dan active yang jelas dan responsif.
- ✅ **DO:** Selalu jalankan uji otomatis di layar HP (375px) sebelum menyerahkan hasil kode.
- ❌ **DON'T:** Jangan gunakan gradien neon ungu-pink bergaya AI murahan.
- ❌ **DON'T:** Jangan membuat teks abu-abu pucat yang sulit dibaca di bawah sinar matahari.
- ❌ **DON'T:** Jangan biarkan elemen apa pun meluap keluar batas lebar layar di HP.
