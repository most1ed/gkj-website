import React, { useState, useEffect } from 'react';
import { Clock, Rewind, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePageBuilderStore } from '../stores/pageBuilderStore';
import { PageData } from '../types/editor';
import { formatDate } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface PageVersion extends PageData {
  versionId: string;
  createdAt: Date;
}

export const PageVersionHistory: React.FC = () => {
  const { currentPage, pages } = usePageBuilderStore();
  const [versions, setVersions] = useState<PageVersion[]>([]);

  useEffect(() => {
    if (currentPage) {
      // Simulated version history (in a real app, this would come from a backend)
      const pageVersions: PageVersion[] = pages
        .filter(page => page.id === currentPage.id)
        .map((page, index) => ({
          ...page,
          versionId: `version_${index + 1}`,
          createdAt: page.updatedAt || page.createdAt
        }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      setVersions(pageVersions);
    }
  }, [currentPage, pages]);

  const handleRestoreVersion = (version: PageVersion) => {
    try {
      usePageBuilderStore.getState().updatePage(currentPage!.id, {
        content: version.content,
        updatedAt: new Date()
      });

      toast({
        title: "Version Restored",
        description: `Restored version from ${formatDate(version.createdAt)}`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Restore Failed",
        description: "Could not restore page version",
        variant: "destructive"
      });
      console.error('Version restore error', error);
    }
  };

  const handleDeleteVersion = (versionId: string) => {
    try {
      setVersions(prev => prev.filter(v => v.versionId !== versionId));

      toast({
        title: "Version Deleted",
        description: "Version has been removed from history",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Could not delete page version",
        variant: "destructive"
      });
      console.error('Version delete error', error);
    }
  };

  if (!currentPage) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Clock className="h-4 w-4" /> Version History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Version History: {currentPage.name}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] pr-4">
          {versions.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No version history available
            </div>
          ) : (
            <div className="space-y-2">
              {versions.map((version) => (
                <div 
                  key={version.versionId} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold">
                      {formatDate(version.createdAt)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {version.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRestoreVersion(version)}
                      className="gap-2"
                    >
                      <Rewind className="h-4 w-4" /> Restore
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteVersion(version.versionId)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
