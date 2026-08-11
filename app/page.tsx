"use client";

import { useCallback, useEffect, useState } from "react";
import { LoaderCircle, TrainFront } from "lucide-react";
import { toast } from "sonner";

import AddJourneyDialog from "@/components/add-journey-dialog";
import DashboardOverview from "@/components/dashboard-overview";
import JourneyTable from "@/components/journey-table";
import { Journey, NewJourney } from "@/types/journey";

export default function Home() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJourneys = useCallback(async () => {
    try {
      const response = await fetch("/api/journeys");
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Gagal mengambil data");
      setJourneys(result.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJourneys();
  }, [fetchJourneys]);

  const handleAddJourney = async (newJourney: NewJourney) => {
    try {
      const response = await fetch("/api/journeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJourney),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Gagal menambahkan");

      setJourneys((prev) => [...prev, result.data]);
      toast.success("Perjalanan berhasil ditambahkan");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menambahkan");
    }
  };

  const handleDeleteJourney = async (id: number) => {
    try {
      const response = await fetch(`/api/journeys/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Gagal menghapus");

      setJourneys((prev) => prev.filter((journey) => journey.id !== id));
      toast.success("Perjalanan berhasil dihapus");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrainFront className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Train Journey Tracker</h1>
              <p className="text-sm text-muted-foreground">
                Pencatat Riwayat & Tiket Perjalanan Kereta
              </p>
            </div>
          </div>
          <AddJourneyDialog onAdd={handleAddJourney} />
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
            <LoaderCircle className="h-8 w-8 animate-spin" />
            <p>Memuat data perjalanan...</p>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
            <p className="font-semibold text-destructive">Terjadi kesalahan</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        ) : (
          <>
            <DashboardOverview journeys={journeys} />

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Riwayat Perjalanan</h2>
                <span className="text-sm text-muted-foreground">
                  {journeys.length} perjalanan tercatat
                </span>
              </div>
              <JourneyTable
                journeys={journeys}
                onDelete={handleDeleteJourney}
              />
            </section>
          </>
        )}
      </div>
    </main>
  );
}
