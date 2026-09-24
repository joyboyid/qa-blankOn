import { el, loadJSON, safeTests, safeIssues } from "./common.js";
const $ = (id) => document.getElementById(id);
const set = (id, value) => ($(id).textContent = value);
function render(tests, issues) {
  const counts = tests.reduce((a, t) => (a[t.status]++, a), {
    passed: 0,
    failed: 0,
    untested: 0,
    blocked: 0,
  });
  const total = tests.length,
    tested = counts.passed + counts.failed,
    progress = total ? Math.round((tested / total) * 100) : 0;
  set("progress-percent", progress + "%");
  set("progress-label", `${tested} dari ${total} checklist selesai`);
  set("total-count", total);
  set("passed-count", counts.passed);
  set("failed-count", counts.failed);
  set("untested-count", counts.untested);
  set("stat-passed", counts.passed);
  set("stat-failed", counts.failed);
  set("stat-untested", counts.untested);
  set("issue-count", issues.length);
  $("progress-bar").style.width = progress + "%";
  $("progress-bar").parentElement.setAttribute("aria-valuenow", progress);
}
function markdownCell(value) {
  return value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[`*_]/g, "")
    .trim();
}
function renderSessions(markdown) {
  const root = $("session-list"),
    section = markdown.split("## Daftar sesi tes")[1] || "",
    table = section.split("\n## ")[0],
    rows = table.split("\n").filter((line) => /^\|\s*\d+\s*\|/.test(line));
  root.replaceChildren();
  if (!rows.length) {
    root.append(el("p", "empty", "No session history found in README.md."));
    return;
  }
  rows.forEach((line) => {
    const cells = line.split("|").slice(1, -1).map(markdownCell);
    const card = el("article", "session-card");
    const top = el("div", "session-card-top");
    top.append(
      el("span", "mono", `Session ${cells[0]}`),
      el("span", "session-result", cells[5] || ""),
    );
    card.append(top, el("h3", null, cells[1] || "QA session"));
    card.append(
      el("p", "session-iso", cells[3] || ""),
      el("p", "session-summary", cells[4] || ""),
    );
    const report = el("a", "text-link", "Open session report →");
    const match = line.match(/\]\((\.\/[^)]+)\)/);
    report.href = match ? match[1] : "README.md";
    card.append(report);
    root.append(card);
  });
}
fetch("README.md", { cache: "no-cache" })
  .then((response) => {
    if (!response.ok) throw new Error("README unavailable");
    return response.text();
  })
  .then(renderSessions)
  .catch((error) => {
    $("session-list").replaceChildren(
      el("p", "error-state", "Session history is currently unavailable."),
    );
    console.error(error);
  });
Promise.allSettled([
  loadJSON("data/tests.json", safeTests),
  loadJSON("data/issues.json", safeIssues),
]).then(([testResult, issueResult]) => {
  if (testResult.status === "rejected") {
    console.error(testResult.reason);
    $("progress-label").textContent = "Data checklist tidak tersedia.";
    return;
  }
  if (issueResult.status === "rejected") {
    console.error(issueResult.reason);
    set("issue-count", "—");
  }
  render(
    testResult.value,
    issueResult.status === "fulfilled" ? issueResult.value : [],
  );
});
