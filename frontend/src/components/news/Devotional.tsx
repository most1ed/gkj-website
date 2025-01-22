export function Devotional() {
  const devotional = {
    date: "21 Januari 2025",
    title: "Mengasihi dalam Tindakan",
    verse: "1 Yohanes 3:18",
    content: `"Anak-anakku, marilah kita mengasihi bukan dengan perkataan atau dengan lidah, tetapi dengan perbuatan dan dalam kebenaran."

Kasih yang sejati tidak hanya diucapkan, tetapi diwujudkan dalam tindakan nyata. Sebagai pengikut Kristus, kita dipanggil untuk menunjukkan kasih melalui perbuatan baik kepada sesama.

Hari ini, mari kita merenungkan bagaimana kita dapat menunjukkan kasih Kristus melalui tindakan nyata dalam kehidupan sehari-hari.`,
    prayer: "Tuhan Yesus, ajarlah kami untuk mengasihi seperti Engkau mengasihi. Berikan kami hati yang peka dan tangan yang ringan untuk menolong sesama. Dalam nama Yesus kami berdoa, Amin.",
    author: "Pdt. Wurihanto Handoyo Adi",
  };

  return (
    <section className="bg-card rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Renungan Harian</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{devotional.date}</p>
          <h3 className="text-xl font-bold">{devotional.title}</h3>
          <p className="text-sm font-medium text-primary">{devotional.verse}</p>
        </div>

        <div className="space-y-4 text-muted-foreground">
          {devotional.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm italic text-muted-foreground">{devotional.prayer}</p>
        </div>

        <div className="text-sm text-right text-muted-foreground">
          - {devotional.author}
        </div>
      </div>
    </section>
  );
}
