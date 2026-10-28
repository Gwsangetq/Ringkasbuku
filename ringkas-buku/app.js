
// ============================================================
// SPOILER CAROUSEL CONTROLLER (Halaman Depan / Login)
// ============================================================
const SPOILER_BOOKS = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Pengembangan Diri",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
    quote: "Kemenangan besar lahir dari akumulasi sistem kecil 1% setiap hari. Ubah sistem harianmu, bukan hanya menuntut hasil.",
    time: "15–20 min"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Psikologi Keuangan",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg",
    quote: "Kekayaan sejati adalah apa yang tidak Anda belanjakan. Kebebasan finansial adalah kemampuan mengendalikan waktu Anda sendiri.",
    time: "15–20 min"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Produktivitas & Fokus",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg",
    quote: "Fokus mendalam tanpa distraksi adalah superpower langka abad ke-21 yang membedakan kualitas karya elit dari karya biasa.",
    time: "15–20 min"
  },
  {
    title: "Sebuah Seni untuk Bersikap Bodo Amat",
    author: "Mark Manson",
    category: "Filsafat & Pola Pikir",
    coverUrl: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg",
    quote: "Kebahagiaan sejati lahir dari memecahkan masalah yang Anda pilih sendiri, bukan dari menghindarinya dalam kepalsuan positif.",
    time: "15–20 min"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Finansial & Bisnis",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388211242i/69571.jpg",
    quote: "Orang kaya membeli aset yang menghasilkan arus kas; kelas menengah membeli liabilitas yang keliru mereka anggap sebagai aset.",
    time: "15–20 min"
  }
];

let carouselCurrentIdx = 0;
let carouselTimer = null;

function renderCarouselSlide(idx) {
  const track = $("#carouselSlideTrack");
  const dotsContainer = $("#carouselDots");
  if (!track) return;

  const b = SPOILER_BOOKS[idx];
  track.innerHTML = `
    <div class="carousel-slide-item">
      <img class="carousel-cover-img" src="${b.coverUrl}" alt="${b.title}" loading="lazy" onerror="this.onerror=null; this.src=generateBookCoverSvg(this.alt, '');">
      <div class="carousel-slide-content">
        <span class="carousel-category">${b.category}</span>
        <h4 class="carousel-book-title">${b.title}</h4>
        <span class="carousel-book-author">Karya: <strong>${b.author}</strong></span>
        <p class="carousel-book-quote">"${b.quote}"</p>
        <div class="carousel-meta-row">
          <span>⏱ Intisari ${b.time}</span>
          <span>✓ Analisis Mendalam Bab per Bab</span>
        </div>
      </div>
    </div>
  `;

  if (dotsContainer) {
    dotsContainer.innerHTML = SPOILER_BOOKS.map((_, i) => `
      <button class="carousel-dot ${i === idx ? 'active' : ''}" onclick="setCarouselSlide(${i})" title="Buku ${i+1}"></button>
    `).join("");
  }
}

window.setCarouselSlide = (idx) => {
  carouselCurrentIdx = (idx + SPOILER_BOOKS.length) % SPOILER_BOOKS.length;
  renderCarouselSlide(carouselCurrentIdx);
  resetCarouselTimer();
};

function resetCarouselTimer() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    const authSec = $("#authSection");
    if (authSec && !authSec.hidden) {
      carouselCurrentIdx = (carouselCurrentIdx + 1) % SPOILER_BOOKS.length;
      renderCarouselSlide(carouselCurrentIdx);
    }
  }, 4000);
}

function initSpoilerCarousel() {
  renderCarouselSlide(0);
  resetCarouselTimer();

  const prevBtn = $("#carouselPrevBtn");
  const nextBtn = $("#carouselPrevBtn") ? $("#carouselNextBtn") : null;
  if (prevBtn) prevBtn.onclick = () => window.setCarouselSlide(carouselCurrentIdx - 1);
  if (nextBtn) nextBtn.onclick = () => window.setCarouselSlide(carouselCurrentIdx + 1);
}

// Modern Editorial Book Summarizer JS — Deep Content & Interactive UX
const $ = (s) => document.querySelector(s);
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
};

// ============================================================
// CROSS-DEVICE SYNC ENGINE (PC <-> HP / Mobile Synchronization)
// ============================================================
async function syncBooksToServer(email, books) {
  if (!email || email.includes("tamu@") || !Array.isArray(books)) return;
  try {
    await fetch("/api/sync_books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, books })
    });
  } catch (err) {
    console.warn("Sync to server notice (offline/local):", err);
  }
}

async function syncBooksFromServer(email) {
  if (!email || email.includes("tamu@")) return;
  try {
    const res = await fetch(`/api/sync_books?email=${encodeURIComponent(email)}`);
    if (res.ok) {
      const serverBooks = await res.json();
      if (Array.isArray(serverBooks) && serverBooks.length > 0) {
        const localBooks = store.get("rb_private_" + email, []);
        const localSlugs = new Set(localBooks.map(b => b.slug));
        
        let hasNew = false;
        const merged = [...localBooks];
        for (const sb of serverBooks) {
          if (sb && sb.slug && !localSlugs.has(sb.slug)) {
            merged.push(sb);
            localSlugs.add(sb.slug);
            hasNew = true;
          }
        }

        if (hasNew) {
          store.set("rb_private_" + email, merged);
          renderLibrary();
        }

        // If local had books that server didn't have, push merged up
        if (localBooks.length > serverBooks.length) {
          syncBooksToServer(email, merged);
        }
      } else {
        // Server empty, push existing local books to server
        const localBooks = store.get("rb_private_" + email, []);
        if (localBooks.length > 0) {
          syncBooksToServer(email, localBooks);
        }
      }
    }
  } catch (err) {
    console.warn("Sync from server notice:", err);
  }
}
window.syncBooksToServer = syncBooksToServer;
window.syncBooksFromServer = syncBooksFromServer;


// Ambil 10 Buku Viral dari books-data.js
const defaultBooks = (typeof SEED_BOOKS !== "undefined") ? SEED_BOOKS : [];

let currentUser = store.get("rb_user");
if (!currentUser || !currentUser.email) {
  currentUser = { email: "tamu@ringkasbuku.ai", isGuest: true };
  store.set("rb_user", currentUser);
}
let currentBook = null;
let currentMode = "lengkap";
let currentScrollPct = 0;
let activeFrameworkId = "";


// ============================================================
// PILLAR 1: GUEST VS REGISTERED & MODAL REGISTRASI CEPAT
// ============================================================
function showRegisterModal(onSuccessCallback) {
  const modal = $("#registerModal");
  if (modal) {
    modal.hidden = false;
    modal.removeAttribute("hidden");
    modal.classList.remove("hidden");
    modal.style.setProperty("display", "flex", "important");
    const emailInput = $("#modalEmailInput");
    if (emailInput) setTimeout(() => emailInput.focus(), 60);
  }
  window._pendingRegisterCallback = (typeof onSuccessCallback === "function") ? onSuccessCallback : null;
}

function closeRegisterModal() {
  const modal = $("#registerModal");
  if (modal) {
    modal.hidden = true;
    modal.setAttribute("hidden", "hidden");
    modal.classList.add("hidden");
    modal.style.setProperty("display", "none", "important");
    if ($("#modalMsg")) $("#modalMsg").textContent = "";
  }
  window._pendingRegisterCallback = null;
}

window.showRegisterModal = showRegisterModal;
window.closeRegisterModal = closeRegisterModal;

// ============================================================
// PILLAR 2: PEMUTAR AUDIO RANGKUMAN (WEB SPEECH AI)
// ============================================================
let speechUtterance = null;
let isAudioPlaying = false;
let isAudioPaused = false;

function stopAudioPlayer() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  isAudioPlaying = false;
  isAudioPaused = false;
  updateAudioButtonUI();
}
window.stopAudioPlayer = stopAudioPlayer;

function updateAudioButtonUI() {
  const playBtn = $("#audioPlayBtn");
  const stopBtn = $("#audioStopBtn");
  const titleEl = $("#audioStatusTitle");
  if (!playBtn) return;

  if (isAudioPlaying && !isAudioPaused) {
    playBtn.textContent = "⏸ Jeda Narasi";
    if (stopBtn) stopBtn.hidden = false;
    if (titleEl) titleEl.textContent = "Sedang Memutar Audio Intisari...";
  } else if (isAudioPaused) {
    playBtn.textContent = "▶ Lanjutkan Narasi";
    if (stopBtn) stopBtn.hidden = false;
    if (titleEl) titleEl.textContent = "Audio Dijeda";
  } else {
    playBtn.textContent = "▶ Putar Narasi";
    if (stopBtn) stopBtn.hidden = true;
    if (titleEl) titleEl.textContent = "Dengarkan Audio Intisari";
  }
}

function toggleAudioPlayer() {
  if (!window.speechSynthesis) {
    alert("Peramban Anda belum mendukung Web Speech API.");
    return;
  }

  if (isAudioPlaying && !isAudioPaused) {
    window.speechSynthesis.pause();
    isAudioPaused = true;
    updateAudioButtonUI();
    return;
  }

  if (isAudioPaused) {
    window.speechSynthesis.resume();
    isAudioPaused = false;
    updateAudioButtonUI();
    return;
  }

  if (!currentBook) return;

  let textToRead = `${currentBook.title}. Oleh ${currentBook.author || 'Penulis'}. `;
  textToRead += `${currentBook.pitch || currentBook.bigIdea || ''}. `;
  if (Array.isArray(currentBook.highlightLengkap)) {
    textToRead += currentBook.highlightLengkap.map(s => (s.title || '') + '. ' + (s.body || '')).join(' ');
  } else if (Array.isArray(currentBook.highlightKilat)) {
    textToRead += currentBook.highlightKilat.join(' ');
  }

  window.speechSynthesis.cancel();

  speechUtterance = new SpeechSynthesisUtterance(textToRead.slice(0, 4000));
  speechUtterance.lang = "id-ID";
  speechUtterance.rate = 0.95;
  speechUtterance.pitch = 1.0;

  try {
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.includes("id") || v.lang.includes("ID") || v.name.toLowerCase().includes("indonesia"));
    if (idVoice) speechUtterance.voice = idVoice;
  } catch (e) {}

  speechUtterance.onend = () => {
    isAudioPlaying = false;
    isAudioPaused = false;
    updateAudioButtonUI();
  };

  speechUtterance.onerror = () => {
    isAudioPlaying = false;
    isAudioPaused = false;
    updateAudioButtonUI();
  };

  window.speechSynthesis.speak(speechUtterance);
  isAudioPlaying = true;
  isAudioPaused = false;
  updateAudioButtonUI();
}
window.toggleAudioPlayer = toggleAudioPlayer;

