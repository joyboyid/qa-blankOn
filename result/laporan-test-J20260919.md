# Laporan hasil tes — BlankOn Linux 26.0 Sinambung

|            |                                                                                    |
| ---------- | ---------------------------------------------------------------------------------- |
| Tanggal    | 20 September 2026                                                                  |
| Produk     | BlankOn Linux 26.0 Sinambung                                                       |
| ISO        | `blankon-live-image-amd64.hybrid.iso`                                              |
| Update     | Praya 0.1.38-1 · systemd-timesyncd · VLC 3.0.23 (Showtime dicabut)                 |
| Jahitan    | 20260919                                                                           |
| Sumber ISO | zsync `http://jahitan.blankonlinux.id/harian/current/` (Last-Modified 17 Sep 2026) |
| Hypervisor | VirtualBox 7.2.16                                                                  |
| Firmware   | EFI                                                                                |
| VM utama   | `blankon-prayatest` — 4 GB RAM, 2 vCPU, disk 20 GB, NAT                            |
| User guest | `blankon`                                                                          |
| Kernel     | `7.1.12+deb14-amd64`                                                               |
| Checklist  | `qa/checklist-tes-iso-vm.md`                                                       |
| Bukti      | `qa/img-issue-J20260919/`                                                          |

## Ringkasan

Sesi wajib **lulus**. Distro bisa di-boot live, di-install (Calamares, erase disk), boot ulang ke disk, update paket, dan dipakai.

|             | Jumlah |
| ----------- | ------ |
| PASS        | 12     |
| FAIL        | 1      |
| Tidak dites | 0      |

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

VM `blankon-prayatest` dibuat: Debian 64-bit, ISO terpasang, NAT.

### 2. TimeZone and Gnome-Extentsion Priority test

| ID  | Kasus                                         | Hasil |
| --- | --------------------------------------------- | ----- |
| 2.1 | Zona Waktu tidak mengikuti region penginstall | FAIL  |
| 2.2 | Praya Gnome                                   | PASS  |
| 2.3 | VLC menggantikan SGNOME Showtime              | PASS  |

#### Sub Prayatest Gnome-shell

| ID  | Kasus                                                                                                    | Hasil |
| --- | -------------------------------------------------------------------------------------------------------- | ----- |
| 1   | Klik tombol start/main menu → langsung terbuka, sekali klik (fix be07b475)                               | PASS  |
| 2   | Ketik nama app di launcher → tekan Enter → app terbuka (fix 122c8043)                                    | PASS  |
| 3   | Buka app via panel (mis. Firefox lewat Praya) → tidak gagal (tiket #108)                                 | PASS  |
| 4   | Navigasi panel pakai keyboard (arrow + Enter) → fokus berpindah, bisa pilih (improvement rc 2)           | PASS  |
| 5   | Hover kalender di panel → tidak men-trigger widget lain (tiket #89)                                      | PASS  |
| 6   | Grid app / menu → tidak ada ikon "missing" (commit d8689faf mencabut blankres karena belum ada ikon app) | PASS  |

#### Sub Vlc test

| ID  | Kasus                                                                     | Hasil |
| --- | ------------------------------------------------------------------------- | ----- |
| 1   | Menu aplikasi → ada VLC (ikon tidak missing, launch OK)                   | PASS  |
| 2   | Buka VLC, putar berkas media → player terbuka, video/audio jalan          | PASS  |
| 3   | Cek default app untuk video: xdg-mime query default video/mp4 → harus vlc | PASS  |
| 4   | Tutup VLC → tidak crash                                                   | PASS  |
