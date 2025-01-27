export function BiblicalBasis() {
  const verses = [
    {
      reference: "Maleakhi 3:10",
      text: "Bawalah seluruh persembahan persepuluhan itu ke dalam rumah perbendaharaan, supaya ada persediaan makanan di rumah-Ku dan ujilah Aku, firman TUHAN semesta alam, apakah Aku tidak membukakan bagimu tingkap-tingkap langit dan mencurahkan berkat kepadamu sampai berkelimpahan.",
    },
    {
      reference: "2 Korintus 9:6-7",
      text: "Orang yang menabur sedikit, akan menuai sedikit juga, dan orang yang menabur banyak, akan menuai banyak juga. Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan, sebab Allah mengasihi orang yang memberi dengan sukacita.",
    },
    {
      reference: "Amsal 3:9-10",
      text: "Muliakanlah TUHAN dengan hartamu dan dengan hasil pertama dari segala penghasilanmu, maka lumbung-lumbungmu akan diisi penuh sampai melimpah-limpah, dan bejana pemerahanmu akan meluap dengan air buah anggurnya.",
    },
  ];

  const principles = [
    {
      title: "Persembahan sebagai Ucapan Syukur",
      description: "Persembahan adalah wujud nyata ucapan syukur atas berkat Tuhan dalam hidup kita.",
    },
    {
      title: "Kerelaan Hati",
      description: "Persembahan diberikan dengan sukacita, bukan karena paksaan atau kewajiban semata.",
    },
    {
      title: "Prioritas kepada Tuhan",
      description: "Memberikan yang terbaik dan yang pertama dari berkat yang kita terima.",
    },
    {
      title: "Berkat yang Berkelimpahan",
      description: "Tuhan menjanjikan berkat yang melimpah bagi mereka yang setia dalam memberi.",
    },
  ];

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Dasar Alkitabiah</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Memahami makna dan prinsip persembahan berdasarkan Firman Tuhan
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Bible Verses */}
        <div className="space-y-8">
          <h3 className="text-xl font-semibold mb-6">Ayat-ayat Alkitab</h3>
          {verses.map((verse, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h4 className="text-lg font-semibold mb-3 text-primary">
                {verse.reference}
              </h4>
              <p className="text-muted-foreground italic">"{verse.text}"</p>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div className="space-y-8">
          <h3 className="text-xl font-semibold mb-6">Prinsip-prinsip Persembahan</h3>
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{principle.title}</h4>
                  <p className="text-muted-foreground">{principle.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