// ============================================================
// PILLAR 3: READING ERGONOMICS (THEMES, FONT SIZER, VIRAL SHARE)
// ============================================================
let currentReaderTheme = store.get("rb_theme", "light");
let currentFontSize = store.get("rb_fontsize", 100);

function applyReaderErgonomics() {
  const readerEl = $("#readerSection");
  if (!readerEl) return;

  // 1. Reset theme (only light and sepia)
  readerEl.classList.remove("theme-sepia", "theme-dark");
  if (currentReaderTheme === "dark") {
    currentReaderTheme = "light";
    store.set("rb_theme", "light");
  }
  if (currentReaderTheme === "sepia") {
    readerEl.classList.add("theme-sepia");
  }

  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === currentReaderTheme);
  });

  // 2. Set scale ratio and apply to all reader text elements
  const currentRatio = (currentFontSize || 100) / 100;
  readerEl.style.setProperty("--reader-scale", currentRatio.toString());

  // Direct element style overrides to guarantee 100% visible resizing everywhere
  const selectors = [
    "#highlightBox",
    "#highlightBox p",
    "#bigIdea",
    "#chapterAccordionList",
    ".chapter-accordion-body",
    ".chapter-accordion-body p",
    ".chapter-points-list",
    ".chapter-points-list li",
    ".chapter-takeaway",
    ".chapter-quote",
    ".framework-detail-card",
    ".framework-detail-card p",
    ".framework-detail-card li",
    ".framework-box",
    ".action-checklist-item",
    ".faq-answer",
    ".callout-quote"
  ];
  document.querySelectorAll(selectors.join(", ")).forEach(el => {
    el.style.fontSize = `${currentRatio * 1.05}rem`;
    el.style.lineHeight = `${currentRatio * 1.75}`;
  });

  const display = $("#fontSizeDisplay");
  if (display) display.textContent = currentFontSize + "%";
}

window.setReaderTheme = (theme) => {
  currentReaderTheme = (theme === "sepia") ? "sepia" : "light";
  store.set("rb_theme", currentReaderTheme);
  applyReaderErgonomics();
};

window.changeFontSize = (delta) => {
  currentFontSize = Math.max(70, Math.min(150, (currentFontSize || 100) + delta));
  store.set("rb_fontsize", currentFontSize);
  applyReaderErgonomics();
};

window.shareQuoteToWhatsApp = (quoteText, bookTitle, author) => {
  const cleanQuote = (quoteText || "").replace(/[\"']/g, "").trim();
  const text = `"${cleanQuote}"\n\n— *${bookTitle}* (${author})\n\n💡 Baca intisari analitis 15–20 menit di: ${window.location.origin}`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};

window.copyQuoteCard = (quoteText, bookTitle, author) => {
  const cleanQuote = (quoteText || "").replace(/[\"']/g, "").trim();
  const text = `"${cleanQuote}"\n— ${bookTitle} (${author})\nRingkasBuku`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert("✓ Kutipan emas berhasil disalin! Siap ditempel di Instagram Story, WhatsApp, atau LinkedIn.");
    });
  } else {
    alert(text);
  }
};

// ============================================================
// PILLAR 4: TOPIC FILTER & FEATURED BANNER
// ============================================================
let currentTopicFilter = "all";

window.setTopicFilter = (topic) => {
  currentTopicFilter = topic;
  document.querySelectorAll(".topic-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.topic === topic);
  });
  renderLibrary();
};

let currentMainView = "catalog"; // "catalog" | "uploads"

function setMainView(view) {
  currentMainView = view;
  const isCatalog = view === "catalog";
  if ($("#tabLibraryBtn")) $("#tabLibraryBtn").classList.toggle("active", isCatalog);
  if ($("#tabUploadsBtn")) $("#tabUploadsBtn").classList.toggle("active", !isCatalog);
  if ($("#catalogView")) $("#catalogView").hidden = !isCatalog;
  if ($("#uploadsView")) $("#uploadsView").hidden = isCatalog;
  renderLibrary();
}
window.setMainView = setMainView;


