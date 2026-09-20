# Hasil Tes QA BlankOn

Daftar seluruh sesi pengujian ISO BlankOn yang pernah dilakukan (self-host di folder `result/`).

Sumber checklist: `../blueprint-test-blankon/blueprint.md`
Repo tiket kutu: https://github.com/BlankOn/revival/issues

Author: **BOIM**

---

## Daftar sesi tes

| No  | Tanggal     | Jam (WITA)  | Jahitan / ISO                                                                               | Ringkasan                                                                                           | Hasil                | Laporan                                                                                            |
| --- | ----------- | ----------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| 1   | 18 Sep 2026 | 09:08–11:18 | harian ~17 Sep 2026, `blankon-live-image-amd64.hybrid.iso`, VM `blankon-qa-1` (EFI, 4 GB)   | Sesi wajib lulus; 70 PASS, 2 FAIL (jam live UTC, matikan Praya), 5 tidak dites                      | Sesi wajib **LULUS** | [`laporan-hasil-tes.md`](./result/laporan-hasil-tes.md)                                       |
| 2   | 18 Sep 2026 | 18:00–20:19 | harian `20260918-3` (revisi `757336b`), VM EFI (RAM 2048+, CPU 2, disk 20 GB), host Manjaro | Sesi wajib lulus; 76 PASS, 0 FAIL; catatan terbuka 11.5 (`dist-upgrade` via arsip-dev belum tuntas) | Sesi wajib **LULUS** | [`laporan-hasil-tes-jahitan-20260918-3.md`](./result/laporan-hasil-tes-jahitan-20260918-3.md) |
| 3   | 20 Sep 2026 | 08:36–09:15 | harian `20260919` (snapshot 13:04) — Praya 0.1.38-1, systemd-timesyncd, VLC 3.0.23 (Showtime dicabut); VM `blankon-prayatest` (BIOS, 4 GB) | Sesi wajib lulus; 12 PASS, 1 FAIL (jam/zona masih UTC di live); Praya & VLC PASS semua | Sesi wajib **LULUS** | [`laporan-test-J20260919.md`](./result/laporan-test-J20260919.md) |

> **Sesi terakhir (terbaru): Sesi 3** — jahitan `20260919`, 12 PASS · 1 FAIL (jam live masih UTC).

---

## Statistik kumulatif

|                       | Jumlah                                  |
| --------------------- | --------------------------------------- |
| Total sesi            | 3                                       |
| Total kasus dites     | 159                                     |
| PASS                  | 158                                     |
| FAIL                  | 3 (2 di sesi 1 — jam, docs; 1 di sesi 3 — jam live) |
| NO TEST / tidak dites | 5                                       |

## Kutu yang masih terbuka

| No  | Temuan                                                                                | Severity          | Sesi |
| --- | ------------------------------------------------------------------------------------- | ----------------- | ---- |
| 1   | 11.5: `apt update` OK tapi `dist-upgrade` belum tuntas di `arsip-dev.blankonlinux.id` | perlu investigasi | 2    |
| 2   | Live ISO: jam/zona masih UTC, tidak mengikuti region penginstall walau `systemd-timesyncd` sudah disertakan | Minor (live)      | 3    |
| 3   | Wiki Praya: UUID `praya@blankonlinux.id` tidak ada → panduan "cara mematikan Praya" belum jalan | Minor (docs)      | 3    |

---

## Cara menambah sesi baru

1. Salin `../blueprint-test-blankon/blueprint.md` ke laporan baru per sesi (mis. `laporan-hasil-tes-jahitan-YYYYMMDD-N.md`).
2. Isi status `PASS` / `FAIL` / `NO TEST` + catatan.
3. Tambahkan satu baris di tabel **Daftar sesi tes** dan perbarui **Statistik kumulatif**.
