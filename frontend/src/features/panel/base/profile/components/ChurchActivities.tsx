import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface Activity {
  id: string;
  type: "worship" | "fellowship" | "service" | "training" | "other";
  title: string;
  role: string;
  date: Date;
  status: "upcoming" | "ongoing" | "completed";
}

interface Commission {
  id: string;
  name: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  status: "active" | "inactive";
}

interface ChurchActivitiesProps {
  data: {
    activities: Activity[];
    commissions: Commission[];
    stats: {
      totalActivities: number;
      upcomingActivities: number;
      totalCommissions: number;
      activeCommissions: number;
    };
  };
}

export function ChurchActivities({ data }: ChurchActivitiesProps) {
  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  const getActivityStatusBadgeClass = (status: Activity["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100";
      case "ongoing":
        return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      case "completed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  const getActivityStatusText = (status: Activity["status"]) => {
    switch (status) {
      case "upcoming":
        return "Akan Datang";
      case "ongoing":
        return "Berlangsung";
      case "completed":
        return "Selesai";
      default:
        return "-";
    }
  };

  const getCommissionStatusBadgeClass = (status: Commission["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      case "inactive":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  const getCommissionStatusText = (status: Commission["status"]) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "inactive":
        return "Tidak Aktif";
      default:
        return "-";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Kegiatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.stats.totalActivities}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Kegiatan yang diikuti
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Kegiatan Mendatang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.stats.upcomingActivities}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Akan datang
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Komisi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.stats.totalCommissions}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Komisi yang diikuti
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Komisi Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.stats.activeCommissions}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Saat ini aktif
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kegiatan</CardTitle>
          <CardDescription>
            Daftar kegiatan yang diikuti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Kegiatan</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{formatDate(activity.date)}</TableCell>
                  <TableCell>{activity.title}</TableCell>
                  <TableCell>{activity.role}</TableCell>
                  <TableCell>
                    <Badge className={getActivityStatusBadgeClass(activity.status)}>
                      {getActivityStatusText(activity.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Komisi</CardTitle>
          <CardDescription>
            Daftar keanggotaan komisi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Komisi</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Mulai</TableHead>
                <TableHead>Selesai</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.commissions.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell>{commission.name}</TableCell>
                  <TableCell>{commission.role}</TableCell>
                  <TableCell>{formatDate(commission.startDate)}</TableCell>
                  <TableCell>
                    {commission.endDate ? formatDate(commission.endDate) : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getCommissionStatusBadgeClass(commission.status)}
                    >
                      {getCommissionStatusText(commission.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