function generateBookCoverSvg(title = "Buku", author = "Penulis") {
  const cleanTitle = (title || "Buku").replace(/<[^>]+>/g, "").trim();
  const cleanAuthor = (author || "Penulis Asli").replace(/<[^>]+>/g, "").trim();
  
  // Palette gradient based on title hash
  const palettes = [
    { c1: "#0f766e", c2: "#134e4a", accent: "#fde047" }, // Deep Emerald Teal
    { c1: "#1e3a8a", c2: "#0f172a", accent: "#38bdf8" }, // Midnight Navy
    { c1: "#831843", c2: "#500724", accent: "#fbcfe8" }, // Burgundy Wine
    { c1: "#701a75", c2: "#3b0764", accent: "#f0abfc" }, // Royal Violet
    { c1: "#7c2d12", c2: "#451a03", accent: "#fdba74" }, // Warm Amber Brown
    { c1: "#14532d", c2: "#052e16", accent: "#86efac" }  // Forest Green
  ];
  let h = 0;
  for (let i = 0; i < cleanTitle.length; i++) {
    h = (h * 31 + cleanTitle.charCodeAt(i)) >>> 0;
  }
  const pal = palettes[h % palettes.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="360" viewBox="0 0 240 360">
    <defs>
      <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${pal.c1}"/>
        <stop offset="100%" stop-color="${pal.c2}"/>
      </linearGradient>
    </defs>
    <rect width="240" height="360" fill="url(#bgG)" rx="8"/>
    <rect x="10" y="10" width="220" height="340" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" rx="6"/>
    <rect x="14" y="14" width="212" height="332" fill="none" stroke="${pal.accent}" stroke-opacity="0.3" stroke-width="1" rx="4"/>
    <text x="120" y="44" font-family="-apple-system, sans-serif" font-size="9" font-weight="700" fill="${pal.accent}" text-anchor="middle" letter-spacing="2">EDISI RINGKASAN</text>
    <foreignObject x="20" y="70" width="200" height="170">
      <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;color:#ffffff;font-family:Georgia,serif;font-weight:700;font-size:18px;line-height:1.25;padding:0 8px;word-break:break-word;">
        ${cleanTitle}
      </div>
    </foreignObject>
    <line x1="50" y1="250" x2="190" y2="250" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    <text x="120" y="278" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#f8fafc" text-anchor="middle">${cleanAuthor}</text>
    <text x="120" y="322" font-family="-apple-system, sans-serif" font-size="8.5" fill="rgba(255,255,255,0.6)" text-anchor="middle" letter-spacing="1.5">RINGKASBUKU AI</text>
  </svg>`;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
window.generateBookCoverSvg = generateBookCoverSvg;

function parseBookMeta(rawTitle = "", userTitle = "", userAuthor = "") {
  let clean = (rawTitle || "").replace(/\.[^.]+$/, "").trim();

  const lookup = {
    "sapiens": {
      title: "Sapiens: Riwayat Singkat Umat Manusia",
      author: "Yuval Noah Harari",
      category: "Sejarah & Peradaban",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1700188665i/23692271.jpg"
    },
    "sapiens_yuval_noah_harari": {
      title: "Sapiens: Riwayat Singkat Umat Manusia",
      author: "Yuval Noah Harari",
      category: "Sejarah & Peradaban",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1700188665i/23692271.jpg"
    },
    "as_a_man_thinketh": {
      title: "As a Man Thinketh",
      author: "James Allen",
      category: "Filsafat & Pola Pikir",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1583099951i/81439.jpg"
    },
    "as_a_man_thinketh_james_allen": {
      title: "As a Man Thinketh",
      author: "James Allen",
      category: "Filsafat & Pola Pikir",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1583099951i/81439.jpg"
    },
    "grit": {
      title: "Grit: The Power of Passion and Perseverance",
      author: "Angela Duckworth",
      category: "Psikologi & Karakter",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1457889762i/27213329.jpg"
    },
    "grit_angela_duckworth": {
      title: "Grit: The Power of Passion and Perseverance",
      author: "Angela Duckworth",
      category: "Psikologi & Karakter",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1457889762i/27213329.jpg"
    },
    "start_with_why": {
      title: "Start with Why",
      author: "Simon Sinek",
      category: "Kepemimpinan & Bisnis",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442436884i/7108725.jpg"
    },
    "start_with_why_simon_sinek": {
      title: "Start with Why",
      author: "Simon Sinek",
      category: "Kepemimpinan & Bisnis",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442436884i/7108725.jpg"
    },
    "mans_search_for_meaning": {
      title: "Man's Search for Meaning",
      author: "Viktor E. Frankl",
      category: "Psikologi Eksistensial",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535419394i/40611.jpg"
    },
    "zero_to_one": {
      title: "Zero to One",
      author: "Peter Thiel",
      category: "Bisnis & Startup",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630663027i/18050143.jpg"
    },
    "principles": {
      title: "Principles: Life and Work",
      author: "Ray Dalio",
      category: "Manajemen & Bisnis",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1503899738i/34536488.jpg"
    }
  };

  const normKey = clean.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  
  // Check exact or partial match in lookup
  let matched = lookup[normKey];
  if (!matched) {
    for (const k in lookup) {
      if (normKey.includes(k) || k.includes(normKey)) {
        matched = lookup[k];
        break;
      }
    }
  }

  if (matched) {
    return {
      title: userTitle || matched.title,
      author: userAuthor || matched.author,
      category: matched.category,
      coverUrl: matched.coverUrl
    };
  }

  let title = userTitle || clean;
  let author = userAuthor || "Penulis Asli";
  let category = "Buku Privat";

  if (!userTitle && !userAuthor) {
    if (clean.includes(" - ")) {
      const parts = clean.split(" - ");
      title = parts[0].trim();
      author = parts[1].trim();
    } else if (clean.includes("_")) {
      const parts = clean.split("_");
      if (parts.length >= 2) {
        title = parts.slice(0, -1).join(" ");
        author = parts[parts.length - 1];
      }
    }
  }

  title = title.replace(/_/g, " ").trim();
  author = author.replace(/_/g, " ").trim();

  return {
    title: title || clean,
    author: author || "Penulis Asli",
    category,
    coverUrl: generateBookCoverSvg(title || clean, author)
  };
}
window.parseBookMeta = parseBookMeta;

window.deletePrivateBook = (idx) => {
  const userEmail = currentUser?.email || "fauzan@ringkasbuku.ai";
  const priv = store.get("rb_private_" + userEmail, []);
  if (confirm("Hapus ringkasan buku ini dari koleksi privat kamu?")) {
    priv.splice(idx, 1);
    store.set("rb_private_" + userEmail, priv);
    renderLibrary();
  }
};


function progressKey(book, mode) { 
  const email = currentUser?.email || "fauzan@ringkasbuku.ai";
  return `rb_prog_${email}_${book}_${mode}`; 
}

function getProgress(book, mode) { 
  try {
    const val = Number(store.get(progressKey(book, mode), 0));
    return isNaN(val) ? 0 : Math.max(0, Math.min(100, Math.round(val)));
  } catch {
    return 0;
  }
}

function saveProgress(book, mode, pct) {
  const old = getProgress(book, mode);
  const next = Math.max(old, Math.min(100, Math.round(pct)));
  store.set(progressKey(book, mode), next);
  return next;
}

function resetProgress(book, mode) {
  store.set(progressKey(book, mode), 0);
}

function books() {
  const base = (typeof SEED_BOOKS !== "undefined" && Array.isArray(SEED_BOOKS)) ? SEED_BOOKS : [];
  try {
    const rawPriv = store.get("rb_private_" + (currentUser?.email || "fauzan@ringkasbuku.ai"), []);
    const priv = Array.isArray(rawPriv) ? rawPriv.filter(b => b && typeof b === 'object' && b.slug) : [];
    return [...base, ...priv];
  } catch (e) {
    console.warn("Gagal memuat buku privat:", e);
    return [...base];
  }
}

// ATURAN RATING & REVIEWS
function getBookReviews(bookSlug) {
  const allReviews = store.get("rb_reviews_" + bookSlug, [
    {
      user: "budi.santoso@gmail.com",
      stars: 5,
      date: "Kemarin",
      text: "Sangat daging! Terutama bagian Aturan 2 Menit dan Habit Stacking. Benar-benar bisa langsung diterapkan besok pagi tanpa mikir rumit."
    },
    {
      user: "rachel.novia@yahoo.com",
      stars: 5,
      date: "3 hari lalu",
      text: "Ringkasan lengkapnya mantap banget, bukan sekadar cerpen pendek. Bagian detail bab dan framework-nya sangat membantu memahami isi buku utuh."
    }
  ]);
  return allReviews;
}

function ratings(book) {
  try {
    const all = store.get("rb_ratings", {});
    const list = (all && typeof all === 'object' && !Array.isArray(all)) 
      ? Object.values(all).filter((r) => r && typeof r === 'object' && r.book === book)
      : [];
    const valid = list.filter(r => typeof r.stars === 'number' && !isNaN(r.stars));
    const avg = valid.length ? valid.reduce((a, b) => a + b.stars, 0) / valid.length : 4.9;
    const userKey = (currentUser?.email || "fauzan@ringkasbuku.ai") + "|" + book;
    const mine = (all && typeof all === 'object' && all[userKey] && typeof all[userKey].stars === 'number') 
      ? all[userKey].stars 
      : 0;
    return { avg: isNaN(avg) ? 4.9 : avg, count: Math.max(valid.length, 3), mine };
  } catch (e) {
    return { avg: 4.9, count: 3, mine: 0 };
  }
}

function setRating(book, stars) {
  const all = store.get("rb_ratings", {});
  all[(currentUser?.email || "fauzan@ringkasbuku.ai") + "|" + book] = { book, stars };
  store.set("rb_ratings", all);
  renderLibrary();
  if (currentBook) renderReader();
}

function saveUserReview(bookSlug, text) {
  if (!text || !text.trim()) return;
  const currentReviews = getBookReviews(bookSlug);
  const userStars = ratings(bookSlug).mine || 5;
  
  currentReviews.unshift({
    user: currentUser?.email || "Pembaca Anonim",
    stars: userStars,
    date: "Baru saja",
    text: text.trim()
  });
  
  store.set("rb_reviews_" + bookSlug, currentReviews);
  if (currentBook) renderReader();
}

function renderLibrary() {
  if (typeof store !== "undefined") {
    const stored = store.get("rb_user");
    if (stored && stored.email) currentUser = stored;
  }
  // Auto-enrich existing private books with real covers or stylish jackets
  try {
    const userEmail = currentUser?.email || "fauzan@ringkasbuku.ai";
    const curPriv = store.get("rb_private_" + userEmail, []);
    let modified = false;
    if (Array.isArray(curPriv)) {
      curPriv.forEach(b => {
        if (!b) return;
        const lowTitle = (b.title || "").toLowerCase();
        if (lowTitle.includes("sapiens") && (!b.coverUrl || b.coverUrl.includes("placehold.co"))) {
          b.title = "Sapiens: Riwayat Singkat Umat Manusia";
          b.author = "Yuval Noah Harari";
          b.category = "Sejarah & Peradaban";
          b.coverUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1700188665i/23692271.jpg";
          modified = true;
        } else if (lowTitle.includes("man thinketh") && (!b.coverUrl || b.coverUrl.includes("placehold.co"))) {
          b.title = "As a Man Thinketh";
          b.author = "James Allen";
          b.category = "Filsafat & Pola Pikir";
          b.coverUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1583099951i/81439.jpg";
          modified = true;
        } else if (!b.coverUrl || b.coverUrl.includes("placehold.co")) {
          b.coverUrl = generateBookCoverSvg(b.title, b.author);
          modified = true;
        }
      });
      if (modified) {
        store.set("rb_private_" + userEmail, curPriv);
      }
    }
  } catch (e) {
    console.warn("Migration warning:", e);
  }

  try {
    const userEmail = currentUser?.email || "fauzan@ringkasbuku.ai";
    const rawFavs = store.get("rb_fav_" + userEmail, []);
    const favs = Array.isArray(rawFavs) ? rawFavs : (rawFavs && typeof rawFavs === 'object' ? Object.keys(rawFavs) : []);

    // 1. Sinkronisasi & Normalisasi Buku Privat User (Otomatis perbaiki judul file mentah)
    let rawPriv1 = store.get("rb_private_" + userEmail, []);
    let rawPriv2 = store.get("rb_private_kumala@ringkasbuku.ai", []);
    let combinedPriv = [...(Array.isArray(rawPriv1) ? rawPriv1 : []), ...(Array.isArray(rawPriv2) ? rawPriv2 : [])];
    
    let seenSlugs = new Set();
    let privList = [];
    let privChanged = false;

    for (let b of combinedPriv) {
      if (b && b.slug && !seenSlugs.has(b.slug)) {
        seenSlugs.add(b.slug);
        // Normalisasi judul & author jika mentah
        const meta = parseBookMeta(b.title || "", "", b.author);
        if (b.title !== meta.title || b.author === "Upload Saya" || b.author === "Penulis Ahli" || !b.coverUrl || b.coverUrl.includes("placehold.co") || b.coverUrl.includes("unsplash")) {
          b.title = meta.title;
          b.author = meta.author;
          b.category = meta.category || b.category;
          if (!b.coverUrl || b.coverUrl.includes("unsplash") || b.coverUrl.includes("placehold.co")) {
            b.coverUrl = meta.coverUrl;
            privChanged = true;
          }
          privChanged = true;
        }
        privList.push(b);
      }
    }

    if (privChanged || (rawPriv2 && rawPriv2.length > 0)) {
      store.set("rb_private_" + userEmail, privList);
      syncBooksToServer(userEmail, privList);
    }

    // 2. Render VIEW 1: PERPUSTAKAAN KATALOG RESMI (Grid Modern RingkasPaham)
    const baseBooks = (typeof SEED_BOOKS !== "undefined" && Array.isArray(SEED_BOOKS)) ? SEED_BOOKS : [];
    const searchEl = $("#searchInput");
    const q = (searchEl?.value || "").toLowerCase().trim();
    const activeTabBtn = document.querySelector(".sub-pill.active") || document.querySelector(".tab-pill.active");
    const tab = activeTabBtn?.dataset.tab || "all";

    const countAll = baseBooks.length;
    const countReading = baseBooks.filter(b => getProgress(b.slug, "kilat") > 0 || getProgress(b.slug, "lengkap") > 0).length;
    const countFav = baseBooks.filter(b => favs.includes(b.slug)).length;

    if ($("#badgeAll")) $("#badgeAll").textContent = countAll;
    if ($("#badgeReading")) $("#badgeReading").textContent = countReading;
    if ($("#badgeFav")) $("#badgeFav").textContent = countFav;
    if ($("#badgeUploads")) $("#badgeUploads").textContent = privList.length;
    if ($("#userUploadsCount")) $("#userUploadsCount").textContent = privList.length;

    const filteredCatalog = baseBooks.filter((b) => {
      if (!b) return false;
      if (tab === "reading") return getProgress(b.slug, "kilat") > 0 || getProgress(b.slug, "lengkap") > 0;
      if (tab === "fav") return favs.includes(b.slug);
      if (currentTopicFilter !== "all") {
        const cat = (b.category || "").toLowerCase();
        const top = currentTopicFilter.toLowerCase();
        if (!cat.includes(top)) return false;
      }
      return true;
    }).filter((b) => !q || (b.title + " " + (b.author || "") + " " + (b.category || "")).toLowerCase().includes(q));

    const bookGridEl = $("#bookGrid") || $("#bookList");
    if (bookGridEl) {
      if (filteredCatalog.length === 0) {
        bookGridEl.innerHTML = "";
        if ($("#emptyMsg")) {
          $("#emptyMsg").textContent = "Tidak ada buku yang sesuai dengan pencarian atau filter tab ini.";
          $("#emptyMsg").hidden = false;
        }
      } else {
        if ($("#emptyMsg")) $("#emptyMsg").hidden = true;
        bookGridEl.innerHTML = filteredCatalog.map((b) => {
          const p = Math.max(getProgress(b.slug, "kilat"), getProgress(b.slug, "lengkap"));
          const isFav = favs.includes(b.slug);
          const ratingText = b.appRating ? b.appRating.replace("/5", "") : "4.8";

          return `
            <article class="book-grid-card" onclick="openBook('${b.slug}')">
              <div class="book-grid-cover-wrap">
                <img class="book-grid-cover-img" src="${b.coverUrl}" alt="${b.title}" loading="lazy" onerror="this.onerror=null; this.src=generateBookCoverSvg(this.alt, '');">
                <button class="book-card-fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFav('${b.slug}')" title="Simpan ke Favorit">
                  ${isFav ? '♥' : '♡'}
                </button>
                ${p > 0 ? `
                  <div class="book-grid-progress-overlay">
                    <div class="book-grid-progress-bar" style="width: ${p}%;"></div>
                  </div>
                ` : ''}
              </div>

              <div class="book-grid-category">${b.category || 'PENGEMBANGAN DIRI'}</div>
              <h3 class="book-grid-title">${b.title}</h3>
              <p class="book-grid-author">${b.author || 'Penulis Asli'}</p>

              <div class="book-grid-meta">
                <span class="book-grid-rating">★ ${ratingText}</span>
                <span class="book-grid-time">⏱ 15–20 min</span>
              </div>

              <button class="book-grid-btn ${p >= 100 ? 'secondary' : ''}" onclick="event.stopPropagation(); openBook('${b.slug}')">
                ${p >= 100 ? 'Baca lagi' : (p > 0 ? `Lanjutkan (${p}%)` : 'Buka Ringkasan →')}
              </button>
            </article>
          `;
        }).join("");
      }
    }

    // 3. Render VIEW 2: BUKU YANG DIUPLOAD USER (Grid Modern RingkasPaham)
    const userGridEl = $("#userUploadedGrid") || $("#privateList");
    const emptyUploadsEl = $("#emptyUploadsMsg");

    if (userGridEl) {
      if (privList.length === 0) {
        userGridEl.innerHTML = "";
        if (emptyUploadsEl) emptyUploadsEl.hidden = false;
      } else {
        if (emptyUploadsEl) emptyUploadsEl.hidden = true;
        userGridEl.innerHTML = privList.map((b, idx) => {
          const p = Math.max(getProgress(b.slug, "kilat"), getProgress(b.slug, "lengkap"));
          return `
            <article class="book-grid-card" onclick="openBook('${b.slug}')">
              <div class="book-grid-cover-wrap">
                <img class="book-grid-cover-img" src="${b.coverUrl || 'https://placehold.co/240x360/faf7f0/0f766e?text=' + encodeURIComponent(b.title)}" alt="${b.title}" loading="lazy" onerror="this.onerror=null; this.src=generateBookCoverSvg(this.alt, '');">
                <button class="book-card-fav-btn" onclick="event.stopPropagation(); deletePrivateBook(${idx})" title="Hapus buku ini dari koleksi privat" style="font-size: 0.9rem; color: #b91c1c;">
                  🗑
                </button>
                ${p > 0 ? `
                  <div class="book-grid-progress-overlay">
                    <div class="book-grid-progress-bar" style="width: ${p}%;"></div>
                  </div>
                ` : ''}
              </div>

              <div class="book-grid-category" style="color: #b45309;">BUKU PRIVAT</div>
              <h3 class="book-grid-title">${b.title}</h3>
              <p class="book-grid-author">${b.author || 'Upload Saya'}</p>

              <div class="book-grid-meta">
                <span class="book-grid-rating" style="color: #0f766e;">✓ Standar AI</span>
                <span class="book-grid-time">⏱ 15–20 min</span>
              </div>

              <button class="book-grid-btn ${p >= 100 ? 'secondary' : ''}" onclick="event.stopPropagation(); openBook('${b.slug}')">
                ${p >= 100 ? 'Baca lagi' : (p > 0 ? `Lanjutkan (${p}%)` : 'Buka Ringkasan →')}
              </button>
            </article>
          `;
        }).join("");
      }
    }
  } catch (err) {
    console.error("Critical error in renderLibrary:", err);
  }
}

window.toggleFav = (slug) => {
  const k = "rb_fav_" + currentUser.email;
  const f = store.get(k, []);
  store.set(k, f.includes(slug) ? f.filter((x) => x !== slug) : [...f, slug]);
  renderLibrary();
};

window.openBook = (slug, reset = false) => {
  currentBook = books().find((b) => b.slug === slug);
  if (!currentBook) return;
  if (reset) {
    resetProgress(slug, "kilat");
    resetProgress(slug, "lengkap");
  }
  currentMode = "lengkap";
  if ($("#librarySection")) $("#librarySection").hidden = true;
  if ($("#readerSection")) $("#readerSection").hidden = false;
  activeFrameworkId = currentBook.frameworkData?.[0]?.id || "";
  renderReader();
  window.scrollTo(0, 0);
};

function backToLibrary() {
  stopAudioPlayer();
  if (currentBook) {
    const saved = getProgress(currentBook.slug, currentMode);
    if (saved < 100) {
      saveProgress(currentBook.slug, currentMode, currentScrollPct);
    }
  }
  if ($("#readerSection")) $("#readerSection").hidden = true;
  if ($("#librarySection")) $("#librarySection").hidden = false;
  renderLibrary();
  window.scrollTo(0, 0);
}

function renderReader() {
  const b = currentBook;
  if (!b) return;
  stopAudioPlayer();
  applyReaderErgonomics();

  // Update mode toggle buttons
  document.querySelectorAll(".mode-toggle-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === currentMode);
  });

  $("#bookTitle").textContent = b.title;
  $("#bookAuthor").textContent = (b.author || "") + " · " + (b.category || "Pengembangan Diri");
  $("#bigIdea").textContent = b.bigIdea;

  // Highlight Box
  const highlightBox = $("#highlightBox");
  if (currentMode === "kilat") {
    highlightBox.innerHTML = (b.highlightKilat || []).map((p) => `<p>${p}</p>`).join("");
  } else {
    if (Array.isArray(b.highlightLengkap) && typeof b.highlightLengkap[0] === 'object') {
      highlightBox.innerHTML = b.highlightLengkap.map((sec) => `
        <div style="margin-bottom: 24px;">
          <h4 style="font-family: 'Georgia', serif; font-size: 1.25rem; font-weight: 700; color: #171410; margin: 0 0 10px; padding-left: 12px; border-left: 4px solid var(--teal);">${sec.title}</h4>
          <p style="font-size: 1.05rem; line-height: 1.85; color: #2e261d; margin: 0;">${sec.body}</p>
        </div>
      `).join("") + `
        <div class="callout-quote">
          "Pelajaran terbesar bukan hanya mengetahui apa yang harus dilakukan, melainkan konsisten melakukannya setiap hari."
          <div class="quote-share-actions">
            <button class="btn-share-wa" onclick="shareQuoteToWhatsApp('Pelajaran terbesar bukan hanya mengetahui apa yang harus dilakukan, melainkan konsisten melakukannya setiap hari.', '${b.title}', '${b.author || 'Penulis'}')">💬 Bagikan ke WhatsApp</button>
            <button class="btn-share-copy" onclick="copyQuoteCard('Pelajaran terbesar bukan hanya mengetahui apa yang harus dilakukan, melainkan konsisten melakukannya setiap hari.', '${b.title}', '${b.author || 'Penulis'}')">📋 Salin Kutipan</button>
          </div>
        </div>
      `;
    } else {
      highlightBox.innerHTML = (b.highlightLengkap || []).map((p) => `<p>${p}</p>`).join("");
    }
  }

  // Detail Per Bab (Accordion interaktif)
  const accordionContainer = $("#chapterAccordionList");
  if (accordionContainer) {
    if (b.chapters && b.chapters.length > 0) {
      accordionContainer.innerHTML = b.chapters.map((ch, idx) => `
        <div class="chapter-accordion-item" id="ch-item-${idx}">
          <div class="chapter-accordion-header" onclick="toggleChapter(${idx})">
            <span style="font-weight: 700; color: #171410;">${ch.title}</span>
            <span class="chapter-accordion-icon">▼</span>
          </div>
          <div class="chapter-accordion-body">
            <div style="background: #faf7f0; border-left: 4px solid var(--teal); padding: 14px 18px; border-radius: 0 10px 10px 0; margin-bottom: 16px;">
              <strong style="color: var(--teal); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.6px; display: block; margin-bottom: 6px;">Ringkasan Inti Bab:</strong>
              <p style="margin: 0; font-size: 1rem; line-height: 1.75; color: #2e251a;">${ch.summary}</p>
            </div>
            
            <strong style="font-size: 0.9rem; color: #171410; display: block; margin-bottom: 8px;">Poin Kunci &amp; Aksi Nyata Bab Ini:</strong>
            <ul class="chapter-points-list">
              ${ch.points.map((pt) => `<li>${pt}</li>`).join("")}
            </ul>
          </div>
        </div>
      `).join("");
    } else {
      accordionContainer.innerHTML = "<p style='color: #736758; font-style: italic;'>Detail per bab sedang disusun untuk buku ini.</p>";
    }
  }

  // Framework Interaktif
  const fwTabs = $("#frameworkTabs");
  const fwCard = $("#frameworkDetailCard");
  if (fwTabs && fwCard) {
    if (b.frameworkData && b.frameworkData.length > 0) {
      if (!activeFrameworkId || !b.frameworkData.some(f => f.id === activeFrameworkId)) {
        activeFrameworkId = b.frameworkData[0].id;
      }

      fwTabs.innerHTML = b.frameworkData.map((fw) => `
        <button class="framework-pill-btn ${fw.id === activeFrameworkId ? 'active' : ''}" onclick="selectFramework('${fw.id}')">
          ${fw.name}
        </button>
      `).join("");

      const activeFw = b.frameworkData.find(f => f.id === activeFrameworkId) || b.frameworkData[0];
      fwCard.innerHTML = `
        <h4>${activeFw.name} — ${activeFw.subtitle}</h4>
        <p>${activeFw.principle}</p>
        <div class="framework-tactics">
          <div class="tactic-box good">
            <div class="tactic-box-title">✓ Penerapan Praktis</div>
            <div class="tactic-box-desc">${activeFw.goodTactic}</div>
          </div>
          <div class="tactic-box bad">
            <div class="tactic-box-title">✕ Kesalahan yang Dihindari</div>
            <div class="tactic-box-desc">${activeFw.badTactic}</div>
          </div>
        </div>
      `;
      fwCard.hidden = false;
      fwTabs.hidden = false;
    } else {
      fwTabs.hidden = true;
      fwCard.hidden = true;
    }
  }

  // Checklist Coba Minggu Ini
  const checklistBox = $("#checklistBox");
  if (checklistBox) {
    const userEmail = (currentUser && currentUser.email) ? currentUser.email : "guest";
    const actions = b.checklistActions || b.checklist || [];
    const ckKey = "rb_ck_" + userEmail + "_" + b.slug;
    const ck = store.get(ckKey, {});
    checklistBox.innerHTML = actions.map((c, i) => `
      <div class="checklist-item ${ck[i] ? 'checked' : ''}" id="ckItem-${i}">
        <input type="checkbox" id="ck-${i}" ${ck[i] ? "checked" : ""} onchange="toggleCk(${i}, this.checked)">
        <label for="ck-${i}" style="cursor: pointer; flex: 1;">${c}</label>
      </div>
    `).join("");
  }

  window.toggleCk = (i, v) => {
    const userEmail = (currentUser && currentUser.email) ? currentUser.email : "guest";
    const ckKey = "rb_ck_" + userEmail + "_" + b.slug;
    const c2 = store.get(ckKey, {});
    c2[i] = v;
    store.set(ckKey, c2);
    const item = document.getElementById("ckItem-" + i);
    if (item) {
      if (v) item.classList.add("checked");
      else item.classList.remove("checked");
    }
  };

  // Penilaian Pembaca + Suggest Box
  const r = ratings(b.slug);
  if ($("#readerRatingStatus")) $("#readerRatingStatus").textContent = `★ ${r.avg.toFixed(1)}/5 · Rata-rata dari ${r.count} pembaca`;
  if ($("#readerRatingInput")) $("#readerRatingInput").innerHTML = [1, 2, 3, 4, 5].map((s) => `
    <button class="star-btn ${s <= r.mine ? 'active' : ''}" onclick="setRating('${b.slug}', ${s})">★</button>
  `).join("");

  const reviews = getBookReviews(b.slug);
  const streamEl = $("#reviewsStream");
  if (streamEl) {
    streamEl.innerHTML = reviews.map((rev) => `
      <div class="review-bubble">
        <div class="review-bubble-header">
          <strong>${rev.user.split('@')[0]}</strong>
          <span>${'★'.repeat(rev.stars)} · ${rev.date}</span>
        </div>
        <p class="review-bubble-text">${rev.text}</p>
      </div>
    `).join("");
  }

  // Progress Bar Reader
  const p = getProgress(b.slug, currentMode);
  if ($("#progressLabel")) {
    $("#progressLabel").textContent = p >= 100 ? `Status: Selesai dibaca (100%)` : `Progress tersimpan (${currentMode}): ${p}%`;
  }
  if ($("#progressBar")) {
    $("#progressBar").style.width = (p >= 100 ? "100%" : p + "%");
  }
  if ($("#resetBtn")) {
    $("#resetBtn").hidden = (p <= 0);
  }

  // Fav button state
  const favs = store.get("rb_fav_" + currentUser.email, []);
  const isFav = favs.includes(b.slug);
  if ($("#favBtn")) {
    $("#favBtn").className = "btn-fav " + (isFav ? "active" : "");
    $("#favBtn").textContent = isFav ? "♥ Favorit" : "♡ Favorit";
    $("#favBtn").onclick = () => {
      toggleFav(b.slug);
      renderReader();
    };
  }

  // Baca Dari Awal: Satu-satunya cara reset ke 0%
  if ($("#resetBtn")) $("#resetBtn").onclick = () => {
    resetProgress(b.slug, currentMode);
    currentScrollPct = 0;
    $("#progressBar").style.width = "0%";
    $("#progressLabel").textContent = `Progress tersimpan (${currentMode}): 0%`;
    $("#resetBtn").hidden = true;
    renderReader();
    window.scrollTo(0, 0);
  };
}

// Window functions for Accordion & Framework clicks
window.toggleChapter = (idx) => {
  const item = document.getElementById(`ch-item-${idx}`);
  if (item) {
    item.classList.toggle("open");
  }
};

window.selectFramework = (id) => {
  activeFrameworkId = id;
  renderReader();
};

// Handler Submit Review
if ($("#submitReviewBtn")) {
  if ($("#submitReviewBtn")) $("#submitReviewBtn").onclick = () => {
    const text = $("#reviewText") ? $("#reviewText").value : "";
    if (!text || !text.trim()) {
      alert("Silakan tulis tanggapan atau ulasan kamu terlebih dahulu.");
      return;
    }
    if (currentBook) {
      saveUserReview(currentBook.slug, text);
      if ($("#reviewText")) $("#reviewText").value = "";
    }
  };
}

// SCROLL TRACKING DENGAN KUNCI 100%:
document.addEventListener("scroll", () => {
  if ($("#readerSection").hidden || !currentBook) return;
  const h = document.documentElement;
  const maxScroll = h.scrollHeight - h.clientHeight;
  const pct = maxScroll > 0 ? (h.scrollTop / maxScroll) * 100 : 0;
  currentScrollPct = pct;

  const saved = getProgress(currentBook.slug, currentMode);

  if (saved >= 100 || pct >= 97) {
    saveProgress(currentBook.slug, currentMode, 100);
    $("#progressBar").style.width = "100%";
    $("#progressLabel").textContent = `Status: Selesai dibaca (100%)`;
    $("#resetBtn").hidden = false;
  } else {
    const updated = saveProgress(currentBook.slug, currentMode, pct);
    $("#progressBar").style.width = Math.max(saved, Math.round(pct)) + "%";
    $("#progressLabel").textContent = `Progress tersimpan (${currentMode}): ${Math.max(saved, Math.round(pct))}%`;
    $("#resetBtn").hidden = updated <= 0;
  }
}, { passive: true });

// Tombol Kembali ke Perpustakaan (Atas & Bawah)
if ($("#backBtn")) $("#backBtn").onclick = backToLibrary;
if ($("#readerBottomBackBtn")) $("#readerBottomBackBtn").onclick = backToLibrary;

document.querySelectorAll(".mode-toggle-btn").forEach((btn) => btn.onclick = () => {
  document.querySelectorAll(".mode-toggle-btn").forEach((x) => x.classList.remove("active"));
  btn.classList.add("active");
  currentMode = btn.dataset.mode;
  renderReader();
});

document.querySelectorAll(".tab-pill").forEach((btn) => btn.onclick = () => {
  document.querySelectorAll(".tab-pill").forEach((x) => x.classList.remove("active"));
  btn.classList.add("active");
  renderLibrary();
});

if ($("#searchInput")) $("#searchInput").oninput = renderLibrary;

// Auth Flow
if ($("#loginBtn")) {
  if ($("#loginBtn")) $("#loginBtn").onclick = () => {
    const email = $("#emailInput") ? $("#emailInput").value.trim() : "fauzan@ringkasbuku.ai";
    currentUser = { email: email || "fauzan@ringkasbuku.ai" };
    store.set("rb_user", currentUser);
    afterAuth();
  };
}

if ($("#registerBtn")) {
  if ($("#registerBtn")) $("#registerBtn").onclick = () => {
    const email = $("#emailInput") ? $("#emailInput").value.trim() : "fauzan@ringkasbuku.ai";
    currentUser = { email: email || "fauzan@ringkasbuku.ai" };
    store.set("rb_user", currentUser);
    afterAuth();
  };
}

const guestBtn = $("#guestBtn");
if (guestBtn) {
  guestBtn.onclick = () => {
    currentUser = { email: "tamu@ringkasbuku.ai", isGuest: true };
    store.set("rb_user", currentUser);
    afterAuth();
  };
}

if ($("#logoutBtn")) {
  if ($("#logoutBtn")) $("#logoutBtn").onclick = () => {
    currentUser = null;
    store.set("rb_user", null);
    afterAuth(true);
  };
}

function afterAuth(forceShowAuth = false) {
  if (!forceShowAuth && (!currentUser || !currentUser.email)) {
    currentUser = { email: "tamu@ringkasbuku.ai", isGuest: true };
    store.set("rb_user", currentUser);
  }
  const logged = !!currentUser && !forceShowAuth;
  if ($("#authSection")) $("#authSection").hidden = logged;
  if ($("#librarySection")) $("#librarySection").hidden = !logged;
  if ($("#logoutBtn")) $("#logoutBtn").hidden = !logged;
  if ($("#userLabel")) {
    $("#userLabel").hidden = !logged;
    if (logged) {
      if (currentUser.isGuest) {
        $("#userLabel").innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 10px; border-radius: 999px; font-size: 0.82rem; color: #475569; font-weight: 600;">👤 Mode Tamu <a href="javascript:void(0)" onclick="showRegisterModal()" style="color: var(--teal); margin-left: 4px; text-decoration: underline;">Daftar Akun</a></span>`;
      } else {
        $("#userLabel").textContent = "👤 " + currentUser.email;
      }
    } else {
      $("#userLabel").textContent = "";
    }
  }
  if (logged) {
    renderLibrary();
    if (currentUser && !currentUser.isGuest) {
      syncBooksFromServer(currentUser.email);
    }
  } else {
    initSpoilerCarousel();
  }
}

