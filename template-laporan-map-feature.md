# Laporan hasil tes rilis — BlankOn

Salin berkas ini ke `result/laporan-rilis-<rilis>-<tanggal>.md` untuk setiap rilis baru, lalu isi hasilnya. Status: `PASS` / `FAIL` / `NO TEST`. Kalau `FAIL`, isi gejala singkat di kolom Catatan dan (bila ada) tautan tiket di `BlankOn/revival`.

Rujukan: `map-feature.md` — semua item di bawah berasal dari peta fitur tersebut.

---

## 0. Identitas sesi

| Item | Isi |
|---|---|
| Nama tester | |
| Tanggal tes | |
| Produk / Rilis | |
| ISO | |
| Sumber ISO | |
| Jahitan / revisi | |
| Hypervisor / hardware | |
| Firmware (EFI / BIOS) | |
| RAM / vCPU / Disk | |
| Jaringan VM | |
| Host OS | |
| Blueprint | `qa/blueprint-test-blankon/blueprint.md` |

---

## 1. Ringkasan

| Kategori | Jumlah item | PASS | FAIL | NO TEST |
|---|---|---|---|---|
| Installation | 6 | | | |
| Desktop | 6 | | | |
| Hardware | 7 | | | |
| System | 6 | | | |
| Localization | 4 | | | |
| Applications | 4 | | | |
| Infrastructure | 5 | | | |
| **Total** | **38** | | | |

---

## 2. Installation

| ID | Fitur | Langkah pengujian | Status | Catatan |
|---|---|---|---|---|
| INST-01 | Live ISO Boot | Boot dari ISO live, menu boot tampil, sampai desktop | | |
| INST-02 | UEFI Boot | Boot dengan firmware UEFI, tidak stuck di GRUB/initramfs | | |
| INST-03 | Legacy BIOS Boot | Boot dengan firmware BIOS (EFI mati) | | |
| INST-04 | Automatic Partition | Installer Calamares, partisi otomatis / erase disk | | |
| INST-05 | Manual Partition | Installer Calamares, partisi manual (/, swap, dst.) | | |
| INST-06 | First Boot | Boot pertama setelah install, login, desktop tampil | | |

---

## 3. Desktop

| ID | Fitur | Langkah pengujian | Status | Catatan |
|---|---|---|---|---|
| DESK-01 | Login | Display manager tampil, login user berhasil | | |
| DESK-02 | Logout | Logout berhasil, kembali ke halaman login | | |
| DESK-03 | Lock Screen | Lock screen tampil, unlock dengan password | | |
| DESK-04 | Workspace | Pindah workspace / ruang kerja, aplikasi ikut berpindah | | |
| DESK-05 | Display | Resolusi layar wajar, tidak pecah/terpotong | | |
| DESK-06 | Settings | Pengaturan (Settings) terbuka, perubahan tersimpan | | |

---

## 4. Hardware

| ID | Fitur | Langkah pengujian | Status | Catatan |
|---|---|---|---|---|
| HW-01 | Wi-Fi | Interface Wi-Fi terdeteksi, konek ke AP, akses internet | | |
| HW-02 | Ethernet | Interface Ethernet terdeteksi, dapat IP, akses internet | | |
| HW-03 | Bluetooth | Bluetooth aktif, deteksi perangkat | | |
| HW-04 | Audio | Suara keluar, tidak pecah/error | | |
| HW-05 | Webcam | Webcam terbaca, gambar tampil | | |
| HW-06 | Touchpad | Kursor, klik, scroll dua jari berfungsi | | |
| HW-07 | GPU | Driver tampil (`lspci`), resolusi/akselerasi ok | | |

---

## 5. System

| ID | Fitur | Langkah pengujian | Status | Catatan |
|---|---|---|---|---|
| SYS-01 | APT | `apt update` sukses, tidak ada NO_PUBKEY | | |
| SYS-02 | Repository | Sumber APT mengarah ke arsip BlankOn | | |
| SYS-03 | Upgrade | `apt dist-upgrade` selesai, tidak ada paket broken | | |
| SYS-04 | systemd | Layanan berjalan (`systemctl status`), tidak ada unit gagal | | |
| SYS-05 | Suspend | Suspend lalu resume, sistem kembali normal | | |
| SYS-06 | Shutdown | Shutdown bersih, tidak hang | | |

---

## 6. Localization

| ID | Fitur | Langkah pengujian | Status | Catatan |
|---|---|---|---|---|
| LOC-01 | Bahasa Indonesia | UI dalam bahasa Indonesia, tidak ada teks rusak | | |
| LOC-02 | Locale | `locale` id_ID.UTF-8, format tanggal/angka sesuai | | |
| LOC-03 | Timezone | Zona waktu Asia/Jakarta (dan WITA/WIT) benar di live & install | | |
| LOC-04 | Aksara Nusantara | Font/input aksara Nusantara tersedia dan tampil benar | | |

---

## 7. Applications

| ID | Fitur | Langkah pengujian | Status | Catatan |
|---|---|---|---|---|
| APP-01 | Browser | Browser terbuka, buka halaman, video jalan | | |
| APP-02 | File Manager | File manager terbuka, isi home terlihat, copy-paste file | | |
| APP-03 | Terminal | Terminal terbuka, perintah berjalan | | |
| APP-04 | Default Applications | `xdg-mime query default` mengarah ke aplikasi yang benar | | |

---

## 8. Infrastructure

| ID | Fitur | Langkah pengujian | Status | Catatan |
|---|---|---|---|---|
| INF-01 | ISO Build | ISO rilis tersedia, ukuran/checksum sesuai | | |
| INF-02 | Package Build | Paket di rilis berhasil di-build, tidak ada dependency hilang | | |
| INF-03 | Repository | Repositori lengkap (main/extras/restricted/firmware), bisa diakses | | |
| INF-04 | IRGSH | Sistem pelaporan bekerja | | |
| INF-05 | Release Pipeline | Alur rilis berjalan dari ISO → repo → publikasi | | |

---

## 9. Kutu / temuan terbuka

| No | Fitur | Temuan | Severity | Status |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

---

## 10. Ringkasan kirim ke tim

- [ ] **Lulus sesi wajib**: rilis ini boleh dipakai tester lain
- [ ] **Gagal blocker**: tidak boot / tidak bisa install / tidak bisa login
- [ ] **Gagal major**: desktop/update/aplikasi inti rusak
- [ ] **Hanya minor**: terjemahan, UI, dokumentasi

## 11. Catatan bebas

```

```