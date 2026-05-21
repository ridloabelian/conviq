"use client";

import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Instagram,
  Facebook,
  Send,
  MessageSquare,
  MessageSquareText,
  Smartphone,
  Music,
  Sparkles,
  Bot,
  FileText,
  Users,
  StickyNote,
  BookTemplate,
  UserCheck,
  Tag,
  Clock,
  Building2,
  BarChart3,
  Timer,
  CheckCircle2,
  Star,
  TrendingUp,
  Puzzle,
  ArrowRight,
  Zap,
  Globe,
  Webhook,
  Code2,
  MessagesSquare,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const channels = [
  {
    icon: MessageCircle,
    name: "WhatsApp",
    description: "Kelola pesan WhatsApp Business langsung dari dashboard",
    color: "from-green-400 to-green-600",
  },
  {
    icon: Mail,
    name: "Email",
    description: "Inbox bersama untuk seluruh tim support Anda",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Instagram,
    name: "Instagram",
    description: "Balas DM dan komentar Instagram secara real-time",
    color: "from-pink-400 to-purple-600",
  },
  {
    icon: Facebook,
    name: "Facebook",
    description: "Messenger dan komentar Facebook dalam satu tempat",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Send,
    name: "Telegram",
    description: "Integrasikan bot Telegram untuk support instan",
    color: "from-sky-400 to-sky-600",
  },
  {
    icon: MessageSquare,
    name: "LINE",
    description: "Terhubung dengan pelanggan via LINE Official Account",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    icon: MessagesSquare,
    name: "Live Chat",
    description: "Widget live chat yang bisa dipasang di website Anda",
    color: "from-primary to-primary-dark",
  },
  {
    icon: Smartphone,
    name: "SMS",
    description: "Kirim dan terima SMS langsung dari dashboard",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Music,
    name: "TikTok",
    description: "Kelola pesan dan komentar TikTok Shop Anda",
    color: "from-gray-700 to-gray-900",
  },
];

const aiFeatures = [
  {
    icon: Sparkles,
    title: "Auto-reply Cerdas",
    description:
      "AI membalas pertanyaan umum secara otomatis berdasarkan knowledge base Anda",
  },
  {
    icon: Bot,
    title: "Saran Balasan AI",
    description:
      "Dapatkan saran balasan yang relevan dan personal untuk setiap percakapan",
  },
  {
    icon: FileText,
    title: "Rangkuman Percakapan",
    description:
      "AI merangkum percakapan panjang agar agen bisa langsung memahami konteks",
  },
  {
    icon: Users,
    title: "Co-pilot untuk Agen",
    description:
      "Asisten AI yang mendampingi agen saat menyelesaikan tiket kompleks",
  },
];

const collaborationFeatures = [
  {
    icon: StickyNote,
    title: "Catatan Pribadi",
    description:
      "Tambahkan catatan internal yang hanya terlihat oleh tim Anda untuk koordinasi yang lebih baik",
  },
  {
    icon: BookTemplate,
    title: "Balasan Template",
    description:
      "Buat template balasan siap pakai untuk mempercepat waktu respons hingga 3x lipat",
  },
  {
    icon: UserCheck,
    title: "Penugasan Otomatis",
    description:
      "Distribusikan percakapan secara otomatis ke agen yang tepat berdasarkan keahlian",
  },
  {
    icon: Tag,
    title: "Label & Kategori",
    description:
      "Kategorikan percakapan dengan label untuk pelacakan dan laporan yang lebih akurat",
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    description:
      "Atur jam kerja dan pesan otomatis di luar jam operasional untuk ekspektasi yang jelas",
  },
  {
    icon: Building2,
    title: "Multi-brand",
    description:
      "Kelola beberapa brand atau produk dari satu akun dengan inbox terpisah",
  },
];

