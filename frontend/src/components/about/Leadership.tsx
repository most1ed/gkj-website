import { Card, CardContent } from "@/components/ui/Card";

const leadershipData = [
  {
    name: "Pdt. Wurihanto Handoyo Adi",
    role: "Pendeta Jemaat",
    imageUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400&auto=format&fit=crop",
    description: "Melayani sebagai Pendeta Jemaat GKJ Grogol Jakarta"
  },
  {
    name: "Pdt. Agustinus Setyawidi",
    role: "Pendeta Jemaat",
    imageUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&auto=format&fit=crop",
    description: "Melayani sebagai Pendeta Jemaat GKJ Grogol Jakarta"
  }
];

const committees = [
  {
    title: "Majelis Gereja",
    description: "Bertanggung jawab atas kepemimpinan spiritual dan administratif gereja.",
    members: [
      "Penatua",
      "Diaken",
      "Pelayan Firman"
    ],
  },
  {
    title: "Tim Pelayanan",
    description: "Melayani dalam berbagai aspek kegiatan gereja.",
    members: [
      "Paduan Suara",
      "Multimedia",
      "Penyambut Jemaat",
      "Pemusik"
    ],
  },
  {
    title: "Komunitas",
    description: "Kelompok-kelompok persekutuan dalam gereja.",
    members: [
      "Pemuda",
      "Wanita",
      "Lansia"
    ],
  }
];

export function Leadership() {
  return (
    <section id="leadership">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Kepemimpinan Gereja</h2>
        <p className="text-muted-foreground">
          Para pemimpin yang melayani di GKJ Grogol Jakarta
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Committees */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {committees.map((committee, index) => (
          <div
            key={index}
            className="bg-card p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4">{committee.title}</h3>
            <p className="text-muted-foreground mb-6">{committee.description}</p>
            <ul className="space-y-2">
              {committee.members.map((member, memberIndex) => (
                <li
                  key={memberIndex}
                  className="flex items-center gap-2 text-sm"
                >
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {member}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
