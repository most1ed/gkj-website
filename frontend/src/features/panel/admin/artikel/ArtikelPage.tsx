import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticleList } from "./components/ArticleList";
import { CategoryManager } from "./components/CategoryManager";
import { TagManager } from "./components/TagManager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useArtikelData } from "./hooks/useArtikelData";

export default function ArtikelPage() {
  const { data, isLoading } = useArtikelData();

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Artikel</h2>
          <p className="text-muted-foreground">
            Kelola artikel, kategori, dan tag
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Artikel Baru
        </Button>
      </div>

      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="articles">Daftar Artikel</TabsTrigger>
          <TabsTrigger value="categories">Kategori</TabsTrigger>
          <TabsTrigger value="tags">Tag</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="space-y-4">
          <ArticleList data={data?.articles} />
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <CategoryManager data={data?.categories} />
        </TabsContent>
        
        <TabsContent value="tags" className="space-y-4">
          <TagManager data={data?.tags} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
