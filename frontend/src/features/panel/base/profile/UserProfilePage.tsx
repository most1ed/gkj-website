import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfo } from "./components/PersonalInfo";
import { FamilyInfo } from "./components/FamilyInfo";
import { ChurchActivities } from "./components/ChurchActivities";
import { AccountSettings } from "./components/AccountSettings";
import { Card } from "@/components/ui/card";
import { useUserProfile } from "./hooks/useUserProfile";

export default function UserProfilePage() {
  const { data, isLoading } = useUserProfile();

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profil Saya</h2>
        <p className="text-muted-foreground">
          Lihat dan perbarui informasi profil Anda
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full bg-gray-200">
            {/* Profile Image */}
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{data?.name}</h3>
            <p className="text-muted-foreground">No. Anggota: {data?.memberNumber}</p>
            <p className="text-muted-foreground">Wilayah: {data?.region}</p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Data Pribadi</TabsTrigger>
          <TabsTrigger value="family">Data Keluarga</TabsTrigger>
          <TabsTrigger value="activities">Aktivitas Gereja</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan Akun</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <PersonalInfo data={data?.personal} />
        </TabsContent>
        
        <TabsContent value="family" className="space-y-4">
          <FamilyInfo data={data?.family} />
        </TabsContent>
        
        <TabsContent value="activities" className="space-y-4">
          <ChurchActivities data={data?.activities} />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <AccountSettings data={data?.settings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
