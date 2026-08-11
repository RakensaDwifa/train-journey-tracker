# Product Requirements Document (PRD)
**Nama Proyek:** Aplikasi Pencatat Riwayat & Tiket Perjalanan Kereta (Train Journey Tracker)
**Deskripsi:** Aplikasi web full-stack sederhana untuk mencatat, mengelola, dan memantau riwayat perjalanan kereta api antarkota, lengkap dengan kalkulasi total pengeluaran tiket.

## 1. Tech Stack
- **Framework:** Next.js (App Router)
- **Styling & UI:** Tailwind CSS, Shadcn UI, Lucide Icons
- **Database:** SQLite
- **ORM:** Drizzle ORM

## 2. Core Features (Fitur Utama)
1. **Dashboard Overview:** 
   - Menampilkan ringkasan berupa kartu (cards): Total Perjalanan, Total Pengeluaran Tiket, dan Perjalanan Mendatang.
2. **Form Tambah Perjalanan:**
   - Input untuk memasukkan data perjalanan baru (Tanggal, Stasiun Asal, Stasiun Tujuan, Nama Kereta, Kelas, Harga Tiket, Status).
3. **Tabel Riwayat Perjalanan (Data Table):**
   - Menampilkan seluruh data riwayat perjalanan.
   - Kolom yang ditampilkan: Tanggal, Rute (Asal - Tujuan), Kereta, Kelas, Harga, Status.
   - Tombol aksi dasar: Hapus perjalanan (Delete).

## 3. Database Schema (Drizzle ORM)
Tabel `journeys` (Perjalanan):
- `id`: integer, primary key, auto-increment
- `date`: text (format YYYY-MM-DD)
- `origin`: text (Stasiun Asal)
- `destination`: text (Stasiun Tujuan)
- `train_name`: text (Nama Kereta)
- `class_type`: text (Eksekutif / Bisnis / Ekonomi)
- `price`: integer (Harga Tiket dalam Rupiah)
- `status`: text (Selesai / Akan Datang)

## 4. Seed Data (Data Awal untuk Testing)
Saat melakukan setup database, buatkan script seeder yang memasukkan data dummy berikut agar tabel langsung terisi:
1. Tanggal: 2025-03-22 | Asal: Bandung | Tujuan: Surabaya Gubeng | Kereta: Argo Wilis | Kelas: Eksekutif | Harga: 650000 | Status: Selesai
2. Tanggal: 2025-05-10 | Asal: Bandung | Tujuan: Purwosari | Kereta: Lodaya | Kelas: Eksekutif | Harga: 400000 | Status: Selesai
3. Tanggal: 2025-08-15 | Asal: Mojokerto | Tujuan: Bandung | Kereta: Mutiara Selatan | Kelas: Eksekutif | Harga: 550000 | Status: Selesai

## 5. UI/UX Guidelines
- Gunakan tema yang bersih dan minimalis (Light/Dark mode opsional).
- Tabel harus menggunakan komponen dari Shadcn UI agar rapi dan responsif.
- Tampilkan notifikasi (Toast) saat data berhasil ditambahkan atau dihapus.

## 6. AI Agent Instructions (Instruksi untuk AI)
1. Baca dokumen ini dan buatkan rencana eksekusi (planning).
2. Fokus buat halaman antarmuka (Front-end) terlebih dahulu menggunakan komponen Shadcn.
3. Setelah Front-end selesai dan disetujui, baru buat konfigurasi Drizzle ORM, inisiasi database SQLite, dan buat Next.js Route Handlers (API) untuk menyambungkan UI dengan Database.