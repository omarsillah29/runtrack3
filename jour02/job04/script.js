document.addEventListener("keydown", function(event) {
  const textarea = document.getElementById("keylogger");
  const key = event.key;

  // Vérifie si c'est une lettre a-z
  if (/^[a-z]$/i.test(key)) {
    if (document.activeElement === textarea) {
      textarea.value += key + key;
    } else {
      textarea.value += key;
    }
  }
});
