# Laporan hasil tes — BlankOn Linux 26.0 Sinambung

| | |
|---|---|
| Tanggal | 18 September 2026 |
| Produk | BlankOn Linux 26.0 Sinambung |
| ISO | `blankon-live-image-amd64.hybrid.iso` |
| Sumber ISO | zsync `http://jahitan.blankonlinux.id/harian/current/` (Last-Modified 17 Sep 2026) |
| Hypervisor | VirtualBox 7.2.16 |
| Firmware | EFI |
| VM utama | `blankon-qa-1` — 4 GB RAM, 2 vCPU, disk 40 GB, NAT |
| User guest | `blankon` |
| Kernel | `7.1.12+deb14-amd64` |
| Checklist | `qa/checklist-tes-iso-vm.md` |
| Bukti | `qa/img/`, `qa/bukti/` |

## Ringkasan

Sesi wajib **lulus**. Distro bisa di-boot live, di-install (Calamares, erase disk), boot ulang ke disk, update paket, dan dipakai.

| | Jumlah |
|---|---|
| PASS | 70 |
| FAIL | 2 |
| Tidak dites | 5 |

FAIL hanya di sesi **live** (jam/zona) dan di **cara mematikan Praya** (UUID ekstensi tidak ada). Setelah install, jam sudah sesuai zona.

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

### 1. Persiapan VM — selesai

VM `blankon-qa-1` dibuat: Debian 64-bit, EFI, ISO terpasang, NAT.

### 2. Boot live — PASS

| ID | Kasus | Hasil |
|---|---|---|
| 2.1 | ISO terbaca, menu boot | PASS — power-on pertama gagal, perlu retry/pasang ISO lalu boot |
| 2.2 | Live sampai desktop | PASS |
| 2.3 | Tidak ada error GRUB sebelum splash | PASS |
| 2.4 | Splash / branding BlankOn | PASS |
| 2.5 | Desktop Praya/GNOME, tidak loop login | PASS |
| 2.6 | Resolusi | PASS |
| 2.7 | Mouse dan keyboard | PASS |

### 3. Live — desktop — 1 FAIL

| ID | Kasus | Hasil |
|---|---|---|
| 3.1–3.5 | Menu, font, bahasa, keyboard, layout bukan Arabic | PASS |
| **3.6** | **Jam dan zona waktu** | **FAIL** — live memakai UTC; jam ~8 jam mundur vs WITA; harus sync manual |
| 3.7–3.10 | Terminal, file manager, pengaturan, lock/logout | PASS |

Jam live (contoh): guest **01:17 / 01:24 / 01:53**, host WITA **09:08 / 09:24 / 09:53**.

### 4. Live — jaringan — PASS

Interface tampil, dapat IP NAT, ping `blankonlinux.id` OK, browser buka situs, `apt update` di live OK (`file:/run/live/medium` + arsip-dev).

### 5. Live — aplikasi — PASS

Firefox, Writer, Calc, pemutar gambar, audio/video, editor, kalkulator, screenshot tool, Praya load tanpa error, ikon menu lengkap.

### 6. Instalasi Calamares (erase disk) — PASS

Calamares terbuka (tanpa `sudo` di terminal; polkit). Bahasa Indonesia, lokasi Asia/Jakarta, keyboard Indonesian, user dibuat, install selesai, reboot.

### 7. Boot setelah install — PASS

GRUB/disk OK, login user installer OK, sudo OK, hostname OK, `os-release` = Sinambung.

| ID | Kasus | Hasil |
|---|---|---|
| **7.9** | **Jam/zona setelah install** | **PASS** — jam sync sesuai zona yang dipilih |

### 8. Paket dan update — PASS

`apt update` tanpa NO_PUBKEY, sumber arsip BlankOn, `dist-upgrade` selesai, tidak broken, install/hapus `vlc` OK, reboot setelah upgrade OK.

### 9. Pemakaian sistem terpasang — PASS

Browser + tab + video, LibreOffice `.odt`, unduhan, copy-paste, audio, guest additions/clipboard, suspend-resume, shutdown bersih, start ulang + login.

### 10. Praya — 1 FAIL

| ID | Kasus | Hasil |
|---|---|---|
| 10.1 | Panel/menu Praya aktif | PASS |
| 10.2 | Kalender hover tidak ngetrigger widget lain | PASS |
| 10.3 | Akses cepat / menu | PASS |
| **10.4** | `gnome-extensions disable praya@blankonlinux.id` | **FAIL** — ekstensi `praya@blankonlinux.id` tidak ada. Praya sendiri tetap jalan. |

### 11. Skenario tambahan

| ID | Kasus | Hasil |
|---|---|---|
| 11.1 | Install ulang EFI mati (BIOS) | PASS |
| 11.2 | Disk 20 GB | tidak dites |
| 11.3 | RAM 2048 MB | tidak dites |
| 11.4 | Installer bahasa English | tidak dites |
| 11.5 | Manual partitioning | tidak dites |
| 11.6 | Ganti APT ke arsip-dev lalu dist-upgrade (skenario terpisah) | tidak dites — APT guest sudah arsip-dev |

---

## Daftar FAIL

### FAIL-1 — Live ISO: jam/zona UTC

- **ID:** 3.6
- **Mode:** live (bukan sistem terpasang)
- **Gejala:** jam desktop ~8 jam mundur dibanding WITA; harus disetel manual
- **Setelah install:** tidak terjadi (7.9 PASS)
- **Bukti:** `img/test2/bio-blankon.png`, `img/test3-5/fail to sync.png` (apt live: `file:/run/live/medium`)

### FAIL-2 — Perintah matikan Praya tidak berlaku

- **ID:** 10.4
- **Gejala:** `gnome-extensions disable praya@blankonlinux.id` gagal karena UUID itu tidak terpasang
- **Desktop Praya:** tetap berfungsi (10.1–10.3 PASS)

---

## Bukti

| Berkas | Isi |
|---|---|
| `img/test2/bio-blankon.png` | `os-release` / `hostnamectl` — Sinambung 26.0; jam guest 01:17 |
| `img/test2/failed-mount-but-pass.png` | Power-on pertama: optical drive kosong, EFI tidak menemukan boot |
| `img/test3-5/fail to sync.png` | `apt update` live sukses; jam guest 01:24 |
| `img/test3-5/audio-test.mp4` | Firefox + YouTube + audio di guest |
| `bukti/os-release.png` | `PRETTY_NAME="BlankOn Linux 26.0 Sinambung"` (VM `BlankOn`) |
| `bukti/blankon-running-*.png` | Calamares selesai: BlankOn 26.0 terpasang |
