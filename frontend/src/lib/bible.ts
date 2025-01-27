// Bible-related utility functions
export type Language = {
  code: string;
  name: string;
};

export type BibleVersion = {
  id: string;
  name: string;
  language: string;
};

export type BibleBook = {
  id: number;
  name: string;
  testament: 'old' | 'new';
  chapters: number;
};

export type BibleChapter = {
  book: string;
  chapter: number;
  verses: Array<{
    verse: number;
    text: string;
  }>;
};

export async function getLanguages(): Promise<Language[]> {
  // Implementasi untuk mendapatkan daftar bahasa
  return [
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'en', name: 'English' },
  ];
}

export async function getVersions(languageCode?: string): Promise<BibleVersion[]> {
  // Implementasi untuk mendapatkan versi Bible
  const versions: BibleVersion[] = [
    { id: 'tb', name: 'Terjemahan Baru', language: 'id' },
    { id: 'net', name: 'New English Translation', language: 'en' },
  ];

  return languageCode 
    ? versions.filter(v => v.language === languageCode)
    : versions;
}

export async function getBibleBooks(): Promise<BibleBook[]> {
  // Implementasi untuk mendapatkan daftar buku Bible
  const books: BibleBook[] = [
    { id: 1, name: 'Kejadian', testament: 'old', chapters: 50 },
    { id: 2, name: 'Keluaran', testament: 'old', chapters: 40 },
    // Tambahkan buku-buku lainnya
  ];

  return books;
}

export async function getChapterContent(
  version: string, 
  book: string, 
  chapter: number
): Promise<BibleChapter> {
  // Implementasi untuk mendapatkan konten chapter
  return {
    book,
    chapter,
    verses: [
      { verse: 1, text: 'Contoh ayat 1' },
      { verse: 2, text: 'Contoh ayat 2' },
    ]
  };
}
