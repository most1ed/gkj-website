import React from 'react';

const securityPrinciples = [
  {
    title: 'Kerahasiaan Data',
    description: 'Melindungi informasi pribadi dengan standar keamanan tertinggi',
    points: [
      'Enkripsi data end-to-end',
      'Pembatasan akses informasi sensitif',
      'Penyimpanan data terenkripsi'
    ]
  },
  {
    title: 'Kontrol Akses',
    description: 'Sistem manajemen akses yang ketat dan terkontrol',
    points: [
      'Autentikasi multi-faktor',
      'Pembatasan hak akses berdasarkan peran',
      'Pemantauan aktivitas pengguna'
    ]
  }
];

export default function SecurityPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Kebijakan Keamanan</h1>
        <p className="text-xl text-gray-600">
          Komitmen GKJ Grogol Jakarta dalam melindungi data dan privasi jemaat
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Prinsip Keamanan</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {securityPrinciples.map((principle, index) => (
            <div 
              key={index} 
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold mb-4 text-primary">
                {principle.title}
              </h3>
              <p className="text-gray-600 mb-4">{principle.description}</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {principle.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Hubungi Tim Keamanan</h2>
        <p className="text-gray-600 mb-6">
          Jika Anda memiliki pertanyaan atau kekhawatiran tentang keamanan data
        </p>
        <div className="space-x-4">
          <a 
            href="mailto:keamanan@gkjgrogoljakarta.org"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Email Tim Keamanan
          </a>
        </div>
      </section>
    </div>
  );
}
