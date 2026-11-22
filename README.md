# GEMILANG (Gerbang Manajemen dan Integrasi Langkah Kerja)

**Tugas Pemrograman Web: NestJS MVC + Integrasi PostgreSQL & Prisma ORM (Pekan 10 & 11)**

GEMILANG merupakan aplikasi **Project Management System** berbasis web yang dirancang untuk membantu tim dalam mengelola proyek dan pekerjaan melalui satu platform terpusat.

Repository ini berisi implementasi backend menggunakan **NestJS** dengan pendekatan arsitektur MVC (Model-View-Controller) untuk mengelola entitas `Project`. Backend menyediakan REST API yang mendukung operasi CRUD, validasi data, penanganan error, serta penyimpanan permanen menggunakan **PostgreSQL** dan **Prisma ORM**.

## Teknologi yang Digunakan

- **Backend:** NestJS
- **ORM:** Prisma ORM
- **Database:** PostgreSQL
- **Database Tool:** DBeaver
- **Programming Language:** TypeScript
- **Runtime:** Node.js
- **Validation:** class-validator, class-transformer
- **API Architecture:** REST API
- **HTTP Client:** Postman / REST Client
- **Frontend Integration:** React
- **Data Storage:** PostgreSQL (Permanen) / In-memory (Pekan 10)

## Fitur Implementasi Backend

1. **Project Management:** Mengelola data proyek yang terdiri dari ID (UUID), nama, deskripsi, status, deadline, owner ID, serta timestamp (`createdAt`, `updatedAt`).
2. **Database Persistence:** Menghubungkan NestJS ke PostgreSQL melalui Prisma ORM sehingga data tersimpan secara permanen.
3. **Create Project:** Menambahkan proyek baru melalui HTTP POST ke database.
4. **Read Project:** Mengambil seluruh data proyek maupun berdasarkan ID melalui HTTP GET dari database.
5. **Update Project:** Memperbarui informasi proyek melalui HTTP PATCH ke database.
6. **Delete Project:** Menghapus data proyek melalui HTTP DELETE dari database.
7. **Advanced Query & Stats (Nilai Tambah):** Mendukung filter data berdasarkan status (`GET /projects?status=...`) dan endpoint statistik proyek (`GET /projects/stats`).
8. **Data Validation:** Memvalidasi input menggunakan DTO dan `class-validator`.
9. **Exception Handling:** Menangani kesalahan menggunakan `NotFoundException`, `ConflictException`, dan `BadRequestException`.
10. **Frontend Integration:** Menghubungkan REST API dengan frontend React.

## Struktur Folder

```text
gemilang-be/
├── assets/
│   ├── week-10/
│   │   ├── satu.png
│   │   ├── dua.png
│   │   ├── tiga.png
│   │   ├── empat.png
│   │   ├── lima.png
│   │   ├── enam.png
│   │   ├── tujuh.png
│   │   └── delapan.png
│   └── week-11/
│       ├── satu.png
│       ├── dua.png
│       ├── tiga.png
│       ├── empat.png
│       ├── lima.png
│       ├── enam.png
│       └── tujuh.png
│
├── prisma/
│   ├── migrations/
│   │   └── 20261122065411_init/
│   │       └── migration.sql
│   └── schema.prisma
│
├── src/
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── projects/
│   │   ├── dto/
│   │   │   ├── create-project.dto.ts
│   │   │   └── update-project.dto.ts
│   │   ├── entities/
│   │   │   └── project.entity.ts
│   │   ├── projects.controller.spec.ts
│   │   ├── projects.controller.ts
│   │   ├── projects.module.ts
│   │   ├── projects.service.spec.ts
│   │   └── projects.service.ts
│   │
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── test/
├── .env
├── .env.example
├── .gitignore
├── nest-cli.json
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Cara Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone <URL_REPOSITORY>
```

Masuk ke direktori project:

```bash
cd gemilang-be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Database & Jalankan Migrasi Prisma

Buat file `.env` (atau salin dari `.env.example`):

```bash
cp .env.example .env
```

Sesuaikan connection string PostgreSQL pada `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/gemilang_db?schema=public"
```

Jalankan migrasi database awal:

```bash
npx prisma migrate dev --name init
```

### 4. Jalankan Development Server

```bash
npm run dev
# atau: npm run start:dev
```

### 5. Akses REST API

Setelah server berhasil dijalankan, API dapat diakses melalui:

```text
http://localhost:3000/projects
```

Pastikan server berjalan sebelum melakukan pengujian menggunakan Postman atau REST Client.

---

## Dokumentasi REST API

Base URL:

```text
http://localhost:3000
```

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/projects` | Menambahkan proyek baru ke database |
| GET | `/projects` | Mengambil seluruh proyek dari database |
| GET | `/projects?status=...` | Mengambil proyek dengan filter status (query lanjutan) |
| GET | `/projects/stats` | Mengambil statistik jumlah proyek & per status (nilai tambah) |
| GET | `/projects/:id` | Mengambil proyek berdasarkan ID (UUID) |
| PATCH | `/projects/:id` | Memperbarui data proyek di database |
| DELETE | `/projects/:id` | Menghapus proyek dari database |

