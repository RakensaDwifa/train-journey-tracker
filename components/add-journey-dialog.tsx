"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassType, JourneyStatus, NewJourney } from "@/types/journey";

interface AddJourneyDialogProps {
  onAdd: (journey: NewJourney) => void;
}

const classOptions: ClassType[] = ["Eksekutif", "Bisnis", "Ekonomi"];
const statusOptions: JourneyStatus[] = ["Selesai", "Akan Datang"];

const emptyForm = {
  date: "",
  origin: "",
  destination: "",
  train_name: "",
  class_type: "Eksekutif" as ClassType,
  price: "",
  status: "Selesai" as JourneyStatus,
};

function formatPriceInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("id-ID");
}

function parsePrice(value: string): number {
  return Number(value.replace(/\D/g, ""));
}

export default function AddJourneyDialog({ onAdd }: AddJourneyDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    field: keyof typeof emptyForm,
    value: string
  ) => {
    const nextValue = field === "price" ? formatPriceInput(value) : value;
    setForm((prev) => ({ ...prev, [field]: nextValue }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.date) nextErrors.date = "Tanggal wajib diisi";
    if (!form.origin.trim()) nextErrors.origin = "Stasiun asal wajib diisi";
    if (!form.destination.trim())
      nextErrors.destination = "Stasiun tujuan wajib diisi";
    if (!form.train_name.trim()) nextErrors.train_name = "Nama kereta wajib diisi";
    const price = parsePrice(form.price);
    if (!form.price || isNaN(price) || price <= 0)
      nextErrors.price = "Harga tiket harus berupa angka lebih dari 0";
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onAdd({
      date: form.date,
      origin: form.origin.trim(),
      destination: form.destination.trim(),
      train_name: form.train_name.trim(),
      class_type: form.class_type,
      price: parsePrice(form.price),
      status: form.status,
    });
    setForm(emptyForm);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Tambah Perjalanan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Tambah Perjalanan Baru</DialogTitle>
          <DialogDescription>
            Isi detail perjalanan kereta api di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Tanggal</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              aria-invalid={!!errors.date}
            />
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="origin">Stasiun Asal</Label>
              <Input
                id="origin"
                placeholder="Contoh: Bandung"
                value={form.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
                aria-invalid={!!errors.origin}
              />
              {errors.origin && (
                <p className="text-sm text-destructive">{errors.origin}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="destination">Stasiun Tujuan</Label>
              <Input
                id="destination"
                placeholder="Contoh: Surabaya Gubeng"
                value={form.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                aria-invalid={!!errors.destination}
              />
              {errors.destination && (
                <p className="text-sm text-destructive">{errors.destination}</p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="train_name">Nama Kereta</Label>
            <Input
              id="train_name"
              placeholder="Contoh: Argo Wilis"
              value={form.train_name}
              onChange={(e) => handleChange("train_name", e.target.value)}
              aria-invalid={!!errors.train_name}
            />
            {errors.train_name && (
              <p className="text-sm text-destructive">{errors.train_name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="class_type">Kelas</Label>
              <Select
                value={form.class_type}
                onValueChange={(value) => handleChange("class_type", value)}
              >
                <SelectTrigger id="class_type" className="w-full">
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Harga Tiket (Rp)</Label>
            <Input
              id="price"
              type="text"
              inputMode="numeric"
              placeholder="Contoh: 500.000"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              aria-invalid={!!errors.price}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Simpan Perjalanan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
