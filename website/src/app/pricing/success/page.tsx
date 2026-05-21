"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { CheckCircle2, ChevronRight, Home, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  const [plan, setPlan] = useState<string>("");

  useEffect(() => {
    if (searchParams) {
      setInvoiceNo(searchParams.get("invoice_no") || searchParams.get("invoice_id") || "INV-" + Math.floor(100000 + Math.random() * 900000));
      setPlan(searchParams.get("plan") || "Growth");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 sm:p-10 text-center z-10"
      >
        {/* Success Icon Animation */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="rounded-full bg-accent/15 p-4 text-accent border border-accent/25 relative"
          >
            <CheckCircle2 className="h-16 w-16" />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-2 border-accent/30 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="mt-8 text-3xl font-extrabold text-secondary tracking-tight">
          Pembayaran Sukses!
        </h1>
        <p className="mt-3 text-base text-muted max-w-md mx-auto leading-relaxed">
          Terima kasih. Pembayaran Anda telah kami terima melalui payment gateway aman **Mayar.id**.
        </p>

        {/* Provisioning alert */}
        <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4 flex gap-3 text-left">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-secondary">Aktivasi Paket Otomatis</h4>
            <p className="text-xs text-muted mt-0.5 leading-relaxed">
              Sistem kami sedang melakukan sinkronisasi dengan akun Anda. Akses/limit baru akan aktif secara otomatis. Silakan refresh dashboard Conviq Anda dalam waktu 1-2 menit.
            </p>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="mt-8 border-t border-b border-dashed border-slate-200 py-5 space-y-3 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-muted font-medium">Nomor Tagihan:</span>
            <span className="text-secondary font-bold">{invoiceNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted font-medium">Paket Langganan:</span>
            <span className="text-secondary font-bold capitalize">{plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted font-medium">Status Pembayaran:</span>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/20">
              Lunas
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="https://app.conviq.com"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 gap-2 cursor-pointer"
          >
            Buka Dashboard Conviq
            <ChevronRight className="h-4 w-4" />
          </a>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-secondary hover:bg-slate-50 transition-colors gap-2"
          >
            <Home className="h-4 w-4 text-muted" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Support */}
        <p className="mt-8 text-xs text-muted">
          Mengalami kendala? Hubungi billing support kami di{" "}
          <a href="mailto:billing@conviq.com" className="text-primary hover:underline font-medium">
            billing@conviq.com
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
