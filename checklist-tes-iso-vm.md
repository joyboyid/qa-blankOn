# Checklist tes ISO BlankOn di VM

Isi satu berkas ini per jahitan. Status: `OK` / `GAGAL` / `TIDAK DITES`.
Kalau `GAGAL`, tulis gejala singkat di kolom catatan. Satu masalah = satu tiket GitHub.

Repo tiket: https://github.com/BlankOn/revival/issues

---

## 0. Identitas sesi

| Item | Isi |
|---|---|
| Nama tester | |
| Tanggal tes | |
| ISO | `blankon-live-image-amd64.hybrid.iso` |
| Sumber ISO | `zsync http://jahitan.blankonlinux.id/harian/current/blankon-live-image-amd64.hybrid.iso.zsync` |
| Tanggal ISO (mtime / Last-Modified) | |
| Hypervisor | VirtualBox |
| Firmware VM | EFI / BIOS (lingkari) |
| RAM VM | 4096 MB (min. 2048) |
| vCPU | 2 |
| Disk VM | 40 GB |
| Jaringan VM | NAT |
| Host OS | |
| Versi VirtualBox | |

Perbarui ISO dulu:

```bash
cd /home/mandex/Projects/open-source/blankOn/iso
zsync http://jahitan.blankonlinux.id/harian/current/blankon-live-image-amd64.hybrid.iso.zsync
```

---

## 1. Siapkan VM (sekali, lalu pakai ulang)

Lakukan di VirtualBox sebelum tes.

- [ ] Machine → New, nama `blankon-qa-1`
- [ ] Type: Linux, Version: Debian (64-bit)
- [ ] Pasang ISO: `iso/blankon-live-image-amd64.hybrid.iso`
- [ ] RAM 4096 MB, CPU 2
- [ ] Disk 40 GB, dynamically allocated
- [ ] Settings → System → Motherboard → **Enable EFI**
- [ ] Network: NAT
- [ ] Display: 16–32 MB video memory (3D acceleration opsional)

Kalau EFI gagal boot, ulangi tes dengan EFI mati, lalu laporkan keduanya.

---

## 2. Boot live

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 2.1 | ISO terbaca, menu boot tampil | | |
| 2.2 | Pilih Live / Try BlankOn, sampai desktop | | |
| 2.3 | Tidak ada error GRUB yang menakutkan sebelum splash | | tiket #110 |
| 2.4 | Splash / branding BlankOn tampil | | |
| 2.5 | Desktop Praya/GNOME tampil, tidak hitam/loop login | | |
| 2.6 | Resolusi layar wajar, tidak pecah / terpotong | | |
| 2.7 | Mouse dan keyboard merespons | | |

Perintah bukti (di dalam live):

```bash
cat /etc/os-release
uname -a
hostnamectl
```

---

## 3. Live: dasar desktop

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 3.1 | Panel/menu aplikasi terbuka | | |
| 3.2 | Teks menu terbaca (font tidak kotak) | | |
| 3.3 | Bahasa UI default masuk akal (id/en) | | |
| 3.4 | Keyboard: huruf, angka, tanda `-` `/` `'` | | |
| 3.5 | Layout Indonesia tidak salah jadi Arabic | | |
| 3.6 | Jam dan zona waktu | | |
| 3.7 | Terminal bisa dibuka | | |
| 3.8 | File manager bisa dibuka, isi home terlihat | | |
| 3.9 | Pengaturan (Settings) bisa dibuka | | |
| 3.10 | Logout / lock screen (kalau ada) | | |

---

## 4. Live: jaringan

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 4.1 | Interface jaringan tampil (`ip -br a`) | | |
| 4.2 | Dapat IP (NAT VirtualBox biasanya 10.0.2.x) | | |
| 4.3 | Ping keluar: `ping -c 3 blankonlinux.id` | | |
| 4.4 | Browser buka https://blankonlinux.id | | |
| 4.5 | `apt update` di live (boleh gagal; catat pesan) | | |

```bash
ip -br a
ping -c 3 blankonlinux.id
```

---

## 5. Live: aplikasi default

Buka, pakai sebentar, tutup. Crash = GAGAL.

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 5.1 | Browser (Firefox/Chromium/yang terpasang) | | |
| 5.2 | LibreOffice Writer, ketik 1 paragraf, simpan | | |
| 5.3 | LibreOffice Calc, isi 3 sel | | |
| 5.4 | Pemutar gambar | | |
| 5.5 | Pemutar audio/video (kalau ada berkas uji) | | |
| 5.6 | Text editor | | |
| 5.7 | Calculator | | |
| 5.8 | Screenshot tool | | |
| 5.9 | GNOME Extensions / Praya tidak error saat load | | |
| 5.10 | Semua ikon di menu bisa diklik, tidak ada yang “missing” | | |

---

## 6. Instalasi Calamares (skenario wajib)

