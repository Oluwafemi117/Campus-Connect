
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Get registered student details
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const firstName = localStorage.getItem("firstName");

    // Check login details
    if (email === savedEmail && password === savedPassword) {

        // Save student's login status
        localStorage.setItem("isLoggedIn", "true");

        // Open dashboard
        window.location.href = "Dashboard.html";

    } else {

        alert("Invalid email or password. Please try again.");

    }

});
