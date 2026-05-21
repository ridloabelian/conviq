import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi dan perlindungan data pengguna platform Conviq.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary mb-4">
          Kebijakan Privasi
        </h1>
        <p className="text-muted mb-8">
          Terakhir diperbarui: Mei 2026
        </p>

        <div className="space-y-8 text-secondary/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p className="mb-3">
              Kami mengumpulkan informasi yang Anda berikan secara langsung kepada
              kami, termasuk:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Nama dan alamat email saat mendaftar akun</li>
              <li>Informasi pembayaran yang diproses melalui Mayar.id</li>
              <li>Data percakapan yang Anda kelola melalui platform</li>
              <li>Informasi penggunaan dan log aktivitas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              2. Penggunaan Informasi
            </h2>
            <p className="mb-3">
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Menyediakan, memelihara, dan meningkatkan Layanan</li>
              <li>Memproses transaksi dan mengirim pemberitahuan terkait</li>
              <li>Memberikan dukungan pelanggan</li>
              <li>Mengirim informasi teknis, pembaruan, dan peringatan keamanan</li>
              <li>Meningkatkan pengalaman pengguna dan mengembangkan fitur baru</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              3. Penyimpanan Data
            </h2>
            <p>
              Untuk pengguna cloud-hosted, data disimpan di server yang aman dengan
              enkripsi. Durasi retensi data bergantung pada paket yang Anda pilih.
              Untuk pengguna self-hosted, Anda memiliki kontrol penuh atas
              penyimpanan dan pengelolaan data Anda sendiri.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              4. Keamanan Data
            </h2>
            <p>
              Kami menerapkan langkah-langkah keamanan teknis dan organisasional
              yang wajar untuk melindungi data Anda dari akses, pengungkapan,
              perubahan, atau penghancuran yang tidak sah. Ini termasuk enkripsi
              data saat transit (TLS/SSL) dan saat disimpan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              5. Berbagi Data dengan Pihak Ketiga
            </h2>
            <p>
              Kami tidak menjual data pribadi Anda. Kami hanya membagikan informasi
              dengan pihak ketiga yang diperlukan untuk menyediakan Layanan, seperti
              Mayar.id untuk pemrosesan pembayaran. Semua mitra pihak ketiga terikat
              oleh kewajiban kerahasiaan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              6. Hak Pengguna
            </h2>
            <p className="mb-3">
              Anda memiliki hak untuk:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
              <li>Meminta koreksi data yang tidak akurat</li>
              <li>Meminta penghapusan data pribadi Anda</li>
              <li>Mengekspor data Anda dalam format yang dapat dibaca mesin</li>
              <li>Menarik persetujuan pemrosesan data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              7. Cookie dan Teknologi Pelacakan
            </h2>
            <p>
              Kami menggunakan cookie dan teknologi serupa untuk meningkatkan
              pengalaman pengguna, menganalisis penggunaan layanan, dan menyajikan
              konten yang relevan. Anda dapat mengelola preferensi cookie melalui
              pengaturan browser Anda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              8. Perubahan Kebijakan
            </h2>
            <p>
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
              Perubahan signifikan akan diberitahukan melalui email atau
              pemberitahuan di platform setidaknya 30 hari sebelum berlaku efektif.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              9. Hubungi Kami
            </h2>
            <p>
              Untuk pertanyaan terkait privasi, silakan hubungi kami di{" "}
              <a
                href="mailto:privacy@conviq.id"
                className="text-primary hover:text-primary-dark underline"
              >
                privacy@conviq.id
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
