// Types
export type Language = {
  code: string;
  name: string;
};

export type BibleVersion = {
  code: string;
  name: string;
};

export type BibleBook = {
  no: number;
  abbr: string;
  name: string;
  chapter: number;
};

export type BibleVerse = {
  verse: number;
  type: 'title' | 'content';
  content: string;
};

export type BibleChapter = {
  book: {
    abbr: string;
    name: string;
    chapter: number;
  };
  verses: BibleVerse[];
};

// Default values
export const DEFAULT_LANGUAGE = 'id';  // Bahasa Indonesia
export const DEFAULT_VERSION = 'tb';   // Terjemahan Baru

// Hardcoded languages karena endpoint tidak tersedia
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'id', name: 'Bahasa Indonesia' }
];

// API functions
const BASE_URL = 'https://beeble.vercel.app/api/v1';

// Mendapatkan daftar bahasa yang tersedia
export async function getLanguages(): Promise<Language[]> {
  // Return hardcoded languages karena endpoint tidak tersedia
  return SUPPORTED_LANGUAGES;
}

// Mendapatkan daftar versi berdasarkan bahasa
export async function getVersions(language: string = DEFAULT_LANGUAGE): Promise<BibleVersion[]> {
  try {
    const response = await fetch(`${BASE_URL}/versions?language=${language}`);
    if (!response.ok) {
      throw new Error('Failed to fetch versions');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching versions:', error);
    throw new Error('Gagal memuat daftar versi');
  }
}

// Mendapatkan daftar kitab untuk versi tertentu
export async function getBibleBooks(version: string = DEFAULT_VERSION): Promise<BibleBook[]> {
  try {
    const response = await fetch(`${BASE_URL}/passage/list?ver=${version}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bible books');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching bible books:', error);
    throw new Error('Gagal memuat daftar kitab');
  }
}

// Mendapatkan informasi kitab (jumlah pasal)
export async function getBookInfo(abbr: string): Promise<{ abbr: string; name: string; chapter_count: number }> {
  try {
    const response = await fetch(`${BASE_URL}/passage/${abbr}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book info');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching book info:', error);
    throw new Error('Gagal memuat informasi kitab');
  }
}

// Mendapatkan konten pasal
export async function getChapterContent(
  abbr: string,
  chapter: number,
  version: string = DEFAULT_VERSION
): Promise<BibleChapter> {
  try {
    const response = await fetch(`${BASE_URL}/passage/${abbr}/${chapter}?ver=${version}`);
    if (!response.ok) {
      throw new Error('Failed to fetch chapter content');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching chapter content:', error);
    throw new Error('Gagal memuat isi pasal');
  }
}

// Mendapatkan konten ayat tertentu
export async function getVerseContent(
  abbr: string,
  chapter: number,
  verse: number,
  version: string = DEFAULT_VERSION
): Promise<{ book: { abbr: string; name: string; chapter: number; verse: number }; content: string }> {
  try {
    const response = await fetch(`${BASE_URL}/passage/${abbr}/${chapter}/${verse}?ver=${version}`);
    if (!response.ok) {
      throw new Error('Failed to fetch verse content');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching verse content:', error);
    throw new Error('Gagal memuat isi ayat');
  }
}
