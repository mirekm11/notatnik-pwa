const Storage = {
  KEY: "notes",

  load() {
    return JSON.parse(localStorage.getItem(this.KEY) || "[]");
  },

  save(notes) {
    localStorage.setItem(this.KEY, JSON.stringify(notes));
  },

  add(note) {
    const notes = this.load();
    notes.push(note);
    this.save(notes);
  },

  update(note) {
    const notes = this.load().map((n) => (n.id === note.id ? note : n));
    this.save(notes);
  },

  remove(id) {
    const notes = this.load().filter((n) => n.id !== id);
    this.save(notes);
  },

  get(id) {
    return this.load().find((n) => n.id === id) || null;
  },
};
