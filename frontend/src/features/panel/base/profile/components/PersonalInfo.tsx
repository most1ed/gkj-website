import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Edit } from "lucide-react";

interface PersonalInfoProps {
  data: {
    name: string;
    gender: string;
    birthPlace: string;
    birthDate: Date;
    address: string;
    phone: string;
    email: string;
    occupation: string;
    education: string;
    baptismDate?: Date;
    confirmationDate?: Date;
    marriageDate?: Date;
    photo?: string;
  };
}

export function PersonalInfo({ data }: PersonalInfoProps) {
  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Data Pribadi</CardTitle>
              <CardDescription>
                Informasi data diri pribadi Anda
              </CardDescription>
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Nama Lengkap
              </dt>
              <dd className="text-base">{data.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Jenis Kelamin
              </dt>
              <dd className="text-base">{data.gender}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Tempat Lahir
              </dt>
              <dd className="text-base">{data.birthPlace}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Tanggal Lahir
              </dt>
              <dd className="text-base">{formatDate(data.birthDate)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Alamat
              </dt>
              <dd className="text-base">{data.address}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                No. Telepon
              </dt>
              <dd className="text-base">{data.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Email
              </dt>
              <dd className="text-base">{data.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Pekerjaan
              </dt>
              <dd className="text-base">{data.occupation}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Pendidikan
              </dt>
              <dd className="text-base">{data.education}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Data Gerejawi</CardTitle>
              <CardDescription>
                Informasi data gerejawi Anda
              </CardDescription>
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.baptismDate && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Tanggal Baptis
                </dt>
                <dd className="text-base">{formatDate(data.baptismDate)}</dd>
              </div>
            )}
            {data.confirmationDate && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Tanggal Sidi
                </dt>
                <dd className="text-base">{formatDate(data.confirmationDate)}</dd>
              </div>
            )}
            {data.marriageDate && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Tanggal Pernikahan
                </dt>
                <dd className="text-base">{formatDate(data.marriageDate)}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
