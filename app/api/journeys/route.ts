import { NextResponse } from "next/server";
import { db } from "@/db";
import { journeys } from "@/db/schema";
import { ClassType, JourneyStatus } from "@/types/journey";
import { desc } from "drizzle-orm";

const classTypes: ClassType[] = ["Eksekutif", "Bisnis", "Ekonomi"];
const statuses: JourneyStatus[] = ["Selesai", "Akan Datang"];

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(journeys)
      .orderBy(desc(journeys.date));
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    console.error("GET /api/journeys error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data perjalanan" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { date, origin, destination, train_name, class_type, price, status } =
      body;

    if (
      !date ||
      !origin?.trim() ||
      !destination?.trim() ||
      !train_name?.trim()
    ) {
      return NextResponse.json(
        { error: "Tanggal, asal, tujuan, dan nama kereta wajib diisi" },
        { status: 400 }
      );
    }

    if (!classTypes.includes(class_type)) {
      return NextResponse.json(
        { error: "Kelas tidak valid (pilih: Eksekutif, Bisnis, Ekonomi)" },
        { status: 400 }
      );
    }

    if (!statuses.includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid (pilih: Selesai, Akan Datang)" },
        { status: 400 }
      );
    }

    const numericPrice = Number(String(price).replace(/\D/g, ""));
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json(
        { error: "Harga tiket harus berupa angka lebih dari 0" },
        { status: 400 }
      );
    }

    const rows = await db
      .insert(journeys)
      .values({
        date,
        origin: origin.trim(),
        destination: destination.trim(),
        train_name: train_name.trim(),
        class_type,
        price: numericPrice,
        status,
      })
      .returning();

    return NextResponse.json({ data: rows[0] }, { status: 201 });
  } catch (error) {
    console.error("POST /api/journeys error:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan perjalanan" },
      { status: 500 }
    );
  }
}
