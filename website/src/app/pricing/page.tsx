"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Check, X, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Plan = {
  name: string;
  price: number | null; // null = gratis
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaStyle: "outline" | "primary" | "secondary";
  popular?: boolean;
  freeNote?: string;
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const fmt = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const cloudPlans: Plan[] = [
  {
    name: "Starter",
    price: null,
    description: "Mulai gratis untuk tim kecil",
    features: [
      "2 agen",
      "500 percakapan/bulan",
      "Live chat saja",
      "Retensi data 30 hari",
      "Widget web dasar",
    ],
    cta: "Mulai Gratis",
    ctaStyle: "outline",
    freeNote: "Tanpa kartu kredit",
  },
  {
    name: "Growth",
    price: 299_000,
    period: "/agen/bulan",
    description: "Untuk tim yang berkembang",
    features: [
      "Semua channel",
      "300 kredit Captain AI",
      "Retensi data 1 tahun",
      "Laporan dasar",
      "Integrasi WhatsApp & email",
    ],
    cta: "Mulai Sekarang",
    ctaStyle: "primary",
  },
  {
    name: "Business",
    price: 599_000,
    period: "/agen/bulan",
    description: "Fitur lengkap untuk skala bisnis",
    features: [
      "Semua channel",
      "500 kredit Captain AI",
      "Retensi data 2 tahun",
      "Laporan lanjutan",
      "SLA & dukungan prioritas",
      "Automasi workflow",
    ],
    cta: "Mulai Sekarang",
    ctaStyle: "primary",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 1_499_000,
    period: "/agen/bulan",
    description: "Untuk organisasi besar",
    features: [
      "Semua channel",
      "800 kredit Captain AI",
      "Retensi data 3 tahun",
      "SSO / SAML",
      "Custom branding",
      "Manajer akun dedikasi",
    ],
    cta: "Hubungi Sales",
    ctaStyle: "secondary",
  },
];

const selfHostedPlans: Plan[] = [
  {
    name: "Community",
    price: null,
    description: "Versi OSS lengkap, maintenance mandiri",
    features: [
      "MIT License",
      "Semua fitur inti",
      "Unlimited agen",
      "Unlimited percakapan",
      "Dukungan komunitas",
    ],
    cta: "Mulai Gratis",
    ctaStyle: "outline",
    freeNote: "Tanpa kartu kredit",
  },
  {
    name: "Premium",
    price: 299_000,
    period: "/agen/bulan",
    description: "Dukungan premium & fitur eksklusif",
    features: [
      "Captain AI",
      "Custom branding",
      "Role & permissions lanjutan",
      "Dukungan premium",
      "Update prioritas",
    ],
    cta: "Mulai Sekarang",
    ctaStyle: "primary",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 1_499_000,
    period: "/agen/bulan",
    description: "Untuk organisasi berskala besar",
    features: [
      "Semua fitur Premium",
      "SSO / SAML",
      "Kontrol akses lanjutan",
      "SLA prioritas",
      "Manajer akun dedikasi",
      "Onboarding khusus",
    ],
    cta: "Hubungi Sales",
    ctaStyle: "secondary",
  },
];

/* ------------------------------------------------------------------ */
/*  Feature Comparison                                                 */
/* ------------------------------------------------------------------ */

type ComparisonRow = {
  label: string;
  cloud: string[];
  selfHosted: string[];
};

