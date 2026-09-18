# Checklist tes ISO BlankOn di VM

Isi satu berkas ini per jahitan. Status: `PASS` / `FAIL` / `NO TEST`.
Kalau `GAGAL`, tulis gejala singkat di kolom catatan. Satu masalah = satu tiket GitHub.

Repo tiket: https://github.com/BlankOn/revival/issues

---

## 0. Identitas sesi

| Item                                | Isi                                                                                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| Nama tester                         |                                                                                                 |
| Tanggal tes                         |                                                                                                 |
| ISO                                 | `blankon-live-image-amd64.hybrid.iso`                                                           |
| Sumber ISO                          | `zsync http://jahitan.blankonlinux.id/harian/current/blankon-live-image-amd64.hybrid.iso.zsync` |
| Tanggal ISO (mtime / Last-Modified) |                                                                                                 |
| Hypervisor                          | VirtualBox                                                                                      |
| Firmware VM                         | EFI / BIOS (lingkari)                                                                           |
| RAM VM                              | 4096 MB (min. 2048)                                                                             |
| vCPU                                | 2                                                                                               |
| Disk VM                             | 40 GB                                                                                           |
| Jaringan VM                         | NAT                                                                                             |
| Host OS                             |                                                                                                 |
| Versi VirtualBox                    |                                                                                                 |

Perbarui ISO dulu:

```bash
cd /home/mandex/Projects/open-source/blankOn/iso
zsync http://jahitan.blankonlinux.id/harian/current/blankon-live-image-amd64.hybrid.iso.zsync
```

---

## 1. Siapkan VM (sekali, lalu pakai ulang)

Lakukan di VirtualBox sebelum tes.

- [ Done ] Machine → New, nama `blankon-qa-1`
- [ Done ] Type: Linux, Version: Debian (64-bit)
- [ Done ] Pasang ISO: `iso/blankon-live-image-amd64.hybrid.iso`
- [ Done ] RAM 4096 MB, CPU 2
- [ Done ] Disk 40 GB, dynamically allocated
- [ Done ] Settings → System → Motherboard → **Enable EFI**
- [ Done ] Network: NAT
- [ ] Display: 16–32 MB video memory (3D acceleration opsional)

Kalau EFI gagal boot, ulangi tes dengan EFI mati, lalu laporkan keduanya.

---

## 2. Boot live

| #   | Kasus                                               | Status | Catatan                                                         |
| --- | --------------------------------------------------- | ------ | --------------------------------------------------------------- |
| 2.1 | ISO terbaca, menu boot tampil                       | PASS   | setiap pertama boot failed to boot jadi harus di retry and load |
| 2.2 | Pilih Live / Try BlankOn, sampai desktop            | PASS   |                                                                 |
| 2.3 | Tidak ada error GRUB yang menakutkan sebelum splash | PASS   | tiket #110                                                      |
| 2.4 | Splash / branding BlankOn tampil                    | PASS   |                                                                 |
| 2.5 | Desktop Praya/GNOME tampil, tidak hitam/loop login  | PASS   |                                                                 |
| 2.6 | Resolusi layar wajar, tidak pecah / terpotong       | PASS   |                                                                 |
| 2.7 | Mouse dan keyboard merespons                        | PASS   |                                                                 |

Perintah bukti (di dalam live):

```bash
cat /etc/os-release
uname -a
hostnamectl
```

---

## 3. Live: dasar desktop

