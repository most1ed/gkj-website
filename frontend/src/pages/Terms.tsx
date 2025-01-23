import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Syarat & Ketentuan - GKJ Grogol Jakarta</title>
        <meta name="description" content="Syarat dan ketentuan penggunaan website GKJ Grogol Jakarta" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Syarat & Ketentuan</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Ketentuan Umum</h2>
            <p>
              Dengan mengakses dan menggunakan website GKJ Grogol Jakarta, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. 
              Jika Anda tidak setuju dengan bagian apapun dari ketentuan ini, Anda tidak diperkenankan menggunakan website ini.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Penggunaan Website</h2>
            <p>Website ini ditujukan untuk:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Memberikan informasi tentang GKJ Grogol Jakarta dan kegiatannya</li>
              <li>Memfasilitasi pendaftaran untuk kegiatan gereja</li>
              <li>Menyediakan materi-materi rohani dan informasi pelayanan</li>
              <li>Memungkinkan jemaat berpartisipasi dalam kegiatan online</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Keanggotaan dan Registrasi</h2>
            <p>Untuk beberapa fitur website, Anda mungkin perlu melakukan registrasi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informasi yang diberikan harus akurat dan lengkap</li>
              <li>Anda bertanggung jawab menjaga kerahasiaan akun Anda</li>
              <li>Memberitahu kami jika ada penggunaan tidak sah atas akun Anda</li>
              <li>GKJ Grogol berhak menonaktifkan akun yang melanggar ketentuan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Konten dan Hak Cipta</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Seluruh konten website adalah milik GKJ Grogol Jakarta atau pemberi lisensinya</li>
              <li>Konten hanya boleh digunakan untuk keperluan pribadi dan non-komersial</li>
              <li>Dilarang menyalin, memodifikasi, atau mendistribusikan konten tanpa izin tertulis</li>
              <li>Penggunaan logo dan nama GKJ Grogol Jakarta harus dengan izin tertulis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Persembahan Online</h2>
            <p>Untuk layanan persembahan online:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pastikan data transfer dan nominal sudah benar</li>
              <li>Simpan bukti transfer sebagai referensi</li>
              <li>Konfirmasi transfer akan diproses pada hari kerja</li>
              <li>Persembahan akan dicatat sesuai peruntukan yang dipilih</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Pendaftaran Kegiatan</h2>
            <p>Untuk pendaftaran kegiatan gereja:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pendaftaran hanya valid setelah konfirmasi dari panitia</li>
              <li>Perubahan atau pembatalan harus dilakukan minimal 24 jam sebelumnya</li>
              <li>Harap memberikan informasi yang akurat untuk keperluan administrasi</li>
              <li>Kehadiran akan dicatat sesuai protokol yang berlaku</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Materi Rohani</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Materi kotbah dan renungan adalah untuk penggunaan pribadi</li>
              <li>Dilarang mengubah atau mendistribusikan ulang tanpa izin</li>
              <li>Kutipan harus mencantumkan sumber dari GKJ Grogol Jakarta</li>
              <li>Penggunaan untuk keperluan pelayanan harus dengan pemberitahuan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Batasan Tanggung Jawab</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Website disediakan "sebagaimana adanya" tanpa jaminan apapun</li>
              <li>GKJ Grogol tidak bertanggung jawab atas kerugian yang timbul dari penggunaan website</li>
              <li>Kami berusaha menjaga keakuratan informasi namun tidak menjamin 100% bebas kesalahan</li>
              <li>Pengguna bertanggung jawab atas risiko penggunaan website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Perubahan Ketentuan</h2>
            <p>
              GKJ Grogol Jakarta berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diumumkan melalui website 
              dan berlaku sejak tanggal publikasi. Penggunaan berkelanjutan atas website ini setelah perubahan berarti Anda 
              menyetujui ketentuan yang diperbarui.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Hukum yang Berlaku</h2>
            <p>
              Syarat dan ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia. Setiap perselisihan akan 
              diselesaikan secara musyawarah mufakat atau melalui forum yang berwenang di Jakarta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Kontak</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di:
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
