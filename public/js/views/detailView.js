const DetailView = {
  currentId: null,

  open(id) {
    this.currentId = id;

    const note = Storage.get(id);
    if (!note) {
      Router.go("list");
      return;
    }

    noteDetail.innerHTML = `
      <h3>${note.title || "(bez tytułu)"}</h3>
      <p>${note.content || ""}</p>
      <small>${new Date(note.createdAt).toLocaleString()}</small>

      <button id="readButton">Czytaj na głos</button>
      <button id="editButton">Edytuj</button>
      <button id="deleteButton">Usuń</button>
      <button id="backButton">Powrót</button>
    `;

    document.getElementById("readButton").onclick = () => this.read();
    document.getElementById("editButton").onclick = () =>
      Router.go("editor/" + this.currentId);
    document.getElementById("deleteButton").onclick = () => this.remove();
    document.getElementById("backButton").onclick = () => Router.go("list");
  },

  remove() {
    Storage.remove(this.currentId);
    Router.go("list");
  },

  read() {
    const note = Storage.get(this.currentId);
    if (!note) return;

    readText(`${note.title}. ${note.content}`);
  },
};
