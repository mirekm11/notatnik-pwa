document.addEventListener("DOMContentLoaded", () => {
  const views = {
    list: document.getElementById("view-list"),
    editor: document.getElementById("view-editor"),
    detail: document.getElementById("view-detail"),
  };

  function hideAll() {
    Object.values(views).forEach((view) => view.classList.add("hidden"));
  }

  function handleRoute() {
    const route = Router.parse();
    hideAll();

    if (route.view === "list") {
      views.list.classList.remove("hidden");
      ListView.render();
      return;
    }

    if (route.view === "editor") {
      views.editor.classList.remove("hidden");
      EditorView.open(route.id);
      return;
    }

    if (route.view === "detail") {
      views.detail.classList.remove("hidden");
      DetailView.open(route.id);
      return;
    }

    Router.go("list");
  }

  // formularz
  const noteForm = document.getElementById("noteForm");
  const cancelEdit = document.getElementById("cancelEdit");

  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    EditorView.save();
  });

  cancelEdit.addEventListener("click", () => Router.go("list"));

  // filtry listy
  document
    .getElementById("searchInput")
    .addEventListener("input", () => ListView.render());
  document
    .getElementById("onlyPinned")
    .addEventListener("change", () => ListView.render());

  window.addEventListener("hashchange", handleRoute);

  // service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  handleRoute();
});
