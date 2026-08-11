import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { journeys } from "@/db/schema";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: "ID perjalanan tidak valid" },
      { status: 400 }
    );
  }

  const rows = await db.delete(journeys).where(eq(journeys.id, id)).returning();

  if (rows.length === 0) {
    return NextResponse.json(
      { error: "Perjalanan tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: rows[0] }, { status: 200 });
}
