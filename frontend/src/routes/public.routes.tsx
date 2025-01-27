import { RouteObject } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { NotFoundPage } from "@/features/public/not-found/NotFoundPage";
import { DummyPage } from "@/components/DummyPage";

// Import existing pages
import { HomePage } from "@/features/public/home/HomePage";
import Offerings from "@/features/public/offerings/OfferingsPage";
import Media from "@/features/public/media/MediaPage";
import Services from "@/features/public/services/ServicesPage";
import AboutPage from "@/features/public/about/AboutPage";
import Bible from "@/features/public/bible/BiblePage";
import Ministries from "@/features/public/ministries/MinistriesPage";
import OrganizationStructurePage from "@/features/public/about/OrganizationStructurePage";
import MissionStatementPage from "@/features/public/about/MissionStatementPage";
import AccessibilityPage from "@/features/public/legal/AccessibilityPage";
import FinancialReportPage from "@/features/public/financial/FinancialReportPage";
import SecurityPolicyPage from "@/features/public/legal/SecurityPolicyPage";

// Import Legal Pages
import PrivacyPolicy from "@/features/public/legal/PrivacyPolicyPage";
import Terms from "@/features/public/legal/TermsPage";
import Sitemap from "@/features/public/sitemap/SitemapPage";
import AnnouncementsPage from "@/features/public/announcements/AnnouncementsPage";

// Import the new ArchiveWartaPage
import ArchiveWartaPage from "@/features/public/archive-warta/ArchiveWartaPage";
import WartaDetailPage from "@/features/public/archive-warta/WartaDetailPage";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // Main Pages
      { 
        index: true, 
        element: <HomePage /> 
      },
      { 
        path: "about", 
        element: <AboutPage /> 
      },
      { 
        path: "services", 
        element: <Services /> 
      },
      { 
        path: "ministries", 
        element: <Ministries /> 
      },
      { 
        path: "media", 
        element: <Media /> 
      },
      { 
        path: "bible", 
        element: <Bible /> 
      },
      { 
        path: "offerings", 
        element: <Offerings /> 
      },
      
      // News & Updates
      { 
        path: "news", 
        element: <DummyPage title="News" /> 
      },
      { 
        path: "announcements", 
        element: <AnnouncementsPage /> 
      },
      { 
        path: "arsip-warta", 
        element: <ArchiveWartaPage /> 
      },
      { 
        path: "warta/:slug", 
        element: <WartaDetailPage /> 
      },
      { 
        path: "articles/:slug", 
        element: <DummyPage title="Article Details" /> 
      },
      
      // Schedule & Events
      { 
        path: "schedule", 
        element: <DummyPage title="Schedule" /> 
      },
      
      // Legal & Site Info
      { 
        path: "privacy-policy", 
        element: <PrivacyPolicy /> 
      },
      { 
        path: "terms", 
        element: <Terms /> 
      },
      { 
        path: "sitemap", 
        element: <Sitemap /> 
      },
      { 
        path: "mission-statement", 
        element: <MissionStatementPage /> 
      },
      { 
        path: "pernyataan-misi", 
        element: <MissionStatementPage /> 
      },
      { 
        path: "organization-structure", 
        element: <OrganizationStructurePage /> 
      },
      { 
        path: "organizational-structure", 
        element: <OrganizationStructurePage /> 
      },
      { 
        path: "financial-report", 
        element: <FinancialReportPage /> 
      },
      { 
        path: "financial-reports", 
        element: <FinancialReportPage /> 
      },
      { 
        path: "security-policy", 
        element: <SecurityPolicyPage /> 
      },
      
      // Home Page Sections
      { 
        path: "home/articles", 
        element: <DummyPage title="Articles" /> 
      },
      { 
        path: "home/events-highlight", 
        element: <DummyPage title="Events Highlight" /> 
      },
      { 
        path: "home/features", 
        element: <DummyPage title="Features" /> 
      },
      { 
        path: "home/gallery", 
        element: <DummyPage title="Gallery" /> 
      },
      { 
        path: "home/important-announcements", 
        element: <DummyPage title="Important Announcements" /> 
      },
      { 
        path: "home/latest-news", 
        element: <DummyPage title="Latest News" /> 
      },
      { 
        path: "home/offering-info", 
        element: <DummyPage title="Offering Info" /> 
      },
      { 
        path: "home/prayer-support", 
        element: <DummyPage title="Prayer Support" /> 
      },
      { 
        path: "home/quick-info", 
        element: <DummyPage title="Quick Info" /> 
      },
      { 
        path: "home/services-overview", 
        element: <DummyPage title="Services Overview" /> 
      },
      { 
        path: "home/upcoming-events", 
        element: <DummyPage title="Upcoming Events" /> 
      },
      { 
        path: "home/weekly-service", 
        element: <DummyPage title="Weekly Service" /> 
      },
    ],
  },
];
