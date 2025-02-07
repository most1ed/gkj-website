import React, { useState, useEffect } from 'react';
import { Eye, Download, Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePageBuilderStore } from '../stores/pageBuilderStore';
import { Node } from '@craftjs/core';

export const PagePreview: React.FC = () => {
  const { currentPage, editorState } = usePageBuilderStore();
  const [previewContent, setPreviewContent] = useState<Node | null>(null);

  useEffect(() => {
    if (currentPage?.content) {
      try {
        setPreviewContent(JSON.parse(currentPage.content));
      } catch (error) {
        console.error('Error parsing page content', error);
      }
    }
  }, [currentPage]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!currentPage) return;

    const blob = new Blob([JSON.stringify(previewContent, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentPage.name || 'page'}_preview.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (!currentPage) return;

    const shareData = {
      title: currentPage.name || 'Page Preview',
      text: 'Check out this page preview',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Preview link copied to clipboard'));
    }
  };

  if (!currentPage) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="h-4 w-4" /> Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Page Preview: {currentPage.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto border rounded-lg p-4 bg-gray-50">
          {previewContent ? (
            <div className="preview-content">
              {/* Render preview content */}
              {JSON.stringify(previewContent, null, 2)}
            </div>
          ) : (
            <p className="text-center text-gray-500">No preview available</p>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button 
            variant="outline" 
            onClick={handlePrint}
            className="gap-2"
          >
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="h-4 w-4" /> Download
          </Button>
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
