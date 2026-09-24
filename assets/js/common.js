export const ISSUE_BASE = "https://github.com/BlankOn/revival/issues/";
export const validStatuses = ["passed", "failed", "untested", "blocked"];
export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
export function safeTests(value) {
  if (!Array.isArray(value)) throw new Error("Test data must be an array");
  return value.filter(
    (t) =>
      t &&
      typeof t === "object" &&
      typeof t.id === "string" &&
      typeof t.feature === "string" &&
      typeof t.category === "string" &&
      typeof t.version === "string" &&
      typeof t.architecture === "string" &&
      (t.tester === null || typeof t.tester === "string") &&
      (t.notes === undefined || typeof t.notes === "string") &&
      validStatuses.includes(t.status) &&
      (t.github_issue === undefined || Number.isInteger(t.github_issue)),
  );
}
export function safeIssues(value) {
  if (!Array.isArray(value)) throw new Error("Issue data must be an array");
  return value.filter(
    (i) =>
      i &&
      Number.isInteger(i.number) &&
      typeof i.title === "string" &&
      ["open", "closed"].includes(i.state) &&
      (i.labels === undefined || Array.isArray(i.labels)),
  );
}
export async function loadJSON(path, validator) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return validator(await response.json());
}
export function formatDate(value) {
  if (!value) return "Unknown date";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown date"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}
export function setupTheme() {
  const saved = localStorage.getItem("blankon-theme");
  if (saved) document.documentElement.dataset.theme = saved;
  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("blankon-theme", theme);
  });
}
setupTheme();
