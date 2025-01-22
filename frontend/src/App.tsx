import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Ministries from './pages/Ministries';
import Media from './pages/Media';
import Offerings from './pages/Offerings';
// import Announcements from './pages/Announcements';
import Schedule from './pages/Schedule';
import News from './pages/News';
import NotFound from './pages/NotFound';
import ArticleDetail from './pages/ArticleDetail';

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

          {/* Articles */}
          <Route path="/articles/:slug" element={<ArticleDetail />} />

          {/* Warta & Announcements */}
          {/* Temporarily disabled */}
          {/* <Route path="/announcements" element={<Announcements />} /> */}
          <Route path="/announcements" element={<div>Coming Soon</div>} />
          <Route path="/arsip-warta" element={<Navigate to="/announcements" replace />} />
          
          {/* Additional Routes */}
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/news" element={<News />} />

          {/* 404 handler - must be last */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
