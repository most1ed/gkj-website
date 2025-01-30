import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useGoogleDrive } from "../hooks/useGoogleDrive";
import { Cloud, FolderPlus, RefreshCw } from "lucide-react";

interface GoogleDriveSyncProps {
  selectedFiles: string[];
  onSync?: () => void;
}

export function GoogleDriveSync({ selectedFiles, onSync }: GoogleDriveSyncProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const { toast } = useToast();

  const {
    files: driveFiles,
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
  } = useGoogleDrive({
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "File berhasil disinkronkan ke Google Drive",
      });
      onSync?.();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSync = () => {
    if (!selectedFolderId) {
      toast({
        title: "Pilih Folder",
        description: "Silakan pilih folder tujuan di Google Drive",
        variant: "destructive",
      });
      return;
    }

    selectedFiles.forEach((fileId) => {
      syncFile({ fileId, driveFolder: selectedFolderId });
    });
  };

  const handleCreateFolder = () => {
    if (!newFolderName) return;
    createFolder({
      name: newFolderName,
      parentId: selectedFolderId,
    });
    setNewFolderName("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={selectedFiles.length === 0}
          className="gap-2"
        >
          <Cloud className="h-4 w-4" />
          Sinkronkan ke Drive
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sinkronkan ke Google Drive</DialogTitle>
          <DialogDescription>
            Pilih folder tujuan di Google Drive untuk menyinkronkan file yang dipilih
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!isConnected ? (
            <Button onClick={() => connect()} disabled={isConnecting}>
              <Cloud className="mr-2 h-4 w-4" />
              {isConnecting ? "Menghubungkan..." : "Hubungkan ke Google Drive"}
            </Button>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Select
                  value={selectedFolderId}
                  onValueChange={setSelectedFolderId}
                  disabled={isLoadingFiles}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih folder tujuan" />
                  </SelectTrigger>
                  <SelectContent>
                    {driveFiles?.map((file: any) => (
                      <SelectItem key={file.id} value={file.id}>
                        {file.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedFolderId(undefined)}
                  disabled={isLoadingFiles}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  placeholder="Nama folder baru"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCreateFolder}
                  disabled={isCreatingFolder || !newFolderName}
                >
                  <FolderPlus className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
            disabled={isSyncing}
          >
            Batal
          </Button>
          <Button
            onClick={handleSync}
            disabled={!isConnected || !selectedFolderId || isSyncing}
          >
            {isSyncing ? "Menyinkronkan..." : "Sinkronkan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