const comparisonRows: ComparisonRow[] = [
  {
    label: "Jumlah agen",
    cloud: ["2", "Unlimited", "Unlimited", "Unlimited"],
    selfHosted: ["Unlimited", "Unlimited", "Unlimited"],
  },
  {
    label: "Percakapan/bulan",
    cloud: ["500", "Unlimited", "Unlimited", "Unlimited"],
    selfHosted: ["Unlimited", "Unlimited", "Unlimited"],
  },
  {
    label: "Channel",
    cloud: ["Live chat", "Semua", "Semua", "Semua"],
    selfHosted: ["Semua", "Semua", "Semua"],
  },
  {
    label: "Captain AI kredit",
    cloud: ["—", "300", "500", "800"],
    selfHosted: ["—", "✓", "✓"],
  },
  {
    label: "Retensi data",
    cloud: ["30 hari", "1 tahun", "2 tahun", "3 tahun"],
    selfHosted: ["Unlimited", "Unlimited", "Unlimited"],
  },
  {
    label: "Custom branding",
    cloud: ["✗", "✗", "✗", "✓"],
    selfHosted: ["✗", "✓", "✓"],
  },
  {
    label: "SSO / SAML",
    cloud: ["✗", "✗", "✗", "✓"],
    selfHosted: ["✗", "✗", "✓"],
  },
  {
    label: "SLA",
    cloud: ["✗", "✗", "✓", "✓"],
    selfHosted: ["✗", "✗", "✓"],
  },
  {
    label: "Dukungan prioritas",
    cloud: ["✗", "✗", "✓", "✓"],
    selfHosted: ["Komunitas", "Premium", "Prioritas"],
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqItems = [
  {
    q: "Apakah ada biaya tersembunyi?",
    a: "Tidak. Harga yang tertera sudah termasuk semua fitur di paket tersebut. Tidak ada biaya setup, biaya tersembunyi, atau biaya tambahan lainnya. Yang Anda lihat adalah yang Anda bayar.",
  },
  {
    q: "Bisa upgrade atau downgrade kapan saja?",
    a: "Ya, Anda bisa upgrade atau downgrade paket kapan saja. Perubahan akan berlaku di siklus penagihan berikutnya. Jika upgrade, Anda langsung mendapatkan akses ke fitur baru.",
  },
  {
    q: "Bagaimana cara pembayaran?",
    a: "Pembayaran diproses melalui Mayar.id yang mendukung berbagai metode pembayaran lokal Indonesia termasuk QRIS, Virtual Account (BRI, BNI, Mandiri), GoPay, OVO, Dana, dan kartu kredit (Visa/Mastercard).",
  },
  {
    q: "Apakah ada free trial?",
    a: "Paket Starter (Cloud) dan Community (Self-Hosted) bisa digunakan gratis tanpa batas waktu. Untuk paket berbayar, kami menyediakan trial 14 hari tanpa perlu kartu kredit.",
  },
  {
    q: "Apa perbedaan Cloud dan Self-Hosted?",
    a: "Cloud dihosting dan dikelola sepenuhnya oleh Conviq — Anda tinggal pakai. Self-Hosted memberi Anda kontrol penuh dengan menginstal di server sendiri. Keduanya mendapatkan fitur yang sama, perbedaannya ada di siapa yang mengelola infrastruktur.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "Kami menerima pembayaran melalui Mayar.id dengan opsi: QRIS (scan dari e-wallet manapun), Virtual Account BRI, BNI, dan Mandiri, e-wallet (GoPay, OVO, Dana), serta kartu kredit/debit Visa dan Mastercard.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PricingCard({ plan, index, onSelectPlan }: { plan: Plan; index: number; onSelectPlan: (plan: Plan) => void }) {
  const isPopular = plan.popular;

  return (
    <AnimatedSection
      delay={index * 0.1}
      className={`relative flex flex-col rounded-2xl border bg-white p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isPopular
          ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20"
          : "border-border hover:border-primary/30"
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-primary/25">
            <Sparkles className="h-3.5 w-3.5" />
            Populer
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-lg font-bold text-secondary">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted">{plan.description}</p>

      {/* Price */}
      <div className="mt-6 mb-6">
        {plan.price === null ? (
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-secondary">
              Gratis
            </span>
          </div>
        ) : (
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-medium text-muted">Rp</span>
              <span className="text-4xl font-extrabold text-secondary">
                {fmt(plan.price)}
              </span>
            </div>
            {plan.period && (
              <span className="text-sm text-muted">{plan.period}</span>
            )}
          </div>
        )}
      </div>

      {/* CTA button */}
      <button
        onClick={() => {
          if (plan.ctaStyle === "secondary") {
            window.location.href = "/contact";
          } else if (plan.price === null) {
            window.location.href = "https://app.conviq.id/signup";
          } else {
            onSelectPlan(plan);
          }
        }}
        className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 cursor-pointer ${
          plan.ctaStyle === "primary"
            ? "bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
            : plan.ctaStyle === "secondary"
              ? "bg-secondary text-white hover:bg-secondary-light shadow-md"
              : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
        }`}
      >
        {plan.cta}
      </button>

      {plan.freeNote && (
        <p className="mt-2 text-center text-xs text-muted">{plan.freeNote}</p>
      )}

      {/* Divider */}
      <div className="my-6 h-px bg-border" />

      {/* Features */}
      <ul className="flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-secondary">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}

function ComparisonCellValue({ value }: { value: string }) {
  if (value === "✓")
    return <Check className="mx-auto h-5 w-5 text-accent" />;
  if (value === "✗")
    return <X className="mx-auto h-5 w-5 text-red-400" />;
  if (value === "—")
    return <span className="text-muted">—</span>;
  return <span className="text-sm text-secondary font-medium">{value}</span>;
}

function FAQItem({ item, isOpen, onToggle }: { item: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
      >
        <span className="text-base font-semibold text-secondary pr-4">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="h-5 w-5 shrink-0 text-muted" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  const [tab, setTab] = useState<"cloud" | "selfhosted">("cloud");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  // States for Checkout Modal
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    accountId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const plans = tab === "cloud" ? cloudPlans : selfHostedPlans;
  const planNames =
    tab === "cloud"
      ? ["Starter", "Growth", "Business", "Enterprise"]
      : ["Community", "Premium", "Enterprise"];

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setErrorMsg(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          accountId: formData.accountId,
          plan: selectedPlan.name.toLowerCase(),
          isSelfHosted: tab === "selfhosted",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal membuat invoice pembayaran.");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("URL checkout tidak ditemukan.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ============== Hero ============== */}
      <section className="pt-32 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
              Harga
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
              Harga Transparan,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Tanpa Biaya Tersembunyi
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ============== Toggle ============== */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
          <AnimatedSection delay={0.15}>
            <div className="inline-flex rounded-full bg-surface-dark p-1">
              <button
                onClick={() => setTab("cloud")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  tab === "cloud"
                    ? "bg-white text-secondary shadow-md"
                    : "text-muted hover:text-secondary"
                }`}
              >
                ☁️ Cloud
              </button>
              <button
                onClick={() => setTab("selfhosted")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  tab === "selfhosted"
                    ? "bg-white text-secondary shadow-md"
                    : "text-muted hover:text-secondary"
                }`}
              >
                🖥️ Self-Hosted
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============== Pricing Cards ============== */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`grid gap-6 ${
                tab === "cloud"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
              }`}
            >
              {plans.map((plan, i) => (
                <PricingCard key={plan.name} plan={plan} index={i} onSelectPlan={handleSelectPlan} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============== Feature Comparison ============== */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="inline-flex items-center gap-2 text-lg font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                Bandingkan Semua Fitur
                <motion.div
                  animate={{ rotate: showComparison ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </button>
            </div>
          </AnimatedSection>

          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="border-b border-border bg-surface">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">
                          Fitur
                        </th>
                        {planNames.map((name) => (
                          <th
                            key={name}
                            className="px-6 py-4 text-center text-sm font-semibold text-secondary"
                          >
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, idx) => {
                        const values =
                          tab === "cloud" ? row.cloud : row.selfHosted;
                        return (
                          <tr
                            key={row.label}
                            className={`border-b border-border last:border-b-0 ${
                              idx % 2 === 0 ? "bg-white" : "bg-surface/50"
                            }`}
                          >
                            <td className="px-6 py-4 text-sm font-medium text-secondary">
                              {row.label}
                            </td>
                            {values.map((v, i) => (
                              <td
                                key={i}
                                className="px-6 py-4 text-center"
                              >
                                <ComparisonCellValue value={v} />
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="pb-20 bg-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="mt-4 text-muted">
                Temukan jawaban untuk pertanyaan umum tentang harga dan layanan
                kami
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="rounded-2xl border border-border bg-white p-2 sm:p-6 shadow-sm">
              {faqItems.map((item, idx) => (
                <FAQItem
                  key={idx}
                  item={item}
                  isOpen={openFaq === idx}
                  onToggle={() =>
                    setOpenFaq(openFaq === idx ? null : idx)
                  }
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============== Bottom CTA ============== */}
      <section className="pb-20 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-secondary-light px-8 py-16 text-center sm:px-16">
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Masih punya pertanyaan?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
                  Tim sales kami siap membantu Anda menemukan paket yang paling
                  sesuai untuk kebutuhan bisnis Anda.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
                  >
                    Hubungi Tim Sales Kami
                  </a>
                  <a
                    href="https://app.conviq.id/signup"
                    className="inline-flex items-center rounded-xl border-2 border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                  >
                    Coba Gratis
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============== Checkout Modal (Mayar.id) ============== */}
      <AnimatePresence>
        {isModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/60 backdrop-blur-md">
            {/* Backdrop click close */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => {
                if (!isSubmitting) setIsModalOpen(false);
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-white shadow-2xl z-10"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-secondary to-secondary-light px-6 py-5 text-white flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    Checkout Pembayaran
                  </span>
                  <h3 className="text-xl font-bold mt-0.5">
                    Paket {selectedPlan.name} ({tab === "cloud" ? "Cloud" : "Self-Hosted"})
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="rounded-full p-1.5 hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
                {errorMsg && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex gap-2.5 items-start">
                    <X className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                    <p>{errorMsg}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none disabled:bg-surface"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-1">
                      Alamat Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="contoh@bisnis.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none disabled:bg-surface"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-1">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      placeholder="Contoh: 081234567890"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none disabled:bg-surface"
                    />
                    <p className="mt-1.5 text-xs text-muted">
                      Digunakan oleh Mayar.id untuk mengirimkan link tagihan dan kuitansi pembayaran via WA.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-1">
                      ID Akun Conviq <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="accountId"
                      required
                      placeholder="Masukkan ID Akun Conviq Anda"
                      value={formData.accountId}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none disabled:bg-surface"
                    />
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      ID Akun dapat ditemukan di panel Conviq Anda (Pengaturan -&gt; ID Akun). 
                      Belum punya akun? silakan{" "}
                      <a
                        href="https://app.conviq.id/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        daftar gratis terlebih dahulu
                      </a>.
                    </p>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="rounded-xl bg-surface p-4 mt-6 flex justify-between items-center border border-border">
                  <div>
                    <span className="text-xs text-muted font-medium block">Total Pembayaran</span>
                    <span className="text-base font-bold text-secondary">
                      Rp {selectedPlan.price ? fmt(selectedPlan.price) : "0"}
                      <span className="text-xs font-normal text-muted"> /agen/bulan</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent border border-accent/20">
                      ⚡ Instan Aktif
                    </span>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl border border-border py-3 text-center text-sm font-semibold text-secondary hover:bg-surface transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white hover:bg-primary-dark shadow-md shadow-primary/20 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      "Bayar Sekarang"
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-center text-muted mt-2">
                  Dengan mengklik Bayar Sekarang, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi Conviq. Pembayaran diproses dengan aman oleh Mayar.id.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
