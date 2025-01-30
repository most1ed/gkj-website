import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { PublicFrontpageFooter } from "./PublicFrontpageFooter";

export function PublicLayout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Add key to force re-render on route change */}
        <div key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <PublicFrontpageFooter />
    </div>
  );
}