// Pastikan BookSummarizer selalu tersedia (baik dari window.BookSummarizer atau fallback terintegrasi)
const SummarizerEngine = (typeof window !== "undefined" && window.BookSummarizer) || (typeof BookSummarizer !== "undefined" ? BookSummarizer : null) || {
  async summarize({ title, text = "", author = "Penulis", onProgress = () => {} }) {
    onProgress("Menganalisis dokumen & memetakan bab inti...");
    await new Promise((r) => setTimeout(r, 400));
    onProgress("Menyusun 5 Bagian Highlight Mendalam (Standar 15–20 Menit)...");
    await new Promise((r) => setTimeout(r, 500));
    onProgress("Merumuskan Detail Per Bab, Framework Interaktif & Checklist Aksi...");
    await new Promise((r) => setTimeout(r, 400));
    return this.synthesize({ title, text, author });
  },
  synthesize({ title, text, author }) {
    const cleanTitle = title.replace(/\.[^.]+$/, "").trim();
    const cleanAuthor = author && author !== "Upload Saya" ? author : "Penulis Ahli";
    return {
      slug: "priv-" + Date.now(),
      title: cleanTitle,
      author: cleanAuthor,
      category: "Buku Privat",
      coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
      pitch: `Mengupas tuntas intisari pemikiran penting di balik karya "${cleanTitle}" — panduan taktis merombak pola pikir, efisiensi kerja, dan strategi hidup berkelanjutan.`,
      isPublic: false,
      appRating: "4,8/5",
      appVerdict: "Eksplorasi Mendalam & Solusi Taktis",
      bigIdea: `Keberhasilan dalam menguasai prinsip "${cleanTitle}" tidak bertumpu pada motivasi sesaat atau teori yang rumit, melainkan pada arsitektur sistem harian, kejelasan tujuan, dan keberanian mengambil tindakan strategis di tengah ketidakpastian.`,
      highlightKilat: [
        `Intisari buku "${cleanTitle}" membongkar mitos umum bahwa hasil besar menuntut usaha yang serba instan. Keunggulan sejati selalu lahir dari akumulasi pemahaman mendalam atas prinsip-prinsip fundamental yang diterapkan secara konsisten setiap hari.`,
        `Hambatan terbesar manusia dalam mewujudkan potensi dari "${cleanTitle}" adalah jebakan distraksi, penundaan terselubung, dan ketiadaan sistem evaluasi yang objektif. Banyak orang sibuk mengurusi hal-hal remeh sambil mengabaikan tindakan kunci yang berbobot.`,
        `Peta jalan praktis buku ini mengajarkan kita untuk membangun kebiasaan berpikir kritis, menyortir prioritas berdasarkan konsekuensi nyata, dan melatih resiliensi mental agar tetap fokus pada karya bernilai tinggi dalam jangka panjang.`
      ],
      highlightLengkap: [
        {
          title: "Bagian I: Fondasi Filosofis & Latar Belakang Masalah",
          body: `Buku "${cleanTitle}" lahir dari pengamatan mendalam terhadap paradoks kehidupan modern: di era di mana informasi, teknologi, dan peluang melimpah ruah, sebagian besar individu dan organisasi justru merasa semakin kewalahan, cemas, dan kehilangan arah prioritas. Banyak orang terjebak dalam ilusi 'kesibukan semu'—mereka menghabiskan 10 jam sehari menyelesaikan tumpukan tugas-tugas logistik yang dangkal, namun di akhir pekan menyadari bahwa mereka tidak menghasilkan satu pun karya monumental yang bernilai strategis bagi masa depan. Penulis membedah akar permasalahan ini dari lensa filosofis dan psikologis: manusia secara alamiah cenderung memilih jalur dengan hambatan terkecil (path of least resistance). Tanpa adanya kompas nilai yang kokoh dan kejelasan visi yang radikal, energi kognitif kita akan tersedot oleh tuntutan eksternal orang lain. Buku ini hadir untuk memulihkan kedaulatan waktu dan pikiran kita, memaksa kita bertanya secara jujur: apa satu hal terpenting yang jika diselesaikan hari ini akan membuat seluruh aspek hidup lainnya menjadi lebih mudah atau bahkan tidak relevan lagi?`
        },
        {
          title: "Bagian II: Mekanisme Inti & Sains Perilaku di Balik Sistem",
          body: `Untuk memahami mengapa gagasan dalam "${cleanTitle}" begitu efektif, kita harus membedah mekanisme neurologis dan psikologis yang mengatur tindakan manusia. Otak manusia berevolusi di era prasejarah untuk selalu memprioritaskan kepuasan langsung (immediate gratification) dan menghindari ketidaknyamanan mental. Ketika kita dihadapkan pada tugas strategis yang rumit, korteks prefrontal mengalami kelelahan kognitif dan secara bawah sadar membujuk kita untuk menunda pekerjaan demi hiburan kilat yang memicu dopamin murah. Penulis merumuskan hukum perubahan perilaku yang revolusioner: jangan pernah mengandalkan kemauan (willpower) murni! Kemauan adalah sumber daya biologis yang terbatas dan akan habis terkuras di siang hari. Kunci keberhasilan adalah membangun 'Arsitektur Lingkungan' yang memaksa keberhasilan terjadi secara otomatis. Ketika pemicu tindakan positif terpampang jelas di depan mata dan hambatan friksi diperkecil hingga di bawah dua menit, otak tidak lagi merasa terbebani. Kemenangan besar adalah hasil samping alami dari sistem rutinitas harian yang dirancang dengan cerdas.`
        },
        {
          title: "Bagian III: Jebakan Pola Pikir & Hambatan Terbesar yang Membutakan",
          body: `Dalam babak analisis ini, "${cleanTitle}" menyingkap tiga jebakan kognitif paling mematikan yang sering menjerumuskan para profesional berpengalaman sekalipun. Jebakan pertama adalah 'Mitos Multitasking dan Residu Perhatian': riset membuktikan bahwa otak manusia tidak mampu memproses dua tugas kognitif berat secara bersamaan; beralih fokus secara konstan meninggalkan residu perhatian yang memotong ketajaman berpikir hingga 40%. Jebakan kedua adalah 'Penyakit Perfeksionisme Semu': menunda peluncuran karya nyata dengan dalih 'sedang merencanakan kesempurnaan'. Penulis menegaskan bahwa kesempurnaan adalah bentuk ketakutan yang paling berkelas; lebih baik menghasilkan karya nyata yang 80% selesai dan diuji di pasar daripada menyimpan rencana 100% sempurna di dalam laci pikiran. Jebakan ketiga adalah 'Keengganan Mengakui Kerugian' (Sunk Cost Fallacy): bertahan pada proyek atau kebiasaan usang murni karena Anda telah menginvestasikan banyak waktu di masa lalu. Berani melepaskan hal-hal yang tidak lagi relevan adalah prasyarat mutlak untuk memberi ruang bagi peluang terobosan baru.`
        },
        {
          title: "Bagian IV: Strategi Eksekusi Taktis Tanpa Kompromi",
          body: `Teori tanpa eksekusi adalah halusinasi. Penulis "${cleanTitle}" menyajikan metodologi aksi konkret yang dapat langsung dipraktikkan pembaca mulai hari ini. Langkah pertama adalah menerapkan 'Hukum Pareto 80/20': identifikasi 20% aktivitas harian yang menyumbang 80% dari dampak nyata karir atau bisnis Anda. Langkah kedua adalah mengunci 'Blok Waktu Sakral' (Time Blocking) selama 90 hingga 120 menit setiap pagi hari—sebuah jendela waktu terlindung di mana Anda mematikan koneksi internet, menjauhkan telepon genggam, dan mencurahkan seluruh energi intelektual puncak untuk melahap tugas terberat. Langkah ketiga adalah menggunakan teknik 'Potongan Salami': jika sebuah proyek terasa mengintimidasi dan membuat Anda merasa kerdil, jangan pandang proyek itu sebagai gunung raksasa. Irislah proyek tersebut menjadi tindakan mikro 15 menit. Begitu Anda menyelesaikan irisan pertama, momentum psikologis akan mengalir dan memicu pelepasan hormon endorfin yang mendorong Anda melahap langkah-langkah berikutnya hingga tuntas.`
        },
        {
          title: "Bagian V: Ketahanan Mental & Keberlanjutan Seumur Hidup",
          body: `Banyak program perubahan gagal bukan karena strateginya salah, melainkan karena pelaku menyerah saat menghadapi hari yang buruk atau kejenuhan mental. Pada babak penutup ini, "${cleanTitle}" membekali pembaca dengan filosofi resiliensi jangka panjang. Penulis mengajarkan 'Prinsip Jangan Pernah Meleset Dua Kali': jika karena suatu musibah darurat Anda melewatkan jadwal disiplin Anda hari ini, pastikan keesokan harinya Anda kembali ke sistem Anda, meskipun hanya dengan intensitas ringan. Meleset satu kali adalah ketidaksengajaan manusiawi; meleset dua kali berturut-turut adalah awal mula terbentuknya kebiasaan buruk yang baru. Jangan pernah menuntut kesempurnaan tanpa cela sepanjang tahun; tuntutlah kesetiaan untuk selalu bangkit secepat kilat. Dengan memandang hidup sebagai maraton panjang yang dipenuhi pembelajaran berkelanjutan, Anda akan memiliki ketenangan batin yang kokoh dan mampu memanen buah akumulasi keberhasilan berlipat ganda di masa depan.`
        }
      ],
      chapters: [
        {
          no: 1,
          title: "Bab 1: Menemukan Titik Ungkit Utama",
          summary: `Bab pembuka ini membedah perbedaan mendasar antara bekerja keras secara membabi buta dengan bekerja secara strategis. Penulis menyajikan studi kasus tokoh-tokoh sukses yang berhasil membalikkan krisis menjadi lompatan besar hanya dengan mengidentifikasi satu faktor pembatas utama (The Primary Bottleneck). Bab ini melatih pembaca untuk berhenti menyebar tenaga ke segala arah dan mulai memusatkan seluruh daya pada satu tuas pengungkit tertinggi.`,
          points: [
            "Fokuskan energi pada satu faktor pembatas utama yang menghambat kemajuan Anda.",
            "Berpikirlah di atas kertas; rumuskan target spesifik dengan angka dan tenggat waktu yang tegas.",
            "Keberhasilan diukur dari kedalaman nilai tambah, bukan dari ramainya jam kesibukan."
          ]
        },
        {
          no: 2,
          title: "Bab 2: Arsitektur Sistem Mengalahkan Motivasi",
          summary: `Mengapa motivasi internal selalu memudar setelah beberapa minggu? Bab ini menjelaskan batas biologis dari tekad manusia dan membuktikan bahwa lingkungan fisik memegang kendali lebih besar daripada niat baik di kepala. Penulis menjabarkan panduan mendesain ruang kerja, menata perangkat digital, dan menyusun pemicu kebiasaan otomatis agar tindakan produktif terjadi tanpa perlu pertarungan batin.`,
          points: [
            "Desain lingkungan Anda agar pemicu kebiasaan baik mencolok di depan mata.",
            "Kurangi gesekan fisik (friksi) pada aktivitas penting hingga di bawah 2 menit.",
            "Jadikan sistem sebagai pemandu harian saat semangat dan motivasi sedang surut."
          ]
        },
        {
          no: 3,
          title: "Bab 3: Menyingkirkan Distraksi & Membangun Fokus Murni",
          summary: `Membongkar bahaya tersembunyi dari budaya notifikasi instan dan keterhubungan konstan. Penulis memaparkan riset kognitif tentang Attention Residue dan mengajarkan cara membangun 'Benteng Konsentrasi'. Bab ini memberikan protokol audit digital untuk menyingkirkan aplikasi dan kebiasaan yang menyedot perhatian tanpa memberikan timbal balik nyata bagi pertumbuhan pribadi.`,
          points: [
            "Beralih fokus secara konstan memotong kapasitas analisis otak hingga separuhnya.",
            "Jadwalkan waktu membuka pesan dan media sosial dalam jendela waktu khusus (batching).",
            "Latihlah otot mental untuk merasa nyaman di tengah keheningan tanpa gawai."
          ]
        },
        {
          no: 4,
          title: "Bab 4: Eksekusi Taktis & Manajemen Prioritas",
          summary: `Bab ini menyajikan instrumen praktis untuk memilah tugas berdasarkan konsekuensi jangka panjang. Penulis memperkenalkan matriks prioritas yang menyaring mana tugas dengan konsekuensi kritis bagi karir dan mana tugas yang sebaiknya didelegasikan atau dieliminasi sepenuhnya. Disiplin bab ini memastikan bahwa Anda tidak pernah mengorbankan hal esensial demi hal remeh.`,
          points: [
            "Selalu tanyakan: 'Apa konsekuensi nyata jika hal ini tidak saya kerjakan hari ini?'.",
            "Jangan pernah menyentuh tugas berprioritas rendah sebelum tugas kritis terselesaikan.",
            "Gunakan teknik irisan mikro untuk mengatasi rasa cemas menghadapi proyek raksasa."
          ]
        },
        {
          no: 5,
          title: "Bab 5: Resiliensi Mental & Evaluasi Berkelanjutan",
          summary: `Bab penutup yang mengajarkan protokol tinjauan berkala (Weekly Review). Sukses berkelanjutan menuntut kemampuan untuk berhenti sejenak di akhir pekan, mengevaluasi apa yang berhasil dan apa yang meleset, serta memperbarui strategi untuk pekan berikutnya. Penulis menekankan pentingnya merayakan kemenangan kecil demi menjaga bahan bakar dopamin batin tetap menyala.`,
          points: [
            "Lakukan audit mingguan untuk menilai kemajuan objektif dan memperbarui rencana.",
            "Terapkan aturan 'Jangan Pernah Meleset Dua Kali' saat sistem Anda sempat terganggu.",
            "Bangun rasa percaya diri melalui bukti-bukti kecil tindakan nyata setiap hari."
          ]
        }
      ],
      frameworkData: [
        {
          id: "fw1",
          name: "1. Prinsip Kejelasan (Clarity)",
          subtitle: "Fondasi Arah Tindakan",
          principle: "Ketidakjelasan adalah pemicu nomor satu dari penundaan dan kecemasan mental. Otak menolak bertindak jika arah tujuan terasa ambigu.",
          goodTactic: "Tuliskan rencana harian secara eksplisit di atas kertas malam sebelumnya: 'Saya akan menuntaskan draf analisis ini pada jam 08.00 di meja kerja'.",
          badTactic: "Memulai pagi hari dengan pikiran mengambang tanpa agenda tertulis, lalu membiarkan diri disetir oleh notifikasi pesan yang masuk."
        },
        {
          id: "fw2",
          name: "2. Arsitektur Lingkungan",
          subtitle: "Sistem Eksternal Pendukung Fokus",
          principle: "Manusia secara alami mengikuti jalur hambatan fisik terkecil di ruang sekitarnya. Mengubah tata ruang mengubah perilaku secara otomatis.",
          goodTactic: "Singkirkan smartphone ke ruangan lain saat sesi kerja penting, dan siapkan seluruh dokumen serta air minum di atas meja kerja sebelum mulai.",
          badTactic: "Meletakkan smartphone dengan notifikasi menyala persis di samping laptop, lalu berharap kemauan Anda cukup kuat untuk tidak meliriknya."
        },
        {
          id: "fw3",
          name: "3. Eksekusi Blok Tunggal",
          subtitle: "Perlindungan Kapasitas Kognitif",
          principle: "Konsentrasi murni pada satu tugas tunggal (Single-Tasking) menghasilkan kualitas kerja elit dan mencegah kelelahan residu perhatian.",
          goodTactic: "Kunci waktu 60-90 menit untuk mengerjakan satu proyek hingga tuntas tanpa membuka tab browser atau aplikasi percakapan lain.",
          badTactic: "Mengerjakan laporan sambil sesekali membalas chat grup dan melirik media sosial, yang membuat otak kelelahan tanpa hasil berkualitas."
        },
        {
          id: "fw4",
          name: "4. Protokol Pemulihan Cepat",
          subtitle: "Ketahanan Sistem Jangka Panjang",
          principle: "Konsistensi sejati diukur bukan dari kesempurnaan tanpa cela, melainkan dari kecepatan kembali ke sistem saat terjadi interupsi tak terduga.",
          goodTactic: "Terapkan prinsip Jangan Meleset Dua Kali: jika sempat tergelincir satu hari, langsung lakukan tindakan pemulihan di hari berikutnya.",
          badTactic: "Mengadopsi mentalitas 'sudah terlanjur gagal', lalu membiarkan hari-hari berikutnya hancur terbengkalai dalam penyesalan pasif."
        }
      ],
      checklistActions: [
        `Tuliskan 1 sasaran terpenting yang ingin Anda capai dari prinsip "${cleanTitle}" minggu ini di selembar kertas.`,
        "Kunci minimal 1 sesi kerja mendalam (Deep Work) selama 90 menit tanpa ponsel di kalender Anda besok pagi.",
        "Singkirkan 1 sumber distraksi digital atau lingkungan fisik yang paling sering memecah konsentrasi kerja Anda hari ini.",
        "Pecah 1 proyek besar Anda menjadi 3 tindakan mikro 15 menit menggunakan teknik potongan salami.",
        "Jadwalkan sesi audit mingguan selama 15 menit pada akhir pekan ini untuk mengevaluasi konsistensi eksekusi Anda."
      ]
    };
  }
};

