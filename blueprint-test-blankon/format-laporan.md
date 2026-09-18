# Cara lapor QA BlankOn

Ada **dua barang**, jangan dicampur:

| Barang | Isi | Ke mana |
|---|---|---|
| Ringkasan sesi | ISO ini lulus/gagal, berapa kutu | Telegram dulu |
| Tiket kutu | **satu** masalah, bisa diulang orang lain | GitHub, satu issue per kutu |

Checklist di `checklist-tes-iso-vm.md` itu catatan kerja kamu. Jangan tempel utuh ke GitHub.

Saluran resmi sekarang:

1. Telegram: https://t.me/BlankOnLinux/51909
2. GitHub kutu distro/wiki: https://github.com/BlankOn/revival/issues/new
3. Cek dulu issue lama: https://github.com/BlankOn/revival/issues

Repo `sinambung` di `BUG_REPORT_URL` belum dipakai publik. Pakai **revival**.

---

## 1. Ringkasan sesi (Telegram)

Kirim setelah sesi wajib (bagian 2, 6, 7, 8.1) selesai. Contoh:

```
QA jahitan 17 Sep 2026
ISO: blankon-live-image-amd64.hybrid.iso (zsync)
VM: VirtualBox 7.2, EFI, 4 GB, blankon-qa-1

Sesi wajib: LULUS
- live OK, Calamares erase-disk OK, boot ke disk OK
- apt update + dist-upgrade OK
- Firefox/YouTube/audio OK

Kutu:
1. Live ISO: jam/zona UTC (~8 jam mundur di WITA), harus sync manual
   Setelah install: jam sudah sesuai zona (bukan kutu Calamares)
2. Wiki Praya: gnome-extensions praya@blankonlinux.id tidak ada

Bukan kutu:
- first boot gagal karena optical drive kosong (VBox)

Mau saya buka issue di revival untuk (1)?
```

Kalau ragu suatu temuan itu kutu, tanya di sini dulu. Jangan langsung buka issue.

---

## 2. Tiket kutu (GitHub)

Aturan:

- Satu issue = satu masalah
- Judul singkat, unik, menyatakan yang rusak
- Orang lain harus bisa mengulang tanpa chat
- Screenshot + perintah, bukan “jamnya aneh”
- Cari issue lama dulu (#110 GRUB, #89 kalender Praya, …)

### Kerangka

```markdown
## Ringkasan
Satu kalimat: apa yang rusak.

## Lingkungan
- ISO: blankon-live-image-amd64.hybrid.iso
- Sumber: zsync http://jahitan.blankonlinux.id/harian/current/…
- Tanggal ISO / Last-Modified:
- Tes: VirtualBox x.x, EFI ya/tidak, RAM, CPU, disk
- Mode: Live / hasil install
- `cat /etc/os-release` (tempel)
- `uname -a`

## Langkah repro
1.
2.
3.

## Diharapkan
…

## Terjadi
…

## Bukti
- screenshot (seret ke GitHub)
- output perintah (blok kode)
- log kalau ada (calamares.log, journalctl)

## Severity
Blocker / Major / Minor

Blocker = tidak boot / tidak install / tidak login
Major  = app inti rusak, update rusak, jam/zona salah total
Minor  = terjemahan, wiki usang, UI
```

---

## 3. Siap tempel — dari sesi 18 Sep 2026

### Issue A — jam/zona di **live ISO** (bukan pasca-install)

Judul: `Live ISO: timezone default UTC, jam ~8 jam mundur di WITA`

```markdown
## Ringkasan
Sesi live jahitan Sinambung memakai timezone UTC. Jam di desktop ~8 jam mundur dibanding WITA, harus disetel manual. Ini diamati di live, **bukan** setelah instalasi.

## Lingkungan
- ISO: `blankon-live-image-amd64.hybrid.iso` (zsync jahitan ~17 Sep 2026)
- VM: VirtualBox 7.2, EFI — `blankon-qa-1`
- Mode: **Live** (bukan sistem terpasang)
- Bukti live: `apt` memakai `file:/run/live/medium`
- Guest: BlankOn Linux 26.0 Sinambung
- User live: `blankon`

## Langkah repro
1. Boot ISO (EFI), pilih Live / Try, sampai desktop.
2. Jangan install dulu.
3. Lihat jam di top-bar, bandingkan dengan jam host (WITA).
4. (opsional) `timedatectl`

## Diharapkan
Live session default `Asia/Jakarta` (distro Indonesia), jam guest ≈ jam host WITA.

## Terjadi
Jam guest 01:17 / 01:24 / 01:53 saat host 09:08 / 09:24 / 09:53 WITA (selisih 8 jam = UTC).
Harus sync manual.

Setelah install (Calamares, lokasi Jakarta): jam **sudah sync sesuai zona**. Kutu ini hanya di live.

## Bukti
- screenshot top-bar live vs jam host
- `img/test2/bio-blankon.png`, `img/test3-5/fail to sync.png` (`file:/run/live/medium`)
- output `timedatectl` di sesi live

## Severity
Minor. Setelah install jam sudah benar; hanya default sesi coba yang UTC.
```

Sebelum submit, di **sesi live** (bukan setelah install) jalankan `timedatectl` dan tempel outputnya.

### Issue B — wiki Praya (opsional, docs)

Judul: `Wiki Praya: gnome-extensions praya@blankonlinux.id tidak ada di Sinambung 26.0`

```markdown
## Ringkasan
Panduan menonaktifkan Praya memakai UUID `praya@blankonlinux.id`, tetapi ekstensi itu tidak terpasang di jahitan Sinambung 26.0. Menu Praya sendiri tetap jalan.

## Lingkungan
- ISO jahitan ~17 Sep 2026, BlankOn Linux 26.0 Sinambung
- VM VirtualBox EFI, hasil install

## Langkah repro
1. Desktop Praya tampil (menu BlankOn, Firefox/Berkas/Terminal).
2. Jalankan:

```
gnome-extensions list
gnome-extensions info praya@blankonlinux.id
gnome-extensions disable praya@blankonlinux.id
```

## Diharapkan
Perintah di https://github.com/BlankOn/revival/blob/main/UserGuides/Praya.md mematikan Praya.

## Terjadi
Ekstensi `praya@blankonlinux.id` tidak ada. `disable` tidak berlaku.
Praya tetap berfungsi sebagai desktop.

## Severity
Minor (dokumentasi)

## Bukti
Tempel output `gnome-extensions list`.
```

---

## 4. Yang tidak di-issue-kan

| Temuan | Alasan |
|---|---|
| First boot “failed to boot” | Optical drive kosong; EFI mencari OS di HDD kosong. Bukan ISO. |
| `fail to sync.png` sebagai gagal apt | Isinya `apt update` sukses. Yang gagal adalah jam. |
| Firmware Date 2006 di `hostnamectl` | Quirk firmware EFI VirtualBox, bukan BlankOn. |

---

## 5. Alur singkat

```
Isi checklist
    → ringkas 5–10 baris ke Telegram
    → kalau tim bilang “buka issue”
        → satu kutu = satu issue di BlankOn/revival
        → lampirkan screenshot + output perintah
    → balas di Telegram dengan tautan issue
```

Jangan buka issue “laporan QA lengkap 18 Sep”. Itu tidak ditindaklanjuti. Yang ditindaklanjuti: “timezone UTC setelah Jakarta”.
