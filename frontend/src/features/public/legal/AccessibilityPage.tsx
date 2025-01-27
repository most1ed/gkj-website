import { Helmet } from 'react-helmet-async';

export default function AccessibilityPage() {
  return (
    <>
      <Helmet>
        <title>Akses & Inklusi - GKJ Grogol Jakarta</title>
        <meta name="description" content="Komitmen GKJ Grogol Jakarta terhadap aksesibilitas dan inklusi untuk semua jemaat" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Akses & Inklusi</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Komitmen Kami</h2>
            <p>
              GKJ Grogol Jakarta berkomitmen untuk menciptakan lingkungan yang inklusif dan dapat diakses oleh semua orang, 
              tanpa memandang kemampuan fisik, mental, atau latar belakang sosial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Aksesibilitas Website</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Desain responsif yang ramah pengguna</li>
              <li>Dukungan pembaca layar</li>
              <li>Kontras warna yang memenuhi standar WCAG</li>
              <li>Navigasi keyboard yang mudah</li>
              <li>Teks alternatif untuk gambar</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Aksesibilitas Gedung</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ramp untuk kursi roda</li>
              <li>Toilet ramah disabilitas</li>
              <li>Area parkir khusus</li>
              <li>Pemandu untuk jemaat dengan kebutuhan khusus</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Pelayanan Inklusif</h2>
            <p>
              Kami menyediakan berbagai bentuk pelayanan untuk memastikan setiap jemaat dapat berpartisipasi secara penuh:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ibadah dengan penerjemah bahasa isyarat</li>
              <li>Materi cetak dengan huruf besar</li>
              <li>Pendampingan khusus untuk jemaat berkebutuhan khusus</li>
              <li>Program pembinaan yang disesuaikan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan atau membutuhkan bantuan khusus, silakan hubungi kami:
            </p>
            <p>
              Email: <a href="mailto:aksesibilitas@gkjgrogoljakarta.org" className="text-primary hover:underline">
                aksesibilitas@gkjgrogoljakarta.org
              </a>
            </p>
            <p>
              Telepon: (021) 5659044 (ext. Pelayanan Inklusif)
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
