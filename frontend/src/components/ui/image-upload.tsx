import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  className?: string;
}

export function ImageUpload({
  value,
  disabled,
  onChange,
  onRemove,
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    disabled,
  });

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPreview(null);
    onRemove(value || "");
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 transition-colors",
        isDragActive && "border-primary",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative aspect-video w-full">
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full rounded-lg object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm">
            <span className="font-semibold text-primary">Klik untuk upload</span>{" "}
            atau drag and drop
          </div>
          <div className="text-xs text-muted-foreground">
            PNG, JPG atau GIF (maks. 4MB)
          </div>
        </div>
      )}
    </div>
  );
}
