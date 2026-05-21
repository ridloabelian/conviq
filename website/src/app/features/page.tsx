import Link from "next/link";
import {
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
  MessagesSquare,
  Bot,
  Sparkles,
  BookOpen,
  Zap,
  MousePointerClick,
  StickyNote,
  AtSign,
  FileText,
  Tag,
  Building2,
  Clock,
  Reply,
  BarChart3,
  Timer,
  CheckCircle2,
  TrendingUp,
  Star,
  Users,
  Search,
  HelpCircle,
  UserCheck,
  Code2,
  Webhook,
  Hash,
  Languages,
  ShoppingBag,
  LayoutDashboard,
  Blocks,
  ArrowRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "Fitur",
  description:
    "Semua fitur yang Anda butuhkan untuk customer support terbaik — omnichannel, AI, kolaborasi, analitik, dan integrasi.",
};

const channels = [
  {
    icon: MessageSquare,
    name: "Live Chat",
    description:
      "Widget chat yang bisa di-embed di website Anda. Kustomisasi warna, posisi, dan pesan sambutan sesuai brand.",
  },
  {
    icon: Mail,
    name: "Email",
    description:
      "Terima dan balas email langsung dari dashboard. Mendukung IMAP, SMTP, dan forwarding otomatis.",
  },
  {
    icon: Phone,
    name: "WhatsApp",
    description:
      "Integrasi via WhatsApp Business API (Cloud). Kirim template, media, dan balasan interaktif.",
  },
  {
    icon: Instagram,
    name: "Instagram",
    description:
      "Tanggapi DM dan komentar Instagram langsung dari inbox terpadu Anda. Tidak perlu buka aplikasi terpisah.",
  },
  {
    icon: Facebook,
    name: "Facebook",
    description:
      "Kelola pesan dari Facebook Messenger dan komentar halaman Facebook bisnis Anda dalam satu tempat.",
  },
  {
    icon: Send,
    name: "Telegram",
    description:
      "Hubungkan bot Telegram untuk menerima dan membalas pesan pelanggan secara real-time.",
  },
  {
    icon: MessageCircle,
    name: "LINE",
    description:
      "Integrasikan LINE Official Account dan tangani percakapan pelanggan langsung dari Conviq.",
  },
  {
    icon: Globe,
    name: "API Channel",
    description:
      "Buat channel kustom via API untuk menghubungkan platform pesan apa pun yang Anda gunakan.",
  },
  {
    icon: MessagesSquare,
    name: "SMS",
    description:
      "Terima dan balas pesan SMS melalui penyedia seperti Twilio. Cocok untuk notifikasi dan follow-up.",
  },
];

const aiFeatures = [
  {
    icon: Bot,
    name: "Captain Assistant",
    description:
      "Chatbot AI yang menjawab pertanyaan pelanggan secara otomatis berdasarkan artikel di help center Anda. Kurangi beban tim hingga 40%.",
  },
  {
    icon: Sparkles,
    name: "Captain Co-Pilot",
    description:
      "Asisten AI untuk agen — bantu draft balasan, perbaiki tata bahasa, rangkum percakapan, dan terjemahkan pesan ke berbagai bahasa.",
  },
  {
    icon: BookOpen,
    name: "Smart FAQ",
    description:
      "Analisis percakapan untuk mengidentifikasi pertanyaan yang sering ditanyakan dan gap di knowledge base Anda secara otomatis.",
  },
  {
    icon: Zap,
    name: "Aturan Otomasi",
    description:
      "Buat workflow if-this-then-that: auto-assign, auto-label, notifikasi, atau eskalasi berdasarkan kondisi percakapan.",
  },
  {
    icon: MousePointerClick,
    name: "Makro",
    description:
      "Simpan rangkaian aksi yang sering dilakukan dan jalankan dengan satu klik. Hemat waktu untuk tugas berulang setiap hari.",
  },
];