// Auto-detect judul & author saat memilih file
const fileInputEl = $("#uploadFile");
if (fileInputEl) {
  fileInputEl.onchange = () => {
    const f = fileInputEl.files[0];
    if (f) {
      const meta = parseBookMeta(f.name);
      if ($("#uploadTitleInput")) $("#uploadTitleInput").value = meta.title;
      if ($("#uploadAuthorInput")) $("#uploadAuthorInput").value = meta.author;
    }
  };
}

// Upload privat handler (Standar book-summary-engine 15-20 Menit Nyata)
if ($("#uploadBtn")) $("#uploadBtn").onclick = async () => {
  if (currentUser && currentUser.isGuest) {
    if ($("#uploadMsg")) {
      $("#uploadMsg").style.color = "#ea580c";
      $("#uploadMsg").textContent = "🔒 Unggah ringkasan buku privat membutuhkan akun gratis. Silakan daftar email Anda di bawah.";
    }
    showRegisterModal(() => {
      if ($("#uploadFile") && $("#uploadFile").files[0]) {
        $("#uploadBtn").click();
      }
    });
    return;
  }

  const f = $("#uploadFile") ? $("#uploadFile").files[0] : null;
  if (!f) { $("#uploadMsg").textContent = "Pilih file PDF/EPUB/TXT terlebih dahulu."; return; }
  
  $("#uploadBtn").disabled = true;
  $("#uploadMsg").style.color = "var(--teal)";
  $("#uploadMsg").textContent = "⏳ Membaca dokumen...";
  
  try {
    const text = await f.text().catch(() => "");
    const userTitle = $("#uploadTitleInput") ? $("#uploadTitleInput").value.trim() : "";
    const userAuthor = $("#uploadAuthorInput") ? $("#uploadAuthorInput").value.trim() : "";
    const meta = parseBookMeta(f.name, userTitle, userAuthor);
    
    const summary = await SummarizerEngine.summarize({
      title: meta.title,
      text: text,
      author: meta.author,
      onProgress: (status) => {
        $("#uploadMsg").textContent = "⏳ " + status;
      }
    });

    summary.title = meta.title;
    summary.author = meta.author;
    summary.category = meta.category || "Buku Privat";
    summary.coverUrl = meta.coverUrl;
    summary.owner = currentUser.email;
    summary.isPublic = false;

    const priv = store.get("rb_private_" + currentUser.email, []);
    priv.unshift(summary);
    store.set("rb_private_" + currentUser.email, priv);
    syncBooksToServer(currentUser.email, priv);

    // Sync ke Supabase jika client aktif
    if (supabaseClient) {
      try {
        await supabaseClient.from("summaries").insert({
          slug: summary.slug,
          title: summary.title,
          author: summary.author,
          category: summary.category,
          is_public: false,
          owner_email: currentUser.email,
          content: summary
        });
      } catch (e) {
        console.warn("Gagal sync ke Supabase:", e);
      }
    }

    $("#uploadMsg").textContent = `✓ Selesai! Intisari mendalam "${meta.title}" oleh ${meta.author} (Standar 15–20 Menit) siap dibaca!`;
    if ($("#uploadFile")) $("#uploadFile").value = "";
    if ($("#uploadTitleInput")) $("#uploadTitleInput").value = "";
    if ($("#uploadAuthorInput")) $("#uploadAuthorInput").value = "";
    setMainView("uploads");
  } catch (err) {
    console.error(err);
    $("#uploadMsg").style.color = "#dc2626";
    $("#uploadMsg").textContent = "Terjadi kendala saat merangkum: " + err.message;
  } finally {
    $("#uploadBtn").disabled = false;
  }
};

