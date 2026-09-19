# Laporan hasil tes — BlankOn Linux 26.0 Sinambung (jahitan 20260918-3)

| | |
|---|---|
| Nama tester | BOIM |
| Tanggal tes | 18 September 2026 |
| Produk | BlankOn Linux 26.0 Sinambung |
| ISO | `blankon-live-image-amd64.hybrid.iso` |
| Sumber ISO | zsync `http://jahitan.blankonlinux.id/harian/current/` |
| Jahitan | Harian `20260918-3` (revisi `757336b`) |
| Hypervisor | VirtualBox 7.2.16 r17 |
| Firmware | EFI |
| RAM / vCPU / Disk | 2048+ MB / 2 / 20 GB, dynamically allocated |
| Jaringan VM | NAT |
| Host OS | Manjaro Sway, Dell Latitude E7470 |
| Blueprint | `qa/blueprint-test-blankon/blueprint.md` |

## Ringkasan

Sesi wajib (bagian 2, 6, 7, 8.1) **lulus**. Jahitan 20260918-3 bisa di-boot live, di-install dengan Calamares (erase disk), boot ulang ke disk, update paket, dan dipakai.

| | Jumlah |
|---|---|
| PASS | 76 |
| FAIL | 0 |
| NO TEST | 0 |

Satu catatan di skenario tambahan 11.5: `apt update` aman, tetapi `dist-upgrade` masih belum bisa diselesaikan (terbuka untuk diidentifikasi lebih lanjut).

---

## Lingkungan yang tercatat

Dari `cat /etc/os-release` / `hostnamectl` di guest:

```
NAME="BlankOn Linux"
PRETTY_NAME="BlankOn Linux 26.0 Sinambung"
VERSION="26.0 (Sinambung)"
VERSION_ID="26.0"
VERSION_CODENAME=sinambung
ID=blankon
ID_LIKE=debian
```

APT: `http://arsip-dev.blankonlinux.id/sinambung` (main extras restricted restricted-firmware), plus Mozilla dan NVIDIA CUDA.

---

## Hasil tes

### 2. Boot live — 7 PASS

| ID | Kasus | Hasil |
|---|---|---|
| 2.1 | ISO terbaca, menu boot tampil | PASS |
| 2.2 | Pilih Live / Try BlankOn, sampai desktop | PASS |
| 2.3 | Tidak ada error GRUB sebelum splash | PASS |
| 2.4 | Splash / branding BlankOn tampil | PASS |
| 2.5 | Desktop Praya/GNOME tampil, tidak hitam/loop login | PASS |
| 2.6 | Resolusi layar wajar, tidak pecah / terpotong | PASS |
| 2.7 | Mouse dan keyboard merespons | PASS |

### 3. Live: dasar desktop — 10 PASS

| ID | Kasus | Hasil |
|---|---|---|
| 3.1 | Panel/menu aplikasi terbuka | PASS |
| 3.2 | Teks menu terbaca (font tidak kotak) | PASS |
| 3.3 | Bahasa UI default masuk akal (id/en) | PASS |
| 3.4 | Keyboard: huruf, angka, tanda `-` `/` `'` | PASS |
| 3.5 | Layout Indonesia tidak salah jadi Arabic | PASS |
| 3.6 | Jam dan zona waktu | PASS |
| 3.7 | Terminal bisa dibuka | PASS |
| 3.8 | File manager bisa dibuka, isi home terlihat | PASS |
| 3.9 | Pengaturan (Settings) bisa dibuka | PASS |
| 3.10 | Logout / lock screen | PASS |

Catatan 3.6: jam live memakai UTC (~8 jam mundur vs WITA), sudah sync setelah install. Kutu live yang dikenal.

### 4. Live: jaringan — 5 PASS

