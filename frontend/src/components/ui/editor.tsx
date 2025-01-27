import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  disabled,
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(value);
    }
  }, [value]);

  return (
    <Editor
      apiKey="your-api-key" // Ganti dengan API key TinyMCE Anda
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={onChange}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        placeholder: placeholder,
        readonly: disabled,
      }}
    />
  );
}