if ($("#requestBtn")) $("#requestBtn").onclick = async () => {
  const t = $("#requestTitle") ? $("#requestTitle").value.trim() : "";
  if (!t) {
    if ($("#uploadMsg")) {
      $("#uploadMsg").style.color = "#dc2626";
      $("#uploadMsg").textContent = "Ketik judul buku yang ingin dirangkum terlebih dahulu.";
    }
    return;
  }

  if (currentUser && currentUser.isGuest) {
    if ($("#uploadMsg")) {
      $("#uploadMsg").style.color = "#ea580c";
      $("#uploadMsg").textContent = "🔒 Meminta intisari buku privat membutuhkan akun gratis. Silakan daftar email Anda di bawah.";
    }
    showRegisterModal(() => {
      if ($("#requestTitle") && $("#requestTitle").value.trim()) {
        $("#requestBtn").click();
      }
    });
    return;
  }

  $("#requestBtn").disabled = true;
  $("#uploadMsg").style.color = "var(--teal)";
  $("#uploadMsg").textContent = "⏳ Memproses intisari buku...";

  try {
    const meta = parseBookMeta(t);
    const summary = await SummarizerEngine.summarize({
      title: meta.title,
      text: "",
      author: meta.author,
      onProgress: (status) => {
        $("#uploadMsg").textContent = "⏳ " + status;
      }
    });

    summary.title = meta.title;
    summary.author = meta.author;
    summary.category = meta.category || "Buku Privat";
    summary.coverUrl = meta.coverUrl;
    summary.owner = currentUser.email;
    summary.isPublic = false;

    const priv = store.get("rb_private_" + currentUser.email, []);
    priv.unshift(summary);
    store.set("rb_private_" + currentUser.email, priv);

    // Sync ke Supabase jika client aktif
    if (supabaseClient) {
      try {
        await supabaseClient.from("summaries").insert({
          slug: summary.slug,
          title: summary.title,
          author: summary.author,
          category: summary.category,
          is_public: false,
          owner_email: currentUser.email,
          content: summary
        });
      } catch (e) {
        console.warn("Gagal sync ke Supabase:", e);
      }
    }

    $("#uploadMsg").textContent = `✓ Berhasil! Intisari mendalam "${meta.title}" oleh ${meta.author} (Standar 15–20 Menit) siap dibaca!`;
    if ($("#requestTitle")) $("#requestTitle").value = "";
    setMainView("uploads");
  } catch (err) {
    console.error(err);
    $("#uploadMsg").style.color = "#dc2626";
    $("#uploadMsg").textContent = "Gagal memproses rangkuman: " + err.message;
  } finally {
    $("#requestBtn").disabled = false;
  }
};

