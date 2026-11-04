if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "Login.html";
}

// Get the student's first name from localStorage
const firstName = localStorage.getItem("firstName") || "Student";

// Display the first name on the dashboard
document.getElementById("welcomeName").textContent =
    firstName + "!";

document.getElementById("topName").textContent =
    firstName;


/* =================================
   2. DARK MODE TOGGLE
================================= */

const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀";
    } else {
        themeToggle.textContent = "☾";
    }

});


/* =================================
   3. NOTIFICATION BUTTON
================================= */

const notificationBtn = document.querySelector(".notification-btn");

notificationBtn.addEventListener("click", function () {

    alert("You have no new notifications!");

});


/* =================================
   4. SEARCH FUNCTIONALITY
================================= */

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keyup", function () {

    const searchValue = searchInput.value.toLowerCase();

    const dashboardItems = document.querySelectorAll(
        ".action-card, .announcement, .event, .lost-found"
    );

    dashboardItems.forEach(function (item) {

        const itemText = item.textContent.toLowerCase();

        if (itemText.includes(searchValue)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }

    });

});

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("isLoggedIn");
});