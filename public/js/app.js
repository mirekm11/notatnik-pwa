// app.js — bootstrap aplikacji (bez logiki danych)
// Tu startujemy router, podpinamy globalne eventy i proste UI.

function toggleOfflineBadge() {
  const badge = document.getElementById("offlineBadge");
  if (!badge) return;
  if (navigator.onLine) {
    badge.hidden = true;
  } else {
    badge.hidden = false;
  }
}

function bindHeaderNav() {
  // Przyciski/menu z index.html (header)
  const newNoteButton = document.getElementById("newNoteButton");
  if (newNoteButton) {
    newNoteButton.addEventListener("click", () => {
      // przejdź do edytora
      window.AppRouter.navigate("/edit");
    });
  }

  // Linki w headerze (Lista / Dodaj) już mają href z #,
  // ale można je ewentualnie obsłużyć dodatkowymi eventami.
}

async function initApplication() {
  // 1) Router
  window.AppRouter.init();

  // 2) Status offline/online
  toggleOfflineBadge();
  window.addEventListener("online", toggleOfflineBadge);
  window.addEventListener("offline", toggleOfflineBadge);

  // 3) Proste akcje z headera
  bindHeaderNav();

  // 4) (Później) rejestracja Service Workera, obsługa instalacji itd.
  //   - Zrobimy to, gdy dodamy sw.js.
}

document.addEventListener("DOMContentLoaded", initApplication);
