import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export function WelcomeSection() {
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <Card>
        <CardHeader>
          <CardTitle>Selamat Datang</CardTitle>
          <CardDescription>Minggu, 26 Januari 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose">
            <p>
              Majelis mengucapkan selamat datang kepada segenap Jemaat, baik yang
              hadir secara luring maupun daring. Bagi yang hadir secara fisik di
              gereja, dimohon tetap mengenakan masker.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* This Week Service */}
      <Card>
        <CardHeader>
          <CardTitle>Ibadah Minggu Ini</CardTitle>
          <CardDescription>Minggu Biasa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Pelayan Firman:</h3>
              <p>Bp. Pdt. Wurihanto Handoyo Adi</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Pengiring Pujian & Cantoria:</h3>
              <p>Keluarga Bp. Victor Emanuel</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
