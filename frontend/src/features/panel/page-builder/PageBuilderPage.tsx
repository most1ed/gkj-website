import React, { useEffect } from 'react';
import { Editor } from './components/Editor';
import { usePageBuilderStore } from './stores/pageBuilderStore';

const PageBuilderPage: React.FC = () => {
  const { pages, createPage, currentPage } = usePageBuilderStore();

  useEffect(() => {
    // Create initial page if no pages exist
    if (pages.length === 0) {
      createPage('First Page');
    }
  }, [pages, createPage]);

  return (
    <div className="w-full h-full">
      {currentPage ? (
        <Editor />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>Loading page builder...</p>
        </div>
      )}
    </div>
  );
};

export default PageBuilderPage;
