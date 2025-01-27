import React, { useEffect } from 'react';

interface DummyPageProps {
  title: string;
}

export const DummyPage: React.FC<DummyPageProps> = ({ title }) => {
  useEffect(() => {
    console.log(`Rendering DummyPage: ${title}`);
    
    // Log any potential errors
    window.addEventListener('error', (event) => {
      console.error('Unhandled error:', event.error);
    });

    // Log unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  }, [title]);

  return (
    <div className="container mx-auto p-6 bg-white">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Diagnostic Page: </strong>
        <span className="block sm:inline">This is a temporary diagnostic page for {title}.</span>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-4">{title} Page</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p>Current Page: {title}</p>
        <p>Timestamp: {new Date().toISOString()}</p>
        <p>Page is intentionally set as a diagnostic placeholder.</p>
      </div>
    </div>
  );
};
