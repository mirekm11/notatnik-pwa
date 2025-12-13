const EditorView = {
  currentId: null,

  open(id = null) {
    this.currentId = id;

    document.getElementById("titleInput").value = "";
    document.getElementById("contentInput").value = "";

    if (id) {
      const note = Storage.get(id);
      if (note) {
        document.getElementById("titleInput").value = note.title;
        document.getElementById("contentInput").value = note.content;
      }
    }
  },

  save() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title && !content) return;

    Storage.add({
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    });

    showNotification("Notatka zapisana ✔");
  },
};