### Format Data Project

Contoh struktur JSON data proyek yang tersimpan di PostgreSQL:

```json
{
  "id": "d0938f4c-62dc-4126-9121-7a741c0090f5",
  "name": "Sistem Informasi Gemilang",
  "description": "Pengembangan backend menggunakan NestJS, Prisma ORM, dan PostgreSQL",
  "status": "In Progress",
  "deadline": "2026-12-31T23:59:59.000Z",
  "ownerId": "user-103022400067",
  "createdAt": "2026-11-22T10:49:27.206Z",
  "updatedAt": "2026-11-22T10:49:27.206Z"
}
```

---

## Dokumentasi Pengujian API (Pekan 10 – In-Memory)

Pengujian dilakukan menggunakan REST Client untuk memastikan setiap endpoint berjalan sesuai dengan fungsinya, termasuk skenario validasi dan exception handling.

### 1. Menambahkan Data Project (POST) – Berhasil

Melakukan penambahan data proyek baru menggunakan HTTP POST dengan mengirimkan data melalui request body berformat JSON.

**Endpoint:**

```http
POST /projects
```

![POST Project Success](assets/week-10/satu.png)

### 2. Validasi DTO Error (POST) – Bad Request

Melakukan pengujian validasi dengan mengirimkan data yang tidak sesuai dengan ketentuan DTO. Sistem akan mengembalikan respons `400 Bad Request` apabila input tidak memenuhi aturan validasi.

**Endpoint:**

```http
POST /projects
```

![DTO Validation Error](assets/week-10/dua.png)

### 3. Skenario Error Duplikat (POST) – ConflictException

Melakukan pengujian dengan menambahkan proyek yang memiliki data duplikat. Sistem menangani konflik tersebut menggunakan `ConflictException` dan mengembalikan respons `409 Conflict`.

**Endpoint:**

```http
POST /projects
```

![Duplicate Project Error](assets/week-10/tiga.png)

### 4. Mengambil Seluruh Data Project (GET)

Melakukan pengujian untuk mendapatkan seluruh daftar proyek yang tersimpan pada backend.

**Endpoint:**

```http
GET /projects
```

![Get All Projects](assets/week-10/empat.png)

### 5. Mengambil Data Project Berdasarkan ID (GET)

Melakukan pengujian untuk mendapatkan informasi proyek secara spesifik berdasarkan ID yang diberikan pada URL endpoint.

**Endpoint:**

```http
GET /projects/:id
```

![Get Project By ID](assets/week-10/lima.png)

### 6. Skenario Error Data Tidak Ditemukan (GET) – NotFoundException

Melakukan pengujian menggunakan ID proyek yang tidak tersedia. Sistem akan mengembalikan `404 Not Found` melalui mekanisme `NotFoundException`.

**Endpoint:**

```http
GET /projects/:id
```

![Project Not Found](assets/week-10/enam.png)

### 7. Memperbarui Data Project (PATCH)

Melakukan pengujian pembaruan informasi proyek menggunakan HTTP PATCH. Pada pengujian ini, perubahan dilakukan terhadap atribut status proyek menjadi `In Progress`.

**Endpoint:**

```http
PATCH /projects/:id
```

**Request Body:**

```json
{
  "status": "In Progress"
}
```

![Update Project](assets/week-10/tujuh.png)

### 8. Menghapus Data Project (DELETE)

Melakukan pengujian penghapusan data proyek berdasarkan ID menggunakan HTTP DELETE. Endpoint ini digunakan untuk memastikan data proyek dapat dihapus melalui backend.

**Endpoint:**

```http
DELETE /projects/:id
```

![Delete Project](assets/week-10/delapan.png)

---

## Dokumentasi Pengujian API (Pekan 11 – Integrasi PostgreSQL & Prisma ORM)

Pada pekan 11, backend GEMILANG telah dihubungkan ke basis data PostgreSQL lokal menggunakan **Prisma ORM**. Penyimpanan in-memory pada pekan sebelumnya digantikan secara penuh oleh database permanen tanpa mengubah kontrak controller.

Seluruh pengujian fungsional CRUD dilakukan menggunakan Postman dan dibuktikan persistensinya secara langsung pada basis data PostgreSQL menggunakan tool database manager **DBeaver**.

### 1. Pengambilan Seluruh Data Project Awal (GET) – Basis Data Kosong

Melakukan pengujian `GET /projects` pada kondisi awal saat tabel `projects` di PostgreSQL baru selesai dimigrasikan dan belum memiliki data. Sistem berhasil mengembalikan respons `200 OK` dengan array kosong `[]`.

**Endpoint:**

```http
GET /projects
```

![GET All Projects Initial Empty](assets/week-11/satu.png)

### 2. Menambahkan Data Project Baru (POST) – Tersimpan ke Basis Data

