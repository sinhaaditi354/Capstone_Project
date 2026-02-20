// ================= DARK MODE TOGGLE =================

const darkToggle = document.getElementById("darkToggle");

// Helper function to set icon
function setThemeIcon(isDark) {
  if (!darkToggle) return;
  const icon = darkToggle.querySelector("i");
  if (icon) {
    if (isDark) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }
}

// Check saved preference on load
window.addEventListener("DOMContentLoaded", () => {
  const darkMode = localStorage.getItem("darkMode");

  if (darkMode === "enabled") {
    document.body.classList.add("dark");
    setThemeIcon(true);
  } else {
    setThemeIcon(false);
  }
});

// Toggle dark mode
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("darkMode", "enabled");
      setThemeIcon(true);
    } else {
      localStorage.setItem("darkMode", "disabled");
      setThemeIcon(false);
    }
  });
}
