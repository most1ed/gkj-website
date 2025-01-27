import { useState, useEffect } from "react";

interface Document {
  id: string;
  type: "baptism" | "marriage" | "membership" | "other";
  title: string;
  description: string;
  requestDate: Date;
  status: "pending" | "processing" | "ready" | "completed" | "rejected";
  requestedBy: string;
  approvedBy?: string;
  rejectionReason?: string;
  completedDate?: Date;
  downloadUrl?: string;
  expiryDate?: Date;
}

interface DocumentType {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  processingTime: string;
  fee?: number;
}

interface DocumentsData {
  documents: Document[];
  documentTypes: DocumentType[];
  summary: {
    totalDocuments: number;
    pendingDocuments: number;
    completedDocuments: number;
    rejectedDocuments: number;
  };
}

export function useDocumentsData() {
  const [data, setData] = useState<DocumentsData>({
    documents: [
      {
        id: "1",
        type: "baptism",
        title: "Surat Baptis",
        description: "Surat keterangan baptis",
        requestDate: new Date("2024-01-20"),
        status: "completed",
        requestedBy: "John Doe",
        approvedBy: "Admin",
        completedDate: new Date("2024-01-22"),
        downloadUrl: "/documents/baptism-1.pdf",
        expiryDate: new Date("2025-01-22"),
      },
      {
        id: "2",
        type: "marriage",
        title: "Surat Nikah",
        description: "Surat keterangan nikah",
        requestDate: new Date("2024-01-25"),
        status: "pending",
        requestedBy: "John Doe",
      },
    ],
    documentTypes: [
      {
        id: "1",
        name: "Surat Baptis",
        description: "Surat keterangan telah dibaptis",
        requirements: [
          "Kartu Keluarga",
          "Akte Kelahiran",
          "Foto 4x6 (2 lembar)",
        ],
        processingTime: "3-5 hari kerja",
      },
      {
        id: "2",
        name: "Surat Nikah",
        description: "Surat keterangan pernikahan",
        requirements: [
          "KTP",
          "Kartu Keluarga",
          "Surat Baptis",
          "Foto 4x6 berdampingan (4 lembar)",
        ],
        processingTime: "5-7 hari kerja",
        fee: 100000,
      },
    ],
    summary: {
      totalDocuments: 10,
      pendingDocuments: 2,
      completedDocuments: 7,
      rejectedDocuments: 1,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Simulasi loading data
  useEffect(() => {
    setIsLoading(true);
    // Di sini nanti akan ada pemanggilan API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return {
    data,
    isLoading,
    error,
    // Nanti bisa ditambahkan fungsi-fungsi untuk manipulasi data
    requestDocument: async () => {},
    cancelRequest: async () => {},
    downloadDocument: async () => {},
    getDocumentTypes: async () => {},
    getDocumentRequirements: async () => {},
  };
}
