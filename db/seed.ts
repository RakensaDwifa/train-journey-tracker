import { and, eq } from "drizzle-orm";
import { db } from "./index";
import { journeys } from "./schema";

const seedData = [
  {
    date: "2025-03-22",
    origin: "Bandung",
    destination: "Surabaya Gubeng",
    train_name: "Argo Wilis",
    class_type: "Eksekutif",
    price: 650000,
    status: "Selesai",
  },
  {
    date: "2025-05-10",
    origin: "Bandung",
    destination: "Purwosari",
    train_name: "Lodaya",
    class_type: "Eksekutif",
    price: 400000,
    status: "Selesai",
  },
  {
    date: "2025-08-15",
    origin: "Mojokerto",
    destination: "Bandung",
    train_name: "Mutiara Selatan",
    class_type: "Eksekutif",
    price: 550000,
    status: "Selesai",
  },
];

async function seed() {
  let inserted = 0;
  let skipped = 0;

  for (const row of seedData) {
    const existing = await db
      .select({ id: journeys.id })
      .from(journeys)
      .where(
        and(
          eq(journeys.date, row.date),
          eq(journeys.train_name, row.train_name)
        )
      );

    if (existing.length > 0) {
      skipped++;
      continue;
    }

    await db.insert(journeys).values(row);
    inserted++;
  }

  console.log(
    `Seed selesai: ${inserted} data ditambahkan, ${skipped} data sudah ada (dilewati).`
  );
}

seed().catch((error) => {
  console.error("Seed gagal:", error);
  process.exit(1);
});