Snapshot VM sebelum install, supaya bisa ulang.

Skenario **Erase disk** harus lulus. Ini syarat Alpha.

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 6.1 | Tombol Install / ikon Calamares ada | | |
| 6.2 | Calamares terbuka (butuh sudo) | | |
| 6.3 | Pilih Bahasa Indonesia, teks tidak rusak | | |
| 6.4 | Lokasi: Asia/Jakarta | | |
| 6.5 | Keyboard: Indonesian, tes di kotak uji | | |
| 6.6 | Partisi: Erase disk | | |
| 6.7 | Buat user + password | | |
| 6.8 | Ringkasan instalasi benar | | |
| 6.9 | Proses install selesai tanpa error | | |
| 6.10 | Tombol reboot tampil, ISO dilepas | | |

Kalau gagal di tengah jalan, jangan cuma screenshot. Di live session:

```bash
sudo calamares -D8 | sudo tee "$HOME/calamares.log"
```

Lampirkan `calamares.log` di tiket.

---

## 7. Boot setelah install

Lepas ISO di Settings → Storage sebelum Start, atau di prompt “please remove installation medium”.

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 7.1 | GRUB tampil (atau boot langsung) | | |
| 7.2 | Tidak stuck di emergency/initramfs | | |
| 7.3 | Display manager / login tampil | | |
| 7.4 | Login user yang dibuat di installer | | |
| 7.5 | Desktop tampil | | |
| 7.6 | `sudo -v` menerima password | | |
| 7.7 | Hostname sesuai isian installer | | |
| 7.8 | `/etc/os-release` menulis BlankOn / Sinambung | | |

```bash
cat /etc/os-release
hostnamectl
sudo -v
lsblk
```

---

## 8. Sistem terpasang: paket dan update

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 8.1 | `apt update` sukses, tidak ada NO_PUBKEY | | |
| 8.2 | Sumber APT mengarah ke arsip BlankOn | | |
| 8.3 | `sudo apt dist-upgrade` selesai | | |
| 8.4 | Tidak ada paket `broken` (`apt -f install` tidak diminta terus) | | |
| 8.5 | Install paket uji: `sudo apt install --no-install-recommends vlc` | | |
| 8.6 | Hapus paket uji: `sudo apt remove vlc` | | |
| 8.7 | Reboot setelah upgrade, masih masuk desktop | | |

```bash
cat /etc/apt/sources.list /etc/apt/sources.list.d/*.list /etc/apt/sources.list.d/*.sources 2>/dev/null
sudo apt update
sudo apt dist-upgrade
```

---

## 9. Sistem terpasang: pemakaian

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 9.1 | Browser + 3 tab, termasuk video | | |
| 9.2 | LibreOffice buka/simpan `.odt` di Home | | |
| 9.3 | Unduh berkas, muncul di folder Unduhan | | |
| 9.4 | Copy-paste file di file manager | | |
| 9.5 | Audio: speaker VM (boleh TIDAK DITES jika host tidak terus) | | |
| 9.6 | Guest additions / clipboard host-guest (opsional) | | |
| 9.7 | Suspend VM lalu resume (opsional) | | |
| 9.8 | Shutdown bersih, tidak hang | | |
| 9.9 | Start ulang, login lagi | | |

---

## 10. Praya / desktop khas BlankOn

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 10.1 | Panel/ekstensi Praya aktif | | |
| 10.2 | Kalender tidak ngetrigger widget lain saat hover | | tiket #89 |
| 10.3 | Akses cepat / menu sesuai dokumentasi | | |
| 10.4 | Bisa dimatikan: `gnome-extensions disable praya@blankonlinux.id` lalu login ulang | | |

---

## 11. Skenario tambahan (kalau sesi 2–7 sudah hijau)

Jangan kerjakan ini di VM yang sama tanpa snapshot.

| # | Kasus | Status | Catatan |
|---|---|---|---|
| 11.1 | Install ulang dengan EFI **mati** (BIOS) | | bandingkan dengan 7.x |
| 11.2 | Disk lebih kecil (20 GB) | | |
| 11.3 | RAM 2048 MB | | |
| 11.4 | Bahasa English di installer | | |
| 11.5 | Manual partitioning (/, swap) | | |
| 11.6 | Arahkan APT ke `arsip-dev.blankonlinux.id`, lalu `dist-upgrade` | | **hanya di VM** |

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

- [ ] **Lulus sesi wajib** (bagian 2, 6, 7, 8.1): ISO ini boleh dipakai tester lain
- [ ] **Gagal blocker**: tidak boot / tidak bisa install / tidak bisa login
- [ ] **Gagal major**: desktop/update/app inti rusak
- [ ] **Hanya minor**: terjemahan, UI, hover, kosmetik

Tiket GitHub yang dibuka:

| No | Judul | URL | Severity |
|---|---|---|---|
| | | | |

Catatan bebas:

```
```
