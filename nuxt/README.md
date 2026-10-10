# Susi Air Pilot App — Frontend

Frontend aplikasi **Susi Air Pilot App**, dibuat menggunakan Nuxt 3, Vue Composition API, TypeScript, dan SCSS. Aplikasi ini menampilkan informasi pilot, dokumen, jam terbang, serta kalender duty berdasarkan data yang disediakan oleh backend NestJS.

## Fitur

- **Sign In** untuk pilot dengan penanganan kredensial yang tidak valid.
- **Home Dashboard** yang menampilkan profil pilot, total flight hours, ringkasan Hours to Limit, grafik rolling sum, dan dokumen pilot.
- **Schedule Calendar** bulanan dengan navigasi bulan sebelumnya/berikutnya, warna duty dari API, indikator penyelesaian duty, dan legend dari API.
- **Schedule detail placeholder** yang menampilkan tanggal yang dipilih dan pesan `Detail page coming soon`.
- **Route protection** untuk halaman yang memerlukan autentikasi.
- State loading, error, retry, dan empty state pada bagian yang relevan.

> Catatan: Logbook dan More tercantum pada bottom navigation sesuai brief. Jangan menganggap halaman tersebut sudah memiliki fitur lengkap jika implementasinya masih berupa placeholder.

## Tech Stack

- Nuxt 3
- Vue 3 Composition API (`<script setup>`)
- TypeScript
- SCSS
- `useFetch` / composables untuk pengambilan dan pengelolaan data API

## Struktur yang Relevan

Struktur berikut menggambarkan bagian utama yang telah dibahas dalam implementasi. Nama file lain dapat berbeda sesuai isi repository.

```text
nuxt/
├── components/
│   ├── schedule/
│   │   ├── MonthNavigator.vue
│   │   ├── MonthlyCalendar.vue
│   │   ├── CalendarDayCell.vue
│   │   ├── DutyChip.vue
│   │   ├── DutyCompletionIndicator.vue
│   │   └── DutyLegend.vue
│   ├── AppIcon.vue
│   └── ...
├── composables/
│   ├── useSchedules.ts
│   ├── useCalendar.ts
│   ├── useDutyColor.ts
│   ├── useFormatters.ts
│   └── ...
├── pages/
│   ├── login.vue
│   ├── schedule/
│   │   ├── index.vue
│   │   └── [date].vue
│   └── ...
├── server/
│   └── api/
│       └── schedules.get.ts
├── nuxt.config.ts
└── package.json
```

## Prasyarat

- Node.js versi yang kompatibel dengan versi Nuxt pada `package.json`.
- npm (atau package manager lain yang lockfile-nya digunakan repository).
- Backend NestJS berjalan dan dapat diakses oleh frontend.

## Instalasi

Dari direktori `nuxt`:

```bash
npm install
```

## Menjalankan Development Server

```bash
npm run dev
```

Secara default, Nuxt berjalan di `http://localhost:3000`.

## Type Check dan Build

Jalankan type check:

```bash
npx vue-tsc --noEmit
```

Build untuk production:

```bash
npm run build
```

Preview build production secara lokal:

```bash
npm run preview
```

## Integrasi API

Frontend mengambil data aplikasi dari backend NestJS. Untuk Schedule, frontend menggunakan endpoint API melalui server route/proxy Nuxt yang tersedia di `server/api/schedules.get.ts`.

Endpoint backend yang tercantum dalam technical test:

| Method | Endpoint | Kegunaan |
|---|---|---|
| `POST` | `/auth/login` | Login pilot dan memperoleh token |
| `GET` | `/pilot/me` | Profil pilot |
| `GET` | `/flight-hours?from=YYYY-MM-DD&to=YYYY-MM-DD` | Data flight hours dalam rentang tanggal |
| `GET` | `/flight-hours/summary?range=1w\|1m\|3m\|6m\|1y` | Data rolling sum untuk grafik |
| `GET` | `/documents` | Dokumen pilot dan tanggal kedaluwarsa |
| `GET` | `/schedules?year=YYYY&month=MM` | Jadwal untuk satu bulan |

Pastikan konfigurasi URL backend dan mekanisme penerusan token sesuai dengan implementasi di `nuxt.config.ts`, server routes, dan composables. Jangan menambahkan URL atau nama environment variable yang tidak digunakan oleh kode aktual.

## Akun Pengujian

Akun yang disediakan dalam technical test:

- Username: `johndoe`
- Password: `susiairtest`

Gunakan akun ini hanya untuk pengujian sesuai brief. Jangan menggunakan credential pengujian sebagai credential production.

## Verifikasi Schedule

Pengujian yang telah dilaporkan selama pengembangan meliputi:

- `vue-tsc --noEmit` berhasil tanpa error.
- `nuxt build` berhasil.
- Data Schedule untuk April, Mei, dan Juni 2026 berhasil diambil.
- Navigasi bulan dan pergantian tahun diuji.
- Halaman `/schedule` dan halaman detail tanggal berhasil dirender.
- Request tanpa autentikasi diuji.

Hasil tersebut adalah hasil pengujian development yang dilaporkan; lakukan kembali pengujian setelah perubahan kode atau deployment.

## Deployment

Deploy frontend menggunakan platform yang mendukung Nuxt, misalnya Vercel atau Netlify. Sebelum deployment:

1. Pastikan build production berhasil.
2. Konfigurasikan URL backend sesuai mekanisme konfigurasi repository.
3. Pastikan frontend dapat mengakses backend dan token diteruskan dengan benar.
4. Uji login, dashboard, dokumen, kalender, dan navigasi pada URL deployment.
5. Jangan memasukkan secret atau token ke dalam source code maupun repository.

Lihat [dokumentasi deployment Nuxt](https://nuxt.com/docs/getting-started/deployment) untuk panduan platform dan mode deployment.
