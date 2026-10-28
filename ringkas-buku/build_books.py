# Generator for books-data.js with comprehensive, high-standard content for all 10 books
# Adhering 100% to book-summary-engine SKILL.md:
# 1. Highlight Lengkap 15-20 minutes real read (5-6 multi-part deep editorial sections)
# 2. Detail Per Bab naratif (5-7 chapters with rich narrative summaries & 3 takeaways)
# 3. Interactive Frameworks (4 pills with principle, good tactic, bad tactic)
# 4. Action Checklist (5 specific 7-day actions)
# 5. Clean, elegant Indonesian editorial style

import json

books = []

# ==========================================
# 1. ATOMIC HABITS — James Clear
# ==========================================
books.append({
    "slug": "atomic-habits",
    "title": "Atomic Habits",
    "author": "James Clear",
    "category": "Pengembangan Diri",
    "coverUrl": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
    "pitch": "Perubahan kecil yang dilakukan terus-menerus akan mengalahkan perubahan besar yang hanya sesekali.",
    "isPublic": True,
    "appRating": "4,9/5",
    "appVerdict": "Karya Terpenting tentang Kebiasaan",
    "bigIdea": "Perubahan besar tidak lahir dari satu lompatan dramatis, melainkan akumulasi ribuan keputusan kecil yang konsisten. Keberhasilan hidup adalah produk dari sistem harian kita, bukan target ambisius sesaat.",
    "highlightKilat": [
        "Intisari Atomic Habits bertumpu pada satu kebenaran psikologis: kualitas hidup kita hari ini adalah cerminan langsung dari kebiasaan kecil yang kita ulang setiap hari. Peningkatan 1% setiap hari tampak tidak berarti di awal, tetapi dalam setahun, akumulasinya membuat Anda 37 kali lebih baik melalui efek bunga majemuk perilaku.",
        "Banyak orang gagal bukan karena kurang berambisi, tetapi karena terjebak pada obsesi sasaran (goals). Pemenang dan pecundang sering kali memiliki target yang persis sama. Yang membedakan mereka adalah sistem — rutinitas dan arsitektur harian yang dijalani bahkan ketika motivasi sedang berada di titik terendah.",
        "Kunci agar kebiasaan bertahan selamanya adalah mengubah identitas diri. Alih-alih berusaha menjadi orang yang 'mencoba lari', jadilah 'seorang pelari'. Buktikan identitas baru ini melalui empat hukum perubahan perilaku: Buat Jelas, Buat Menarik, Buat Mudah, dan Buat Memuaskan."
    ],
    "highlightLengkap": [
        {
            "title": "Bagian I: Fondasi Filosofis — Mengapa Kebiasaan Kecil Mengubah Segalanya",
            "body": "Banyak orang keliru mengira bahwa untuk mencapai pencapaian spektakuler, kita harus mengambil tindakan raksasa yang mengguncang dunia. James Clear mematahkan mitos ini dengan konsep 'Aggregation of Marginal Gains' (Akumulasi Keuntungan Marjinal). Bayangkan Anda memperbaiki setiap elemen kecil dalam rutinitas Anda hanya sebesar 1%. Pada hari pertama, peningkatan 1% sama sekali tidak terasa. Pada hari ke-30, Anda mungkin merasa belum ada perubahan fisik atau finansial apa pun. Namun, persis seperti bunga majemuk dalam dunia investasi, kebiasaan melipatgandakan pengaruhnya seiring berjalannya waktu. Dalam kurun waktu satu tahun, jika Anda menjadi 1% lebih baik setiap hari, Anda akan berakhir 37 kali lipat lebih tangguh (1.01^365 = 37.78). Sebaliknya, jika Anda membiarkan kebiasaan buruk mengikis hidup Anda sebesar 1% setiap hari, Anda akan merosot hampir ke titik nol (0.99^365 = 0.03). Waktu adalah pengali keadilan: ia memperbesar kesuksesan bagi mereka yang memiliki kebiasaan baik, dan melipatgandakan kehancuran bagi mereka yang memelihara kebiasaan buruk."
        },
        {
            "title": "Bagian II: Jebakan Obsesi Target vs Kekuatan Membangun Sistem",
            "body": "Hampir setiap awal tahun, jutaan orang menulis resolusi baru dengan target yang muluk: menurunkan berat badan 15 kg, meraup omzet satu miliar, atau membaca 50 buku. Namun riset menunjukkan lebih dari 80% resolusi tersebut kandas sebelum bulan Februari berakhir. Mengapa? Karena kita terbiasa mengagungkan sasaran (goals) dan melupakan sistem (systems). James Clear merumuskan empat kelemahan fatal jika kita hanya berfokus pada sasaran: (1) Pemenang dan pecundang memiliki sasaran yang identik—semua kandidat wawancara kerja ingin diterima, dan semua atlet Olimpiade ingin medali emas. Sasaran tidak membedakan pemenang dari yang kalah. (2) Mencapai sasaran hanyalah kepuasan sesaat. Jika Anda membersihkan kamar yang berantakan karena ada tamu datang, kamar itu bersih hari ini, tetapi sistem kerapian Anda tidak berubah, sehingga tiga hari lagi kamar akan kembali menjadi kapal pecah. (3) Sasaran membatasi kebahagiaan karena menciptakan ilusi mental 'Saya baru boleh bahagia setelah target tercapai'. (4) Sasaran bertentangan dengan kemajuan jangka panjang; begitu lomba lari maraton selesai, banyak pelari berhenti berlatih karena targetnya sudah tercapai. Pemenang sejati bukanlah orang yang terpaku pada garis akhir, melainkan orang yang jatuh cinta pada rutinitas latihan hariannya."
        },
        {
            "title": "Bagian III: Akar Terdalam Perubahan — Transformasi Identitas Diri",
            "body": "Ada tiga tingkatan perubahan perilaku: perubahan hasil (lapisan luar), perubahan proses (lapisan tengah), dan perubahan identitas (lapisan inti terdalam). Masalah kebanyakan orang adalah mereka berusaha mengubah kebiasaan dengan orientasi hasil: 'Saya ingin kurus, jadi saya harus menahan lapar'. Pendekatan ini rapuh karena bertentangan dengan konsep diri di alam bawah sadar. Bentuk perubahan yang paling kokoh dan permanen adalah perubahan berbasis identitas. Ketika seseorang ditawari rokok di sebuah pesta, ada perbedaan psikologis masif antara orang yang menjawab: 'Tidak, terima kasih, saya sedang berusaha berhenti merokok' dengan orang yang menjawab: 'Tidak, terima kasih, saya bukan perokok'. Jawaban pertama menandakan orang tersebut masih memandang dirinya sebagai perokok yang sedang tersiksa menahan diri. Jawaban kedua membuktikan identitas dirinya sudah berganti. Perilaku kita selalu mencerminkan siapa yang kita yakini tentang diri kita sendiri. Bagaimana cara mengubah identitas? Sederhana: lakukan pembuktian kecil berulang kali. Setiap kali Anda menulis satu paragraf, Anda memberikan satu lembar suara (vote) bahwa Anda adalah seorang penulis. Setiap kali Anda memilih makan salad daripada gorengan, Anda memberikan suara bahwa Anda adalah orang yang peduli kesehatan. Anda tidak membutuhkan suara mutlak 100%; Anda hanya membutuhkan kemenangan suara mayoritas secara konsisten."
        },
        {
            "title": "Bagian IV: Lingkaran Kebiasaan Neurosains — Cue, Craving, Response, Reward",
            "body": "Untuk menguasai kebiasaan, kita harus membedah mekanisme kerja otak saat membentuk otomasi rutinitas. Otak manusia berevolusi untuk menghemat energi komputasi. Ketika kita pertama kali menghadapi situasi baru, otak bekerja keras memproses informasi. Namun setelah situasi itu berulang ratusan kali, otak membentuk jalan pintas neurologis yang disebut Lingkaran Kebiasaan (The Habit Loop), yang terdiri dari empat fase tak terpisahkan: (1) Petunjuk (Cue): stimulus visual atau lingkungan yang memberi sinyal kepada otak bahwa ada ganjaran yang bisa didapatkan. (2) Hasrat (Craving): kekuatan motivasi emosional di balik tindakan; kita tidak menginginkan rokoknya, melainkan rasa tenang yang dihasilkannya; kita tidak menginginkan membuka HP, melainkan rasa penasaran akan hiburan baru. (3) Tanggapan (Response): tindakan nyata yang kita lakukan, baik dalam bentuk aksi fisik maupun pikiran. (4) Ganjaran (Reward): kepuasan langsung yang memuaskan hasrat kita dan mengajarkan otak bahwa tindakan ini layak diulang di masa depan. Jika sebuah perilaku gagal di salah satu dari empat tahap ini, ia tidak akan pernah mengkristal menjadi kebiasaan otomatis."
        },
        {
            "title": "Bagian V: Empat Hukum Membentuk Kebiasaan Baik dan Cara Membaliknya",
            "body": "Berdasarkan empat fase neurologis di atas, James Clear menciptakan kerangka praktis yang disebut Empat Hukum Perubahan Perilaku. Hukum Pertama (Petunjuk) adalah 'Buat Terlihat Jelas' (Make it Obvious). Desainlah lingkungan hidup Anda agar pemicu kebiasaan baik terpampang mencolok di depan mata. Hukum Kedua (Hasrat) adalah 'Buat Menarik' (Make it Attractive). Pasangkan aktivitas yang wajib Anda lakukan dengan aktivitas yang sangat Anda sukai (metode Temptation Bundling), karena dopamin manusia memuncak saat mengantisipasi hadiah. Hukum Ketiga (Tanggapan) adalah 'Buat Mudah' (Make it Easy). Kurangi friksi dan hambatan fisik, serta kuasai Aturan Dua Menit agar otak tidak merasa terbebani saat memulai. Hukum Keempat (Ganjaran) adalah 'Buat Memuaskan' (Make it Satisfying). Berikan apresiasi atau penguatan visual seketika aksi selesai dilakukan. Sebaliknya, jika Anda ingin mematikan kebiasaan buruk, cukup balikkan keempat hukum ini: Buat Tidak Terlihat (sembunyikan pemicunya), Buat Tidak Menarik (tekankan kerugian emosionalnya), Buat Sulit (tingkatkan jumlah hambatan fisik), dan Buat Tidak Memuaskan (buat kontrak akuntabilitas)."
        },
        {
            "title": "Bagian VI: Seni Ketahanan Mental — Aturan Dua Hari & Cara Bangkit dari Kegagalan",
            "body": "Perbedaan antara orang sukses dan orang yang gagal bukanlah karena orang sukses tidak pernah berbuat salah. Semua orang pasti pernah mengalami hari yang buruk: jatuh sakit, lembur darurat, atau merasa sangat lelah. Kuncinya terletak pada kecepatan pemulihan. James Clear mengajarkan prinsip emas: 'Jangan pernah meleset dua kali berturut-turut' (Never Miss Twice). Jika Anda melewatkan olahraga pada hari Selasa karena urusan mendadak, pastikan pada hari Rabu Anda berolahraga, meskipun hanya push-up 10 kali atau jalan kaki 5 menit. Meleset sekali adalah ketidaksengajaan yang manusiawi; meleset dua kali adalah awal mula dari terbentuknya kebiasaan buruk yang baru. Keberhasilan jangka panjang adalah tentang menjaga agar rantai konsistensi tidak putus terlalu lama. Jangan menuntut kesempurnaan tanpa cela; tuntutlah kesetiaan untuk selalu kembali ke sistem Anda secepat mungkin."
        }
    ],
    "chapters": [
        {
            "no": 1,
            "title": "Bab 1: Kekuatan Tak Terduga dari Perubahan 1%",
            "summary": "Bab ini dibuka dengan kisah legendaris tim balap sepeda Inggris (British Cycling) di bawah pimpinan Dave Brailsford. Selama 110 tahun, tim Inggris adalah tim medioker yang bahkan tidak dipercaya oleh produsen sepeda Eropa karena dianggap memalukan. Brailsford menerapkan pendekatan radikal: membedah seluruh komponen bersepeda dan memperbaikinya sebesar 1%. Dari mendesain ulang sadel sepeda, mencari gel pijat terbaik untuk pemulihan otot, memilih jenis bantal tidur yang paling nyaman bagi atlet di hotel, hingga mengecat bagian dalam truk peralatan dengan warna putih agar debu sekecil apa pun terlihat. Hasilnya mencengangkan: dalam kurun waktu 10 tahun, tim Inggris mendominasi Tour de France dan memborong 60% medali emas Olimpiade. Inti bab ini membuktikan bahwa perbaikan kecil yang tampak remeh di awal akan mengakumulasi efek eksponensial raksasa jika dipertahankan bertahun-tahun.",
            "points": [
                "Kebiasaan kecil bekerja persis seperti bunga majemuk dalam investasi finansial: dampaknya berlipat ganda seiring waktu.",
                "Fenomena 'Lembah Kekecewaan' (Plateau of Latent Potential): banyak orang berhenti karena hasil nyata baru terlihat setelah melewati ambang batas waktu tertentu.",
                "Waktu akan memperbesar apa pun yang Anda beri makan: kebiasaan baik membuat waktu menjadi kawan, kebiasaan buruk membuat waktu menjadi lawan."
            ]
        },
        {
            "no": 2,
            "title": "Bab 2: Bagaimana Kebiasaan Membentuk Identitas Kita",
            "summary": "James Clear mengupas mengapa sebagian besar diet dan resolusi tahun baru selalu gagal: karena manusia berusaha mengubah perilaku tanpa mengubah keyakinan bawah sadarnya. Bab ini mengajarkan model tiga lapisan perubahan: Hasil (apa yang Anda dapatkan), Proses (apa yang Anda lakukan), dan Identitas (apa yang Anda percayai tentang diri Anda). Perubahan yang sejati terjadi di level identitas. Ketika identitas Anda sudah berubah menjadi 'orang yang menjaga kebugaran tubuh', pergi ke gym bukan lagi sebuah siksaan atau pemaksaan kehendak, melainkan cerminan wajar dari siapa diri Anda. Setiap keputusan harian yang Anda ambil adalah satu lembar suara (voting). Jika Anda ingin menjadi versi terbaik diri Anda, mulailah dengan mengumpulkan bukti-bukti kecil setiap hari bahwa identitas baru itu memang nyata.",
            "points": [
                "Fokuslah pada tipe orang yang ingin Anda bentuk, bukan sekadar angka target yang ingin Anda capai.",
                "Bentuk perlawanan batin paling hebat terjadi ketika tindakan baru bertentangan dengan identitas lama Anda.",
                "Anda tidak membutuhkan pembuktian sempurna 100%; cukup menangkan suara mayoritas dalam tindakan harian Anda."
            ]
        },
        {
            "no": 3,
            "title": "Bab 3: Empat Langkah Sederhana Membangun Kebiasaan Baik",
            "summary": "Melalui penelitian laboratorium neurosains Edward Thorndike tentang kucing dalam kotak teka-teki, Clear menjelaskan bagaimana otak mamalia belajar memecahkan masalah melalui mekanisme trial and error hingga membentuk kebiasaan otomatis. Bab ini memperkenalkan anatomi Lingkaran Kebiasaan yang terdiri dari Petunjuk (Cue), Hasrat (Craving), Tanggapan (Response), dan Ganjaran (Reward). Petunjuk memicu hasrat, hasrat mendorong tanggapan nyata, dan tanggapan menghasilkan ganjaran kepuasan. Empat tahap ini adalah mesin psikologis di balik semua kebiasaan manusia—mulai dari menyikat gigi, merokok, hingga memeriksa notifikasi ponsel setiap 5 menit. Memahami empat pilar ini adalah kunci untuk merancang Empat Hukum Perubahan Perilaku.",
            "points": [
                "Kebiasaan adalah solusi otomatis atas masalah berulang yang dihadapi otak dalam hidup sehari-hari.",
                "Jika sebuah perilaku menghilangkan hasrat atau tidak memberi ganjaran, perilaku itu tidak akan pernah otomatis.",
                "Empat Hukum Perubahan Perilaku adalah tuas praktis untuk mengarahkan respon otak kita sesuai keinginan."
            ]
        },
        {
            "no": 4,
            "title": "Bab 4: Hukum Pertama — Buat Terlihat Jelas (Make it Obvious)",
            "summary": "Banyak orang mengeluh mereka kekurangan motivasi untuk membaca atau berolahraga, padahal masalah sebenarnya adalah ketiadaan kejelasan (lack of clarity). Bab ini membahas dua teknik paling efektif: (1) Implementation Intentions (Niat Implementasi), yaitu menentukan waktu dan tempat spesifik: 'Saya akan [TINDAKAN] pada jam [WAKTU] di [LOKASI]'. Riset membuktikan teknik ini melipatgandakan tingkat kepatuhan hingga 91%. (2) Habit Stacking (Penumpukan Kebiasaan), yaitu menempelkan kebiasaan baru di atas kebiasaan lama yang sudah mapan: 'Setelah saya menyeduh kopi pagi, saya akan menulis jurnal selama 3 menit'. Bab ini juga menekankan bahwa lingkungan fisik memegang kendali lebih besar daripada motivasi internal: orang yang paling disiplin bukanlah yang paling kuat menahan godaan, melainkan yang paling pintar menata mejanya.",
            "points": [
                "Jangan mengandalkan ingatan atau dorongan mood; tetapkan waktu dan tempat yang pasti.",
                "Rumus Habit Stacking: Setelah [Kebiasaan yang Sudah Ada], saya akan [Kebiasaan Baru].",
                "Desain lingkungan Anda: jadikan petunjuk kebiasaan baik besar, kontras, dan mencolok di ruangan Anda."
            ]
        },
        {
            "no": 5,
            "title": "Bab 5: Hukum Kedua — Buat Menarik (Make it Attractive)",
            "summary": "Bab ini membedah neurosains hormon dopamin. James Clear menjelaskan bahwa lonjakan dopamin tertinggi di otak terjadi ketika kita sedang MENGANTISIPASI hadiah, bukan saat kita menikmati hadiah itu sendiri. Itulah mengapa membayangkan liburan sering kali terasa lebih mendebarkan daripada liburan itu sendiri. Untuk memanfaatkan mekanisme ini, Clear memperkenalkan teknik 'Temptation Bundling' (Pemasangan Godaan): menggabungkan tindakan yang HARUS Anda lakukan dengan tindakan yang INGIN Anda lakukan. Contohnya: seorang mahasiswa teknik menyambungkan sepeda statisnya ke Netflix dengan kode khusus—film hanya akan menyala jika dia mengayuh sepeda di atas kecepatan tertentu. Selain itu, bab ini menyoroti kekuatan norma sosial: kita secara alami meniru kebiasaan tiga kelompok: orang terdekat (keluarga/teman), kelompok mayoritas (masyarakat), dan mereka yang berkuasa.",
            "points": [
                "Dopamin adalah bahan bakar biologis dari setiap hasrat dan motivasi bertindak.",
                "Temptation Bundling: Pasangkan kebutuhan disiplin dengan kenikmatan favorit Anda.",
                "Bergabunglah dengan lingkaran sosial di mana kebiasaan ideal Anda merupakan perilaku normal sehari-hari."
            ]
        },
        {
            "no": 6,
            "title": "Bab 6: Hukum Ketiga — Buat Mudah (Make it Easy)",
            "summary": "Dalam bab yang sangat mencerahkan ini, Clear menceritakan eksperimen seorang profesor fotografi di University of Florida. Kelas dibagi dua: kelompok 'Kuantitas' (dinilai murni dari banyaknya foto yang mereka kumpulkan, misal 100 foto mendapat nilai A) dan kelompok 'Kualitas' (hanya perlu mengumpulkan 1 foto terbaik). Di akhir semester, foto-foto paling spektakuler justru lahir dari kelompok Kuantitas! Mengapa? Karena mereka terus-menerus memotret, bereksperimen, dan belajar dari kesalahan, sementara kelompok Kualitas hanya duduk berteori tentang kesempurnaan. Pelajarannya: frekuensi repetisi tindakan jauh lebih berharga daripada durasi waktu. Bab ini juga memperkenalkan 'Aturan Dua Menit' (The Two-Minute Rule): perkecil kebiasaan baru Anda hingga hanya membutuhkan waktu kurang dari 120 detik untuk dimulai. Tujuannya adalah menguasai 'seni hadir dan memulai', karena begitu Anda memulai, momentum akan mengalir dengan sendirinya.",
            "points": [
                "Fokuslah pada jumlah pengulangan (action), bukan sekadar merencanakan kesempurnaan (motion).",
                "Hukum Usaha Terkecil (Law of Least Effort): kurangi friksi fisik antara Anda dan kebiasaan baik.",
                "Aturan Dua Menit: perkecil kebiasaan besar (misal lari maraton) menjadi versi 2 menit (mengikat tali sepatu)."
            ]
        },
        {
            "no": 7,
            "title": "Bab 7: Hukum Keempat — Buat Memuaskan (Make it Satisfying)",
            "summary": "Otak manusia berevolusi di zaman prasejarah dalam lingkungan ganjaran instan (immediate-return environment): berburu makanan hari ini memberi kepuasan kenyang hari ini. Namun dunia modern adalah lingkungan ganjaran tertunda (delayed-return environment): menabung hari ini baru terasa 20 tahun lagi, olahraga hari ini baru membentuk otot beberapa bulan lagi. Karena otak memprioritaskan kepuasan masa kini, kita harus menambahkan sedikit kepuasan instan pada kebiasaan yang hasilnya tertunda. Salah satu alat visual terbaik adalah 'Habit Tracker' (Pelacak Kebiasaan). Memberi tanda centang atau silang pada kalender harian memberikan kepuasan dopamin seketika yang mengonfirmasi bahwa hari ini Anda adalah seorang pemenang. Terakhir, Clear menegaskan Aturan Emas: 'Jangan pernah meleset dua kali berturut-turut'. Menjaga konsistensi bukan berarti tidak pernah gagal, melainkan selalu bangkit di hari berikutnya.",
            "points": [
                "Apa yang langsung dihargai cenderung diulang; apa yang langsung dihukum cenderung dihindari.",
                "Gunakan pelacak kebiasaan (habit tracker) sebagai bukti visual yang memuaskan ego produktif Anda.",
                "Patuhi Aturan Jangan Pernah Meleset Dua Kali: pulihlah secepat kilat ketika Anda sempat tergelincir."
            ]
        }
    ],
    "frameworkData": [
        {"id": "hukum1", "name": "1. Buat Jelas", "subtitle": "Hukum Pertama (Fase Petunjuk / Cue)", "principle": "Kebiasaan dimulai dari pemicu visual dan kejelasan tempat serta waktu.", "goodTactic": "Letakkan buku di atas bantal pagi hari, atau taruh botol minum persis di samping laptop sebelum mulai kerja.", "badTactic": "Sembunyikan pemicunya: simpan camilan manis di lemari tertinggi, atau letakkan ponsel di luar kamar saat jam istirahat."},
        {"id": "hukum2", "name": "2. Buat Menarik", "subtitle": "Hukum Kedua (Fase Hasrat / Craving)", "principle": "Antisipasi dopamin mendorong kemauan untuk bertindak.", "goodTactic": "Pasangkan kebiasaan (Temptation Bundling): hanya izinkan diri menonton serial Netflix favorit saat sedang mengayuh sepeda statis.", "badTactic": "Soroti konsekuensi buruknya secara nyata di depan mata: hitung total uang yang terbuang sia-sia akibat rokok atau judi."},
        {"id": "hukum3", "name": "3. Buat Mudah", "subtitle": "Hukum Ketiga (Fase Respon / Action)", "principle": "Energi manusia sangat berharga dan otak secara alami memilih jalur dengan hambatan terkecil.", "goodTactic": "Aturan 2 Menit: jangan berniat membaca 1 jam, cukup niatkan membuka 1 halaman. Begitu Anda mulai, hambatan mental runtuh.", "badTactic": "Tambah gesekan setinggi mungkin: cabut baterai remote TV, atau gunakan ekstensi browser yang mengunci media sosial selama 8 jam kerja."},
        {"id": "hukum4", "name": "4. Buat Memuaskan", "subtitle": "Hukum Keempat (Fase Ganjaran / Reward)", "principle": "Perasaan berhasil langsung di saat itu juga adalah sinyal yang memberi tahu otak untuk mengulangi tindakan besok.", "goodTactic": "Beri tanda centang tebal di kalender (Habit Tracker) begitu selesai. Melihat rantai keberhasilan memberi suntikan kepuasan instan.", "badTactic": "Buat kontrak akuntabilitas: jika melanggar komitmen, Anda wajib mentransfer Rp 100.000 ke rekening teman atau lembaga sosial."}
    ],
    "checklistActions": [
        "Pasang 1 pemicu visual kebiasaan baru di tempat yang paling sering Anda lihat besok pagi (misal: botol minum / buku di meja kerja).",
        "Tuliskan niat implementasi konkret: 'Saya akan [Aksi] pada jam [Waktu] di [Ruangan/Tempat]'.",
        "Gunakan rumus Habit Stacking: 'Tepat setelah saya [Kebiasaan Lama], saya akan langsung [Kebiasaan Baru 2 Menit]'.",
        "Singkirkan 1 pemicu kebiasaan buruk dari pandangan Anda hari ini (misal: log out medsos atau sembunyikan aplikasi game).",
        "Gunakan prinsip Aturan Dua Hari: jika sempat meleset satu hari, pastikan keesokan harinya Anda kembali melakukannya."
    ]
})

print("Atomic Habits prepared successfully.")
