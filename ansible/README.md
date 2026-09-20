# Automasi tes BlankOn dengan Ansible

Pengujian otomatis sistem BlankOn Linux: jalankan sekali, dapatkan PASS/FAIL
per kasus + JSON + laporan Markdown. Dibuat ber-role supaya mudah ditambah
area tes baru.

## Isi

```
ansible/
├── ansible.cfg                    # konfigurasi Ansible
├── inventory/
│   ├── inventory.ini              # target: localhost (guest/live) atau VM via SSH
│   └── group_vars/blankon.yml     # var: zona, versi minimum Praya, jahitan, dst.
├── playbooks/
│   ├── qa.yaml                    # playbook utama: jalankan semua role tes
│   └── generate-report.yaml       # render laporan MD dari JSON hasil (controller)
├── roles/
│   ├── base/                      # identitas OS, kernel, hostname, sumber paket
│   ├── timezone/                  # TZ-1..2  (zona benar, timesyncd aktif)
│   ├── praya/                     # PR-1..4  (ekstensi, versi, error journal)
│   ├── vlc/                       # VL-1..3  (vlc ada, showtime tidak, mime default)
│   ├── network/                   # NET-1..3 (interface, IP, ping keluar)
│   ├── repo/                      # APT-1..3 (arsip BlankOn, tanpa debian.org, apt update)
│   └── report/                    # skor, JSON, verdict (PASS/FAIL keseluruhan)
└── README.md
```

## Prasyarat

- Target (guest BlankOn / VM): `ansible-core` (`sudo apt install ansible-core`).
- Controller yang menjalankan `ansible-playbook`: ansible-core versi berapa pun.

## Cara pakai — di dalam target langsung (live ISO atau sistem terpasang)

Salin folder `ansible/` ke dalam sistem target, lalu:

```bash
cd ansible
sudo ansible-playbook -i inventory/inventory.ini -l localhost playbooks/qa.yaml \
  -e target_zone=Asia/Makassar -e jahitan=J20260919
```

Artinya: uji mesin itu sendiri (koneksi `local`), zona WITA, beri label jahitan.
Hilangkan `-l localhost` (atau pakai `-l vm`/`-l all`) bila menarget VM via SSH.

Hasil:
- `/tmp/qa-results-<hostname>.json` — data mentah.
- Verdict di layar: **LULUS** bila `total_fail == 0`, selain itu **GAGAL**.

Contoh output:

```
PLAY RECAP ......
ok: [localhost]

TASK [report : Verdict] ***
ok: [localhost] => changed=false
  msg: GAGAL — 1 FAIL (dari 9 kasus); JSON di /tmp/qa-results-blankon.json
```

Setiap kasus juga dicetak satu per satu: `PASS [TZ-1] ...` / `FAIL [VL-3] ...`.

## Cara pakai — kasus tertentu saja (tag)

Tiap role punya tag = namanya. Jalankan hanya area tertentu:

```bash
sudo ansible-playbook -i inventory/inventory.ini -l localhost playbooks/qa.yaml \
  --tags timezone,praya
```

Tag tersedia: `base`, `timezone`, `praya`, `vlc`, `network`, `repo`, `report`.

## Cara pakai — render laporan Markdown

Setelah tes, taruh file JSON hasil (mis. dari `/tmp/qa-results-<host>.json`)
di controller, lalu:

```bash
ansible-playbook -i inventory/inventory.ini -l localhost playbooks/generate-report.yaml \
  -e jahitan=J20260919 -e results_file=/tmp/qa-results-J20260919.json
```

Output: `/tmp/laporan-hasil-tes-J20260919.md` (tabel per area, meta sistem,
sumber paket aktif). Bisa diarahkan keluar dengan `-e out_file=result/laporan-....md`.

## Cara pakai — target VM via SSH (lintas jahitan)

1. Nyalakan VM, pastikan bisa diakses SSH (mis. NAT port-forward 10.0.2.15:22,
   atau host-only + IP 192.168.56.x), isi IP di `inventory/inventory.ini`
   pada grup `[blankon_vm]`.
2. Jalankan dari controller (folder `ansible/`):

   ```bash
   ansible-playbook -i inventory/inventory.ini -l vm playbooks/qa.yaml \
     -e target_zone=Asia/Makassar -e jahitan=J20260919
   ```

3. Tarik JSON tiap VM lalu render laporan seperti di atas.

## Menambah area tes baru

Buat role baru, mis. `roles/wifi/` dengan `tasks/main.yml` yang memakai pola:

```yaml
- name: Hasil — WIFI
  set_fact:
    results: "{{ results + [
      {'id':'WIFI-1','area':'WiFi','kasus':'Connect ke SSID',
       'ok': <ekspresi benar/salah>,
       'evidence': <string bukti>}
    ] }}"
```

Lalu daftarkan role itu di `playbooks/qa.yaml` dan set-data faktanya di role.

## Aturan penting

- Jangan cek timezone lewat `'UTC' in timedatectl` — baris "Universal time"
  selalu mengandung UTC. Baca field `Time zone:` saja (sudah dilakukan role timezone).
- Gunakan `changed_when: false` pada semua tugas pemeriksaan agar playbook
  tidak melaporkan "changed" untuk tes yang cuma membaca.
- Setiap FAIL sebaiknya dibuka tiket di <https://github.com/BlankOn/revival/issues>
  dan dikaitkan lewat `github_issue` saat sinkron `data/tests.json` dashboard.