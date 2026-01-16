const ListView = {
  render() {
    const notesList = document.getElementById("notesList");
    const searchInput = document.getElementById("searchInput");
    const onlyPinnedCheckbox = document.getElementById("onlyPinned");

    // czyścimy listę
    notesList.textContent = "";

    const searchText = (searchInput.value || "").toLowerCase().trim();
    const onlyPinned = !!onlyPinnedCheckbox.checked;

    let notes = Storage.load();

    // filtrowanie
    if (onlyPinned) {
      notes = notes.filter((n) => n.pinned === true);
    }

    if (searchText) {
      notes = notes.filter((n) => {
        const title = (n.title || "").toLowerCase();
        const content = (n.content || "").toLowerCase();
        return title.includes(searchText) || content.includes(searchText);
      });
    }

    // sort,przypięte na górze
    notes.sort((a, b) => (b.pinned === true) - (a.pinned === true));

    // render
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.className = "card note-card";

      // kolor paska po lewej
      li.style.borderLeftColor = note.color ? note.color : "#c7c2ff";

      const left = document.createElement("div");
      left.className = "note-left";

      const title = document.createElement("h3");
      title.className = "note-title";
      title.textContent = (note.title || "").trim() || "(bez tytułu)";

      // pinezka
      if (note.pinned) {
        const pin = document.createElement("span");
        pin.textContent = " 📌";
        title.appendChild(pin);
      }

      const text = document.createElement("p");
      text.className = "note-text";
      text.textContent = note.content || "";

      const date = document.createElement("p");
      date.className = "note-date";
      date.textContent = new Date(note.createdAt).toLocaleString();

      left.appendChild(title);
      left.appendChild(text);
      left.appendChild(date);

      const right = document.createElement("div");
      right.className = "note-right";

      const openBtn = document.createElement("button");
      openBtn.className = "btn btn-primary";
      openBtn.type = "button";
      openBtn.textContent = "otwórz";
      openBtn.addEventListener("click", () => Router.go("detail", note.id));

      right.appendChild(openBtn);

      li.appendChild(left);
      li.appendChild(right);

      notesList.appendChild(li);
    });
  },
};
