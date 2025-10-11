// router.js — prosty hash router do przełączania widoków
// Widoki: #/list, #/edit, #/detail/:id

const Router = (() => {
  // Selektory widoków — każdy <section data-view> w index.html
  const viewSections = () =>
    Array.from(document.querySelectorAll("[data-view]"));

  // Mapowanie ścieżek na identyfikatory sekcji
  const routes = {
    "/list": "view-list",
    "/edit": "view-editor",
    // /detail/:id będzie obsłużony dynamicznie w resolveRoute()
  };

  // Aktywuj (pokaż) wybrany widok, resztę ukryj
  function showView(sectionId) {
    viewSections().forEach((sec) => {
      if (sec.id === sectionId) {
        sec.classList.add("active");
        sec.hidden = false;
      } else {
        sec.classList.remove("active");
        sec.hidden = true;
      }
    });
  }

  // Parsowanie hash, zwraca { path: "/detail/123", parts: ["detail","123"] }
  function getHashParts() {
    const raw = (location.hash || "").replace(/^#/, ""); // np. "/detail/123"
    const path = raw || "/list"; // domyślna trasa
    const clean = path.startsWith("/") ? path.slice(1) : path; // "detail/123"
    const parts = clean.split("/"); // ["detail","123"]
    return { path: path.startsWith("/") ? path : `/${path}`, parts };
  }

  // Ustal, który widok pokazać i wyciągnij parametry (np. id)
  function resolveRoute() {
    const { parts, path } = getHashParts();

    // /list
    if (path === "/list") {
      showView(routes["/list"]);
      // Możesz tu zawołać funkcję renderowania listy (zrobimy później)
      return { name: "list", params: {} };
    }

    // /edit (opcjonalnie /edit/:id w przyszłości)
    if (parts[0] === "edit") {
      showView(routes["/edit"]);
      const id = parts[1]; // może być undefined
      return { name: "edit", params: { id } };
    }

    // /detail/:id
    if (parts[0] === "detail" && parts[1]) {
      showView("view-detail");
      const id = parts[1];
      // Tu później wyrenderujemy szczegóły na podstawie id
      return { name: "detail", params: { id } };
    }

    // Fallback: /list
    location.hash = "#/list";
    showView(routes["/list"]);
    return { name: "list", params: {} };
  }

  // Obsługa zmiany hash
  function onHashChange() {
    resolveRoute();
  }

  // Publiczna inicjalizacja routera
  function init() {
    // Jeśli nie ma hash, ustaw domyślnie /list
    if (!location.hash) {
      location.hash = "#/list";
    }
    // Pierwsze renderowanie
    resolveRoute();
    // Reaguj na kolejne zmiany (#/edit, #/detail/xyz)
    window.addEventListener("hashchange", onHashChange);
  }

  // API, jeśli chcesz nawigować z kodu
  function navigate(path) {
    // path np. "/edit" albo `/detail/${id}`
    location.hash = `#${path.startsWith("/") ? path : `/${path}`}`;
  }

  return { init, navigate };
})();

// Udostępnij globalnie (prosto dla kolejnych modułów)
window.AppRouter = Router;
