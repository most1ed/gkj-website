import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CouncilManager } from "./components/CouncilManager";
import { UserManager } from "./components/UserManager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMasterData } from "./hooks/useMasterData";

export default function MasterPage() {
  const { data, isLoading } = useMasterData();

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Master</h2>
          <p className="text-muted-foreground">
            Kelola data majelis dan pengguna
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Data
        </Button>
      </div>

      <Tabs defaultValue="council" className="space-y-4">
        <TabsList>
          <TabsTrigger value="council">Data Majelis</TabsTrigger>
          <TabsTrigger value="users">Data Pengguna</TabsTrigger>
        </TabsList>
        
        <TabsContent value="council" className="space-y-4">
          <CouncilManager data={data?.council} />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <UserManager data={data?.users} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
