const Storage = (() => {
  const KEY = "notes";

  function load() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  }

  function save(notes) {
    localStorage.setItem(KEY, JSON.stringify(notes));
  }

  function add(note) {
    const notes = load();
    notes.push(note);
    save(notes);
  }

  function remove(id) {
    save(load().filter((n) => n.id !== id));
  }

  function get(id) {
    return load().find((n) => n.id === id);
  }

  return { load, add, remove, get };
})();