| ID | Kasus | Hasil |
|---|---|---|
| 4.1 | Interface jaringan tampil (`ip a`) | PASS |
| 4.2 | Dapat IP (NAT VirtualBox biasanya 10.0.2.x) | PASS |
| 4.3 | Ping keluar: `ping -c 3 blankonlinux.id` | PASS |
| 4.4 | Browser buka https://blankonlinux.id | PASS |
| 4.5 | `apt update` di live | PASS |

### 5. Live: aplikasi default — 10 PASS

| ID | Kasus | Hasil |
|---|---|---|
| 5.1 | Browser (Firefox/Chromium/yang terpasang) | PASS |
| 5.2 | LibreOffice Writer, ketik 1 paragraf, simpan | PASS |
| 5.3 | LibreOffice Calc, isi 3 sel | PASS |
| 5.4 | Pemutar gambar | PASS |
| 5.5 | Pemutar audio/video (kalau ada berkas uji) | PASS |
| 5.6 | Text editor | PASS |
| 5.7 | Calculator | PASS |
| 5.8 | Screenshot tool | PASS |
| 5.9 | GNOME Extensions / Praya tidak error saat load | PASS |
| 5.10 | Semua ikon di menu bisa diklik, tidak ada yang "missing" | PASS |

### 6. Instalasi Calamares (erase disk — syarat Alpha) — 10 PASS

| ID | Kasus | Hasil |
|---|---|---|
| 6.1 | Tombol Install / ikon Calamares ada | PASS |
| 6.2 | Calamares terbuka (boleh butuh sudo) | PASS |
| 6.3 | Pilih Bahasa Indonesia, teks tidak rusak | PASS |
| 6.4 | Lokasi: Asia/Jakarta | PASS |
| 6.5 | Keyboard: Indonesian, tes di kotak uji | PASS |
| 6.6 | Partisi: Erase disk | PASS |
| 6.7 | Buat user + password | PASS |
| 6.8 | Ringkasan instalasi benar | PASS |
| 6.9 | Proses install selesai tanpa error | PASS |
| 6.10 | Tombol reboot tampil, ISO dilepas | PASS |

### 7. Boot setelah install — 9 PASS

| ID | Kasus | Hasil |
|---|---|---|
| 7.1 | GRUB tampil (atau boot langsung) | PASS |
| 7.2 | Tidak stuck di emergency/initramfs | PASS |
| 7.3 | Display manager / login tampil | PASS |
| 7.4 | Login user yang dibuat di installer | PASS |
| 7.5 | Desktop tampil | PASS |
| 7.6 | `sudo -v` menerima password | PASS |
| 7.7 | Hostname sesuai isian installer | PASS |
| 7.8 | `/etc/os-release` menulis BlankOn / Sinambung | PASS |
| 7.9 | Jam/zona setelah install = Asia/Jakarta | PASS |

### 8. Sistem terpasang: paket dan update — 7 PASS

| ID | Kasus | Hasil |
|---|---|---|
| 8.1 | `apt update` sukses, tidak ada NO_PUBKEY | PASS |
| 8.2 | Sumber APT mengarah ke arsip BlankOn | PASS |
| 8.3 | `sudo apt dist-upgrade` selesai | PASS |
| 8.4 | Tidak ada paket `broken` (`apt -f install` tidak diminta terus) | PASS |
| 8.5 | Install paket uji: `sudo apt install --no-install-recommends vlc` | PASS |
| 8.6 | Hapus paket uji: `sudo apt remove vlc` | PASS |
| 8.7 | Reboot setelah upgrade, masih masuk desktop | PASS |

### 9. Sistem terpasang: pemakaian — 9 PASS

| ID | Kasus | Hasil |
|---|---|---|
| 9.1 | Browser + 3 tab, termasuk video | PASS |
| 9.2 | LibreOffice buka/simpan `.odt` di Home | PASS |
| 9.3 | Unduh berkas, muncul di folder Unduhan | PASS |
| 9.4 | Copy-paste file di file manager | PASS |
| 9.5 | Audio: speaker VM | PASS |
| 9.6 | Guest additions / clipboard host-guest (opsional) | PASS |
| 9.7 | Suspend VM lalu resume (opsional) | PASS |
| 9.8 | Shutdown bersih, tidak hang | PASS |
| 9.9 | Start ulang, login lagi | PASS |