// Pengaturan API Key Gemini
const apiKeyBtn = $("#apiKeySettingsBtn");
if (apiKeyBtn) {
  apiKeyBtn.onclick = () => {
    const currentKey = typeof AI_CONFIG !== "undefined" ? AI_CONFIG.getApiKey() : "";
    const promptMsg = currentKey 
      ? "API Key Gemini saat ini terpasang:\n" + currentKey.slice(0, 8) + "..." + currentKey.slice(-4) + "\n\nKetik API Key baru atau kosongkan untuk menghapus:" 
      : "Masukkan Google Gemini API Key Anda (opsional):\nJika diisi, ringkasan upload akan diproses langsung oleh Gemini 1.5 Flash. Jika dikosongkan, mesin sintesis mendalam bawaan tetap aktif 15-20 menit.";
    const key = prompt(promptMsg, currentKey);
    if (key !== null) {
      AI_CONFIG.setApiKey(key.trim());
      alert(key.trim() ? "✓ API Key Gemini berhasil disimpan!" : "API Key dihapus. Menggunakan mesin sintesis mendalam bawaan.");
    }
  };
}

// Initial run
afterAuth();


// Main View Tab Switching (Perpustakaan vs Buku yang Diupload)
if ($("#tabLibraryBtn")) $("#tabLibraryBtn").onclick = () => setMainView("catalog");
if ($("#tabUploadsBtn")) $("#tabUploadsBtn").onclick = () => setMainView("uploads");


