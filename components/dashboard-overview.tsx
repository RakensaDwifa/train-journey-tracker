import { CalendarClock, TrainFront, Wallet } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Journey } from "@/types/journey";

interface DashboardOverviewProps {
  journeys: Journey[];
}

export default function DashboardOverview({
  journeys,
}: DashboardOverviewProps) {
  const totalTrips = journeys.length;
  const totalSpending = journeys.reduce(
    (sum, journey) => sum + journey.price,
    0
  );
  const upcomingTrips = journeys.filter(
    (journey) => journey.status === "Akan Datang"
  ).length;

  const stats = [
    {
      title: "Total Perjalanan",
      value: totalTrips.toString(),
      icon: TrainFront,
      iconClass: "text-blue-600 bg-blue-100",
    },
    {
      title: "Total Pengeluaran Tiket",
      value: formatCurrency(totalSpending),
      icon: Wallet,
      iconClass: "text-emerald-600 bg-emerald-100",
    },
    {
      title: "Perjalanan Mendatang",
      value: upcomingTrips.toString(),
      icon: CalendarClock,
      iconClass: "text-amber-600 bg-amber-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-md ${stat.iconClass}`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
