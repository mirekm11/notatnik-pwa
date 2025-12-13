function showView(name) {
  document.querySelectorAll(".view").forEach((v) => v.classList.add("hidden"));
  document.getElementById(`view-${name}`).classList.remove("hidden");
}

function handleRoute() {
  const { view, id } = Router.parse();

  if (view === "list") {
    showView("list");
    ListView.render();
  }

  if (view === "editor") {
    showView("editor");
    EditorView.open(id);
  }

  if (view === "detail") {
    showView("detail");
    DetailView.open(id);
  }
}

window.addEventListener("hashchange", handleRoute);
document.addEventListener("DOMContentLoaded", handleRoute);

// NAV
goList.onclick = () => Router.go("list");
goNew.onclick = () => Router.go("editor");

// FORM
noteForm.onsubmit = (e) => {
  e.preventDefault();
  EditorView.save();
  Router.go("list");
};

cancelEdit.onclick = () => Router.go("list");

// DETAIL
deleteBtn.onclick = () => DetailView.remove();
editBtn.onclick = () => Router.go("editor", DetailView.currentId);
readBtn.onclick = () => DetailView.read();
backBtn.onclick = () => Router.go("list");

// offline
const badge = document.getElementById("offlineBadge");
function updateOnline() {
  badge.hidden = navigator.onLine;
}
window.addEventListener("online", updateOnline);
window.addEventListener("offline", updateOnline);
updateOnline();
