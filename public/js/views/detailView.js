const DetailView = {
  currentId: null,

  open(id) {
    this.currentId = id;
    const note = Storage.get(id);
    if (!note) return Router.go("list");

    noteDetail.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>${new Date(note.createdAt).toLocaleString()}</small>
    `;
  },

  remove() {
    Storage.remove(this.currentId);
    Router.go("list");
  },

  read() {
    const note = Storage.get(this.currentId);
    if (note) readText(`${note.title}. ${note.content}`);
  },
};
