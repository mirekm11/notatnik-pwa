const Router = (() => {
  function go(view, param = null) {
    location.hash = param ? `#/${view}/${param}` : `#/${view}`;
  }

  function parse() {
    const hash = location.hash.replace("#/", "");
    const parts = hash.split("/");
    return {
      view: parts[0] || "list",
      id: parts[1] || null,
    };
  }

  return { go, parse };
})();
