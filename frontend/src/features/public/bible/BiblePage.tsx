import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Search, Menu, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { 
  getLanguages,
  getVersions,
  getBibleBooks,
  getChapterContent,
  type Language,
  type BibleVersion,
  type BibleBook,
  type BibleChapter
} from '@/lib/bible';

const DEFAULT_LANGUAGE = 'id';
const DEFAULT_VERSION = 'tb';

function Bible() {
  // Data states
  const [languages, setLanguages] = useState<Language[]>([]);
  const [versions, setVersions] = useState<BibleVersion[]>([]);
  const [books, setBooks] = useState<BibleBook[]>([]);
  const [chapterContent, setChapterContent] = useState<BibleChapter | null>(null);

  // Selection states
  const [selectedLanguage, setSelectedLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [selectedVersion, setSelectedVersion] = useState<string>(DEFAULT_VERSION);
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [chapter, setChapter] = useState(1);
  
  // UI states
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll states
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 20 });

  // Handle scroll to top
  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update scroll button visibility
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowScrollTop(latest > 200);
    });
  }, [scrollY]);

  // Load languages
  useEffect(() => {
    async function loadLanguages() {
      try {
        setLoading(true);
        const langs = await getLanguages();
        setLanguages(langs);
        
        // Pastikan bahasa Indonesia tersedia
        const indonesian = langs.find(lang => lang.code === DEFAULT_LANGUAGE);
        if (!indonesian) {
          throw new Error('Bahasa Indonesia tidak tersedia');
        }
        setSelectedLanguage(DEFAULT_LANGUAGE);
      } catch (err) {
        console.error('Error loading languages:', err);
        setError('Gagal memuat daftar bahasa');
      } finally {
        setLoading(false);
      }
    }

    loadLanguages();
  }, []);

  // Load versions when language changes
  useEffect(() => {
    async function loadVersions() {
      if (!selectedLanguage) return;
      
      try {
        setLoading(true);
        const vers = await getVersions(selectedLanguage);
        setVersions(vers);
        
        // Jika bahasa Indonesia, pastikan versi TB tersedia
        if (selectedLanguage === DEFAULT_LANGUAGE) {
          const tbVersion = vers.find(ver => ver.code === DEFAULT_VERSION);
          if (!tbVersion) {
            throw new Error('Versi Terjemahan Baru (TB) tidak tersedia');
          }
          setSelectedVersion(DEFAULT_VERSION);
        } else {
          // Untuk bahasa lain, gunakan versi pertama
          setSelectedVersion(vers[0]?.code || '');
        }
      } catch (err) {
        console.error('Error loading versions:', err);
        setError('Gagal memuat daftar versi');
      } finally {
        setLoading(false);
      }
    }

    loadVersions();
  }, [selectedLanguage]);

  // Load books when version changes
  useEffect(() => {
    async function loadBooks() {
      if (!selectedVersion) return;
      
      try {
        setLoading(true);
        const booksList = await getBibleBooks(selectedVersion);
        setBooks(booksList);
        if (booksList.length > 0) {
          // Default ke Kejadian
          const genesis = booksList.find(book => book.abbr === 'Kej') || booksList[0];
          setSelectedBook(genesis);
          setChapter(1); // Mulai dari pasal 1
        }
      } catch (err) {
        console.error('Error loading books:', err);
        setError('Gagal memuat daftar kitab');
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [selectedVersion]);

  // Load chapter content
  useEffect(() => {
    async function loadChapter() {
      if (!selectedBook || !selectedVersion) return;
      
      try {
        setLoading(true);
        setError(null);
        const content = await getChapterContent(selectedBook.abbr, chapter, selectedVersion);
        setChapterContent(content);
      } catch (err) {
        setError('Gagal memuat konten. Silakan coba lagi.');
        console.error('Error loading chapter:', err);
      } finally {
        setLoading(false);
      }
    }

    loadChapter();
  }, [selectedBook?.abbr, chapter, selectedVersion]);

  // Handle search with autocomplete
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Parse input like "Mat 5" or "Mat 5:3"
    const match = query.match(/^(\w+)\s*(\d+)(?::(\d+))?$/i);
    if (match) {
      const [_, bookCode, chapterNum] = match;
      const book = books.find(b => 
        b.abbr.toLowerCase() === bookCode.toLowerCase() ||
        b.name.toLowerCase().startsWith(bookCode.toLowerCase())
      );
      
      if (book) {
        setSelectedBook(book);
        const ch = parseInt(chapterNum);
        if (ch > 0 && ch <= book.chapter) {
          setChapter(ch);
        }
      }
    }
  };

  // Generate array untuk pasal
  const chapters = selectedBook ? Array.from({ length: selectedBook.chapter }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Pasal ${i + 1}`
  })) : [];

  const Sidebar = () => {
    const [oldCollapsed, setOldCollapsed] = useState(false);
    const [newCollapsed, setNewCollapsed] = useState(false);

    const oldTestament = books.filter(book => book.no <= 39);
    const newTestament = books.filter(book => book.no > 39);

    return (
      <div className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <div className="space-y-4 p-4">
          {/* Perjanjian Lama */}
          <div className="border rounded-lg">
            <button
              onClick={() => setOldCollapsed(!oldCollapsed)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 rounded-lg transition-colors"
            >
              <h2 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Perjanjian Lama
              </h2>
              <ChevronRight 
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  !oldCollapsed && "rotate-90"
                )} 
              />
            </button>
            
            <div className={cn(
              "overflow-hidden transition-all",
              oldCollapsed ? "max-h-0" : "max-h-[1000px]"
            )}>
              <div className="px-2 pb-3 space-y-0.5">
                {oldTestament.map(book => (
                  <Button
                    key={book.no}
                    variant={selectedBook?.no === book.no ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sm font-medium py-1.5 h-auto",
                      selectedBook?.no === book.no && "bg-secondary"
                    )}
                    onClick={() => {
                      setSelectedBook(book);
                      setChapter(1);
                    }}
                  >
                    <span className="truncate">{book.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{book.abbr}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Perjanjian Baru */}
          <div className="border rounded-lg">
            <button
              onClick={() => setNewCollapsed(!newCollapsed)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 rounded-lg transition-colors"
            >
              <h2 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Perjanjian Baru
              </h2>
              <ChevronRight 
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  !newCollapsed && "rotate-90"
                )} 
              />
            </button>
            
            <div className={cn(
              "overflow-hidden transition-all",
              newCollapsed ? "max-h-0" : "max-h-[1000px]"
            )}>
              <div className="px-2 pb-3 space-y-0.5">
                {newTestament.map(book => (
                  <Button
                    key={book.no}
                    variant={selectedBook?.no === book.no ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sm font-medium py-1.5 h-auto",
                      selectedBook?.no === book.no && "bg-secondary"
                    )}
                    onClick={() => {
                      setSelectedBook(book);
                      setChapter(1);
                    }}
                  >
                    <span className="truncate">{book.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{book.abbr}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Verse component with hover and scroll animations
  const VerseComponent = ({ verse }: { verse: BibleVerse }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

    if (verse.type === 'title') {
      return (
        <motion.h3
          ref={ref}
          className="font-bold text-lg mt-8 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.02,
            color: 'var(--primary)',
            transition: { duration: 0.2 }
          }}
        >
          {verse.content}
        </motion.h3>
      );
    }

    return (
      <motion.div
        ref={ref}
        className="group relative"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute left-0 w-1 h-full bg-primary/0 rounded-full -ml-2"
          initial={false}
          animate={{ 
            backgroundColor: ['hsl(var(--primary) / 0)', 'hsl(var(--primary) / 0.2)'],
            height: ['0%', '100%']
          }}
          transition={{ duration: 0.2 }}
          whileHover={{
            backgroundColor: 'hsl(var(--primary) / 0.4)',
            width: '4px'
          }}
        />
        <motion.p 
          className="flex gap-2 p-2 rounded-lg transition-colors"
          whileHover={{ 
            backgroundColor: 'hsl(var(--muted) / 0.3)',
            transition: { duration: 0.2 }
          }}
        >
          <motion.span 
            className="text-sm text-muted-foreground font-medium w-6 shrink-0 pt-1"
            whileHover={{ scale: 1.2, color: 'hsl(var(--primary))' }}
          >
            {verse.verse}
          </motion.span>
          <span className="group-hover:text-primary/90 transition-colors">
            {verse.content}
          </span>
        </motion.p>
      </motion.div>
    );
  };

  if (loading && !selectedBook) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center h-screen gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground animate-pulse">Memuat Alkitab...</p>
      </motion.div>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container mx-auto"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center py-8"
      >
        <motion.h1 
          className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          Alkitab
        </motion.h1>
        <motion.div 
          className="flex items-center justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Bahasa */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Bahasa:</label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
              options={languages.map(lang => ({
                value: lang.code,
                label: lang.name
              }))}
              className="w-[140px]"
            />
          </div>

          {/* Versi */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Versi:</label>
            <Select
              value={selectedVersion}
              onValueChange={setSelectedVersion}
              options={versions.map(ver => ({
                value: ver.code,
                label: ver.name
              }))}
              className="w-[200px]"
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="flex min-h-[calc(100vh-13rem)]">
        {/* Sidebar - Hidden on mobile */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="hidden md:block w-64 border-r"
        >
          <Sidebar />
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <div className="flex h-14 items-center gap-4 px-4">
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>

              {/* Search */}
              <div className="flex-1">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari (contoh: Mat 5)"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-9"
                  />
                </div>
              </div>
            </div>
          </motion.header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto">
            <div className="h-full flex flex-col">
              {/* Chapter Navigation */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Card className="mx-4 mt-4 overflow-hidden">
                  <div className="px-4 py-3 flex items-center justify-between bg-muted/50">
                    <Button
                      variant="ghost"
                      onClick={() => chapter > 1 && setChapter(chapter - 1)}
                      disabled={chapter === 1}
                      className="font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Sebelumnya
                    </Button>

                    <div className="flex items-center gap-3">
                      <motion.h2 
                        className="text-lg font-semibold"
                        key={selectedBook?.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {selectedBook?.name}
                      </motion.h2>
                      <Select
                        value={chapter.toString()}
                        onValueChange={(value) => setChapter(parseInt(value))}
                        options={chapters}
                        className="w-[100px]"
                      />
                    </div>

                    <Button
                      variant="ghost"
                      onClick={() => selectedBook && chapter < selectedBook.chapter && setChapter(chapter + 1)}
                      disabled={!selectedBook || chapter === selectedBook.chapter}
                      className="font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Selanjutnya
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Bible Content */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Card className="flex-1 mx-4 mt-4 mb-4 overflow-hidden">
                  <div className="h-full flex flex-col">
                    <motion.div 
                      className="text-center py-4 border-b"
                      whileHover={{
                        backgroundColor: 'hsl(var(--muted) / 0.3)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.h1 
                        className="text-2xl font-bold mb-1"
                        key={`${selectedBook?.name}-${chapter}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {selectedBook?.name} {chapter}
                      </motion.h1>
                    </motion.div>
                    
                    <div className="flex-1 p-6 overflow-y-auto relative" ref={contentRef}>
                      {loading ? (
                        <motion.div 
                          className="flex flex-col items-center justify-center h-full gap-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <LoadingSpinner />
                          <p className="text-muted-foreground animate-pulse">Memuat...</p>
                        </motion.div>
                      ) : error ? (
                        <motion.div 
                          className="flex items-center justify-center h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <p className="text-red-500">{error}</p>
                        </motion.div>
                      ) : (
                        <motion.div 
                          className="prose prose-lg max-w-none space-y-4"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1
                              }
                            }
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {chapterContent?.verses.map((verse) => (
                              <VerseComponent key={verse.verse} verse={verse} />
                            ))}
                          </AnimatePresence>
                        </motion.div>
                      )}

                      {/* Scroll to Top Button */}
                      <AnimatePresence>
                        {showScrollTop && (
                          <motion.button
                            className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ArrowUp className="w-5 h-5" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </motion.main>
  );
}

export default Bible;