const collabFeatures = [
  {
    icon: StickyNote,
    name: "Catatan Pribadi",
    description:
      "Tambahkan catatan internal di percakapan yang hanya terlihat oleh tim — sempurna untuk konteks serah-terima antar agen.",
  },
  {
    icon: AtSign,
    name: "@Mention",
    description:
      "Sebut rekan tim di catatan untuk meminta bantuan atau informasi tanpa meninggalkan percakapan.",
  },
  {
    icon: FileText,
    name: "Balasan Template",
    description:
      "Simpan balasan yang sering digunakan sebagai template. Sisipkan dengan shortcut dan personalisasi otomatis.",
  },
  {
    icon: Tag,
    name: "Label & Organisasi",
    description:
      "Kategorikan percakapan dengan label kustom. Filter dan cari berdasarkan label untuk analisis lebih mudah.",
  },
  {
    icon: Building2,
    name: "Multi-Brand Inbox",
    description:
      "Kelola beberapa brand atau produk dalam satu akun Conviq. Setiap inbox memiliki pengaturan dan channel terpisah.",
  },
  {
    icon: Clock,
    name: "Jam Operasional",
    description:
      "Atur jam kerja tim Anda. Pesan di luar jam kerja akan mendapat auto-responder yang sudah dikustomisasi.",
  },
  {
    icon: Reply,
    name: "Auto-Responder",
    description:
      "Kirim balasan otomatis saat pelanggan menghubungi di luar jam kerja atau saat semua agen sedang sibuk.",
  },
];

const reportFeatures = [
  {
    icon: Timer,
    name: "Waktu Respons",
    description:
      "Pantau first response time dan average resolution time. Tetapkan SLA dan dapatkan alert jika terlewat.",
  },
  {
    icon: CheckCircle2,
    name: "Tingkat Resolusi",
    description:
      "Lihat persentase percakapan yang diselesaikan dan tren resolusi dari waktu ke waktu.",
  },
  {
    icon: TrendingUp,
    name: "Performa per Channel",
    description:
      "Bandingkan volume dan kinerja setiap channel — identifikasi channel mana yang paling efektif.",
  },
  {
    icon: Star,
    name: "Survei CSAT",
    description:
      "Kumpulkan feedback kepuasan pelanggan setelah percakapan selesai. Lihat tren skor CSAT secara real-time.",
  },
  {
    icon: Users,
    name: "Metrik Agen",
    description:
      "Lacak produktivitas setiap agen: jumlah percakapan ditangani, waktu online, dan rating kepuasan.",
  },
];

const helpCenterFeatures = [
  {
    icon: BookOpen,
    name: "Knowledge Base",
    description:
      "Buat dan kelola artikel bantuan yang terstruktur. Dukung pelanggan untuk menemukan jawaban sendiri 24/7.",
  },
  {
    icon: Search,
    name: "Pencarian Cerdas",
    description:
      "Pelanggan bisa mencari jawaban dengan pencarian full-text yang cepat dan relevan di seluruh artikel Anda.",
  },
  {
    icon: HelpCircle,
    name: "FAQ & Kategori",
    description:
      "Organisasikan artikel dalam kategori dan sub-kategori. Buat halaman FAQ yang mudah dinavigasi.",
  },
  {
    icon: UserCheck,
    name: "Portal Pelanggan",
    description:
      "Pelanggan bisa melacak tiket, melihat riwayat percakapan, dan mengakses artikel bantuan dari portal mandiri.",
  },
];