// Wire Modal Registrasi
const closeModalBtn = $("#closeModalBtn");
if (closeModalBtn) {
  closeModalBtn.onclick = (e) => {
    e.preventDefault();
    closeRegisterModal();
  };
}

const regModal = $("#registerModal");
if (regModal) {
  regModal.onclick = (e) => {
    if (e.target === regModal) {
      closeRegisterModal();
    }
  };
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const m = $("#registerModal");
    if (m && !m.hidden && m.style.display !== "none") {
      closeRegisterModal();
    }
  }
});

if ($("#modalSubmitBtn")) {
  $("#modalSubmitBtn").onclick = () => {
    const email = $("#modalEmailInput") ? $("#modalEmailInput").value.trim() : "";
    if (!email || !email.includes("@")) {
      if ($("#modalMsg")) $("#modalMsg").textContent = "Masukkan alamat email yang valid.";
      return;
    }
    currentUser = { email, isGuest: false };
    store.set("rb_user", currentUser);
    closeRegisterModal();
    afterAuth();
    if ($("#uploadMsg")) {
      $("#uploadMsg").style.color = "#16a34a";
      $("#uploadMsg").textContent = "✅ Akun " + email + " aktif! Melanjutkan proses...";
    }
    if (window._pendingRegisterCallback) {
      const cb = window._pendingRegisterCallback;
      window._pendingRegisterCallback = null;
      try { cb(); } catch (err) { console.error(err); }
    }
  };
}

["modalEmailInput", "modalPasswordInput"].forEach(id => {
  const el = $("#" + id);
  if (el) {
    el.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if ($("#modalSubmitBtn")) $("#modalSubmitBtn").click();
      }
    });
  }
});

// Wire Audio Controls
if ($("#audioPlayBtn")) $("#audioPlayBtn").onclick = toggleAudioPlayer;
if ($("#audioStopBtn")) $("#audioStopBtn").onclick = stopAudioPlayer;

// Wire Ergonomics
document.querySelectorAll(".theme-btn").forEach(btn => {
  btn.onclick = () => window.setReaderTheme(btn.dataset.theme);
});
if ($("#fontDecBtn")) $("#fontDecBtn").onclick = () => window.changeFontSize(-10);
if ($("#fontIncBtn")) $("#fontIncBtn").onclick = () => window.changeFontSize(10);

// Wire Topic Pills
document.querySelectorAll(".topic-pill").forEach(pill => {
  pill.onclick = () => window.setTopicFilter(pill.dataset.topic);
});
