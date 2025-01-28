import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/common/navigation/Sidebar';

export const PanelLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
