const storageKey = "spfx-portfolio.project-intake.v1";
const statuses = ["Submitted", "In review", "Approved"];
const sampleRequests = [
  { title: "Employee onboarding site", owner: "People Operations", status: "Submitted" },
  { title: "Document library metadata refresh", owner: "Records Management", status: "In review" },
  { title: "Department news hub", owner: "Internal Communications", status: "Approved" },
];

const form = document.querySelector("#request-form");
const filter = document.querySelector("#filter");
const list = document.querySelector("#requests");
const statusMessage = document.querySelector("#status");
let requests = loadRequests();

function loadRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(saved) && saved.every(request =>
      request && typeof request.title === "string" &&
      typeof request.owner === "string" && statuses.includes(request.status)
    )) {
      return saved;
    }
  } catch {
    // The workflow also works when browser storage is unavailable.
  }
  return sampleRequests.map(request => ({ ...request }));
}

function saveRequests() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(requests));
    return true;
  } catch {
    return false;
  }
}

function render(message = "", focusIndex = -1) {
  list.replaceChildren();
  let count = 0;
  requests.forEach((request, index) => {
    if (filter.value && request.status !== filter.value) return;
    count += 1;

    const item = document.createElement("li");
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const owner = document.createElement("p");
    title.textContent = request.title;
    owner.textContent = request.owner;
    details.append(title, owner);

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Status for " + request.title);
    for (const status of statuses) {
      select.add(new Option(status, status));
    }
    select.value = request.status;
    select.addEventListener("change", () => {
      request.status = select.value;
      const saved = saveRequests();
      const feedback = "Status updated to " + request.status + ".";
      render(saved ? feedback : feedback + " Changes are temporary.", index);
    });
    item.append(details, select);
    list.append(item);
    if (index === focusIndex) select.focus();
  });
  if (focusIndex >= 0 && !list.contains(document.activeElement)) filter.focus();
  const result = count ? count + " of " + requests.length + " requests shown." : "No requests match this status.";
  statusMessage.textContent = [message, result].filter(Boolean).join(" ");
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const fields = new FormData(form);
  const title = fields.get("title").trim();
  const owner = fields.get("owner").trim();
  if (!title || !owner) {
    statusMessage.textContent = "Enter a project name and request owner.";
    form.elements.namedItem(title ? "owner" : "title").focus();
    return;
  }
  requests = [{ title, owner, status: statuses[0] }, ...requests];
  const saved = saveRequests();
  form.reset();
  filter.value = "";
  render(saved ? "Request added." : "Request added for this session.");
});

filter.addEventListener("change", () => render());
render();
