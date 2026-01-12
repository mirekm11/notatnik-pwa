const Router = {
  go(view, id = null) {
    location.hash = id ? `#/${view}/${id}` : `#/${view}`;
  },

  parse() {
    const parts = location.hash.replace("#/", "").split("/");
    return {
      view: parts[0] || "list",
      id: parts[1] || null,
    };
  },
};
