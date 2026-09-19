# BlankOn QA Dashboard

The BlankOn QA Dashboard is a small static site for recording and browsing quality assurance work for BlankOn Linux. It uses HTML, CSS, vanilla JavaScript, and JSON, and is published with GitHub Pages.

Live dashboard: <https://joyboyid.github.io/qa-blankOn/>

## About

- `data/tests.json` is maintained here by QA contributors. It contains test cases, results, environments, notes, and optional links to project issues.
- `data/issues.json` is generated from [`BlankOn/revival`](https://github.com/BlankOn/revival/issues) every six hours by GitHub Actions. Pull Requests are excluded.

`BlankOn/revival` is the source of project issues. This `joyboyid/qa-blankOn` repository maintains QA test information and the dashboard that presents both sources. Existing QA session reports and evidence remain under `result-test/`, `blueprint-test-blankon/`, `bukti/`, and `img/`.

## QA status

The dashboard calculates totals directly from `data/tests.json`: `tested = passed + failed`, and `progress = tested / total test cases × 100`. The starter records are clearly marked as sample data. Replace them with verified results before using the dashboard as a release status report.

## How testing works

Each test case represents one feature or behavior to check on a specific version and architecture. Use `passed` when the expected behavior works, `failed` when it does not, `blocked` when testing cannot continue because of a known dependency, and `untested` when no result has been recorded yet.

## Test case format

Add or edit an object in [`data/tests.json`](data/tests.json):

```json
{
  "id": "QA-WIFI-001",
  "category": "WiFi",
  "feature": "WiFi Connection",
  "status": "passed",
  "tester": "your-github-name",
  "version": "BlankOn release or ISO identifier",
  "architecture": "amd64",
  "notes": "What was tested and what happened",
  "github_issue": 123
}
```

Required values are `id`, `category`, `feature`, `status`, `version`, and `architecture`. `tester` may be `null`, `notes` may be empty, and `github_issue` is optional. Supported statuses are `passed`, `failed`, `untested`, and `blocked`.

## How to contribute

1. Fork this repository and edit the relevant records in `data/tests.json`.
2. Record the version, architecture, tester, and a useful note. Do not present an unverified result as passed.
3. For a failed test, add the matching issue number in `github_issue` when one exists in `BlankOn/revival`.
4. Open a Pull Request with a short explanation of the hardware or virtual machine and the result.

## Reporting bugs

Search [BlankOn/revival issues](https://github.com/BlankOn/revival/issues) first. Open a new issue there with reproduction steps, the BlankOn version or ISO, architecture, hardware or VM details, logs, and screenshots where useful. A QA record can link to it with `github_issue`.

## Development

There is no build step or dependency installation. Serve the repository over HTTP so browser module and JSON loading behave like GitHub Pages:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/>. All links use relative paths, so they work when the site is deployed at `/qa-blankOn/` as well as locally. The JavaScript validates the expected JSON shape and shows a readable error when data is unavailable.

## GitHub Pages deployment

`.github/workflows/deploy.yml` publishes the repository contents to GitHub Pages whenever `main` changes. Enable GitHub Actions as the Pages source in repository settings if needed. The expected URL is <https://joyboyid.github.io/qa-blankOn/>.

`.github/workflows/sync-issues.yml` can be started manually with `workflow_dispatch`. It uses the automatically provided `GITHUB_TOKEN`, reads `BlankOn/revival`, and commits `data/issues.json` only when its contents change. No personal access token or secret is stored here.

# Hasil Tes QA BlankOn

Daftar seluruh sesi pengujian ISO BlankOn yang pernah dilakukan (self-host di folder `result-test/`).

Sumber checklist: `../blueprint-test-blankon/blueprint.md`
Repo tiket kutu: https://github.com/BlankOn/revival/issues

Author: **BOIM**

---

## Daftar sesi tes

| No  | Tanggal     | Jam (WITA)  | Jahitan / ISO                                                                               | Ringkasan                                                                                           | Hasil                | Laporan                                                                                            |
| --- | ----------- | ----------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| 1   | 18 Sep 2026 | 09:08–11:18 | harian ~17 Sep 2026, `blankon-live-image-amd64.hybrid.iso`, VM `blankon-qa-1` (EFI, 4 GB)   | Sesi wajib lulus; 70 PASS, 2 FAIL (jam live UTC, matikan Praya), 5 tidak dites                      | Sesi wajib **LULUS** | [`laporan-hasil-tes.md`](./result-test/laporan-hasil-tes.md)                                       |
| 2   | 18 Sep 2026 | 18:00–20:19 | harian `20260918-3` (revisi `757336b`), VM EFI (RAM 2048+, CPU 2, disk 20 GB), host Manjaro | Sesi wajib lulus; 76 PASS, 0 FAIL; catatan terbuka 11.5 (`dist-upgrade` via arsip-dev belum tuntas) | Sesi wajib **LULUS** | [`laporan-hasil-tes-jahitan-20260918-3.md`](./result-test/laporan-hasil-tes-jahitan-20260918-3.md) |

> **Sesi terakhir (terbaru): Sesi 2** — jahitan `20260918-3` (revisi `757336b`), 100% PASS.

---

## Statistik kumulatif

|                       | Jumlah                                 |
| --------------------- | -------------------------------------- |
| Total sesi            | 2                                      |
| Total kasus dites     | 146                                    |
| PASS                  | 146                                    |
| FAIL                  | 2 (satu-satunya di sesi 1 — jam, docs) |
| NO TEST / tidak dites | 5                                      |

## Kutu yang masih terbuka

| No  | Temuan                                                                                | Severity          | Sesi |
| --- | ------------------------------------------------------------------------------------- | ----------------- | ---- |
| 1   | 11.5: `apt update` OK tapi `dist-upgrade` belum tuntas di `arsip-dev.blankonlinux.id` | perlu investigasi | 2    |

---

## Cara menambah sesi baru

1. Salin `../blueprint-test-blankon/blueprint.md` ke laporan baru per sesi (mis. `laporan-hasil-tes-jahitan-YYYYMMDD-N.md`).
2. Isi status `PASS` / `FAIL` / `NO TEST` + catatan.
3. Tambahkan satu baris di tabel **Daftar sesi tes** dan perbarui **Statistik kumulatif**.
