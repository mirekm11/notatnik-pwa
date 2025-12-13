const ListView = {
  render() {
    const list = document.getElementById("notesList");
    list.innerHTML = "";

    const notes = Storage.load();
    if (!notes.length) {
      list.innerHTML = "<li>Brak notatek.</li>";
      return;
    }

    notes.forEach((note) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${note.title}</strong>
        <button>Otwórz</button>
      `;
      li.querySelector("button").onclick = () => Router.go("detail", note.id);
      list.appendChild(li);
    });
  },
};
