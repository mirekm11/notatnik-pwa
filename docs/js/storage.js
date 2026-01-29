const Storage = {
  KEY: "notes",

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      return JSON.parse(raw || "[]");
    } catch (error) {
      console.error("błąd odczytu localStorage:", error);
      return [];
    }
  },

  save(notes) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(notes));
      return true;
    } catch (error) {
      console.error("błąd zapisu localStorage:", error);
      alert("nie udało się zapisać danych ");
      return false;
    }
  },

  add(note) {
    const notes = this.load();
    notes.push(note);
    return this.save(notes);
  },

  update(note) {
    const notes = this.load().map((n) => (n.id === note.id ? note : n));
    return this.save(notes);
  },

  remove(id) {
    const notes = this.load().filter((n) => n.id !== id);
    return this.save(notes);
  },

  get(id) {
    return this.load().find((n) => n.id === id) || null;
  },
};