const integrationFeatures = [
  {
    icon: Code2,
    name: "REST API",
    description:
      "API lengkap untuk mengintegrasikan Conviq dengan sistem internal Anda — CRM, ERP, atau platform apa pun.",
  },
  {
    icon: Webhook,
    name: "Webhooks",
    description:
      "Dapatkan notifikasi real-time ke server Anda saat event terjadi — pesan baru, percakapan selesai, dan lainnya.",
  },
  {
    icon: Hash,
    name: "Slack",
    description:
      "Terima notifikasi percakapan baru dan balas langsung dari Slack tanpa perlu buka dashboard Conviq.",
  },
  {
    icon: Bot,
    name: "Dialogflow",
    description:
      "Hubungkan bot Dialogflow untuk otomasi percakapan yang lebih canggih dengan natural language understanding.",
  },
  {
    icon: ShoppingBag,
    name: "Shopify",
    description:
      "Lihat detail pesanan dan informasi pelanggan Shopify langsung di sidebar percakapan saat melayani.",
  },
  {
    icon: LayoutDashboard,
    name: "Linear",
    description:
      "Buat issue Linear langsung dari percakapan. Lacak status issue tanpa meninggalkan Conviq.",
  },
  {
    icon: Languages,
    name: "Google Translate",
    description:
      "Terjemahkan pesan masuk dan keluar secara otomatis. Layani pelanggan global tanpa batasan bahasa.",
  },
  {
    icon: Blocks,
    name: "Dashboard Apps",
    description:
      "Embed aplikasi pihak ketiga langsung di dashboard Conviq. Tampilkan data CRM, analytics, atau tool lainnya.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              50+ fitur
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight mb-6">
              Semua yang Anda Butuhkan untuk{" "}
              <span className="text-primary">Customer Support</span> Terbaik
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Platform komprehensif yang menyatukan semua channel komunikasi,
              AI cerdas, kolaborasi tim, dan analitik mendalam — semua dalam
              satu dashboard yang intuitif dan mudah digunakan.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Omnichannel ── */}
      <section id="omnichannel" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Channel
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
                Inbox Omnichannel Terpadu
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                Satu inbox untuk semua channel. Tidak perlu lagi berpindah
                antar platform — semua percakapan pelanggan ada di satu tempat.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel, i) => (
              <AnimatedSection key={channel.name} delay={i * 0.05}>
                <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <channel.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">
                    {channel.name}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {channel.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI & Automation ── */}
      <section id="ai" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Kecerdasan Buatan
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
                AI & Otomasi
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                Kurangi beban kerja tim dengan AI yang membantu menjawab
                pertanyaan, menulis balasan, dan mengotomasi tugas repetitif.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, i) => (
              <AnimatedSection key={feature.name} delay={i * 0.05}>
                <div className="relative bg-gradient-to-br from-secondary to-secondary-light rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collaboration ── */}
      <section id="collaboration" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Tim
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
                Kolaborasi & Produktivitas
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                Alat-alat yang membuat tim Anda bekerja lebih cepat dan
                terkoordinasi — dari catatan internal hingga template balasan.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {collabFeatures.map((feature, i) => (
              <AnimatedSection key={feature.name} delay={i * 0.05}>
                <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-secondary mb-1.5">
                    {feature.name}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reporting ── */}
      <section id="reporting" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Data
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
                Laporan & Analitik
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                Pahami performa tim dan kepuasan pelanggan dengan laporan
                real-time yang actionable dan mudah dipahami.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportFeatures.map((feature, i) => (
              <AnimatedSection key={feature.name} delay={i * 0.05}>
                <div className="bg-surface rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Help Center ── */}
      <section id="helpcenter" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Self-Service
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
                Portal Help Center
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                Berdayakan pelanggan untuk menemukan jawaban sendiri dengan
                knowledge base yang terorganisir dan portal mandiri 24/7.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {helpCenterFeatures.map((feature, i) => (
              <AnimatedSection key={feature.name} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section id="integrations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Ekosistem
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
                Integrasi & Kustomisasi
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                Hubungkan Conviq dengan tools favorit Anda. REST API, webhooks,
                dan integrasi siap pakai untuk memperluas kemampuan platform.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {integrationFeatures.map((feature, i) => (
              <AnimatedSection key={feature.name} delay={i * 0.04}>
                <div className="bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-secondary mb-1.5">
                    {feature.name}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-gradient-to-br from-secondary via-secondary-light to-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Mulai Gunakan Conviq Sekarang
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                Bergabung dengan ribuan bisnis yang sudah meningkatkan customer
                support mereka. Gratis untuk memulai, tanpa perlu kartu kredit.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
                >
                  Lihat Harga & Mulai Gratis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/features#omnichannel"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-xl transition-colors text-base backdrop-blur-sm"
                >
                  Jelajahi Fitur
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
