import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp, X, File as FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
  showProgress?: boolean;
  progress?: number;
}

export function FileUpload({
  value,
  disabled,
  onChange,
  onRemove,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  className,
  showProgress,
  progress = 0,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > maxSize) {
          setError(`File terlalu besar. Maksimal ${maxSize / 1024 / 1024}MB`);
          return;
        }
        setFile(file);
        setError(null);
        // In a real application, you would handle the file upload here
        // and get back a URL or file identifier
        onChange(URL.createObjectURL(file));
      }
    },
    [onChange, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    disabled,
  });

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    setError(null);
    onRemove(value || "");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 transition-colors",
          isDragActive && "border-primary",
          error && "border-destructive",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center gap-4">
            <FileIcon className="h-8 w-8 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </span>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <FileUp className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-semibold text-primary">
                Klik untuk upload
              </span>{" "}
              atau drag and drop
            </div>
            <div className="text-xs text-muted-foreground">
              {accept
                ? `${Object.keys(accept)
                    .map((key) => key.replace("/*", ""))
                    .join(", ")} (maks. ${maxSize / 1024 / 1024}MB)`
                : `Maksimal ${maxSize / 1024 / 1024}MB`}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}

      {showProgress && file && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground text-right">
            {progress}%
          </p>
        </div>
      )}
    </div>
  );
}
