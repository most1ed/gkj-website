import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register custom font
Font.register({
  family: 'Roboto',
  src: '/fonts/Roboto-Regular.ttf',
});

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 3,
  },
  date: {
    fontSize: 10,
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    minHeight: 25,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 8,
  },
});

interface WartaPDFProps {
  wartaJemaat: any[];
  jadwalIbadah: any[];
  jurnalKebaktian: any[];
  dukunganDoa: any[];
  tanggal: string;
}

const WartaPDF: React.FC<WartaPDFProps> = ({
  wartaJemaat,
  jadwalIbadah,
  jurnalKebaktian,
  dukunganDoa,
  tanggal,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src="/images/logo-gkj.png" />
        <Text style={styles.title}>WARTA JEMAAT</Text>
        <Text style={styles.subtitle}>Gereja Kristen Jawa Salatiga</Text>
        <Text style={styles.date}>{tanggal}</Text>
      </View>

      {/* Warta Jemaat */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WARTA PENTING</Text>
        {wartaJemaat
          .filter((warta) => warta.priority === 'high')
          .map((warta, index) => (
            <View key={index} style={styles.content}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{warta.title}</Text>
              <Text>{warta.content}</Text>
            </View>
          ))}
      </View>

      {/* Jadwal Ibadah */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>JADWAL IBADAH MINGGU INI</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Waktu</Text>
            <Text style={styles.tableCell}>Tempat</Text>
            <Text style={styles.tableCell}>Pelayan</Text>
          </View>
          {jadwalIbadah.map((jadwal, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{jadwal.waktu}</Text>
              <Text style={styles.tableCell}>{jadwal.tempat}</Text>
              <Text style={styles.tableCell}>{jadwal.pelayan}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Jurnal Kebaktian */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>JURNAL KEBAKTIAN</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Bacaan:</Text>
            <Text style={styles.tableCell}>{jurnalKebaktian[0].bacaanAlkitab[0]}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Tema:</Text>
            <Text style={styles.tableCell}>{jurnalKebaktian[0].tema}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Warna Liturgis:</Text>
            <Text style={styles.tableCell}>{jurnalKebaktian[0].warnaLiturgis[0]}</Text>
          </View>
        </View>
      </View>

      {/* Dukungan Doa */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DUKUNGAN DOA</Text>
        {dukunganDoa.map((doa, index) => (
          <View key={index} style={styles.content}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{doa.kategori}</Text>
            <Text>{doa.nama.join(', ')}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>GKJ Salatiga {new Date().getFullYear()}</Text>
      </View>
      
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </Page>
  </Document>
);

export default WartaPDF;
