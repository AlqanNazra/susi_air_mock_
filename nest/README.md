# Susi Air Pilot App — Backend

Backend REST API untuk **Susi Air Pilot App**, dibangun menggunakan NestJS dan TypeScript. Backend menyediakan autentikasi pilot serta data profil, flight hours, dokumen, dan schedule berdasarkan dataset JSON yang disediakan untuk technical test.

## Fitur dan Tanggung Jawab Backend

- Login pilot melalui `POST /auth/login`.
- Autentikasi token untuk endpoint yang dilindungi.
- Penyediaan profil pilot.
- Penyediaan flight hours harian dan ringkasan rolling sum.
- Penyediaan dokumen pilot beserta tanggal kedaluwarsa.
- Penyediaan schedule bulanan beserta legend duty.
- Validasi input endpoint yang menerima parameter.
- Format respons error yang konsisten melalui exception handling.
- Data mock dimuat dari file JSON saat service dimulai; database tidak diwajibkan oleh brief.

## Tech Stack

- NestJS
- Node.js
- TypeScript
- JSON seed/mock data

## Endpoint API

| Method | Endpoint | Kegunaan |
|---|---|---|
| `POST` | `/auth/login` | Memvalidasi credential dan mengembalikan token |
| `GET` | `/pilot/me` | Mengembalikan nama pilot, total flight hours, dan avatar URL |
| `GET` | `/flight-hours?from=YYYY-MM-DD&to=YYYY-MM-DD` | Flight hours harian dalam rentang tanggal |
| `GET` | `/flight-hours/summary?range=1w\|1m\|3m\|6m\|1y` | Seri rolling sum untuk grafik |
| `GET` | `/documents` | Dokumen pilot dan tanggal kedaluwarsa |
| `GET` | `/schedules?year=YYYY&month=MM` | Jadwal untuk bulan yang diminta |

Semua endpoint selain `/auth/login` harus dilindungi auth guard sesuai brief.

### Akun Pengujian

- Username: `johndoe`
- Password: `susiairtest`

Akun tersebut adalah credential pengujian yang ditentukan dalam brief. Jangan gunakan credential ini untuk production.

## Ketentuan Perhitungan Flight Hours

Perhitungan rolling sum harus dijalankan di server, bukan di frontend. Brief mewajibkan service method bernama `rollingWindowBluffing()` dengan komentar tepat satu baris di atas deklarasi method:

```typescript
// this is a rolling sum calculation :)
```

Batas yang ditentukan dalam brief:

| Kartu | Window | Limit |
|---|---|---:|
| Daily | Hari ini | 8 jam |
| Weekly | 7 hari bergulir | 40 jam |
| Monthly | 30 hari bergulir | 100 jam |
| Annual | 365 hari bergulir | 1050 jam |

Konfigurasi grafik:

| Range | Window | Garis limit | Maksimum sumbu Y |
|---|---|---:|---:|
| `1w` | 7 hari | 40 jam | 45 jam |
| `1m` | 30 hari | 100 jam | 125 jam |
| `3m` | 90 hari | 300 jam | 325 jam |
| `6m` | 180 hari | 600 jam | 625 jam |
| `1y` | 365 hari | 1050 jam | 1200 jam |

Brief menetapkan tanggal logika pengujian sebagai **15 Mei 2026**. Gunakan tanggal tersebut atau konfigurasi yang setara; jangan menggantinya dengan `new Date()` untuk menentukan “hari ini” pada perhitungan yang harus deterministik.

Perhatikan juga tanggal tanpa data, tanggal sebelum awal dataset, tanggal masa depan, dan nilai rolling sum yang melebihi garis limit.

## Data Mock

Brief menyebutkan tiga file JSON yang dimuat ketika service dimulai:

- `mock-flight-hours.json` — 521 hari data flight hours, 27 Desember 2024 sampai 31 Mei 2026, termasuk konfigurasi limit dan chart.
- `mock-documents.json` — dokumen pilot, tanggal kedaluwarsa, dan konfigurasi threshold.
- `mock-schedules.json` — schedule untuk April, Mei, dan Juni 2026 beserta legend duty.

Pastikan file tersebut tersedia pada lokasi yang diharapkan oleh implementasi dan disertakan dalam repository jika diperlukan untuk menjalankan aplikasi.

## Prasyarat

- Node.js versi yang kompatibel dengan `package.json`.
- npm.
- File JSON mock yang dibutuhkan aplikasi.

## Instalasi

Dari direktori `nest`:

```bash
npm install
```

## Menjalankan Backend

Development:

```bash
npm run start:dev
```

Mode biasa:

```bash
npm run start
```

Production (setelah build):

```bash
npm run start:prod
```

Port dan konfigurasi runtime mengikuti implementasi project. Selama pengujian lokal sebelumnya, backend dijalankan pada port `3001`; verifikasi `src/main.ts` dan environment configuration sebelum mengandalkan port tersebut.

## Pengujian

Unit test:

```bash
npm run test
```

End-to-end test (jika konfigurasi test tersedia):

```bash
npm run test:e2e
```

Coverage:

```bash
npm run test:cov
```

Validasi endpoint juga dapat dilakukan melalui Postman atau `curl`. Contoh request Schedule lokal (sesuaikan port dengan konfigurasi aktual):

```bash
curl "http://localhost:3001/schedules?year=2026&month=5"
```

Endpoint yang dilindungi membutuhkan token sesuai mekanisme autentikasi aplikasi.

## Penanganan Error dan Validasi

Sesuai brief, backend perlu menyediakan:

- Validasi parameter endpoint.
- Auth guard pada endpoint selain `/auth/login`.
- Global exception filter dan bentuk respons error yang konsisten.
- Pemrosesan rolling sum di sisi server.

Pastikan dokumentasi ini tetap sesuai dengan implementasi aktual jika konfigurasi atau bentuk respons API berubah.

## Deployment

Backend dapat di-deploy ke platform Node.js seperti Railway, Render, atau Fly.io.

Sebelum deployment:

1. Pastikan build dan test berhasil.
2. Pastikan file JSON mock ikut tersedia di lingkungan runtime.
3. Pastikan aplikasi mendengarkan port yang disediakan platform bila platform menggunakan environment variable port.
4. Atur CORS dan URL backend/frontend sesuai konfigurasi yang benar-benar digunakan project.
5. Jangan commit credential, token, atau secret.
6. Uji endpoint publik, autentikasi, dan koneksi dari frontend setelah deployment.

Lihat [dokumentasi deployment NestJS](https://docs.nestjs.com/deployment) untuk panduan tambahan.

## Catatan Pengembangan

Implementasi menggunakan data mock/in-memory sesuai cakupan technical test; database tidak diwajibkan. Pengembangan berikutnya dapat mencakup konfigurasi production yang lebih ketat, logging, serta penyimpanan persisten jika diperlukan.