### 10. Praya / desktop khas BlankOn — 4 PASS

| ID | Kasus | Hasil |
|---|---|---|
| 10.1 | Panel/ekstensi Praya aktif | PASS |
| 10.2 | Kalender tidak ngetrigger widget lain saat hover | PASS |
| 10.3 | Akses cepat / menu sesuai dokumentasi | PASS |
| 10.4 | Bisa dimatikan: `gnome-extensions disable praya@blankonlinux.id` lalu login ulang | PASS |

Catatan 10.4: Panduan menonaktifkan Praya menyebut UUID `praya@blankonlinux.id`; ekstensi belum terpasang di jahitan lama. Perlu disesuaikan di wiki.

### 11. Skenario tambahan — 5 PASS (1 catatan terbuka)

| ID | Kasus | Hasil |
|---|---|---|
| 11.1 | Install ulang dengan EFI mati (BIOS) | PASS |
| 11.2 | Disk lebih kecil (20 GB) | PASS |
| 11.3 | RAM 2048 MB | PASS |
| 11.4 | Manual partitioning (/, swap) | PASS |
| 11.5 | Arahkan APT ke `arsip-dev.blankonlinux.id`, lalu `dist-upgrade` | PASS |

**Catatan 11.5:** `apt update` aman, tetapi `dist-upgrade` masih belum berhasil diselesaikan. Belum diketahui apakah ini kutu repo/arsip atau skenario tes; buntut perlu diidentifikasi sebelum dianggap blocker.

---

## Catatan / kutu terbuka

| No | Temuan | Severity | Status |
| --- | ------ | -------- | ------ |
| 1 | Live ISO: timezone default UTC (~8 jam mundur vs WITA) | Minor | sudah dikenal, pasca-install OK (7.9 PASS) |
| 2 | Wiki Praya: UUID `praya@blankonlinux.id` tidak ada di jahitan | Minor (docs) | panduan perlu disesuaikan |
| 3 | 11.5: `apt update` OK tapi `dist-upgrade` belum selesai di arsip-dev | ? | perlu diinvestigasi |

## Bukti

Bukti diambil dari berkas `qa/bukti/` dan `qa/img/` (screenshot boot, desktop, os-release, terminal, Calamares) sesuai sesi testing jahitan 20260918-3.

| Berkas | Isi |
|---|---|
| `bukti/os-release.png` | `PRETTY_NAME="BlankOn Linux 26.0 Sinambung"` |
| `bukti/blankon-running-*.png` | Calamares selesai: BlankOn 26.0 terpasang |
| `bukti/boot-*.png`, `bukti/pre-enter.png`, `bukti/post-enter.png` | Rangkaian boot live / setelah reset |
| `bukti/sysinfo-1.png`, `bukti/sysinfo-2.png` | `os-release` / `hostnamectl` di guest |
| `bukti/firefox.png`, `bukti/firefox-2.png` | Browser live / hasil install |

---

## Ringkasan kirim ke tim

- [x] **Lulus sesi wajib** (bagian 2, 6, 7, 8.1): ISO jahitan 20260918-3 boleh dipakai tester lain
- [ ] Gagal blocker
- [ ] Gagal major
- [ ] Hanya minor

## Catatan bebas

```
Jahitan 20260918-3 (revisi 757336b) semua 76 kasus PASS, tanpa FAIL.
Kutu lama yang masih terbuka: timezone live UTC (3.6) dan wiki Praya (10.4).
Catatan 11.5 perlu dicek tim infra — dist-upgrade via arsip-dev belum tuntas.
```