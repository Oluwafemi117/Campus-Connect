
/* =================================
   1. LOGIN PROTECTION
================================= */

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "Login.html";
}


// GET STUDENT'S FULL NAME

const studentProfile = JSON.parse(
    localStorage.getItem("campusProfile")
) || {};

const fullName =
    localStorage.getItem("fullName") ||
    studentProfile.name ||
    "Student";

// Get the last name
const secondName = fullName.trim().split(/\s+/).pop();


// DISPLAY WELCOME MESSAGE

const welcomeName = document.getElementById("welcomeName");

if (welcomeName) {
    welcomeName.textContent = "Welcome back, " + secondName + "!";
}


/* =================================
   2. PROFILE PICTURE FUNCTIONALITY
================================= */

const profilePicture = document.getElementById("profilePicture");
const profilePhotoInput = document.getElementById("profilePhotoInput");

// Identify each student uniquely
const studentId =
    localStorage.getItem("matric") ||
    localStorage.getItem("email") ||
    fullName;

// Create an individual storage key
const profileKey =
    "campusConnectProfilePicture_" + studentId.trim().toLowerCase();

// Default picture for every student
const defaultPicture = "./images/Image3.jpg";

// Load this student's saved picture
const savedPicture = localStorage.getItem(profileKey);

if (profilePicture) {
    profilePicture.src = savedPicture || defaultPicture;
}

// UPLOAD PROFILE PICTURE

if (profilePhotoInput) {

    profilePhotoInput.addEventListener("change", function () {

        const file = profilePhotoInput.files[0];

        if (!file) {
            return;
        }

        // Check if selected file is an image
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            profilePhotoInput.value = "";
            return;
        }

        // Limit image size to 1MB
        if (file.size > 1024 * 1024) {
            alert("Please select an image smaller than 1MB.");
            profilePhotoInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            const imageData = event.target.result;

            try {

                // Save picture in localStorage
                localStorage.setItem(profileKey, imageData);

                // Display uploaded picture
                if (profilePicture) {
                    profilePicture.src = imageData;
                }

                alert("Profile picture updated successfully!");

            } catch (error) {

                alert("Unable to save picture. Please try another image.");

            }

        };

        reader.readAsDataURL(file);

    });

}


/* =================================
   3. DARK MODE TOGGLE
================================= */

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀";
        } else {
            themeToggle.textContent = "☾";
        }

    });

}


/* =================================
   4. NOTIFICATION BUTTON
================================= */

const notificationBtn = document.querySelector(".notification-btn");

if (notificationBtn) {

    notificationBtn.addEventListener("click", function () {

        alert("You have no new notifications!");

    });

}


/* =================================
   5. SEARCH FUNCTIONALITY
================================= */

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

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

}


/* =================================
   6. LOGOUT FUNCTIONALITY
================================= */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("isLoggedIn");

        window.location.href = "Login.html";

    });

}
