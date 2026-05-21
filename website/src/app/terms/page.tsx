import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ketentuan Layanan",
  description: "Ketentuan layanan penggunaan platform Conviq.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary mb-4">
          Ketentuan Layanan
        </h1>
        <p className="text-muted mb-8">
          Terakhir diperbarui: Mei 2026
        </p>

        <div className="space-y-8 text-secondary/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              1. Penerimaan Ketentuan
            </h2>
            <p>
              Dengan mengakses dan menggunakan platform Conviq (&quot;Layanan&quot;), Anda
              menyetujui untuk terikat oleh ketentuan layanan ini. Jika Anda tidak
              menyetujui ketentuan ini, harap jangan menggunakan Layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              2. Deskripsi Layanan
            </h2>
            <p>
              Conviq adalah platform customer support open-source bertenaga AI yang
              memungkinkan bisnis mengelola percakapan pelanggan dari berbagai
              channel dalam satu dashboard terpadu. Layanan tersedia dalam opsi
              cloud-hosted dan self-hosted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              3. Akun Pengguna
            </h2>
            <p>
              Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi
              Anda. Anda setuju untuk menerima tanggung jawab atas semua aktivitas
              yang terjadi di bawah akun Anda. Anda harus segera memberi tahu kami
              jika terjadi penggunaan yang tidak sah atas akun Anda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              4. Pembayaran dan Penagihan
            </h2>
            <p>
              Paket berbayar ditagih sesuai dengan siklus penagihan yang dipilih.
              Pembayaran diproses melalui Mayar.id sebagai payment gateway resmi
              kami. Metode pembayaran yang tersedia meliputi QRIS, transfer bank
              (Virtual Account BRI, BNI, Mandiri), e-wallet (GoPay, OVO, Dana,
              ShopeePay), dan kartu kredit/debit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              5. Kebijakan Pembatalan
            </h2>
            <p>
              Anda dapat membatalkan langganan kapan saja. Setelah pembatalan, Anda
              tetap memiliki akses ke layanan hingga akhir periode penagihan yang
              sudah dibayar. Tidak ada pengembalian dana untuk periode yang sudah
              berjalan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              6. Penggunaan yang Diperbolehkan
            </h2>
            <p>
              Anda setuju untuk menggunakan Layanan hanya untuk tujuan yang sah dan
              sesuai dengan hukum yang berlaku di Republik Indonesia. Anda tidak
              boleh menggunakan Layanan untuk mengirim spam, konten ilegal, atau
              melanggar hak pihak ketiga.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              7. Batasan Tanggung Jawab
            </h2>
            <p>
              Conviq tidak bertanggung jawab atas kerugian tidak langsung, khusus,
              insidental, atau konsekuensial yang timbul dari penggunaan Layanan.
              Tanggung jawab total kami tidak melebihi jumlah yang Anda bayarkan
              kepada kami dalam 12 bulan terakhir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              8. Perubahan Ketentuan
            </h2>
            <p>
              Kami berhak mengubah ketentuan ini kapan saja. Perubahan akan
              diberitahukan melalui email atau pemberitahuan di platform. Penggunaan
              berkelanjutan setelah perubahan berarti Anda menyetujui ketentuan baru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              9. Hubungi Kami
            </h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai ketentuan layanan ini, silakan
              hubungi kami di{" "}
              <a
                href="mailto:hello@conviq.id"
                className="text-primary hover:text-primary-dark underline"
              >
                hello@conviq.id
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