Melakukan pengujian pembuatan proyek baru melalui HTTP POST dengan payload JSON lengkap. Data berhasil divalidasi oleh DTO dan disimpan secara permanen ke tabel `projects` di database PostgreSQL melalui Prisma Client (`201 Created`).

**Endpoint:**

```http
POST /projects
```

**Request Body:**

```json
{
  "name": "Sistem Informasi Gemilang",
  "description": "Pengembangan backend menggunakan NestJS, Prisma ORM, dan PostgreSQL",
  "status": "In Progress",
  "deadline": "2026-12-31T23:59:59.000Z",
  "ownerId": "user-103022400067"
}
```

![POST Project Success PostgreSQL](assets/week-11/dua.png)

### 3. Mengambil Seluruh Data Project (GET) setelah Tersimpan di Basis Data

Melakukan pengujian untuk mengambil seluruh data proyek yang tersimpan di PostgreSQL. Sistem berhasil mengembalikan respons `200 OK` dengan data proyek lengkap beserta atribut `id` (UUID), `createdAt`, dan `updatedAt`.

**Endpoint:**

```http
GET /projects
```

![GET All Projects from PostgreSQL](assets/week-11/tiga.png)

### 4. Pengujian Endpoint Proyek (GET /projects/)

Melakukan pengujian pemanggilan endpoint proyek untuk memastikan kestabilan routing dan respon query ke basis data.

**Endpoint:**

```http
GET /projects/
```

![GET Projects Endpoint](assets/week-11/empat.png)

### 5. Verifikasi Data Tersimpan Permanen pada PostgreSQL (DBeaver)

Melakukan pembuktian persistensi data dengan membuka tabel `projects` pada database `gemilang_db` secara langsung melalui **DBeaver**. Terbukti record proyek `Sistem Informasi Gemilang` dengan UUID `d0938f4c-62dc-4126-9121-7a741c0090f5` telah tersimpan secara fisik dan permanen di PostgreSQL, membuktikan data tetap aman dan tersimpan permanen bahkan setelah server di-restart.

**Tool:** DBeaver Database Manager (PostgreSQL `gemilang_db.public.projects`)

![Verifikasi Database DBeaver](assets/week-11/lima.png)

### 6. Memperbarui Data Project (PATCH) pada PostgreSQL

Melakukan pengujian pembaruan atribut proyek menggunakan HTTP PATCH berdasarkan ID. Nilai status diubah menjadi `Completed` dan deskripsi diperbarui. Data pada database PostgreSQL berhasil ter-update dengan respons `200 OK`.

**Endpoint:**

```http
PATCH /projects/:id
```

**Request Body:**

```json
{
  "status": "Completed",
  "description": "Proyek telah selesai diuji dan tersimpan di database"
}
```

![PATCH Project PostgreSQL](assets/week-11/enam.png)

### 7. Menghapus Data Project (DELETE) dari Basis Data

Melakukan pengujian penghapusan record proyek berdasarkan ID menggunakan HTTP DELETE. Prisma Client menghapus baris data dari database PostgreSQL dan mengembalikan record yang telah dihapus dengan respons `200 OK`.

**Endpoint:**

```http
DELETE /projects/:id
```

![DELETE Project PostgreSQL](assets/week-11/tujuh.png)

---

## Dokumentasi Integrasi Frontend

Backend GEMILANG juga diintegrasikan dengan frontend berbasis React melalui REST API.

Integrasi ini memungkinkan pengguna untuk melakukan pengelolaan data proyek melalui antarmuka aplikasi, sementara backend NestJS bertanggung jawab dalam memproses request, menjalankan logika bisnis, dan mengembalikan respons kepada frontend.

Operasi yang didukung dalam integrasi meliputi:

- Menampilkan daftar proyek.
- Menambahkan proyek baru.
- Menghapus proyek.
- Memperbarui informasi proyek.

Integrasi frontend dan backend dilakukan melalui komunikasi HTTP dengan format pertukaran data JSON.

---

## Kesimpulan

Melalui pengerjaan tugas Pekan 10 dan Pekan 11, implementasi backend GEMILANG berhasil dikembangkan secara komprehensif:

1. **Pekan 10:** Fondasi awal REST API NestJS dengan pola MVC (Model-View-Controller), pemisahan DTO, class-validator, exception handling kustom (`NotFoundException`, `ConflictException`), serta integrasi frontend dengan penyimpanan data in-memory.
2. **Pekan 11:** Peningkatan lapisan persistensi data menggunakan basis data PostgreSQL lokal dan Prisma ORM. Mengimplementasikan `PrismaService` sebagai provider global, migrasi otomatis schema Prisma, operasi CRUD permanen, verifikasi persistensi fisik melalui DBeaver, serta penambahan fitur query lanjutan (filter data dan statistik agregasi proyek).

---

**Project:** GEMILANG – Gerbang Manajemen dan Integrasi Langkah Kerja  
**Mata Kuliah:** Pemrograman Web  
**Materi:** NestJS MVC + Integrasi PostgreSQL & Prisma ORM  
**Repository:** Backend GEMILANG
