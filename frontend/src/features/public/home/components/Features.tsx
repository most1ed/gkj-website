import { Heart, Users, BookOpen, Calendar } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Pelayanan Kasih",
    description: "Melayani dengan kasih Kristus melalui berbagai program pelayanan sosial dan kemasyarakatan."
  },
  {
    icon: Users,
    title: "Persekutuan",
    description: "Membangun persekutuan yang erat antar jemaat melalui berbagai kegiatan dan kelompok kecil."
  },
  {
    icon: BookOpen,
    title: "Pembinaan",
    description: "Pembinaan iman melalui kelas katekisasi, pemahaman Alkitab, dan pendidikan Kristen."
  },
  {
    icon: Calendar,
    title: "Ibadah",
    description: "Ibadah yang hidup dan bermakna setiap hari Minggu dan hari-hari khusus."
  }
];

export function Features() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Melayani dengan Kasih
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
          >
            <feature.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
