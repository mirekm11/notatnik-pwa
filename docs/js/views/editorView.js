const EditorView = {
  currentId: null,

  open(id = null) {
    this.currentId = id;

    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    const colorInput = document.getElementById("colorInput");
    const pinInput = document.getElementById("pinInput");

    // domyślne wartości
    titleInput.value = "";
    contentInput.value = "";
    colorInput.value = "";
    pinInput.checked = false;

    if (!id) return;

    const note = Storage.get(id);
    if (!note) {
      Router.go("list");
      return;
    }

    titleInput.value = note.title || "";
    contentInput.value = note.content || "";
    colorInput.value = note.color || "";
    pinInput.checked = !!note.pinned;
  },

  save() {
    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    const colorInput = document.getElementById("colorInput");
    const pinInput = document.getElementById("pinInput");

    const title = (titleInput.value || "").trim();
    const content = (contentInput.value || "").trim();

    // walidacja
    if (!title && !content) {
      alert("notatka nie może być pusta");
      return;
    }

    const wordCount = content.split(/\s+/).filter(Boolean).length;
    if (wordCount > 150) {
      alert("maksymalnie 150 słów");
      return;
    }

    const note = {
      id: this.currentId || Date.now().toString(),
      title,
      content,
      color: colorInput.value || "",
      pinned: !!pinInput.checked,
      createdAt: new Date().toISOString(),
    };

    if (this.currentId) {
      Storage.update(note);
    } else {
      Storage.add(note);
    }
    showNotification("Zapisano notatkę ✅");

    Router.go("list");
  },
};