| #    | Kasus                                       | Status | Catatan           |
| ---- | ------------------------------------------- | ------ | ----------------- |
| 3.1  | Panel/menu aplikasi terbuka                 | PASS   |                   |
| 3.2  | Teks menu terbaca (font tidak kotak)        | PASS   |                   |
| 3.3  | Bahasa UI default masuk akal (id/en)        | PASS   |                   |
| 3.4  | Keyboard: huruf, angka, tanda `-` `/` `'`   | PASS   |                   |
| 3.5  | Layout Indonesia tidak salah jadi Arabic    | PASS   |                   |
| 3.6  | Jam dan zona waktu                          | FAIL   | harus sync manual |
| 3.7  | Terminal bisa dibuka                        | PASS   |                   |
| 3.8  | File manager bisa dibuka, isi home terlihat | PASS   |                   |
| 3.9  | Pengaturan (Settings) bisa dibuka           | PASS   |                   |
| 3.10 | Logout / lock screen (kalau ada)            | PASS   |                   |

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

Buka, pakai sebentar, tutup. Crash = GAGAL.

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
| 5.10 | Semua ikon di menu bisa diklik, tidak ada yang “missing” | PASS   |         |

---

## 6. Instalasi Calamares (skenario wajib)

Snapshot VM sebelum install, supaya bisa ulang.

Skenario **Erase disk** harus lulus. Ini syarat Alpha.

| #    | Kasus                                    | Status | Catatan    |
| ---- | ---------------------------------------- | ------ | ---------- |
| 6.1  | Tombol Install / ikon Calamares ada      | PASS   |            |
| 6.2  | Calamares terbuka (butuh sudo)           | PASS   | tanpa sudo |
| 6.3  | Pilih Bahasa Indonesia, teks tidak rusak | PASS   |            |
| 6.4  | Lokasi: Asia/Jakarta                     | Utc    |            |
| 6.5  | Keyboard: Indonesian, tes di kotak uji   | PASS   |            |
| 6.6  | Partisi: Erase disk                      | PASS   |            |
| 6.7  | Buat user + password                     | PASS   |            |
| 6.8  | Ringkasan instalasi benar                | PASS   |            |
| 6.9  | Proses install selesai tanpa error       | PASS   |            |
| 6.10 | Tombol reboot tampil, ISO dilepas        | PASS   |            |

Kalau gagal di tengah jalan, jangan cuma screenshot. Di live session:

```bash
sudo calamares -D8 | sudo tee "$HOME/calamares.log"
```

Lampirkan `calamares.log` di tiket.

---

## 7. Boot setelah install

Lepas ISO di Settings → Storage sebelum Start, atau di prompt “please remove installation medium”.

| #   | Kasus                                         | Status | Catatan |
| --- | --------------------------------------------- | ------ | ------- |
| 7.1 | GRUB tampil (atau boot langsung)              | PASS   |         |
| 7.2 | Tidak stuck di emergency/initramfs            | PASS   |         |
| 7.3 | Display manager / login tampil                | PASS   |         |
| 7.4 | Login user yang dibuat di installer           | PASS   |         |
| 7.5 | Desktop tampil                                | PASS   |         |
| 7.6 | `sudo -v` menerima password                   | PASS   |         |
| 7.7 | Hostname sesuai isian installer               | PASS   |         |
| 7.8 | `/etc/os-release` menulis BlankOn / Sinambung | PASS   |         |

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

| #   | Kasus                                                       | Status | Catatan |
| --- | ----------------------------------------------------------- | ------ | ------- |
| 9.1 | Browser + 3 tab, termasuk video                             | PASS   |         |
| 9.2 | LibreOffice buka/simpan `.odt` di Home                      | PASS   |         |
| 9.3 | Unduh berkas, muncul di folder Unduhan                      | PASS   |         |
| 9.4 | Copy-paste file di file manager                             | PASS   |         |
| 9.5 | Audio: speaker VM (boleh TIDAK DITES jika host tidak terus) | PASS   |         |
| 9.6 | Guest additions / clipboard host-guest (opsional)           | PASS   |         |
| 9.7 | Suspend VM lalu resume (opsional)                           | PASS   |         |
| 9.8 | Shutdown bersih, tidak hang                                 | PASS   |         |
| 9.9 | Start ulang, login lagi                                     | PASS   |         |

---

## 10. Praya / desktop khas BlankOn

