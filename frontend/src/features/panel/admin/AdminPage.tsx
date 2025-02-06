import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboardIcon,
  LayoutIcon,
  NewspaperIcon,
  DatabaseIcon,
  BookOpen,
  ImageIcon,
  SettingsIcon,
} from "lucide-react";

const adminMenuItems = [
  {
    label: "Dashboard",
    path: "/panel/admin/dashboard",
    icon: LayoutDashboardIcon,
    description: "Ringkasan dan statistik",
  },
  {
    label: "Konten",
    path: "/panel/admin/konten",
    icon: LayoutIcon,
    description: "Kelola konten website",
  },
  {
    label: "Artikel",
    path: "/panel/admin/artikel",
    icon: NewspaperIcon,
    description: "Kelola artikel dan berita",
  },
  {
    label: "Master",
    path: "/panel/admin/master",
    icon: DatabaseIcon,
    description: "Kelola data master",
  },
  {
    label: "Alkitab",
    path: "/panel/admin/alkitab",
    icon: BookOpen,
    description: "Kelola konten alkitab",
  },
  {
    label: "Media",
    path: "/panel/admin/media",
    icon: ImageIcon,
    description: "Kelola media dan galeri",
  },
  {
    label: "Pengaturan",
    path: "/panel/admin/pengaturan",
    icon: SettingsIcon,
    description: "Pengaturan sistem",
  },
];

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Panel</h2>
        <p className="text-muted-foreground">
          Kelola dan atur semua fitur website
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminMenuItems.map((item) => (
          <Card
            key={item.path}
            className="p-6 hover:bg-accent cursor-pointer transition-colors"
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{item.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
