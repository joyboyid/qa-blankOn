# Catatan Resume — QA BlankOn (Sesi 20 Sep 2026)

Resume pekerjaan sesi ini agar mudah dilanjutkan.

## 1. Sesi QA jahitan 20260919 — SELESAI

- **ISO**: harian `20260919` (snapshot `13:04`), 3 perubahan dari `blankon-live-build` + `praya-gnome-shell-extension`.
- **Hasil**: 12 PASS · 1 FAIL (jam/zona masih UTC di live — `2.1 Zona waktu tidak mengikuti region penginstall`). Sesi wajib LULUS.
- **Perubahan yang diuji**:
  - Praya `0.1.38-1` (feedback: start menu, launcher Enter, keyboard nav, tiket #108/#89) — semua PASS.
  - Timezone `systemd-timesyncd` — FAIL di live (tetap UTC), OK sesudah install.
  - VLC `3.0.23` ganti GNOME Showtime — PASS (showtime/totem tidak ada).
- **File yang diupdate**:
  - `result/laporan-test-J20260919.md` (laporan, buatan BOIM)
  - `README.md` — baris sesi 3 + statistik kumulatif (3 sesi · 159 kasus · 158 PASS · 3 FAIL) + 2 kutu baru
  - `data/tests.json` — 89 record (13 kasus baru `QA-20260919-*`)
  - `bukti/img-issue-J20260919/` — FAILissu-UTC.png, PASS-prayaGnome-shell.png, PASS-vlc.png, PASS-rec-*.mp4
- **Belum dilakukan**: commit & push ke main (dibutuhkan agar muncul di GitHub Pages via workflow deploy.yml).

## 2. Kutu terbuka (akumulasi)

| No | Temuan | Severity | Sesi |
| --- | ------ | -------- | ---- |
| 1 | `dist-upgrade` via `arsip-dev.blankonlinux.id` belum tuntas | ? | 2 |
| 2 | Live ISO: jam/zona masih UTC meski `systemd-timesyncd` sudah disertakan | Minor (live) | 3 |
| 3 | Wiki Praya: UUID `praya@blankonlinux.id` tidak ada → panduan matikan Praya belum jalan | Minor (docs) | 3 |

## 3. Automasi QA dengan Ansible — DIMULAI

- **Instalasi**: `~/venvs/ansible/` (ansible-core 2.21.4, Python 3.14). Jalankan via `~/venvs/ansible/bin/ansible-playbook`.
- **Struktur baru** (`qa/ansible/`, ber-role, siap pakai):
  - `ansible.cfg`, `inventory/` (group `blankon`: target `localhost`/`vm`) + `group_vars/blankon.yml`
  - `playbooks/qa.yaml` (semua role) + `playbooks/generate-report.yaml` (render laporan dari JSON)
  - `roles/`: `base`, `timezone` (TZ-1/2), `praya` (PR-1..4), `vlc` (VL-1..3), `network` (NET-1..3), `repo` (APT-1..3), `report`
  - `roles/report/templates/laporan-hasil-tes.j2` + `README.md`
  - file lama `inventory.ini` + `check-blankon.yaml` sudah ditinggalkan (pakai yang baru)
- **Teruji di host (Manjaro)**: playbook jalan penuh → JSON `/tmp/qa-results-<host>.json` + laporan MD `8 PASS · 7 FAIL` (FAIL wajar di non-BlankOn). Render laporan dari JSON juga jalan.
- **Cara pakai di guest BlankOn**: `sudo apt install ansible-core`, salin folder `ansible/` ke guest, lalu `sudo ansible-playbook -i inventory/inventory.ini -l localhost playbooks/qa.yaml -e target_zone=Asia/Makassar -e jahitan=J2026xxx`. Render: `playbooks/generate-report.yaml -e jahitan=J2026xxx -e results_file=...`.
- **Catatan penting**: jangan cek timezone dengan `'UTC' in timedatectl` karena baris "Universal time" selalu mengandung UTC; baca field `Time zone:` saja. Jangan pakai `is search(...)` di Jinja role (syntax error), pakai `regex_search(...) is not none`.

## 4. Next steps (saat lanjut)

1. Commit + push hasil sesi 3 (file di poin 1) supaya dashboard GH Pages update — masih belum.
2. Lanjut Ansible level berikutnya:
   - ~~Template Jinja → generate laporan~~ → selesai via `generate-report.yaml`; uji di guest BlankOn sungguhan.
   - SSH + banyak VM (aktifkan grup `blankon_vm` di `inventory/inventory.ini`), lalu `community.virtualbox` untuk orkestrasi VM.
   - Hubungkan ke `openQA` BlankOn.
3. Periksa kutu #2 (timezone live) dan #3 (wiki Praya).

## 5. Lingkungan

- Host: Manjaro Sway, Dell Latitude E7470; VirtualBox 7.2.16; VMs: `blankon-qa-2` (EFI), `blankon-prayatest` (BIOS, 4 GB).
- ISO: `/home/mandex/Projects/open-source/blankOn/iso/blankon-live-image-amd64.hybrid.iso`.