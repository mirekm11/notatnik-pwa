const NotesStorage = (() => {
  const STORAGE_KEY = "notes";

  // Wczytaj tablicę
  function loadNotes() {
    try {
      const rawValue = localStorage.getItem(STORAGE_KEY);

      if (!rawValue) {
        return [];
      }

      const parsed = JSON.parse(rawValue);

      if (!Array.isArray(parsed)) {
        console.warn("Dane pod kluczem 'notes' nie są tablicą. Resetuję.");
        return [];
      }

      return parsed;
    } catch (error) {
      console.error("Błąd przy odczycie z localStorage:", error);
      return [];
    }
  }

  // Zapisz tablicę
  function saveNotes(notesArray) {
    try {
      const safeArray = Array.isArray(notesArray) ? notesArray : [];
      const asJson = JSON.stringify(safeArray);
      localStorage.setItem(STORAGE_KEY, asJson);
    } catch (error) {
      console.error("Błąd przy zapisie do localStorage:", error);
    }
  }

  // Utwórz nową notatkę
  function createNote(newNoteData) {
    const currentNotes = loadNotes();

    const newNote = {
      id: Date.now().toString(),
      title: newNoteData.title || "",
      content: newNoteData.content || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      location: newNoteData.location || null,
      notificationEnabled: Boolean(newNoteData.notificationEnabled || false),
    };

    currentNotes.push(newNote);
    saveNotes(currentNotes);

    return newNote;
  }

  // Zwróć wszystkie notatki
  function listNotes() {
    const notes = loadNotes();

    notes.sort((firstNote, secondNote) => {
      return new Date(secondNote.createdAt) - new Date(firstNote.createdAt);
    });

    return notes;
  }

  // Zwróć jedną notatkę po id
  function getNote(noteId) {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.id === noteId);
    return foundNote || null;
  }

  // Zaktualizuj notatkę
  function updateNote(noteId, changes) {
    const notes = loadNotes();
    const index = notes.findIndex((note) => note.id === noteId);

    if (index === -1) {
      console.warn("Nie znaleziono notatki do aktualizacji:", noteId);
      return null;
    }

    const updatedNote = {
      ...notes[index],
      ...changes,
      updatedAt: new Date().toISOString(),
    };

    notes[index] = updatedNote;
    saveNotes(notes);

    return updatedNote;
  }

  // Usuń notatkę po id
  function deleteNote(noteId) {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    saveNotes(filteredNotes);
  }

  return {
    loadNotes,
    saveNotes,
    createNote,
    listNotes,
    getNote,
    updateNote,
    deleteNote,
  };
})();

// Udostępnienie globalnie
window.NotesStorage = NotesStorage;
