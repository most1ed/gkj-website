import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MyDocuments } from "./components/MyDocuments";
import { RequestDocument } from "./components/RequestDocument";
import { DocumentHistory } from "./components/DocumentHistory";
import { Button } from "@/components/ui/button";
import { Plus, FileDown } from "lucide-react";
import { useUserDocuments } from "./hooks/useUserDocuments";

export default function UserDocumentsPage() {
  const { data, isLoading } = useUserDocuments();

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dokumen Saya</h2>
          <p className="text-muted-foreground">
            Kelola dan ajukan permintaan dokumen
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Unduh Dokumen
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajukan Dokumen
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-documents">Dokumen Saya</TabsTrigger>
          <TabsTrigger value="request">Ajukan Dokumen</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-documents" className="space-y-4">
          <MyDocuments data={data?.documents} />
        </TabsContent>
        
        <TabsContent value="request" className="space-y-4">
          <RequestDocument />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <DocumentHistory data={data?.history} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
