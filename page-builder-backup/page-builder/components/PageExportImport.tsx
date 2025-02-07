import React, { useState, useRef } from 'react';
import { Upload, Download, FileDown, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { usePageBuilderStore } from '../stores/pageBuilderStore';
import { PageData } from '../types/editor';
import { toast } from '@/components/ui/use-toast';

export const PageExportImport: React.FC = () => {
  const { pages, createPage } = usePageBuilderStore();
  const [exportFormat, setExportFormat] = useState<'json' | 'html'>('json');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (pages.length === 0) {
      toast({
        title: "No pages to export",
        description: "Create a page first",
        variant: "destructive"
      });
      return;
    }

    const exportData = pages.map(page => ({
      id: page.id,
      name: page.name,
      content: page.content,
      createdAt: page.createdAt,
      status: page.status
    }));

    const blob = new Blob(
      [JSON.stringify(exportData, null, 2)], 
      { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `page_builder_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Exported ${exportData.length} page(s)`,
      variant: "default"
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedPages = JSON.parse(e.target?.result as string) as PageData[];
        
        // Validate imported pages
        const validPages = importedPages.filter(page => 
          page.id && page.name && page.content
        );

        if (validPages.length === 0) {
          toast({
            title: "Import Failed",
            description: "No valid pages found in the import file",
            variant: "destructive"
          });
          return;
        }

        // Import each page
        for (const page of validPages) {
          await createPage({
            ...page,
            id: undefined, // Let the system generate a new ID
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }

        toast({
          title: "Import Successful",
          description: `Imported ${validPages.length} page(s)`,
          variant: "default"
        });
      } catch (error) {
        toast({
          title: "Import Error",
          description: "Failed to parse import file",
          variant: "destructive"
        });
        console.error('Import error', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="h-4 w-4" /> Export/Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export / Import Pages</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Export Pages</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleExport}
                className="gap-2 flex-1"
              >
                <FileDown className="h-4 w-4" /> Export Pages
              </Button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Import Pages</h3>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="gap-2 w-full"
            >
              <FileUp className="h-4 w-4" /> Import Pages
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