const stats = [
  {
    icon: Timer,
    label: "Waktu Respons",
    value: "< 2 menit",
    description: "Rata-rata waktu respons pertama",
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: CheckCircle2,
    label: "Tingkat Resolusi",
    value: "94%",
    description: "Tiket terselesaikan dalam sesi pertama",
    gradient: "from-accent/10 to-accent/5",
    iconColor: "text-accent-dark",
  },
  {
    icon: Star,
    label: "Kepuasan Pelanggan",
    value: "4.8/5",
    description: "Skor rata-rata CSAT dari pelanggan",
    gradient: "from-amber-100 to-amber-50",
    iconColor: "text-amber-500",
  },
  {
    icon: TrendingUp,
    label: "Performa Agen",
    value: "+40%",
    description: "Peningkatan produktivitas dengan AI",
    gradient: "from-purple-100 to-purple-50",
    iconColor: "text-purple-500",
  },
];

const integrations = [
  { name: "Slack", icon: MessagesSquare, color: "text-purple-600" },
  { name: "Shopify", icon: Building2, color: "text-green-600" },
  { name: "Linear", icon: TrendingUp, color: "text-indigo-600" },
  { name: "Google Translate", icon: Globe, color: "text-blue-500" },
  { name: "Dialogflow", icon: Bot, color: "text-amber-500" },
];

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-white to-surface">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              Open-source &amp; bertenaga AI
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-secondary leading-tight max-w-4xl mx-auto">
              Platform Customer Support{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Bertenaga AI
              </span>
              , Open-Source
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Self-host di infrastruktur Anda sendiri atau gunakan cloud kami.
              Kelola semua percakapan pelanggan dari berbagai channel dalam satu
              dashboard terpadu.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Mulai Gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/80 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-secondary transition-all duration-300 hover:bg-surface hover:border-primary/30 hover:-translate-y-0.5"
              >
                Lihat Fitur
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-muted">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-medium">10,000+ bisnis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium">15+ channel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="font-medium">Open source</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── OMNICHANNEL ─── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
              Semua Channel dalam{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Satu Dashboard
              </span>
            </h2>
            <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
              Tidak perlu berpindah aplikasi. Semua pesan dari berbagai platform
              hadir di satu tempat untuk pengalaman support yang mulus.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {channels.map((channel, idx) => (
              <AnimatedSection key={channel.name} delay={idx * 0.05}>
                <div className="group relative rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${channel.color} text-white shadow-lg mb-4`}
                  >
                    <channel.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary">
                    {channel.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {channel.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI SECTION ─── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-surface to-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left – features */}
            <div>
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-dark mb-6">
                  <Sparkles className="h-4 w-4" />
                  Powered by AI
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
                  Captain AI —{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Asisten Cerdas
                  </span>{" "}
                  untuk Tim Anda
                </h2>
                <p className="mt-4 text-muted text-lg leading-relaxed">
                  Tingkatkan produktivitas tim support Anda dengan AI yang
                  memahami konteks percakapan dan memberikan bantuan yang
                  relevan.
                </p>
              </AnimatedSection>

              <div className="mt-10 space-y-5">
                {aiFeatures.map((feature, idx) => (
                  <AnimatedSection key={feature.title} delay={0.1 + idx * 0.1}>
                    <div className="flex gap-4 group">
                      <div className="flex-shrink-0 mt-1 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted mt-0.5 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Right – decorative card */}
            <AnimatedSection delay={0.2}>
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 blur-2xl" />

                <div className="relative rounded-2xl bg-gradient-to-br from-secondary to-secondary-light p-8 shadow-2xl">
                  {/* Chat mockup */}
                  <div className="space-y-4">
                    {/* Customer message */}
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-white">
                        P
                      </div>
                      <div className="rounded-2xl rounded-tl-sm bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm text-white/90 max-w-xs">
                        Halo, saya ingin tahu status pesanan saya #12345.
                        Sudah 3 hari belum sampai.
                      </div>
                    </div>

                    {/* AI suggestion */}
                    <div className="ml-11 rounded-xl border border-accent/30 bg-accent/10 backdrop-blur-sm px-4 py-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-accent mb-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        Saran dari Captain AI
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">
                        Pesanan #12345 sedang dalam proses pengiriman oleh JNE
                        (REG). Estimasi tiba: besok, 22 Mei. Resi:
                        JP1234567890.
                      </p>
                    </div>

                    {/* Agent response */}
                    <div className="flex gap-3 justify-end">
                      <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-white max-w-xs">
                        Halo! Pesanan Anda sedang dikirim oleh JNE dan estimasi
                        sampai besok. Nomor resi: JP1234567890 😊
                      </div>
                      <div className="h-8 w-8 rounded-full bg-accent/30 flex items-center justify-center text-xs font-bold text-white">
                        A
                      </div>
                    </div>

                    {/* Typing indicator */}
                    <div className="flex items-center gap-2 ml-11 text-white/40 text-xs">
                      <div className="flex gap-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse delay-100" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse delay-200" />
                      </div>
                      Captain AI sedang menganalisis...
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── COLLABORATION ─── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
              Kolaborasi Tim yang{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Efisien
              </span>
            </h2>
            <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
              Fitur kolaborasi yang dirancang agar seluruh tim bisa bekerja
              bersama dengan lancar, tanpa miskomunikasi.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborationFeatures.map((feature, idx) => (
              <AnimatedSection key={feature.title} delay={idx * 0.05}>
                <div className="group relative rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 h-full">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ANALYTICS ─── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-surface to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
              Laporan &amp; Analitik{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Real-time
              </span>
            </h2>
            <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
              Pantau metrik penting dan buat keputusan berbasis data untuk terus
              meningkatkan kualitas layanan pelanggan Anda.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <AnimatedSection key={stat.label} delay={idx * 0.1}>
                <div
                  className={`group relative rounded-2xl bg-gradient-to-br ${stat.gradient} border border-border p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                >
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm mb-4 ${stat.iconColor}`}
                  >
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div className="text-3xl font-bold text-secondary">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-secondary mt-1">
                    {stat.label}
                  </div>
                  <p className="text-xs text-muted mt-2">
                    {stat.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTEGRATION ─── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
              Integrasi dengan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Tools Favorit
              </span>{" "}
              Anda
            </h2>
            <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
              Hubungkan Conviq dengan tools yang sudah tim Anda gunakan
              sehari-hari. Tidak perlu mengubah workflow yang sudah ada.
            </p>
          </AnimatedSection>

          {/* Integration logos */}
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-12">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20"
                >
                  <div
                    className={`h-14 w-14 rounded-2xl bg-surface flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${integration.color}`}
                  >
                    <integration.icon className="h-7 w-7" />
                  </div>
                  <span className="text-sm font-semibold text-secondary">
                    {integration.name}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* API & Webhooks callout */}
          <AnimatedSection delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary-light" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(31,147,255,0.15),transparent_70%)]" />

              <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                      <Code2 className="h-6 w-6 text-primary-light" />
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center backdrop-blur-sm border border-accent/20">
                      <Webhook className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      REST API &amp; Webhooks
                    </h3>
                    <p className="text-sm text-white/60 mt-0.5">
                      Bangun integrasi custom sesuai kebutuhan bisnis Anda
                      dengan API yang lengkap dan terdokumentasi.
                    </p>
                  </div>
                </div>
                <Link
                  href="/features"
                  className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
                >
                  Lihat Dokumentasi
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative py-20 sm:py-28 bg-secondary overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/80 mb-8 border border-white/10">
              <Zap className="h-4 w-4 text-accent" />
              Gratis untuk memulai
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
              Siap Meningkatkan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent">
                Customer Support
              </span>{" "}
              Anda?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
              Mulai gratis sekarang tanpa perlu kartu kredit. Upgrade kapan saja
              sesuai kebutuhan bisnis Anda yang berkembang.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Mulai Gratis Sekarang
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent/60" />
                Tanpa kartu kredit
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent/60" />
                Setup dalam 5 menit
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent/60" />
                Bisa self-host
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
