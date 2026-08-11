import { ArrowRight, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ClassType, Journey, JourneyStatus } from "@/types/journey";

interface JourneyTableProps {
  journeys: Journey[];
  onDelete: (id: number) => void;
}

function ClassBadge({ classType }: { classType: ClassType }) {
  const variant: Record<ClassType, string> = {
    Eksekutif: "bg-amber-100 text-amber-800 hover:bg-amber-100",
    Bisnis: "bg-sky-100 text-sky-800 hover:bg-sky-100",
    Ekonomi: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  };
  return (
    <Badge variant="secondary" className={variant[classType]}>
      {classType}
    </Badge>
  );
}

function StatusBadge({ status }: { status: JourneyStatus }) {
  const isDone = status === "Selesai";
  return (
    <Badge
      variant={isDone ? "secondary" : "default"}
      className={
        isDone
          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
          : "bg-blue-600 text-white hover:bg-blue-600"
      }
    >
      {status}
    </Badge>
  );
}

export default function JourneyTable({
  journeys,
  onDelete,
}: JourneyTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Rute</TableHead>
            <TableHead>Kereta</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead className="text-right">Harga</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {journeys.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                Belum ada data perjalanan.
              </TableCell>
            </TableRow>
          ) : (
            journeys.map((journey) => (
              <TableRow key={journey.id}>
                <TableCell className="whitespace-nowrap">
                  {formatDate(journey.date)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{journey.origin}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium">{journey.destination}</span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {journey.train_name}
                </TableCell>
                <TableCell>
                  <ClassBadge classType={journey.class_type} />
                </TableCell>
                <TableCell className="whitespace-nowrap text-right font-semibold">
                  {formatCurrency(journey.price)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={journey.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    aria-label={`Hapus perjalanan ${journey.train_name}`}
                    onClick={() => onDelete(journey.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
