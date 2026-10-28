// Konfigurasi Supabase
const SUPABASE_CONFIG = {
  url: "https://jjncqueqkiuenqruyuso.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbmNxdWVxa2l1ZW5xcnV5dXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5OTkxMzAsImV4cCI6MjEwODU3NTEzMH0.p5OKj4nsj-PHvKPlWw4L-t2kQ2e8AKL8BPkIUPl2z1Q"
};

// Inisialisasi Supabase Client jika library dimuat
let supabaseClient = null;
if (window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}

// Konfigurasi Standar Ringkasan AI (book-summary-engine)
// Menjamin setiap upload buku baru otomatis menghasilkan bacaan 15-20 menit nyata
const AI_CONFIG = {
  // Model yang digunakan jika API Key tersedia
  model: "gemini-1.5-flash",
  getApiKey: () => localStorage.getItem("rb_gemini_api_key") || "",
  setApiKey: (key) => localStorage.setItem("rb_gemini_api_key", key),
  
  // Standar Mutlak Prompt Editorial (Kualitas Tinggi)
  standardRules: {
    minHighlightParts: 5,
    maxHighlightParts: 6,
    minChapters: 5,
    maxChapters: 7,
    readingMinutes: "15-20 menit nyata",
    language: "Bahasa Indonesia Editorial & Mengalir (Bukan Cerpen Singkat)"
  },

  // Prompt Sistem untuk LLM
  systemPrompt: `Anda adalah Mesin Ringkasan Buku AI Berbobot Tinggi (Editorial Book Summary Engine).
Tugas Anda adalah merangkum dokumen atau buku yang diberikan menjadi karya ringkasan mendalam dengan durasi baca 15–20 menit nyata.

ATURAN MUTLAK KUALITAS:
1. DILARANG KERAS membuat ringkasan pendek 3-6 paragraf atau bergaya cerpen singkat!
2. 'highlightLengkap' WAJIB memuat 5 hingga 6 babak/bagian konseptual yang luas dan mendalam (tiap bagian terdiri dari 250-400 kata Bahasa Indonesia yang kaya analisis, analogi tajam, studi kasus pendukung, dan solusi taktis).
3. 'chapters' WAJIB memuat 5 hingga 7 bab naratif. Setiap bab memiliki ringkasan utuh (1-2 paragraf) dan minimal 3 poin kunci konkret.
4. 'frameworkData' WAJIB memuat 4 pilar hukum/taktik interaktif (masing-masing memiliki principle, goodTactic, badTactic).
5. 'checklistActions' WAJIB memuat 5 aksi nyata spesifik untuk 7 hari ke depan (tanpa kalimat instruksi di dalam itemnya).
6. Format output WAJIB murni JSON valid sesuai skema yang diminta tanpa pembungkus markdown tambahan.`
};
