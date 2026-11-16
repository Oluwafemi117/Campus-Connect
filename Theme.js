
/* =================================
   CAMPUS CONNECT GLOBAL DARK MODE
================================= */

const themeToggle = document.querySelector(".theme-toggle");

// Apply saved theme when a page opens
function applyTheme() {

    const savedTheme = localStorage.getItem("campusTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    if (themeToggle) {
        themeToggle.textContent =
            savedTheme === "dark" ? "☀" : "☾";
    }
}

// Switch between dark and light mode
if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const isDark =
            document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "campusTheme",
            isDark ? "dark" : "light"
        );

        themeToggle.textContent =
            isDark ? "☀" : "☾";

    });

}

// Load saved theme
applyTheme();
