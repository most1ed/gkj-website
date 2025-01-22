import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function PrayerSupport() {
  const prayerCategories = [
    {
      title: "Sakit/Proses Perawatan",
      people: [
        "Bp. Nuryono",
        "Ibu Yohana Saragih",
        "Ibu Hadminingtyas (Kakak dari Ibu Retno Bambang)",
        "Bp. Pdt. Wurihanto Handoyo Adi"
      ]
    },
    {
      title: "Proses Pemulihan",
      people: [
        "Ibu Sulastri SW Soebroto",
        "Bp. Isaskar",
        "Ibu Tulus (ibunda dari Ibu Kristina Kusdarwati)",
        "Sdri. Vernar Ardiyani"
      ]
    },
    {
      title: "Hal Lain",
      items: [
        "Bangsa dan negara Indonesia",
        "Pergumulan Warga Gereja",
        "Perdamaian dunia"
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dukungan Doa</CardTitle>
        <CardDescription>
          Mari saling mendukung dalam doa untuk saudara-saudara kita
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {prayerCategories.map((category, index) => (
            <div key={index}>
              <h3 className="font-medium mb-2">{category.title}</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {category.people ? (
                  category.people.map((person, idx) => (
                    <li key={idx}>{person}</li>
                  ))
                ) : (
                  category.items?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))
                )}
              </ul>
            </div>
          ))}
          
          <div className="pt-2 text-sm text-muted-foreground">
            <p>
              Jemaat dapat menginformasikan kepada Majelis atau pelayan kantor gereja 
              apabila memerlukan dukungan doa.
            </p>
          </div>

          <Button variant="outline" className="w-full">
            Ajukan Dukungan Doa
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
