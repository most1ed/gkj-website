import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Kebijakan Privasi - GKJ Grogol Jakarta</title>
        <meta name="description" content="Kebijakan privasi GKJ Grogol Jakarta mengenai penggunaan data dan informasi pengunjung website" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Kebijakan Privasi</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pendahuluan</h2>
            <p>
              GKJ Grogol Jakarta berkomitmen untuk melindungi privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, 
              menggunakan, dan melindungi informasi yang Anda berikan kepada kami melalui website www.gkjgrogoljakarta.org.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Informasi yang Kami Kumpulkan</h2>
            <p>Kami dapat mengumpulkan informasi berikut:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nama dan informasi kontak (email, nomor telepon) saat Anda mendaftar untuk kegiatan gereja</li>
              <li>Informasi yang Anda berikan saat mengisi formulir kontak atau formulir lainnya</li>
              <li>Data teknis seperti alamat IP dan informasi browser saat Anda mengakses website kami</li>
              <li>Informasi yang Anda berikan saat berpartisipasi dalam survei atau mengisi formulir umpan balik</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Penggunaan Informasi</h2>
            <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mengelola keanggotaan dan kegiatan gereja</li>
              <li>Mengirimkan informasi tentang kegiatan dan pelayanan gereja</li>
              <li>Meningkatkan layanan website dan pengalaman pengguna</li>
              <li>Mengirimkan warta jemaat dan materi rohani lainnya (jika Anda berlangganan)</li>
              <li>Menanggapi pertanyaan dan permintaan Anda</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Perlindungan Data</h2>
            <p>
              Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi Anda dari akses yang tidak sah, 
              perubahan, pengungkapan, atau penghapusan yang tidak sah.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data disimpan dalam sistem yang aman dan dilindungi</li>
              <li>Akses ke data pribadi dibatasi hanya untuk staf yang berwenang</li>
              <li>Kami secara teratur meninjau dan memperbarui prosedur keamanan kami</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Berbagi Informasi</h2>
            <p>
              Kami tidak akan menjual, menyewakan, atau menukar informasi pribadi Anda dengan pihak ketiga tanpa izin Anda, 
              kecuali jika diwajibkan oleh hukum atau untuk kepentingan pelayanan gereja.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookie dan Teknologi Pelacakan</h2>
            <p>
              Website kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman pengguna. 
              Anda dapat mengatur browser Anda untuk menolak cookie, namun ini mungkin mempengaruhi fungsionalitas website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Hak-Hak Anda</h2>
            <p>Anda memiliki hak untuk:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mengakses informasi pribadi Anda yang kami simpan</li>
              <li>Meminta koreksi informasi yang tidak akurat</li>
              <li>Meminta penghapusan informasi Anda</li>
              <li>Menarik persetujuan Anda untuk penggunaan data</li>
              <li>Mengajukan keluhan tentang penanganan data Anda</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Perubahan Kebijakan Privasi</h2>
            <p>
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diumumkan di website ini 
              dan, jika signifikan, kami akan memberikan pemberitahuan tambahan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Kontak</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau penanganan data Anda, silakan hubungi kami di:
            </p>
            <div className="mt-4">
              <p>Email: gkjgrogol@yahoo.com</p>
              <p>Telepon: (021) 5659044</p>
              <p>
                Alamat: Kompleks Rasa Sayang Blok HH No. 1,<br />
                Wijaya Kusuma, Grogol,<br />
                Jakarta Barat 11460
              </p>
            </div>
          </section>

          <section className="mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Terakhir diperbarui: Januari 2024
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
