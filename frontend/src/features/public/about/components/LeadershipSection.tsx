import { Card, CardContent } from "@/components/ui/Card";

const leadershipData = [
  {
    name: "Pdt. Agustinus Setyawidi",
    role: "Pendeta Jemaat",
    imageUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400&auto=format&fit=crop",
    description: "Melayani sebagai Pendeta Jemaat GKJ Grogol Jakarta"
  },
  // Data pemimpin lain bisa ditambahkan di sini
];

export function LeadershipSection() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Kepemimpinan Gereja</h2>
            <p className="text-muted-foreground">
              Para pemimpin yang melayani di GKJ Grogol Jakarta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipData.map((leader, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                      <img
                        src={leader.imageUrl}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                    <p className="text-primary font-medium mb-2">{leader.role}</p>
                    <p className="text-muted-foreground text-sm">
                      {leader.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