| #    | Kasus                                                                             | Status | Catatan   |
| ---- | --------------------------------------------------------------------------------- | ------ | --------- |
| 10.1 | Panel/ekstensi Praya aktif                                                        | PASS   |           |
| 10.2 | Kalender tidak ngetrigger widget lain saat hover                                  | PASS   | tiket #89 |
| 10.3 | Akses cepat / menu sesuai dokumentasi                                             | PASS   |           |
| 10.4 | Bisa dimatikan: `gnome-extensions disable praya@blankonlinux.id` lalu login ulang | FAIL   | ekstensi `praya@blankonlinux.id` tidak ada |

---

## 11. Skenario tambahan (kalau sesi 2–7 sudah hijau)

Jangan kerjakan ini di VM yang sama tanpa snapshot.

| #    | Kasus                                                           | Status | Catatan               |
| ---- | --------------------------------------------------------------- | ------ | --------------------- |
| 11.1 | Install ulang dengan EFI **mati** (BIOS)                        | PASS   | bandingkan dengan 7.x |
| 11.2 | Disk lebih kecil (20 GB)                                        |        |                       |
| 11.3 | RAM 2048 MB                                                     |        |                       |
| 11.4 | Bahasa English di installer                                     |        |                       |
| 11.5 | Manual partitioning (/, swap)                                   |        |                       |
| 11.6 | Arahkan APT ke `arsip-dev.blankonlinux.id`, lalu `dist-upgrade` |        | **hanya di VM**       |

---

## 12. Kumpulkan bukti kalau ada gagal

Jalankan di guest, simpan output:

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
```

Lampirkan juga screenshot langkah yang gagal, dan `calamares.log` jika gagalnya di installer.

---

## 13. Ringkasan kirim ke tim

Centang satu:

- [x] **Lulus sesi wajib** (bagian 2, 6, 7, 8.1): ISO ini boleh dipakai tester lain
- [ ] **Gagal blocker**: tidak boot / tidak bisa install / tidak bisa login
- [ ] **Gagal major**: desktop/update/app inti rusak
- [x] **Hanya minor**: terjemahan, UI, hover, kosmetik — plus jam/zona UTC (lihat catatan)

Tiket GitHub yang dibuka:

| No  | Judul                                                     | URL    | Severity          |
| --- | --------------------------------------------------------- | ------ | ----------------- |
| 1   | (usulkan) Zona waktu tetap UTC setelah pilih Asia/Jakarta | belum  | Major/Minor       |
| 2   | (jangan dulu) First boot failed — optical drive empty     | jangan | bukan kutu distro |
| 3   | (usulkan) Wiki Praya: `praya@blankonlinux.id` tidak ada   | belum  | Docs/Minor        |

Catatan bebas:

```
Review 18 Sep 2026:
- Sesi wajib lulus di VM blankon-qa-1 (user blankon) dan VM BlankOn (user vbox).
- FAIL nyata: jam guest ~8 jam mundur (01:xx vs host 09:xx WITA) = timezone UTC, selaras 6.4 "Utc".
- 2.1 "first boot failed": screenshot menunjukkan Optical Drive Empty + EFI gagal load HDD kosong. Itu VirtualBox, bukan ISO. Lampirkan hanya jika ISO sudah terpasang dan tetap gagal.
- fail-to-sync.png isinya apt update SUKSES (arsip-dev Hit). Nama file menyesatkan; yang gagal adalah sync jam.
- Audio/video PASS: YouTube mutar, rekaman ada audio (mean -23.5 dB).
- 5.8 screenshot tool PASS.
- 10.4 FAIL: perintah wiki `gnome-extensions disable praya@blankonlinux.id` tidak berlaku — ekstensi tidak terpasang. Praya sendiri tetap jalan (10.1–10.3 PASS). Ini kutu dokumentasi, bukan desktop rusak.
- Belum: seluruh bagian 11.
```
