const DetailView = {
  open(id) {
    const box = document.getElementById("noteDetail");
    box.innerHTML = "";

    const note = Storage.get(id);
    if (!note) {
      Router.go("list");
      return;
    }

    const card = document.createElement("div");
    card.className = "card detail-card";
    card.style.borderLeftColor = note.color ? note.color : "#c7c2ff";

    const title = document.createElement("h3");
    title.className = "detail-title";
    title.textContent = (note.title || "").trim() || "(bez tytułu)";

    const text = document.createElement("p");
    text.className = "detail-text";
    text.textContent = note.content || "";

    const date = document.createElement("p");
    date.className = "note-date";
    date.textContent = new Date(note.createdAt).toLocaleString();

    const actions = document.createElement("div");
    actions.className = "detail-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary";
    editBtn.type = "button";
    editBtn.textContent = "edytuj";
    editBtn.addEventListener("click", () => Router.go("editor", note.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.type = "button";
    deleteBtn.textContent = "usuń";
    deleteBtn.addEventListener("click", () => {
      Storage.remove(note.id);
      Router.go("list");
    });

    const backBtn = document.createElement("button");
    backBtn.className = "btn btn-secondary";
    backBtn.type = "button";
    backBtn.textContent = "powrót";
    backBtn.addEventListener("click", () => Router.go("list"));

    // czytaj na głos
    const ttsBtn = document.createElement("button");
    ttsBtn.className = "btn btn-light";
    ttsBtn.type = "button";
    ttsBtn.textContent = "czytaj na głos";
    ttsBtn.addEventListener("click", () => {
      readText(`${note.title}. ${note.content}`);
    });

    // udostępnij
    const shareBtn = document.createElement("button");
    shareBtn.className = "btn btn-light";
    shareBtn.type = "button";
    shareBtn.textContent = "udostępnij";
    shareBtn.addEventListener("click", async () => {
      if (!navigator.share)
        return alert("udostępnianie niedostępne w tej przeglądarce");
      await navigator.share({ title: note.title, text: note.content });
    });

    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(date);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    actions.appendChild(backBtn);
    actions.appendChild(ttsBtn);
    actions.appendChild(shareBtn);

    card.appendChild(actions);
    box.appendChild(card);
  },
};
