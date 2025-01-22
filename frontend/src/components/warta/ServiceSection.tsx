import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

export function ServiceSection() {
  return (
    <Tabs defaultValue="schedule" className="space-y-6">
      <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <TabsTrigger value="schedule">Jadwal Pelayan</TabsTrigger>
        <TabsTrigger value="songs">Liturgi & Lagu</TabsTrigger>
        <TabsTrigger value="youth">Pemuda & SM</TabsTrigger>
        <TabsTrigger value="liturgy">Tata Ibadah</TabsTrigger>
      </TabsList>

      {/* Schedule Tab */}
      <TabsContent value="schedule">
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Pelayan Kebaktian Minggu</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pelayanan</TableHead>
                  <TableHead>26 Januari 2025</TableHead>
                  <TableHead>2 Februari 2025</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Koordinator</TableCell>
                  <TableCell>Pnt. Joko Mulyono</TableCell>
                  <TableCell>Pnt. Rinto Hadi</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pelayan Firman</TableCell>
                  <TableCell>Pdt. Lusindo Tobing (GKJ Nehemia)</TableCell>
                  <TableCell>Pdt. Wurihanto Handoyo Adi</TableCell>
                </TableRow>
                {/* Add other rows */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Songs Tab */}
      <TabsContent value="songs">
        <Card>
          <CardHeader>
            <CardTitle>Liturgi dan Lagu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">26 Januari 2025</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Daftar Lagu:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>NKB 3:1-2</li>
                      <li>KJ 46:1-2</li>
                      <li>KJ 32:1, 3</li>
                      <li>KJ 383:1,3</li>
                      <li>KJ 290</li>
                      <li>KJ 425:1-2</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Bacaan Alkitab:</p>
                    <p className="text-muted-foreground">Lukas 4:14-21</p>
                  </div>
                  <div>
                    <p className="font-medium">Kalender Gerejawi:</p>
                    <p className="text-muted-foreground">Minggu Biasa II</p>
                  </div>
                  <div>
                    <p className="font-medium">Warna Liturgis:</p>
                    <p className="text-muted-foreground">Hijau</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">2 Februari 2025</h3>
                {/* Similar structure for next week */}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Youth & Children Tab */}
      <TabsContent value="youth">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Kebaktian Anak–Sekolah Minggu</CardTitle>
              <CardDescription>26 Januari 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Pelayan Firman:</span>
                  <span>Sdri. Adiyana Dwi</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jadwal Kebaktian Pemuda-Remaja</CardTitle>
              <CardDescription>26 Januari 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Pemusik:</span>
                  <span>Sdri. Lidya</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Pemandu:</span>
                  <span>Sdri. Moreen</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Pelayan Firman:</span>
                  <span>Alex Nanlohy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Liturgy Tab */}
      <TabsContent value="liturgy">
        <Card>
          <CardHeader>
            <CardTitle>Tata Ibadah</CardTitle>
            <CardDescription>Minggu, 26 Januari 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {/* Add complete liturgy content */}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
