# Blueprint Tes ISO BlankOn (QA)

Satu berkas ini dipakai untuk semua jahitan ISO. Salin/cetak tabelnya ke laporan hasil tes per sesi.
Status: `PASS` / `FAIL` / `NO TEST`. Kalau `FAIL`, tulis gejala singkat di kolom catatan dan buka satu tiket GitHub per masalah.

Repo tiket: https://github.com/BlankOn/revival/issues

---

## 0. Identitas sesi

| Item                                | Isi                                                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Nama tester                         | BOIM                                                                                                        |
| Tanggal tes                         | 18 Septermber 2026                                                                                          |
| ISO                                 | `blankon-live-image-amd64.hybrid.iso`                                                                       |
| Sumber ISO                          | `zsync http://jahitan.blankonlinux.id/harian/current/blankon-live-image-amd64.hybrid.iso.zsync`             |
| Tanggal ISO (mtime / Last-Modified) | Jahitan harian 20260918-3 [[revisi 757336b (https://github.com/BlankOn/blankon-live-build/commit/757336b)]] |
| Hypervisor                          | VirtualBox                                                                                                  |
| Firmware VM                         | EFI / BIOS (lingkari)                                                                                       |
| RAM VM                              | 2048 MB (min.) / 2096 MB (disarankan)                                                                       |
| vCPU                                | 2                                                                                                           |
| Disk VM                             | 20 GB                                                                                                       |
| Jaringan VM                         | NAT                                                                                                         |
| Host OS                             | Manjaro Sway Dell Latitude E7470                                                                            |
| Versi VirtualBox                    | 7.2.16 r17                                                                                                  |

Perbarui ISO dulu:

```bash
cd /home/mandex/Projects/open-source/blankOn/iso
zsync http://jahitan.blankonlinux.id/harian/current/blankon-live-image-amd64.hybrid.iso.zsync
```

---

## 1. Siapkan VM (sekali per jahitan, lalu pakai ulang)

Lakukan di VirtualBox sebelum tes.

- [done] Machine → New, nama sesuai sesi (mis. `blankon-qa-2`)
- [done] Type: Linux, Version: Debian (64-bit)
- [done] Pasang ISO: `iso/blankon-live-image-amd64.hybrid.iso`
- [done] RAM 2048+ MB, CPU 2
- [done] Disk 20 GB, dynamically allocated
- [done] Settings → System → Motherboard → **Enable EFI**
- [done] Network: NAT
- [done] Display: 16–32 MB video memory (3D acceleration opsional)

Catatan: kalau boot EFI gagal, ulangi dengan EFI **mati**, laporkan keduanya.

---

## 2. Boot live

| #   | Kasus                                              | Status | Catatan    |
| --- | -------------------------------------------------- | ------ | ---------- |
| 2.1 | ISO terbaca, menu boot tampil                      | PASS   |            |
| 2.2 | Pilih Live / Try BlankOn, sampai desktop           | PASS   |            |
| 2.3 | Tidak ada error GRUB sebelum splash                | PASS   | tiket #110 |
| 2.4 | Splash / branding BlankOn tampil                   | PASS   |            |
| 2.5 | Desktop Praya/GNOME tampil, tidak hitam/loop login | PASS   |            |
| 2.6 | Resolusi layar wajar, tidak pecah / terpotong      | PASS   |            |
| 2.7 | Mouse dan keyboard merespons                       | PASS   |            |

Perintah bukti (di dalam live):

```bash
cat /etc/os-release
uname -a
hostnamectl
```

---

## 3. Live: dasar desktop

| #    | Kasus                                       | Status | Catatan                                                                |
| ---- | ------------------------------------------- | ------ | ---------------------------------------------------------------------- |
| 3.1  | Panel/menu aplikasi terbuka                 | PASS   |                                                                        |
| 3.2  | Teks menu terbaca (font tidak kotak)        | PASS   |                                                                        |
| 3.3  | Bahasa UI default masuk akal (id/en)        | PASS   |                                                                        |
| 3.4  | Keyboard: huruf, angka, tanda `-` `/` `'`   | PASS   |                                                                        |
| 3.5  | Layout Indonesia tidak salah jadi Arabic    | PASS   |                                                                        |
| 3.6  | Jam dan zona waktu                          | PASS   | Live ISO: jam UTC (~8 jam mundur vs WITA); sudah sync setelah install. |
| 3.7  | Terminal bisa dibuka                        | PASS   |                                                                        |
| 3.8  | File manager bisa dibuka, isi home terlihat | PASS   |                                                                        |
| 3.9  | Pengaturan (Settings) bisa dibuka           | PASS   |                                                                        |
| 3.10 | Logout / lock screen (kalau ada)            | PASS   |                                                                        |

---

## 4. Live: jaringan

| #   | Kasus                                           | Status | Catatan |
| --- | ----------------------------------------------- | ------ | ------- |
| 4.1 | Interface jaringan tampil (`ip a`)              | PASS   |         |
| 4.2 | Dapat IP (NAT VirtualBox biasanya 10.0.2.x)     | PASS   |         |
| 4.3 | Ping keluar: `ping -c 3 blankonlinux.id`        | PASS   |         |
| 4.4 | Browser buka https://blankonlinux.id            | PASS   |         |
| 4.5 | `apt update` di live (boleh gagal; catat pesan) | PASS   |         |

```bash
ip -br a
ping -c 3 blankonlinux.id
```

---

## 5. Live: aplikasi default

Buka, pakai sebentar, tutup. Crash = FAIL.

| #    | Kasus                                                    | Status | Catatan |
| ---- | -------------------------------------------------------- | ------ | ------- |
| 5.1  | Browser (Firefox/Chromium/yang terpasang)                | PASS   |         |
| 5.2  | LibreOffice Writer, ketik 1 paragraf, simpan             | PASS   |         |
| 5.3  | LibreOffice Calc, isi 3 sel                              | PASS   |         |
| 5.4  | Pemutar gambar                                           | PASS   |         |
| 5.5  | Pemutar audio/video (kalau ada berkas uji)               | PASS   |         |
| 5.6  | Text editor                                              | PASS   |         |
| 5.7  | Calculator                                               | PASS   |         |
| 5.8  | Screenshot tool                                          | PASS   |         |
| 5.9  | GNOME Extensions / Praya tidak error saat load           | PASS   |         |
| 5.10 | Semua ikon di menu bisa diklik, tidak ada yang "missing" | PASS   |         |

---

## 6. Instalasi Calamares (skenario wajib, syarat Alpha)

Snapshot VM sebelum install supaya bisa ulang. Skenario **Erase disk** harus lulus.

| #    | Kasus                                    | Status | Catatan                                                      |
| ---- | ---------------------------------------- | ------ | ------------------------------------------------------------ |
| 6.1  | Tombol Install / ikon Calamares ada      | PASS   |                                                              |
| 6.2  | Calamares terbuka (boleh butuh sudo)     | PASS   |                                                              |
| 6.3  | Pilih Bahasa Indonesia, teks tidak rusak | PASS   |                                                              |
| 6.4  | Lokasi: Asia/Jakarta                     | PASS   | Calamares menerapkan zona; jam UTC hanya di sesi live (3.6). |
| 6.5  | Keyboard: Indonesian, tes di kotak uji   | PASS   |                                                              |
| 6.6  | Partisi: Erase disk                      | PASS   |                                                              |
| 6.7  | Buat user + password                     | PASS   |                                                              |
| 6.8  | Ringkasan instalasi benar                | PASS   |                                                              |
| 6.9  | Proses install selesai tanpa error       | PASS   |                                                              |
| 6.10 | Tombol reboot tampil, ISO dilepas        | PASS   |                                                              |

Kalau gagal di tengah jalan, jangan cuma screenshot. Di live session:

```bash
sudo calamares -D8 | sudo tee "$HOME/calamares.log"
```

Lampirkan `calamares.log` di tiket.

---

## 7. Boot setelah install

Lepas ISO di Settings → Storage sebelum Start, atau jawab prompt "please remove installation medium".

| #   | Kasus                                         | Status | Catatan                |
| --- | --------------------------------------------- | ------ | ---------------------- |
| 7.1 | GRUB tampil (atau boot langsung)              | PASS   |                        |
| 7.2 | Tidak stuck di emergency/initramfs            | PASS   |                        |
| 7.3 | Display manager / login tampil                | PASS   |                        |
| 7.4 | Login user yang dibuat di installer           | PASS   |                        |
| 7.5 | Desktop tampil                                | PASS   |                        |
| 7.6 | `sudo -v` menerima password                   | PASS   |                        |
| 7.7 | Hostname sesuai isian installer               | PASS   |                        |
| 7.8 | `/etc/os-release` menulis BlankOn / Sinambung | PASS   |                        |
| 7.9 | Jam/zona setelah install = Asia/Jakarta       | PASS   | kutu UTC hanya di live |

```bash
cat /etc/os-release
hostnamectl
sudo -v
lsblk
```

---

## 8. Sistem terpasang: paket dan update

| #   | Kasus                                                             | Status | Catatan |
| --- | ----------------------------------------------------------------- | ------ | ------- |
| 8.1 | `apt update` sukses, tidak ada NO_PUBKEY                          | PASS   |         |
| 8.2 | Sumber APT mengarah ke arsip BlankOn                              | PASS   |         |
| 8.3 | `sudo apt dist-upgrade` selesai                                   | PASS   |         |
| 8.4 | Tidak ada paket `broken` (`apt -f install` tidak diminta terus)   | PASS   |         |
| 8.5 | Install paket uji: `sudo apt install --no-install-recommends vlc` | PASS   |         |
| 8.6 | Hapus paket uji: `sudo apt remove vlc`                            | PASS   |         |
| 8.7 | Reboot setelah upgrade, masih masuk desktop                       | PASS   |         |

```bash
cat /etc/apt/sources.list /etc/apt/sources.list.d/*.list /etc/apt/sources.list.d/*.sources 2>/dev/null
sudo apt update
sudo apt dist-upgrade
```

---

## 9. Sistem terpasang: pemakaian

| #   | Kasus                                                      | Status | Catatan |
| --- | ---------------------------------------------------------- | ------ | ------- |
| 9.1 | Browser + 3 tab, termasuk video                            | PASS   |         |
| 9.2 | LibreOffice buka/simpan `.odt` di Home                     | PASS   |         |
| 9.3 | Unduh berkas, muncul di folder Unduhan                     | PASS   |         |
| 9.4 | Copy-paste file di file manager                            | PASS   |         |
| 9.5 | Audio: speaker VM (boleh NO TEST jika host tidak tersedia) | PASS   |         |
| 9.6 | Guest additions / clipboard host-guest (opsional)          | PASS   |         |
| 9.7 | Suspend VM lalu resume (opsional)                          | PASS   |         |
| 9.8 | Shutdown bersih, tidak hang                                | PASS   |         |
| 9.9 | Start ulang, login lagi                                    | PASS   |         |

---

## 10. Praya / desktop khas BlankOn

| #    | Kasus                                                                             | Status | Catatan                                                         |
| ---- | --------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------- |
| 10.1 | Panel/ekstensi Praya aktif                                                        | PASS   |                                                                 |
| 10.2 | Kalender tidak ngetrigger widget lain saat hover                                  | PASS   | tiket #89                                                       |
| 10.3 | Akses cepat / menu sesuai dokumentasi                                             | PASS   |                                                                 |
| 10.4 | Bisa dimatikan: `gnome-extensions disable praya@blankonlinux.id` lalu login ulang | PASS   | kutu docs: ekstensi belum terpasang di jahitan lama; sesuaikan. |

---

## 11. Skenario tambahan (kalau bagian 2–7 sudah hijau)

Jangan kerjakan ini di VM yang sama tanpa snapshot.

| #    | Kasus                                                           | Status | Catatan                                                                            |
| ---- | --------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| 11.1 | Install ulang dengan EFI **mati** (BIOS)                        | PASS   | bandingkan dengan 7.x                                                              |
| 11.2 | Disk lebih kecil (20 GB)                                        | PASS   |                                                                                    |
| 11.3 | RAM 2048 MB                                                     | PASS   |                                                                                    |
| 11.4 | Manual partitioning (/, swap)                                   | PASS   |                                                                                    |
| 11.5 | Arahkan APT ke `arsip-dev.blankonlinux.id`, lalu `dist-upgrade` | PASS   | Masih amaan saat di update tapi masih belum bisa melakukan upgrade **hanya di VM** |

---

## 12. Kumpulkan bukti kalau ada gagal

<!-- Jalankan di guest, simpan output:

```bash
mkdir -p "$HOME/qa-bukti"
{
  echo "=== os-release ==="
  cat /etc/os-release
  echo "=== uname ==="
  uname -a
  echo "=== waktu ==="
  date -Is
  echo "=== jaringan ==="
  ip -br a
  echo "=== disk ==="
  lsblk
  echo "=== apt sources ==="
  cat /etc/apt/sources.list /etc/apt/sources.list.d/*.list /etc/apt/sources.list.d/*.sources 2>/dev/null
  echo "=== journal err ==="
  journalctl -b -p err --no-pager | tail -n 100
} > "$HOME/qa-bukti/ringkasan.txt"
``` -->

Lampirkan juga screenshot langkah yang gagal, dan `calamares.log` jika gagalnya di installer.

---

<!-- ## 13. Ringkasan kirim ke tim

Centang satu:

- [ ] **Lulus sesi wajib** (bagian 2, 6, 7, 8.1): ISO ini boleh dipakai tester lain
- [ ] **Gagal blocker**: tidak boot / tidak bisa install / tidak bisa login
- [ ] **Gagal major**: desktop/update/app inti rusak
- [ ] **Hanya minor**: terjemahan, UI, live timezone UTC (pasca-install OK), wiki -->

Tiket GitHub yang dibuka:

| No  | Judul | URL | Severity |
| --- | ----- | --- | -------- |
| 1   |       |     |          |

Catatan bebas:

```

```
