import React from 'react';
import { Shield } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-16">
        <Shield className="mx-auto mb-6 text-primary" size={64} />
        <h1 className="text-4xl font-bold mb-4">Kebijakan Keamanan</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Komitmen GKJ Grogol Jakarta dalam melindungi data dan privasi jemaat
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Prinsip Keamanan
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {securityPrinciples.map((principle, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {principle.title}
              </h3>
              <p className="text-muted-foreground mb-6">{principle.description}</p>
              <ul className="list-disc list-inside text-foreground space-y-2">
                {principle.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/10 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Hubungi Tim Keamanan</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Jika Anda memiliki pertanyaan atau kekhawatiran tentang keamanan data
        </p>
        <a 
          href="mailto:keamanan@gkjgrogoljakarta.org"
          className="btn-primary"
        >
          Email Tim Keamanan
        </a>
      </section>
    </div>
  );
}
