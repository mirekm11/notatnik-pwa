function showNotification(text) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification("notatnik", { body: text });
    return;
  }

  if (Notification.permission === "default") {
    Notification.requestPermission().then((p) => {
      if (p === "granted") new Notification("notatnik", { body: text });
    });
  }
}
