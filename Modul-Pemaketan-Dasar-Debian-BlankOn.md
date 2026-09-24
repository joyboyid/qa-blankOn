# Modul: Pemaketan Dasar Debian

**Sumber:** [Lokakarya BlankOn — Pemaketan Dasar Debian](https://www.youtube.com/watch?v=mql_EbLV6f4) (kanal BlankOn, 1 jam 1 menit, tayang 19 Januari 2026).
**Kelas:** Minggu, 18 Januari 2026, pukul 20.00 WIB.
**Pemateri:** Hanhan Husna (konsep, berkas `debian/`, penomoran versi) dan Herpiko Dwi Aguno / Piko (praktik tiga jenis paket, irgsh, tanya jawab).
**Repo latihan:** [github.com/BlankOn/lokakarya-pemaketan-dasar-debian](https://github.com/BlankOn/lokakarya-pemaketan-dasar-debian)
**Sasaran:** membangun paket `.deb` di mesin sendiri, dari kode sumber, sampai siap dipasang dengan `dpkg` atau `apt`.

Modul ini mengikuti urutan lokakarya. Istilah yang di rekaman terdengar pecah (misalnya “debut”, “quil”, “blangkon”, “verdi”) dikembalikan ke istilah yang dipakai di slide dan di repositori BlankOn. Bagian yang pemateri sendiri bilang belum dicoba ditandai begitu, supaya tidak terbaca sebagai prosedur yang sudah mereka verifikasi di kelas.

---

## 1. Setelah modul ini

Kamu bisa:

1. Menjelaskan pemaketan sebagai pekerjaan mengubah kode sumber menjadi satu berkas yang pengguna pasang tanpa mengompilasi sendiri.
2. Menyiapkan identitas pemaket: `DEBFULLNAME`, `DEBEMAIL`, Git, dan kunci GPG.
3. Membedakan tiga bentuk paket yang dipakai BlankOn: natif, non-natif dari awal, dan non-natif yang `debian/`-nya hidup di repositori terpisah.
4. Menghasilkan templat `debian/` dengan `debmake`, menambal hulu dengan `quilt`, mencatat perubahan dengan `dch`, lalu membangun dengan `debuild -uc -us`.
5. Membaca penomoran versi BlankOn (`blankonN`, akhiran `-0`, reset revisi) dan mengisinya di `debian/changelog`.
6. Menyebut artefak hasil bangun (`.deb`, `.dsc`, `.changes`, tarball) dan tahu berkas itu muncul di direktori **induk**, bukan di dalam pohon sumber.
7. Menempatkan pekerjaan ini di jalan kontribusi BlankOn: paket khas, paket rebranding, irgsh, dan gaya rilis titik.

## 2. Untuk siapa, dan apa yang perlu sudah ada

Cocok untuk mahasiswa, pengajar, sysadmin, dan kontributor terbuka yang baru masuk tim pemaket. Han membuka dengan posisi yang sama: dia koordinator pemaket di zaman Uluwatu, lalu lama tidak memaketkan, dan di kelas ini belajar lagi bersama peserta.

Siapkan:

- Sistem turunan Debian. Di kelas disarankan **Debian 12 (Bookworm)** sampai **Debian 13 (Trixie)**. Ubuntu juga jalan selama versinya tidak jauh dari Debian yang sedang ditarget BlankOn.
- Hak `sudo`, terminal, dan koneksi untuk `apt` serta `git clone`.
- Satu direktori kerja kosong, misalnya `~/src/pemaketan`. Semua perintah praktik dijalankan di situ, bukan di direktori rumah secara acak.
- Kalau mesin sendiri belum ada, di kelas ditawarkan mesin yang mudah dijadikan VM. Minta lewat grup BlankOn.

Perintah di modul ini membangun dan memasang paket latihan `debhello` di mesin sendiri. Paket itu hanya mencetak `Hello, world!`. Jangan menempelkan langkah yang sama ke paket orang lain sebelum kamu memang maintainer paket tersebut.

## 3. Peta video

| Waktu | Isi | Di modul |
| --- | --- | --- |
| 00:00 | Pembukaan. Lokakarya pertama setelah bertahun-tahun, di awal siklus rilis, untuk melatih kontributor baru. Materi paling awal selalu pemaketan. | §4 |
| 02:13 | Han: definisi, alasan belajar, empat langkah. | §4–§5 |
| 05:36 | Identitas surel, perkakas, Git, GPG. | §6 |
| 09:27 | `debhello`, sumber dari Git, `debmake`. | §8, §11 |
| 13:20 | `control`, `copyright`, `dch -i` dan `dch -a`. | §9, §11 |
| 16:52 | `debuild -uc -us` dan berkas keluaran. | §12 |
| 17:55 | Natif dan non-natif, format `3.0`. | §7 |
| 19:50 | Penomoran versi BlankOn, kode nama rilis **Verbeek**. | §10 |
| 23:36 | Isi `changelog`, `control`, `copyright`, `rules`, `patches`. | §9 |
| 28:10 | Piko mengoreksi urutan quilt dan Git, lalu praktik. | §7, §11 |
| 29:46 | Praktik 1: paket natif Bromo, `debuild -uc -us`. | §11.1 |
| 31:04 | Praktik 2: `debhello`, `quilt`, `/usr/local` menjadi `/usr`. | §11.2 |
| 37:32 | Praktik 3: `debian/` dari repositori terpisah, disambungkan ke pohon hulu. | §11.3 |
| 41:19 | Disiplin versi, bacaan Aftian, Anto, Mahyudin, irgsh, Debian Maintainer. | §13–§14 |
| 44:38 | Tanya jawab sampai penutup. | §15 |
| 59:26 | Lokakarya berikut: irgsh, atau membangun repositori Debian dari nol. Kelas tetap dibuka untuk umum. | §16 |

## 4. Apa yang sebenarnya dikerjakan pemaket

Pengguna akhir tidak mengompilasi. Dia memasang berkas `.deb` dengan `dpkg`, atau, setelah paket masuk lumbung, dengan `apt`. Pemaketan adalah pekerjaan yang mengubah sebuah proyek (kode sumber, apa pun bahasanya) menjadi berkas itu.

Empat langkah yang Han gambar di papan:

1. **Ambil proyek.** Tarball (`.tar.gz` dan semacamnya) atau klon Git / GitLab.
2. **Ekstrak** kalau bentuknya arsip.
3. **Tambahkan direktori `debian/`** dengan `debmake`, lalu sesuaikan: tambalan, konfigurasi, metadata.
4. **Bangun** menjadi `.deb` dengan `debuild`.

Alasan seseorang memaketkan, dari pembukaan Han:

- Perangkat lunak itu belum ada di Debian karena masih sangat baru, dan belum ada yang memasukkannya ke lumbung.
- Hulu sudah merilis versi baru, Debian belum membawanya, dan kamu perlu versi itu sekarang.
- Ada kutu di paket yang sudah ada, dan perbaikannya perlu dibawa sebagai tambalan.
- BlankOn sedang mencari pemaket baru. Pekerjaan ini berat karena satu rilis berarti memaketkan banyak aplikasi, bukan satu paket contoh.

Tarball tetap dipakai walaupun sumber aslinya ada di Git. Pertukaran kode terbuka dulu dilakukan lewat arsip terkompresi, dan kebiasaan Debian mempertahankan itu. Untuk paket non-natif, tarball hulu adalah salinan bersih. Setiap tambalan punya acuan asli, jadi pembaruan hulu bisa ditarik tanpa mengacak perubahanmu.

## 5. Tiga bentuk paket di BlankOn

Piko membagi praktik menjadi tiga. Dua yang pertama adalah istilah Debian (natif dan non-natif). Yang ketiga adalah cara BlankOn menyimpan spesifikasi Debian di repositori sendiri.

### 5.1 Paket natif

Kode sumber dan direktori `debian/` hidup di repositori yang sama, dan BlankOn yang memelihara keduanya. Format sumbernya:

```text
3.0 (native)
```

Isi itu berada di `debian/source/format`.

Contoh yang dibuka di kelas: **Bromo**. Pohonnya sudah berisi `debian/`. Setelah perkakas terpasang, membangunnya satu perintah: `debuild -uc -us`. Contoh lain yang disebut Han: `blankon-repository-setup`, versi `0.1.2` tanpa akhiran `blankon`, karena paket itu memang milik BlankOn. Naik versi berarti `0.1.3`, dan seterusnya.

Di organisasi [blankon-packages](https://github.com/blankon-packages) ada banyak paket semacam ini (`blankon-keyring`, `blankon-wallpapers`, `manokwari`, dan lain-lain).

### 5.2 Paket non-natif, disusun dari awal

Hulu tidak membawa spesifikasi Debian. Kamu yang membuat `debian/`, dan kamu **tidak** mengubah berkas hulu secara langsung. Perubahan hulu disimpan sebagai tambalan di `debian/patches`, dikelola `quilt`. Formatnya:

```text
3.0 (quilt)
```

Latihan kelas untuk bentuk ini adalah `debhello` 0.0. `debmake` membaca versi dari nama direktori: direktori `debhello-0.0` berarti versi hulu `0.0`.

### 5.3 Paket non-natif yang `debian/`-nya sudah ada di repo lain

Sumber hulu tetap utuh di tempatnya. Spesifikasi Debian disimpan terpisah, di organisasi `blankon-packages`. Saat membangun, direktori `debian/` itu disambungkan ke pohon sumber (di kelas: `ln -s`), lalu `debuild` menerapkan tambalan yang sudah ada di sana dan mengompilasi.

Han mencontohkan pemisahan ini: sumber disimpan di organisasi BlankOn, direktori `debian/` disimpan di `blankon-packages`, tambalan diurus `quilt`. Contoh angka di slide: `calamares-settings-blankon` dengan versi `11.0.4-1blankon7` (hulu `11.0.4`, revisi Debian `1`, BlankOn sudah tujuh kali mengubah changelog).

Piko mengatakan bagian ketiga ini belum dia coba ulang sebelum kelas, lalu menyimulasikannya: siapkan pohon sumber, sambungkan `debian/` dari repo terpisah, bangun. Anggap langkah itu sebagai sketsa alur, lalu cocokkan dengan satu paket nyata di `blankon-packages` sebelum kamu menirunya untuk paket sungguhan.

### 5.4 Mengapa hulu tidak diedit di tempat

Untuk paket non-natif, pohon hulu harus tetap sama dengan pemiliknya. Semua perubahan tinggal di `debian/`. Kalau kamu mengedit sumber langsung, tarikan versi baru dari hulu bentrok, dan kamu harus merunut ulang perubahan yang sudah tercampur. `quilt` menyimpan hanya selisihnya: berkas mana, baris yang hilang, baris yang masuk.

Saat `debuild` berjalan, sumber asli ditambal dulu, baru dikompilasi.

## 6. Persiapan mesin

### 6.1 Identitas yang tertulis di changelog

`dch` mengisi nama dan surel dari lingkungan. Kalau keduanya kosong, yang tertulis adalah nama login mesin dan surel `localhost`. Itu pecah saat paket ditandatangani, karena identitas changelog harus sama dengan identitas kunci GPG.

Di `~/.bashrc` (atau `~/.zshrc` kalau shell-mu zsh):

```bash
export DEBFULLNAME="Nama Lengkap"
export DEBEMAIL="nama@contoh.id"
```

Muat ulang, lalu periksa:

```bash
source ~/.bashrc
echo "$DEBFULLNAME"
echo "$DEBEMAIL"
```

Han menekankan pasangan nama ini dua kali. Contoh di kelas: changelog bertuliskan “Hanan Husna”, sementara UID GPG hanya “Hanhan”. Penandatanganan gagal. Samakan keduanya sejak awal.

### 6.2 Perkakas

Tiga paket yang Han sebut wajib, ditambah `debmake` yang dipakai latihan:

```bash
sudo apt update
sudo apt install build-essential devscripts quilt debmake
```

| Paket | Peran di kelas |
| --- | --- |
| `build-essential` | Kompilator dan `make`. Tanpa ini sumber C tidak terbangun. |
| `devscripts` | `dch`, `debuild`, `wrap-and-sort`. |
| `quilt` | Mengelola tambalan di `debian/patches`. |
| `debmake` | Menganalisis pohon sumber dan menulis templat `debian/`. |

Dependensi lain menyusul paket yang kamu bangun. Contoh Han: memaketkan `desktop-base` membutuhkan Inkscape. Kalau suatu perkakas belum ada, bangun gagal dan keluaran membangun menyebut apa yang kurang. Pasang itu, lalu ulang.

### 6.3 Git

Debian sudah pindah dari Bazaar ke Git. Siapkan identitas yang sama dengan `DEBFULLNAME` dan `DEBEMAIL`:

```bash
git config --global user.name "Nama Lengkap"
git config --global user.email "nama@contoh.id"
```

### 6.4 Kunci GPG

Diperlukan saat paket akan diunggah ke lumbung, termasuk lumbung BlankOn. Untuk latihan lokal, penandatanganan dilewati (`-uc -us`), jadi kunci boleh dibuat belakangan. Kalau kamu mau masuk tim pemaket, Han meminta kunci publik dikirim ke Piko.

```bash
sudo apt install gnupg
gpg --full-generate-key
gpg -K
gpg --armor --export KEYID > kunci-publik.asc
```

`gpg -K` menampilkan kunci rahasia yang ada di mesin. `KEYID` diganti dengan ID yang muncul di sana. Berkas `.asc` adalah kunci **publik**. Kunci rahasia tidak dikirim.

## 7. Apa yang `debmake` tulis

Masuk ke pohon sumber yang sudah diekstrak, lalu jalankan `debmake`. Perintah itu belum membangun `.deb`. Dia membuat direktori `debian/` dan templat.

Untuk sumber dari Git yang nama direktorinya tidak mengandung versi, versi harus ditulis sendiri, dan harus sama dengan versi di nama tarball:

```bash
git clone https://github.com/contoh/paket.git
cd paket
git archive --format=tar.gz --prefix=paket-0.0.1/ \
  -o ../paket_0.0.1.orig.tar.gz HEAD
debmake -u 0.0.1
```

Nama direktori memakai tanda hubung (`paket-0.0.1`). Garis bawah mengubah arti nama bagi perkakas Debian. Alternatif yang Han sebut: ganti nama direktori menjadi `paket-0.0.1`, lalu `debmake` membaca versinya dari situ dan `-u` tidak diperlukan.

`debmake` juga menyiapkan `nama_versi.orig.tar.gz` (tautan simbolis ke tarball hulu) untuk paket non-natif. Pada `debhello` keluaran analisisnya kira-kira: paket biner `debhello`, tipe `bin`, arsitektur `any`, sistem bangun `make`.

Berkas yang wajib kamu pahami:

| Berkas | Isi |
| --- | --- |
| `debian/changelog` | Riwayat perubahan. Entri terbaru di atas. Diedit lewat `dch`, bukan dengan menyalin format tanggal secara manual. |
| `debian/control` | Metadata: nama, maintainer, arsitektur, dependensi, deskripsi, dan paket biner turunan (satu sumber bisa menghasilkan beberapa paket, misalnya pustaka terpisah). |
| `debian/copyright` | Lisensi, disesuaikan dengan hulu. Templat Debian sudah ada; isinya diganti, bukan dibiarkan sebagai contoh. |
| `debian/rules` | Makefile yang dijalankan saat bangun dan saat memasang. Paket sederhana sering hanya memanggil pembantu `dh`. |
| `debian/source/format` | `3.0 (native)` atau `3.0 (quilt)`. |
| `debian/patches/series` | Urutan tambalan. `quilt` menerapkan dari atas ke bawah sesuai berkas ini. |
| `debian/watch` | Petunjuk memantau rilis hulu. Berguna nanti, belum diisi di latihan. |

Berkas `*.ex` adalah contoh (misalnya contoh `rules`). Pakai kalau memang sesuai, kalau tidak hapus saja supaya pohon tidak penuh templat.

`debian/control` yang masih berisi `Section: unknown` membuat `debuild` gagal. Section harus diisi. Untuk program kecil seperti `debhello`, `utils` masuk akal. Daftar section yang sah ada di [Debian Policy, bagian 2.4](https://www.debian.org/doc/debian-policy/ch-archive.html#s-subsections) dan bisa ditiru dari paket sejenis di `blankon-packages`.

Kalau kamu memaketkan ulang paket yang sudah punya maintainer Debian, Han memakai pola turunan:

```text
Maintainer: BlankOn Developers <alamat-milis-pengembang>
XSBC-Original-Maintainer: Nama Maintainer Hulu <email@hulu>
Uploaders: Nama Kamu <nama@contoh.id>
```

Alamat maintainer BlankOn yang hidup saat ini lihat di `debian/control` paket yang sudah ada di `blankon-packages`, lalu ikuti yang sama. Jangan mengarang alamat baru.

## 8. Changelog: cara mencatat, dan cara memperbaiki salah ketik

`dch` membuka editor bawaan (seringnya `nano`: simpan dengan Ctrl+O, keluar dengan Ctrl+X).

| Perintah | Efek | Padanan yang Han sebut |
| --- | --- | --- |
| `dch -i` | Entri baru, nomor revisi naik. | “komit baru” |
| `dch -a` | Menambah butir di entri yang sedang terbuka, versi tidak naik. | memperbaiki salah ketik pada catatan yang sama |
| `dch -e` | Membuka changelog untuk diedit. | “mengedit komit” |

Isi satu entri, dari contoh yang dijelaskan di kelas:

```text
debhello (0.0-1) verbeek; urgency=medium

  * Tambal Makefile: pasang ke /usr/bin, bukan /usr/local/bin.

 -- Nama Lengkap <nama@contoh.id>  Thu, 22 Jan 2026 20:00:00 +0700
```

Bacaan bidangnya:

- `debhello` adalah nama paket.
- `0.0` versi hulu, `-1` revisi Debian. Untuk paket BlankOn yang bukan natif, revisi itu berlanjut dengan `blankonN` (lihat §10).
- `verbeek` adalah distribusi tujuan, yaitu kode nama rilis yang sedang dikerjakan. Di rekaman terdengar “verdi” / “verbic”; repositori rilisnya [BlankOn/Verbeek](https://github.com/BlankOn/Verbeek) (BlankOn 12).
- `urgency=medium` dibiarkan seperti bawaan `dch` untuk latihan ini.
- Baris `*` adalah perubahan yang manusia bisa baca. Tulis kejadiannya (“tambal jalur pasang”), bukan “update”.
- Baris penutup harus memakai `DEBFULLNAME` dan `DEBEMAIL`.

Entri baru selalu ditambahkan di atas entri lama.

## 9. Penomoran versi BlankOn

Konvensi ini mengadopsi cara Ubuntu menandai revisi turunan, dan ditulis resmi di [Penomoran Versi](https://github.com/BlankOn/wiki/blob/master/TimPengembang/Pemaket/PenomoranVersi.md). Han membahasnya di menit 19:50. Angka `blankonN` adalah revisi derivatif: mulai dari 1, naik tiap BlankOn mengubah paket, dan direset ke 1 ketika bagian di kirinya naik.

### 9.1 Paket natif Debian yang dipaketkan ulang

Hulu Debian tidak memakai revisi `-N` (contoh yang disebut: `apt`).

| Asal | Versi di BlankOn |
| --- | --- |
| Debian `1.2` | `1.2blankon1` |
| Ubuntu `1.2ubuntu3` | `1.2ubuntu3+blankon1` |

Paket natif **milik BlankOn** tidak diberi akhiran `blankon`. `blankon-repository-setup` tetap `0.1.2`.

### 9.2 Paket umum (ada revisi Debian)

| Asal | Versi di BlankOn |
| --- | --- |
| Debian `1.2-3` | `1.2-3blankon1` pada impor pertama. Angka di slide Han untuk satu paket yang sudah lama dipelihara adalah `1.2-3blankon4`: hulu `1.2`, Debian `3`, BlankOn sudah empat kali revisi. |
| Ubuntu `1.2-3ubuntu4` | `1.2-3ubuntu4+blankon1` |

`calamares-settings-blankon` di slide: `11.0.4-1blankon7`.

Siapa memegang angka yang mana, dengan contoh `1.2-3blankon4`:

- `1.2` dipegang pemilik proyek hulu.
- `-3` dipegang Debian.
- `blankon4` dipegang pemaket BlankOn.

### 9.3 Akhiran `-0` untuk paket yang Debian-nya belum ada

Paket non-natif memisahkan tarball hulu dan spesifikasi `debian/`. Revisi Debian secara konvensi mulai dari 1 tiap versi hulu naik. BlankOn memakai `-0` lebih dulu supaya lintian terpenuhi dan supaya angka `1` tetap tersedia kalau Debian kelak membuat revisi pertamanya. Ubuntu melakukan hal yang sama (`0ubuntu1`).

Jejak dari panduan BlankOn untuk hulu `0.0.1`:

| Kejadian | Versi |
| --- | --- |
| Impor pertama, Debian belum merevisi | `0.0.1-0blankon1` |
| BlankOn memperbaiki paket lagi | `0.0.1-0blankon2` |
| Debian menerbitkan revisi `-1` | `0.0.1-1blankon1` (angka `blankon` direset) |
| BlankOn memperbaiki lagi | `0.0.1-1blankon2` |
| Hulu naik ke `0.0.2`, Debian belum merevisi | `0.0.2-0blankon1` |

`dch -i` menaikkan angka yang memang hak BlankOn. Jangan menaikkan versi hulu hanya karena kamu memperbaiki changelog.

### 9.4 Pembaruan di lumbung `updates` dan `security`

Supaya tidak bentrok dengan rilis sebelumnya, pembaruan pada satu rilis mendapat akhiran nama rilis. Contoh dari panduan, untuk rilis Tambora:

```text
nama-paket_1.0-1blankon1+tambora1
```

Untuk rilis yang sedang dikerjakan, pola yang sama memakai `verbeek`.

## 10. Tambalan dengan quilt

Urutan quilt kebalikan dari Git. Piko mengoreksi slide yang tertukar.

Git: edit berkas, `git add`, baru `git commit`.

Quilt: umumkan tambalan, pilih berkas yang akan diubah, baru edit, lalu simpan selisihnya.

```bash
export QUILT_PATCHES=debian/patches
quilt push -a          # tumpukan tambalan yang sudah ada diterapkan; pada latihan ini masih kosong
quilt new fix-install-path.patch
quilt add Makefile
# edit Makefile sekarang
quilt refresh
```

`quilt refresh` menulis `debian/patches/fix-install-path.patch`. `debian/patches/series` mencatat namanya. Tambalan kedua dibuat dengan `quilt new` lagi; urutan di `series` adalah urutan penerapan.

Isi tambalan hanya diff. Contoh hasil latihan `debhello`:

```diff
Index: debhello-0.0/Makefile
===================================================================
--- debhello-0.0.orig/Makefile
+++ debhello-0.0/Makefile
@@ -1,4 +1,4 @@
-prefix = /usr/local
+prefix = /usr

 all: src/hello
```

`export QUILT_PATCHES=...` berlaku untuk sesi shell itu. Taruh baris yang sama di `~/.bashrc` kalau kamu sering memaketkan, supaya `quilt` tidak mencari direktori `patches/` di tempat lain.

Han sempat menyebut `git-buildpackage` (`gbp`) sebagai jalur yang memanfaatkan Git dan tidak memakai `dch` dengan cara lama. Dia juga ingat ada cara mengelola tambalan lewat Git, tetapi lupa namanya dan belum mencoba keduanya. Perkakas Debian yang sesuai deskripsi itu adalah `gbp pq` (patch queue di atas Git). Modul ini tidak menjadikan `gbp` sebagai langkah latihan, karena di kelas jalur yang dijalankan adalah `debmake`, `quilt`, `dch`, dan `debuild`.

## 11. Praktikum

Repo latihan:

```bash
mkdir -p ~/src && cd ~/src
git clone https://github.com/BlankOn/lokakarya-pemaketan-dasar-debian.git
cd lokakarya-pemaketan-dasar-debian
```

Isinya: `README.md`, `debhello-0.0.tar.gz`, dan `reset.sh`. `reset.sh` menghapus pohon kerja dan artefak `debhello` supaya latihan bisa diulang:

```bash
rm -rf debhello-0.0
rm -rf debhello_*
rm -rf debhello-d*
rm -rf debhello_0.0.orig.tar.gz
```

Jalankan `reset.sh` hanya di dalam klon repo itu.

### 11.1 Praktikum A — paket natif

Di kelas, Piko membuka sumber **Bromo** yang sudah berisi `debian/`, lalu:

```bash
debuild -uc -us
```

`-uc` tidak menandatangani `.changes`. `-us` tidak menandatangani sumber. Untuk paket lokal, penandatanganan hanya memperlambat dan meminta kunci.

`.deb` tidak muncul di dalam pohon sumber. Dia muncul di direktori **induk**.

```bash
ls ..
```

Ulangi pola yang sama pada paket natif BlankOn mana pun yang sudah punya `debian/` lengkap. Kalau bangun gagal karena dependensi, pasang yang disebut di keluaran, lalu jalankan `debuild -uc -us` lagi.

### 11.2 Praktikum B — `debhello`, non-natif dari nol

Sumber latihan, persis isi tarball kelas. `src/hello.c`:

```c
#include <stdio.h>
int
main()
{
        printf("Hello, world!\n");
        return 0;
}
```

`Makefile` memasang ke `$(DESTDIR)$(prefix)/bin/hello` dengan `prefix = /usr/local`. Debian tidak menaruh berkas paket di `/usr/local`: direktori itu milik administrator mesin. Paket resmi menaruh program di `/usr/bin`, jadi prefix diubah menjadi `/usr` lewat tambalan, bukan dengan mengedit tarball hulu lalu membuang aslinya.

Satu rangkaian, dari direktori repo:

```bash
tar -xvf debhello-0.0.tar.gz
cd debhello-0.0
debmake
```

Periksa `debian/control`. Isi `Section` (misalnya `utils`), pastikan `Maintainer` memakai namamu, tulis `Description` yang bukan teks templat. Sesuaikan `debian/copyright` dengan lisensi hulu. Sumber latihan ini tidak mencantumkan lisensi di `hello.c`; untuk latihan, isi templat secukupnya supaya bangun tidak berhenti, dan catat bahwa paket sungguhan baru boleh diarsipkan setelah lisensinya pasti.

Lalu tambalan:

```bash
export QUILT_PATCHES=debian/patches
quilt push -a
quilt new fix-install-path.patch
quilt add Makefile
```

Ubah baris pertama `Makefile` dari `prefix = /usr/local` menjadi `prefix = /usr`. Simpan, kemudian:

```bash
quilt refresh
cat debian/patches/fix-install-path.patch
dch -i
```

Di editor `dch`, distribusi ditulis `verbeek` kalau paket ini memang untuk rilis itu. Untuk latihan di Debian murni, `dch` biasanya mengisi `unstable` atau nama rilis mesinmu; itu sah untuk belajar di lokal. Catatan perubahannya satu butir: jalur pasang dipindah ke `/usr`.

Bangun:

```bash
debuild -uc -us
cd ..
ls -1 debhello*
```

Yang muncul, sesuai keluaran di repo latihan:

| Berkas | Arti |
| --- | --- |
| `debhello_0.0-1_amd64.deb` | Paket biner yang dipasang. `amd64` mengikuti mesin. |
| `debhello-dbgsym_0.0-1_amd64.ddeb` | Simbol awakutu, terpisah dari paket utama. |
| `debhello_0.0.orig.tar.gz` | Tarball hulu yang bersih. |
| `debhello_0.0-1.debian.tar.xz` | Spesifikasi Debian, termasuk tambalan. |
| `debhello_0.0-1.dsc` | Deskripsi paket sumber. |
| `debhello_0.0-1_amd64.changes` | Daftar berkas yang diunggah ke lumbung. |
| `debhello_0.0-1_amd64.buildinfo` | Rekaman lingkungan bangun. |
| `debhello_0.0-1_source.changes` dan `.buildinfo` | Pasangan untuk paket sumber. |

Pasang dan jalankan:

```bash
sudo apt install ./debhello_0.0-1_amd64.deb
which hello
hello
dpkg -L debhello
```

`which hello` harus menunjuk `/usr/bin/hello`, dan program mencetak `Hello, world!`. `dpkg -L` menampilkan berkas yang paket itu miliki. `/usr/local/bin/hello` tidak boleh ada.

Copot kalau selesai:

```bash
sudo apt remove debhello
```

### 11.3 Praktikum C — bongkar ulang supaya tambalan terlihat

Bagian opsional di repo latihan. Ini menunjukkan bahwa tambalan tidak “hilang” di dalam `.deb`, melainkan diterapkan ulang dari paket sumber.

```bash
cd ~/src/lokakarya-pemaketan-dasar-debian/debhello-0.0
dpkg-buildpackage -S -uc -us
cd ..
rm -rf debhello-0.0
dpkg-source -x debhello_0.0-1.dsc
grep '^prefix' debhello-0.0/Makefile
```

`dpkg-source -x` mengekstrak tarball hulu lalu menerapkan `debian/patches`. `prefix` yang terbaca adalah `/usr`.

### 11.4 Praktikum D — `debian/` dari repositori terpisah

Sketsa yang disimulasikan Piko. Ganti `SUMBER` dan `REPO-DEBIAN` dengan pasangan sungguhan saat kamu memelihara satu paket impor.

```bash
# pohon hulu yang sudah diekstrak, tanpa debian/
cd SUMBER
ln -s /jalur/ke/REPO-DEBIAN/debian debian
debuild -uc -us
```

Saat bangun, tambalan di `debian/patches` diterapkan ke sumber itu, baru dikompilasi. Hasil `.deb` lagi-lagi berada di direktori induk.

Kalau `debian` di repo terpisah itu sendiri sebuah repositori Git, banyak pemaket menyalin atau memakai subtree alih-alih `ln -s`, supaya pohon bangun bisa dipindah. Kelas memakai `ln -s` sebagai gambaran “dua pohon, satu proses bangun”.

### 11.5 Mengulang dari bersih

```bash
cd ~/src/lokakarya-pemaketan-dasar-debian
bash reset.sh
```

Lalu ulang Praktikum B tanpa melihat catatan, sampai `/usr/bin/hello` terpasang.

## 12. Alur dalam satu gambar

```text
hulu (tarball / git)
        |
        |  debmake            (hanya jika debian/ belum ada)
        v
   debian/control, copyright, rules, changelog, source/format
        |
        |  quilt new / add / edit / refresh
        v
   debian/patches/*.patch  +  series
        |
        |  dch -i
        v
   debian/changelog  (versi naik, distribusi = verbeek)
        |
        |  debuild -uc -us
        v
   ../nama_versi-revisi_arsitektur.deb
   ../nama_versi.orig.tar.gz
   ../nama_versi-revisi.debian.tar.xz
   ../nama_versi-revisi.dsc
   ../nama_versi-revisi_arsitektur.changes
```

Paket natif melewatkan `debmake` dan biasanya juga melewatkan `quilt`, karena `debian/` sudah bagian dari sumber yang kamu pelihara.

## 13. irgsh

Setelah paket bisa dibangun di laptop, BlankOn tidak meminta setiap pemaket mengunggah `.deb` secara manual ke server. **irgsh** (dibaca “irgis”) adalah perkakas ekosistem BlankOn untuk memaketkan, mengurus lumbung, membangun ISO, dan mengelola rilis. Kode yang dipakai sekarang adalah [irgsh-go](https://github.com/BlankOn/irgsh-go).

Di dasbor yang dibuka Piko, pembangunan paket terlihat per maintainer. Saat kelas direkam ada empat maintainer yang membangun paket di situ. Alurnya: pemaket memasukkan URL sumber, worker irgsh yang membangun, lalu paket disuntikkan ke lumbung. Membangun di lokal tetap wajib bisa, karena irgsh tidak memperbaiki `debian/control` yang salah atau tambalan yang gagal terapan.

Lokakarya berikutnya yang dijanjikan di menit terakhir membahas irgsh, atau membahas cara membangun repositori Debian dari nol lalu mengelola paket di dalamnya. Kelas itu juga dibuka untuk umum.

## 14. Apa yang masuk ke rilis BlankOn

Pertanyaan peserta: bagaimana tim memilih paket. Jawaban Piko membagi dua.

**Paket khas.** Tidak ada di lumbung hulu Debian, lalu masuk ke lumbung BlankOn. Dua asal:

- Ditulis sendiri. Contoh di kelas: desktop **Manokwari**.
- Bukan ditulis BlankOn, tetapi ditarik masuk karena rilis membutuhkannya.

**Paket rebranding.** Berasal dari hulu, lalu ditambal untuk identitas BlankOn. Contoh di kelas: pemasang **Calamares**. Yang diubah antara lain logo, gambar, dan teks “Debian” menjadi “BlankOn”. Versinya mengikuti §9, dengan akhiran `blankonN`.

Saat kelas, target jangka pendek yang disebut Piko bukan menambah sebanyak mungkin paket khas. Yang dikejar lebih dulu: kontributor inti yang teknis, alur pengembangan yang jalan dari ujung ke ujung, dan minimal satu ISO yang stabil. Paket khas baru (termasuk menghidupkan lagi Manokwari) menyusul kalau pondasi itu sudah kuat dan ada yang memang mengerjakannya.

Harapan jangka panjang yang disebut di kelas: kontributor BlankOn naik menjadi **Debian Maintainer** (berhak membangun, menandatangani, dan mengunggah ke tempat tertentu, dengan mentor) lalu **Debian Developer** (anggota penuh, hak ke mesin Debian). Debian Maintainer dimentori Debian Developer.

## 15. Tanya jawab kelas

**Quilt selamanya, atau suatu saat diganti Git?**
Keduanya mengerjakan hal yang berbeda. Git mengelola versi sumber. Quilt mengelola tambalan saja. Satu paket memakai Git untuk riwayat repositori dan tetap memakai quilt untuk `debian/patches`. Berganti “dari quilt ke Git” bukan pilihan yang diajukan di kelas.

**Gagal bangun (FTBFS).**
Di rekaman disebut “FTBS”. Istilah Debian-nya **FTBFS**, *Fails To Build From Source*. Dulu sering terjadi di BlankOn. Penyebab yang disebut: dependensi kurang, atau lingkungan bangun belum siap. Keluaran `debuild` adalah petunjuk pertama. Belajar paling cepat dengan ikut memaketkan di tim, karena kutu sungguhan tidak mirip `debhello`.

**Mesin sasaran: high-end atau low-end? Desktop tetap GNOME?**
Belum diputuskan. Pertanyaan “BlankOn mau menjadi distro seperti apa”, termasuk siapa penggunanya (pekerja TI, keamanan, atau yang lain), juga belum dijawab, karena pondasi infrastruktur dan kontributor masih dibangun. Dukungan mesin lama masih mungkin: BlankOn turunan Debian, dan paket Debian tidak dibangun ulang dengan optimasi yang membuang CPU lama. Fedora disebut sebagai pembanding yang sudah tidak mendukung kelas Core 2 Duo. Setelah pondasi stabil, isi ISO diatur di [blankon-live-build](https://github.com/BlankOn/blankon-live-build): paket desktop, misalnya KDE, adalah perubahan konfigurasi di repo itu. Beberapa varian ISO sekaligus (KDE dan yang lain) termasuk kemungkinan yang disebut di kelas.

**Apakah ada komponen non-free?**
Ada. Menjelang kelas, ISO tidak bisa dipasang di mesin dengan GPU AMD dan NVIDIA karena komponen non-free Debian belum ditarik. Setelah paket non-free (termasuk firmware) diselaraskan, boot sampai desktop berhasil pada hari kelas. Rencana yang disampaikan: ISO membawa firmware non-free. Debian dan Ubuntu juga sudah lebih longgar membawa perangkat lunak non-free ke dalam ISO. Nama komponen Debian yang relevan: `non-free` dan, sejak Bookworm, `non-free-firmware`.

**Basis pembangunan paket?**
Debian 12 atau 13. Ubuntu boleh selama turunan Debian itu tidak jauh dari rilis yang sedang dikerjakan.

**Gaya rilis: titik, atau rolling?**
Titik. Rilis, lalu di-support, harapan yang diucapkan satu sampai dua tahun kalau tenaga memungkinkan, kemudian siklus baru. Rolling tidak dipilih karena menjaga paket tetap baru setiap hari butuh kontributor yang kuat dan infrastruktur yang terus menarik paket. Jumlah kontributor saat kelas tidak cukup untuk itu, dan infrastruktur rolling juga berat.

**Butuh mesin untuk mencoba?**
Ada mesin yang mudah dijadikan VM. Hubungi grup BlankOn.

**Salah ketik di changelog yang sudah dibuat?**
`dch -a` atau `dch -e`. `dch -i` membuat entri baru dan menaikkan revisi; jangan dipakai hanya untuk memperbaiki ejaan.

## 16. Tantangan yang memang bagian dari pekerjaan

Piko merangkum beban pemaket BlankOn dalam tiga kebiasaan:

1. Mampu membangun perangkat lunak apa pun, bukan hanya proyek C sederhana. Tiap sistem bangun (Make, Meson, CMake, setup Python) punya bentuk `debian/rules` yang berbeda. `debmake` menebak; hasil tebakan tetap dibaca.
2. Dependensi yang hilang dan kutu hulu. Cek apakah hulu sudah menambal. Kalau belum, tambalan BlankOn dibuat lebih dulu dengan quilt, lalu dicatat di changelog.
3. Disiplin versi. Tiap perubahan paket menaikkan angka yang menjadi hak BlankOn, teratur, tanpa meloncat dan tanpa mengulang.

Bacaan yang ditunjuk di kelas, selain dokumentasi Debian hulu: tulisan pengembang BlankOn generasi sebelumnya, disebut namanya Aftian, Anto, dan Mahyudin. Tulisan Aftian yang sejalur dengan §9 ada di [catatan penomoran versi paket](https://aftian.wordpress.com/2014/03/08/desain-pengembangan-blankon-tidak-resmi-5-penomoran-versi-paket-debian/). Rujukan normatif Debian: [Policy, bidang kontrol](https://www.debian.org/doc/debian-policy/ch-controlfields.html) dan [Debian New Maintainers' Guide](https://www.debian.org/doc/manuals/maint-guide/).

## 17. Glosarium singkat

| Di rekaman / di kelas | Istilah yang dipakai |
| --- | --- |
| pemaketan, paket `.deb` | proses dan hasil Debian package |
| hulu, upstream | proyek asal kode |
| lumbung | package repository |
| tambalan, quilt | patch di `debian/patches` |
| `debmake` | pembuat templat `debian/` |
| `dch` | editor `debian/changelog` dari `devscripts` |
| `debuild -uc -us` | bangun tanpa tanda tangan |
| natif / non-natif | `3.0 (native)` / `3.0 (quilt)` |
| revisi derivatif `blankonN` | jejak perubahan milik BlankOn |
| Verbeek | kode nama BlankOn 12, bidang distribusi di changelog |
| irgsh, “irgis” | sistem bangun dan lumbung BlankOn |
| paket khas | tidak berasal dari lumbung Debian |
| paket rebranding | hulu yang ditambal untuk identitas BlankOn |
| FTBFS | gagal bangun dari sumber |
| Manokwari | desktop shell BlankOn |
| Calamares | pemasang yang di-rebrand |
| blankon-live-build | konfigurasi pembangun ISO |

## 18. Latihan

Kerjakan setelah Praktikum B lulus, yaitu `hello` terpasang di `/usr/bin`.

1. Jelaskan, dalam empat kalimat, jalan dari `hello.c` sampai berkas `.deb` ada di direktori induk. Sebutkan satu perintah untuk tiap kalimat.
2. Mengapa `prefix = /usr/local` tidak boleh dibiarkan, dan mengapa perbaikannya berbentuk tambalan, bukan edit yang langsung di-commit ke tarball hulu?
3. Isi versi BlankOn untuk tiap kejadian berikut. Hulu awal `2.4.0`, Debian belum pernah merevisi.
   - Impor pertama ke BlankOn.
   - Kamu memperbaiki salah satu tambalan.
   - Debian menerbitkan `2.4.0-1`.
   - Hulu merilis `2.4.1`, Debian belum merevisi.
4. Apa beda `dch -i` dan `dch -a`? Kapan masing-masing dipakai pada `debhello`?
5. Sebutkan tiga berkas di direktori induk setelah `debuild`, dan satu kalimat fungsi tiap berkas.
6. Sebutkan satu contoh paket khas dan satu contoh paket rebranding dari kelas, plus perbedaan penomoran versinya.
7. Ulangi Praktikum B di direktori bersih (`bash reset.sh`) tanpa membuka modul. Selesai ketika `dpkg -L debhello` memuat `/usr/bin/hello` dan tidak memuat `/usr/local`.

### Kunci singkat

1. `tar` mengekstrak hulu; `debmake` menulis `debian/`; `quilt` menyimpan perubahan `Makefile`; `dch` mencatat versi; `debuild` menghasilkan `.deb` di direktori induk. (Empat kalimat boleh menggabungkan `dch` dengan `debuild`.)
2. `/usr/local` milik administrator, bukan milik paket distribusi. Hulu harus tetap sama dengan tarball asli supaya rilis berikutnya bisa ditarik; selisihnya tinggal di `debian/patches`.
3. `2.4.0-0blankon1`, lalu `2.4.0-0blankon2`, lalu `2.4.0-1blankon1`, lalu `2.4.1-0blankon1`.
4. `-i` membuat entri baru dan menaikkan revisi, dipakai saat ada perubahan paket yang memang dicatat. `-a` menambah butir pada entri yang sama tanpa menaikkan versi, dipakai untuk salah ketik atau tambahan catatan pada revisi yang belum dirilis.
5. Contoh: `.deb` dipasang ke sistem; `.orig.tar.gz` adalah hulu bersih; `.debian.tar.xz` berisi spesifikasi Debian termasuk tambalan; `.dsc` menggambarkan paket sumber; `.changes` adalah manifes unggah. Cukup tiga.
6. Paket khas: Manokwari (atau Bromo, atau `blankon-repository-setup`). Versi natif milik BlankOn tidak berakhiran `blankon`. Paket rebranding: Calamares / `calamares-settings-blankon`, versinya membawa revisi hulu atau Debian lalu `blankonN`, contoh slide `11.0.4-1blankon7`.
7. Tidak ada kunci tulisan. Lulus kalau jalur berkasnya benar.

## 19. Sumber

- Video kelas: https://www.youtube.com/watch?v=mql_EbLV6f4
- Repo latihan dan `reset.sh`: https://github.com/BlankOn/lokakarya-pemaketan-dasar-debian
- Penomoran versi BlankOn: https://github.com/BlankOn/wiki/blob/master/TimPengembang/Pemaket/PenomoranVersi.md
- Catatan Aftian yang dirujuk panduan itu: https://aftian.wordpress.com/2014/03/08/desain-pengembangan-blankon-tidak-resmi-5-penomoran-versi-paket-debian/
- Debian Policy, bidang kontrol: https://www.debian.org/doc/debian-policy/ch-controlfields.html
- New Maintainers' Guide: https://www.debian.org/doc/manuals/maint-guide/
- irgsh: https://github.com/BlankOn/irgsh-go
- Konfigurasi ISO: https://github.com/BlankOn/blankon-live-build
- Paket BlankOn: https://github.com/blankon-packages
- Rilis Verbeek: https://github.com/BlankOn/Verbeek
