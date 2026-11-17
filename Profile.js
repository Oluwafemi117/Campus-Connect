
/* =========================================
   CAMPUS CONNECT - PROFILE JAVASCRIPT
========================================= */

// 1. GET HTML ELEMENTS

const profilePicture = document.getElementById("profilePicture");
const topProfilePicture = document.getElementById("topProfilePicture");
const profilePhotoInput = document.getElementById("profilePhotoInput");

const editProfileBtn = document.getElementById("editProfileBtn");
const editSection = document.getElementById("editSection");
const profileForm = document.getElementById("profileForm");


// 2. LOAD SAVED STUDENT INFORMATION

let studentProfile = JSON.parse(
    localStorage.getItem("campusProfile")
) || {};

let savedName =
    studentProfile.name ||
    localStorage.getItem("fullName") ||
    localStorage.getItem("firstName") ||
    "Student";


// DISPLAY STUDENT DETAILS

function updateProfileDetails() {

    document.getElementById("fullName").textContent = savedName;
    document.getElementById("displayName").textContent = savedName;

    document.getElementById("displayEmail").textContent =
        studentProfile.email || "Not provided";

    document.getElementById("displayPhone").textContent =
        studentProfile.phone || "Not provided";

    document.getElementById("displayGender").textContent =
        studentProfile.gender || "Not provided";

    document.getElementById("displayMatric").textContent =
        studentProfile.matric || "Not provided";
    
    let studentLevel = studentProfile.level || localStorage.getItem("level") || "Not provided"

    document.getElementById("displayLevel").textContent = 
        studentProfile.level || localStorage.getItem("level") || "Not provided";

    document.getElementById("headerLevel").textContent =
        studentLevel + " Level Student"; 
    
}

updateProfileDetails();



// 3. LOAD INDIVIDUAL STUDENT PROFILE PICTURE

const studentId =
    localStorage.getItem("matric") ||
    localStorage.getItem("email") ||
    localStorage.getItem("fullName") ||
    "student";

const profileKey =
    "campusConnectProfilePicture_" + studentId.trim().toLowerCase();

const defaultPicture = "./images/Image3.jpg";

const savedPicture = localStorage.getItem(profileKey);

function updateProfilePicture(picture) {

    if (profilePicture) {
        profilePicture.src = picture;
    }

    if (topProfilePicture) {
        topProfilePicture.src = picture;
    }

}

updateProfilePicture(savedPicture || defaultPicture);



// 4. CHANGE PROFILE PICTURE

if (profilePhotoInput) {

    profilePhotoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Please select an image smaller than 2MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            const imageData = event.target.result;

            try {

                localStorage.setItem(
                    "campusProfilePicture",
                    imageData
                );

                updateProfilePicture(imageData);

                alert("Profile picture updated successfully!");

            } catch (error) {

                alert("Unable to save this picture. Please choose a smaller image.");

            }

        };

        reader.readAsDataURL(file);

    });

}


// 5. SHOW AND HIDE EDIT PROFILE FORM

if (editSection) {
    editSection.style.display = "none";
}

if (editProfileBtn) {

    editProfileBtn.addEventListener("click", function () {

        if (editSection.style.display === "none") {

            editSection.style.display = "block";
            editProfileBtn.textContent = "Close Form";

        } else {

            editSection.style.display = "none";
            editProfileBtn.textContent = "Edit Profile";

        }

    });

}


// 6. LOAD SAVED INFORMATION INTO FORM

const studentNameInput = document.getElementById("studentName");

if (studentNameInput) {
    studentNameInput.value = savedName;
}

document.getElementById("studentEmail").value =
    studentProfile.email || "";

document.getElementById("studentPhone").value =
    studentProfile.phone || "";

document.getElementById("studentGender").value =
    studentProfile.gender || "";

document.getElementById("studentMatric").value =
    studentProfile.matric || "";


// 7. SAVE EDITED INFORMATION

if (profileForm) {

    profileForm.addEventListener("submit", function (event) {

        event.preventDefault();

        studentProfile = {

            name: document.getElementById("studentName").value.trim(),

            email: document.getElementById("studentEmail").value.trim(),

            phone: document.getElementById("studentPhone").value.trim(),

            gender: document.getElementById("studentGender").value,

            matric: document.getElementById("studentMatric").value.trim()

        };

        if (!studentProfile.name) {
            alert("Please enter your full name.");
            return;
        }

        // SAVE FULL NAME

        savedName = studentProfile.name;

        localStorage.setItem("fullName", savedName);

        localStorage.setItem(
            "campusProfile",
            JSON.stringify(studentProfile)
        );

        // SAVE SECOND NAME FOR DASHBOARD

        const secondName = savedName.trim().split(/\s+/).pop();

        localStorage.setItem("secondName", secondName);

        // UPDATE PROFILE DETAILS

        updateProfileDetails();

        alert("Your profile has been updated successfully!");

        editSection.style.display = "none";
        editProfileBtn.textContent = "Edit Profile";

    });

}


/* MOBILE HAMBURGER MENU */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {

    navLinks.classList.toggle("show");

    if (navLinks.classList.contains("show")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }

});

