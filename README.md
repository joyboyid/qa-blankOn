# Hasil Tes QA BlankOn

Daftar seluruh sesi pengujian ISO BlankOn yang pernah dilakukan (self-host di folder `result-test/`).

Sumber checklist: `../blueprint-test-blankon/blueprint.md`
Repo tiket kutu: https://github.com/BlankOn/revival/issues

Author: **BOIM**

---

## Daftar sesi tes

| No  | Tanggal     | Jam (WITA)  | Jahitan / ISO                                                                               | Ringkasan                                                                                           | Hasil                | Laporan                                                                                |
| --- | ----------- | ----------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------- |
| 1   | 18 Sep 2026 | 09:08–11:18 | harian ~17 Sep 2026, `blankon-live-image-amd64.hybrid.iso`, VM `blankon-qa-1` (EFI, 4 GB)   | Sesi wajib lulus; 70 PASS, 2 FAIL (jam live UTC, matikan Praya), 5 tidak dites                      | Sesi wajib **LULUS** | [`laporan-hasil-tes.md`](./result-test/laporan-hasil-tes.md)                           |
| 2   | 18 Sep 2026 | 18:00–20:19 | harian `20260918-3` (revisi `757336b`), VM EFI (RAM 2048+, CPU 2, disk 20 GB), host Manjaro | Sesi wajib lulus; 76 PASS, 0 FAIL; catatan terbuka 11.5 (`dist-upgrade` via arsip-dev belum tuntas) | Sesi wajib **LULUS** | [`laporan-hasil-tes-jahitan-20260918-3.md`](./result-test/laporan-hasil-tes-jahitan-20260918-3.md) |

> **Sesi terakhir (terbaru): Sesi 2** — jahitan `20260918-3` (revisi `757336b`), 100% PASS.

---

## Statistik kumulatif

|                       | Jumlah                                 |
| --------------------- | -------------------------------------- |
| Total sesi            | 2                                      |
| Total kasus dites     | 146                                    |
| PASS                  | 146                                    |
| FAIL                  | 2 (satu-satunya di sesi 1 — jam, docs) |
| NO TEST / tidak dites | 5                                      |

## Kutu yang masih terbuka

| No  | Temuan                                                                                | Severity          | Sesi |
| --- | ------------------------------------------------------------------------------------- | ----------------- | ---- |
| 1   | 11.5: `apt update` OK tapi `dist-upgrade` belum tuntas di `arsip-dev.blankonlinux.id` | perlu investigasi | 2    |

---

## Cara menambah sesi baru

1. Salin `../blueprint-test-blankon/blueprint.md` ke laporan baru per sesi (mis. `laporan-hasil-tes-jahitan-YYYYMMDD-N.md`).
2. Isi status `PASS` / `FAIL` / `NO TEST` + catatan.
3. Tambahkan satu baris di tabel **Daftar sesi tes** dan perbarui **Statistik kumulatif**.
