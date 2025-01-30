import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  modifiedTime: string;
  webViewLink: string;
  iconLink: string;
}

interface UseGoogleDriveOptions {
  folderId?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useGoogleDrive(options: UseGoogleDriveOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(options.folderId);

  // Fetch files from Google Drive
  const { data: files, isLoading: isLoadingFiles, refetch } = useQuery({
    queryKey: ['googleDriveFiles', selectedFolderId],
    queryFn: async () => {
      const response = await fetch(`/api/gdrive/files${selectedFolderId ? `?folderId=${selectedFolderId}` : ''}`);
      if (!response.ok) throw new Error('Failed to fetch files');
      return response.json();
    },
    enabled: isConnected,
  });

  // Connect to Google Drive
  const { mutate: connect, isLoading: isConnecting } = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/gdrive/connect', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to connect to Google Drive');
      const data = await response.json();
      setIsConnected(true);
      return data;
    },
    onSuccess: options.onSuccess,
    onError: options.onError,
  });

  // Sync file to Google Drive
  const { mutate: syncFile, isLoading: isSyncing } = useMutation({
    mutationFn: async ({ fileId, driveFolder }: { fileId: string; driveFolder: string }) => {
      const response = await fetch('/api/gdrive/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId, driveFolder }),
      });
      if (!response.ok) throw new Error('Failed to sync file');
      return response.json();
    },
    onSuccess: () => {
      refetch();
      options.onSuccess?.();
    },
    onError: options.onError,
  });

  // Create folder in Google Drive
  const { mutate: createFolder, isLoading: isCreatingFolder } = useMutation({
    mutationFn: async ({ name, parentId }: { name: string; parentId?: string }) => {
      const response = await fetch('/api/gdrive/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, parentId }),
      });
      if (!response.ok) throw new Error('Failed to create folder');
      return response.json();
    },
    onSuccess: () => {
      refetch();
      options.onSuccess?.();
    },
    onError: options.onError,
  });

  return {
    files,
    isConnected,
    selectedFolderId,
    isLoadingFiles,
    isConnecting,
    isSyncing,
    isCreatingFolder,
    connect,
    syncFile,
    createFolder,
    setSelectedFolderId,
  };
}
