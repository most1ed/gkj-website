import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import generatePDF from "./PDFGenerator";
import { WartaJemaat, JadwalIbadah, JurnalKebaktian, DukunganDoa } from "@/types";

interface PDFDownloadButtonProps {
  wartaJemaat: WartaJemaat[];
  jadwalIbadah: JadwalIbadah[];
  jurnalKebaktian: JurnalKebaktian[];
  dukunganDoa: DukunganDoa[];
  tanggal: string;
}

const PDFDownloadButton = ({
  wartaJemaat,
  jadwalIbadah,
  jurnalKebaktian,
  dukunganDoa,
  tanggal,
}: PDFDownloadButtonProps) => {
  const handleDownload = () => {
    const doc = generatePDF(
      wartaJemaat,
      jadwalIbadah,
      jurnalKebaktian,
      dukunganDoa,
      tanggal
    );
    doc.save(`Warta-Jemaat-${tanggal}.pdf`);
  };

  return (
    <Button onClick={handleDownload} variant="outline" size="sm">
      <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
      Download PDF
    </Button>
  );
};

export default PDFDownloadButton;
