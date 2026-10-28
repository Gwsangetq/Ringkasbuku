# Ringkas Buku AI — Aturan Proyek & Standar Kualitas

Proyek ini adalah platform ringkasan buku berkualitas tinggi (editorial standard). Setiap pengembang atau agent AI yang bekerja pada proyek ini wajib mematuhi aturan berikut:

## 1. Standar Konten Ringkasan (Buku Umum & Upload Privat)
* Mode Lengkap harus selalu menjadi pengalaman bacaan utama (15–20 menit durasi baca nyata, 1.800–2.500+ kata per buku).
* **Dilarang Keras:** Dilarang membuat ringkasan dangkal, pendek 3-6 paragraf, atau bergaya cerpen singkat untuk SEMUA buku (baik 10 buku perpustakaan umum maupun buku yang diunggah/diminta oleh user).
* **Highlight Lengkap:** Wajib terdiri dari 5 hingga 6 babak/bagian pembahasan mendalam yang kaya secara konseptual (mengurai latar belakang filosofis/psikologis, riset ilmiah, analogi tajam, dan pemecahan masalah praktis).
* **Detail Per Bab:** Wajib memuat 5–7 bab naratif interaktif. Setiap bab memuat ringkasan utuh (1–2 paragraf narasi) dan minimal 3 poin kunci konkret.
* **Framework Interaktif:** Wajib memuat 4 pilar hukum/taktik interaktif yang dapat diklik (dengan prinsip ilmiah, taktik penerapan positif, dan taktik membalikkan untuk kebiasaan buruk).
* **Checklist Aksi:** Wajib memuat 5 butir aksi nyata 7 hari ke depan (kalimat instruksi panduan di luar checkbox, murni aksi di dalam checkbox).

## 2. Saluran Upload Privat & Request Judul Buku Baru
* Semua upload dokumen (PDF/EPUB/TXT) dan permintaan judul buku baru wajib diproses melalui modul `BookSummarizer` (`summarizer.js`).
* `BookSummarizer` secara otomatis menjamin output memenuhi 5 pilar di atas (menggunakan Gemini 1.5 Flash jika API key tersedia, atau mesin sintesis mendalam cerdas bawaan jika offline/tanpa API key).
* Dilarang menyimpan placeholder dummy 1-kalimat untuk buku privat yang diunggah.

## 3. Aturan Bisnis & Navigasi UI
* Mode pembacaan saat buku dibuka default ke Mode Lengkap.
* Progress bar live mengikuti scroll; progress tersimpan ke database selalu posisi terjauh `max(lama, baru)`.
* Jika progress sudah mencapai 100%, progress bar terkunci di 100% dan tidak berkurang saat scroll naik.
* Di perpustakaan: jika progress 100%, hanya ada satu tombol `[Baca lagi]`. Jika 1%–99%, tampil dua tombol `[Lanjutkan membaca]` dan `[Baca dari awal]`. Jika 0%, tampil satu tombol `[Mulai membaca]`.
* Di footer pembaca: tidak ada tombol ganda "Lanjutkan membaca" di akhir teks; hanya ada `[← Perpustakaan]` dan `[Baca dari awal]`.

## Anti-Slop Web Development Rules
This project follows anti-slop guidelines:
- Never generate cookie-cutter AI slop, unnecessary glowing badges, or cliché marketing copy.
- Enforce strict mobile viewport ergonomics (no horizontal overflow, thumb-friendly tap targets).
- Maintain high-contrast editorial typography and thoughtful, purposeful UI components.
- Skills available: `antislop`, `antislop-ui`, `antislop-layoutmobile`, `antislop-copywriting`, `antislop-code`, `antislop-human`.


## Design System & Taste Guidelines (DESIGN.md)
This project enforces strict adherence to [DESIGN.md](file:///C:/Users/kumala/.gemini/antigravity/scratch/ringkas-buku/DESIGN.md):
- Follow the defined color tokens: Deep Heritage Teal (#0f766e), Warm Paper Cream (#faf7f0), Ink Charcoal (#1f1b16).
- Editorial typography: Newsreader / Merriweather / Georgia serif for titles; readable line-height 1.75 for long reading.
- Mobile-first responsiveness: zero horizontal overflow, 2-column minmax(0, 1fr) book cards.
- Curated component inspiration: uiverse.io, motion-primitives.com, transitions.dev, beautifului.dev, ui-layouts.com.
- Read DESIGN.md before making any frontend or styling modifications.
