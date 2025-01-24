import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Ministries from './pages/Ministries';
import Media from './pages/Media';
import Offerings from './pages/Offerings';
import Announcements from './pages/Announcements';
import ArchiveWarta from './pages/ArchiveWarta';
import Schedule from './pages/Schedule';
import News from './pages/News';
import NotFound from './pages/NotFound';
import ArticleDetail from './pages/ArticleDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import Bible from './pages/Bible';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import Documents from './pages/dashboard/Documents';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route element={<PublicLayout />}>
          {/* Main Menu Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/media" element={<Media />} />
          <Route path="/offerings" element={<Offerings />} />
          <Route path="/bible" element={<Bible />} />

          {/* Articles */}
          <Route path="/articles/:slug" element={<ArticleDetail />} />

          {/* Warta & Announcements */}
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/arsip-warta" element={<ArchiveWarta />} />
          
          {/* Additional Routes */}
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/news" element={<News />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/documents" element={<Documents />} />

          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* 404 handler - must be last */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
