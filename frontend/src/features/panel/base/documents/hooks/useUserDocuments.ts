import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Document {
  id: string;
  title: string;
  type: "baptis" | "sidi" | "nikah" | "kematian" | "pindah" | "other";
  status: "pending" | "approved" | "rejected";
  requestDate: Date;
  approvalDate?: Date;
  approvedBy?: string;
  rejectionReason?: string;
  downloadUrl?: string;
}

interface DocumentRequest {
  type: Document["type"];
  title: string;
  description?: string;
  attachments?: File[];
}

export function useUserDocuments() {
  const queryClient = useQueryClient();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch user's documents
  const { data: documents, isLoading } = useQuery({
    queryKey: ["user-documents"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/user/documents`);
      return response.data;
    },
  });

  // Request new document
  const { mutate: requestDocument } = useMutation({
    mutationFn: async (request: DocumentRequest) => {
      const formData = new FormData();
      formData.append("type", request.type);
      formData.append("title", request.title);
      if (request.description) {
        formData.append("description", request.description);
      }
      if (request.attachments) {
        request.attachments.forEach((file) => {
          formData.append("attachments", file);
        });
      }

      const response = await axios.post(
        `${API_URL}/api/user/documents/request`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-documents"] });
    },
  });

  // Cancel document request
  const { mutate: cancelRequest } = useMutation({
    mutationFn: async (documentId: string) => {
      const response = await axios.delete(
        `${API_URL}/api/user/documents/${documentId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-documents"] });
    },
  });

  // Download document
  const { mutate: downloadDocument } = useMutation({
    mutationFn: async (documentId: string) => {
      const response = await axios.get(
        `${API_URL}/api/user/documents/${documentId}/download`,
        {
          responseType: "blob",
        }
      );
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `document-${documentId}.pdf` // You might want to get the actual filename from the response headers
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });

  return {
    documents,
    isLoading,
    requestDocument,
    cancelRequest,
    downloadDocument,
  };
}

// Helper functions for document status and types
export function getDocumentStatusText(status: Document["status"]) {
  switch (status) {
    case "pending":
      return "Menunggu Persetujuan";
    case "approved":
      return "Disetujui";
    case "rejected":
      return "Ditolak";
    default:
      return "-";
  }
}

export function getDocumentStatusClass(status: Document["status"]) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100";
    case "approved":
      return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
    case "rejected":
      return "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
  }
}

export function getDocumentTypeText(type: Document["type"]) {
  switch (type) {
    case "baptis":
      return "Surat Baptis";
    case "sidi":
      return "Surat Sidi";
    case "nikah":
      return "Surat Nikah";
    case "kematian":
      return "Surat Kematian";
    case "pindah":
      return "Surat Pindah";
    case "other":
      return "Dokumen Lainnya";
    default:
      return "-";
  }
}
