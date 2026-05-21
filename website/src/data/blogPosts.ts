export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tag: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bagaimana-ai-mengubah-layanan-pelanggan-indonesia",
    title: "Bagaimana AI Mengubah Layanan Pelanggan di Indonesia di Tahun 2026",
    excerpt: "Evolusi teknologi artificial intelligence kini tidak lagi sekadar tren teknologi, melainkan kebutuhan krusial bisnis di Indonesia untuk meningkatkan kepuasan pelanggan secara instan dan efisien.",
    category: "Teknologi AI",
    tag: "AI & Otomatisasi",
    date: "20 Mei 2026",
    readTime: "6 Menit Baca",
    author: {
      name: "Budi Santoso",
      role: "Head of AI Product Conviq",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
    },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=450&q=80",
    featured: true,
    content: `
      <p class="text-lg leading-relaxed text-slate-700 mb-6">
        Layanan pelanggan (customer support) di Indonesia sedang mengalami revolusi besar-besaran. Jika beberapa tahun lalu otomatisasi dirasa kaku karena chatbot berbasis aturan (rule-based) yang sering kali membingungkan pelanggan, kini di tahun 2026, implementasi <strong>Generative AI</strong> telah mengubah segalanya.
      </p>

      <h2 class="text-2xl font-bold text-secondary mt-8 mb-4">Mengapa AI Generatif Berbeda?</h2>
      <p class="text-slate-600 mb-4">
        Berbeda dengan teknologi chatbot lama yang hanya bisa menjawab berdasarkan pilihan tombol atau kata kunci eksak, AI modern seperti <strong>Captain AI</strong> dari Conviq mampu memahami konteks percakapan dalam Bahasa Indonesia dengan sangat alami, lengkap dengan gaya bahasa kasual, singkatan, hingga bahasa 'gaul' yang umum digunakan pelanggan Indonesia sehari-hari.
      </p>
      <p class="text-slate-600 mb-6">
        AI kini bertindak sebagai asisten cerdas yang tidak hanya membalas cepat, tetapi juga mampu memberikan empati, menganalisis riwayat percakapan sebelumnya, hingga menawarkan solusi yang sangat presisi layaknya agen manusia profesional.
      </p>

      <div class="bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
        <p class="italic text-slate-800 font-medium">
          "Bisnis di Indonesia yang mengadopsi customer support bertenaga AI di tahun 2025/2026 mencatat kenaikan Customer Satisfaction Score (CSAT) rata-rata sebesar 34% dan penurunan First Response Time (FRT) hingga di bawah 10 detik."
        </p>
      </div>

      <h2 class="text-2xl font-bold text-secondary mt-8 mb-4">Manfaat Utama Otomatisasi AI bagi Bisnis Lokal</h2>
      <ul class="list-disc pl-6 space-y-3 text-slate-600 mb-6">
        <li><strong>Operasional 24/7 Tanpa Henti:</strong> Pelanggan Indonesia sangat suka berbelanja atau bertanya di luar jam kerja resmi (malam hari atau akhir pekan). AI memastikan setiap pertanyaan langsung terjawab detik itu juga.</li>
        <li><strong>Skalabilitas Tanpa Batas:</strong> Menangani 100 atau 10.000 chat secara bersamaan bukan lagi masalah. AI menyelesaikannya secara instan tanpa antrean panjang.</li>
        <li><strong>Pengurangan Biaya Operasional:</strong> Mengurangi beban kerja repetitif tim support Anda, memungkinkan mereka fokus menangani isu kompleks dan berharga tinggi.</li>
        <li><strong>Analitis Sentimen Real-Time:</strong> AI dapat mendeteksi emosi pelanggan (marah, kecewa, senang) sehingga percakapan sensitif bisa langsung dialihkan ke agen manusia secara mulus.</li>
      </ul>

      <h2 class="text-2xl font-bold text-secondary mt-8 mb-4">Mulai Transformasi AI Bersama Conviq</h2>
      <p class="text-slate-600 mb-6">
        Dengan Conviq, Anda mendapatkan asisten AI khusus bernama <strong>Captain AI</strong> yang dilatih langsung menggunakan basis data pengetahuan (knowledge base) bisnis Anda sendiri. Cukup upload dokumen PDF, FAQ, atau link website Anda, dan dalam hitungan menit, AI Anda siap menjawab jutaan pelanggan dengan cerdas dan akurat.
      </p>
    `
  },
  {
    slug: "panduan-integrasi-whatsapp-business-api-ecommerce",
    title: "Panduan Sukses Integrasi WhatsApp Business API untuk E-Commerce Anda",
    excerpt: "WhatsApp adalah saluran komunikasi nomor satu di Indonesia. Pelajari panduan lengkap mengintegrasikan WhatsApp Business API ke platform e-commerce Anda untuk dongkrak penjualan.",
    category: "WhatsApp",
    tag: "Strategi Bisnis",
    date: "18 Mei 2026",
    readTime: "5 Menit Baca",
    author: {
      name: "Rian Hidayat",
      role: "Solutions Architect Conviq",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&h=450&q=80",
    content: `
      <p class="text-lg leading-relaxed text-slate-700 mb-6">
        Lebih dari 80% pengguna internet di Indonesia berkomunikasi melalui WhatsApp setiap hari. Bagi e-commerce, mengabaikan saluran ini sama saja dengan membiarkan kompetitor merebut hati pelanggan Anda.
      </p>

      <h2 class="text-2xl font-bold text-secondary mt-8 mb-4">Mengapa WhatsApp Business API Penting?</h2>
      <p class="text-slate-600 mb-4">
        Aplikasi WhatsApp Business biasa memiliki batasan kuota perangkat yang sangat minim dan rentan terkena blokir jika mengirim pesan massal. Di sinilah <strong>WhatsApp Business API</strong> hadir sebagai solusi resmi skala perusahaan.
      </p>
      <p class="text-slate-600 mb-6">
        Dengan API resmi, Anda dapat mengintegrasikan pesan WhatsApp secara otomatis dengan sistem pemesanan e-commerce, mengirimkan update resi pengiriman, hingga menyediakan tombol interaktif untuk mempermudah checkout pelanggan.
      </p>

      <h2 class="text-2xl font-bold text-secondary mt-8 mb-4">Langkah-Langkah Integrasi WhatsApp API di Conviq</h2>
      <ol class="list-decimal pl-6 space-y-3 text-slate-600 mb-6">
        <li><strong>Dapatkan Verifikasi Meta Business Manager:</strong> Siapkan dokumen resmi bisnis seperti NIB atau SIUP untuk mengajukan centang hijau dan verifikasi profil bisnis Anda di Meta.</li>
        <li><strong>Gunakan Penyedia Layanan Resmi (BSP):</strong> Conviq mendukung integrasi langsung dengan BSP terkemuka seperti Twilio, 360dialog, dan Gupshup dengan tarif lokal yang sangat hemat.</li>
        <li><strong>Hubungkan Inbox WhatsApp ke Dashboard Conviq:</strong> Masuk ke Dashboard Conviq -> Pengaturan -> Inbox -> Tambah Inbox baru -> Pilih WhatsApp. Masukkan kredensial API Key yang Anda dapatkan.</li>
        <li><strong>Konfigurasi Balasan Otomatis & Alur Distribusi:</strong> Atur jam kerja, template pesan selamat datang, dan alokasikan percakapan otomatis ke agen support yang tepat secara adil.</li>
      </ol>

      <div class="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-8">
        <p class="text-slate-800 font-medium">
          <strong>Tips Sukses:</strong> Selalu gunakan tombol interaktif (Quick Replies & Call-to-Action) di dalam template WhatsApp Anda. Tombol ini terbukti menaikkan respons rate pelanggan hingga 2.5x lipat dibanding teks biasa!
        </p>
      </div>

      <h2 class="text-2xl font-bold text-secondary mt-8 mb-4">Hasil Nyata bagi Penjualan Anda</h2>
      <p class="text-slate-600 mb-6">
        Dengan mengintegrasikan WhatsApp Business API melalui Conviq, tim support Anda dapat berkolaborasi di satu nomor WhatsApp yang sama dari puluhan komputer atau smartphone agen secara simultan, melacak kepuasan pelanggan secara real-time, dan mengaktifkan AI Copilot untuk mempercepat balasan ke pelanggan.
      </p>
    `
  },
  {
    slug: "keunggulan-platform-customer-support-open-source",
    title: "Mengapa Menggunakan Platform Customer Support Open-Source Lebih Baik?",
    excerpt: "Keamanan data, fleksibilitas kustomisasi penuh, dan efisiensi biaya jangka panjang menjadi alasan utama ribuan developer dan startup beralih ke solusi open-source seperti Conviq.",
    category: "Layanan Pelanggan",
    tag: "Open Source",
    date: "15 Mei 2026",
    readTime: "4 Menit Baca",
    author: {
      name: "Siti Rahmawati",
      role: "Community Advocate Conviq",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
    },
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&h=450&q=80",
    content: `
      <p class="text-lg leading-relaxed text-slate-700 mb-6">
        Dalam memilih perangkat lunak (software) layanan pelanggan, keputusan besar pertama yang dihadapi perusahaan adalah memilih antara SaaS proprietary tertutup atau solusi <strong>open-source</strong> yang transparan dan dapat dikendalikan penuh.
      </p>

      <h2 class="text-2xl font-bold text-secondary mt-8 mb-4">Kedaulatan Data & Keamanan Penuh</h2>
      <p class="text-slate-600 mb-4">
        Bagi industri dengan regulasi ketat seperti FinTech, EduTech, dan Pemerintahan di Indonesia, menyimpan data percakapan pelanggan yang sensitif di server pihak ketiga sering kali melanggar hukum perlindungan data pribadi (UU PDP).
      </p>
      <p class="text-slate-600 mb-6">
        Dengan solusi open-source seperti <strong>Conviq</strong>, Anda dapat men-deploy aplikasi secara penuh di infrastruktur server cloud Anda sendiri (seperti Google Cloud, AWS, atau Alibaba Cloud lokal Indonesia). Anda memiliki kendali 100% atas basis data tanpa ada kebocoran informasi ke pihak luar.
      </p>

      <h2 class="text-2xl font-bold text-secondary mt-8 mb-4">Kebebasan Tanpa Batasan Kustomisasi</h2>
      <p class="text-slate-600 mb-4">
        Aplikasi tertutup memaksa Anda mengikuti alur kerja yang mereka sediakan. Jika Anda butuh integrasi custom ke CRM lokal perusahaan atau sistem pergudangan internal, Anda harus membayar biaya integrasi yang luar biasa mahal.
      </p>
      <p class="text-slate-600 mb-6">
        Solusi open-source memberi Anda akses langsung ke seluruh kode sumber (source code). Developer Anda dapat memodifikasi UI, menambahkan fungsionalitas backend khusus, hingga membuat integrasi kustom tanpa batas apa pun.
      </p>

      <div class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg my-8">
        <p class="text-slate-800 font-medium">
          <strong>Kesimpulan Hemat:</strong> Biaya berlangganan SaaS tertutup akan membengkak secara eksponensial seiring bertambahnya jumlah agen support Anda. Di Conviq open-source, Anda bisa menambahkan ratusan agen support secara gratis tanpa dikenakan biaya per kursi tambahan!
        </p>
      </div>

      <h2 class="text-2xl font-bold text-secondary mt-8 mb-4">Komunitas Global & Kecepatan Inovasi</h2>
      <p class="text-slate-600 mb-6">
        Conviq didukung oleh komunitas developer dunia yang aktif berkontribusi memperbaiki bug, memperketat keamanan, dan menelurkan fitur baru setiap minggunya. Ini menjamin perangkat lunak Anda selalu up-to-date dengan standar teknologi terbaru secara gratis.
      </p>
    `
  }
];
