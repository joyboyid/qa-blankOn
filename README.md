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
