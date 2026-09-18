# Review folder QA — 18 Sep 2026

Sumber: `checklist-tes-iso-vm.md` (terisi tester) + `img/` + `bukti/`.

Verdict: **lulus sesi wajib**, ada **1 kutu nyata (jam/zona)** + **1 kutu dokumentasi Praya**, 1 temuan yang jangan dilaporkan sebagai bug distro.

## Cakupan

Hampir semua baris 2–10 terisi PASS. Kosong:

- Seluruh bagian 11 (EFI BIOS, RAM 2 GB, English installer, manual partition)

5.8 screenshot tool: **PASS**.
10.4 disable Praya: **FAIL** — ekstensi `praya@blankonlinux.id` tidak ada.

Dua VM:

| VM | User | Bukti |
|---|---|---|
| `blankon-qa-1` | `blankon@blankon` | `img/test2`, `img/test3-5` |
| `BlankOn` | `vbox@vbox-virtualbox` | `bukti/` |

Keduanya: **BlankOn Linux 26.0 Sinambung**, kernel `7.1.12+deb14-amd64`.

## Temuan yang layak tiket

### 1. Live ISO timezone UTC — 3.6 FAIL (bukan pasca-install)

Mode: **live**, dikonfirmasi tester. `fail to sync.png` memakai `file:/run/live/medium`.

Bukti:

- Guest top-bar **01:17 / 01:24 / 01:53**
- Host (WITA, UTC+8) **09:08 / 09:24 / 09:53**
- Selisih pas **8 jam** → live session di UTC
- Firmware Date 2006 di `hostnamectl` = quirk EFI VirtualBox, bukan penyebab 8 jam

Setelah install (7.9): jam **sudah sync sesuai zona**. Calamares OK. Jangan tiket installer.

Severity: minor — default live UTC (lazim di Debian live); BlankOn mungkin ingin default Jakarta di sesi coba.

Konfirmasi di **sesi live** sebelum tiket:

```bash
timedatectl
cat /etc/timezone
```

### 2. Bahasa campur (minor, dari sesi VM `BlankOn`)

Menu Praya Indonesia, chip top-bar `en`, tombol Firefox `Continue` / `Restore from Backup` Inggris.

### 3. Wiki Praya usang — 10.4 FAIL

Wiki [UserGuides/Praya.md](https://github.com/BlankOn/revival/blob/main/UserGuides/Praya.md) bilang Praya adalah GNOME Shell Extension dan dimatikan dengan:

```
gnome-extensions disable praya@blankonlinux.id
```

Di jahitan ini ekstensi itu **tidak ada**. Menu Praya tetap jalan (10.1–10.3 PASS). Ini kutu **dokumentasi** (UUID/paket berubah, atau Praya bukan lagi extension). Bukan blocker desktop.

Konfirmasi di guest:

```bash
gnome-extensions list
gnome-extensions info praya@blankonlinux.id
```

## Jangan jadi tiket

### First boot failed — 2.1 PASS dengan catatan “harus retry”

`img/test2/failed-mount-but-pass.png` menunjukkan:

- `BdsDxe: failed to load Boot0001 "UEFI VBOX HARDDISK..."`
- `No bootable option or device was found`
- **IDE Optical Drive: Empty**
- VDI kosong (belum ada OS)

Itu EFI mencoba HDD kosong sementara ISO **belum terpasang**. Bukan kutu BlankOn. Lapor hanya jika diulang dengan ISO sudah di Optical Drive, EFI on, tetap gagal.

### `fail to sync.png`

Isi screenshot: `sudo apt update` **sukses** (`Hit arsip-dev`, `All packages are up to date`). Yang gagal sync adalah **jam**, bukan APT. Jangan pakai nama/file ini sebagai bukti gagal update.

## Yang sudah terbukti PASS

| Area | Bukti |
|---|---|
| os-release Sinambung 26.0 | `img/test2/bio-blankon.png`, `bukti/os-release.png` |
| Live + install Calamares | checklist 6.x PASS, `bukti/blankon-running-*.png` |
| Boot ke disk, login, sudo | checklist 7.x PASS |
| `apt update` / dist-upgrade / vlc | checklist 8.x PASS + screenshot apt |
| Firefox + YouTube + audio | `img/test3-5/audio-test.mp4` (37s, mean −23.5 dB, video mutar 0:13/3:40, 2 tab) |
| Jaringan, LibreOffice, Praya hover #89 | checklist PASS |
| Screenshot tool | checklist 5.8 PASS |

APT guest mengarah ke `http://arsip-dev.blankonlinux.id/sinambung/` plus Mozilla dan NVIDIA CUDA.

## Kirim ke tim

Centang: **Lulus sesi wajib** + laporkan jam **live ISO** (bukan pasca-install). Opsional: tiket docs Praya.

Draft tiket: lihat `qa/format-laporan.md` Issue A (judul: Live ISO timezone UTC).
