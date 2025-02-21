const API_URL = "https://jsonplaceholder.typicode.com/users";  // Mock API

// Function to get stored users from localStorage
function getStoredUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Function to save users to localStorage
function saveUser(user) {
    let users = getStoredUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

// Handle user registration
document.getElementById("registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let users = getStoredUsers();
    if (users.some(u => u.email === email)) {
        alert("Email already registered!");
        return;
    }

    const newUser = { email, password, name: email.split("@")[0] }; // Dummy name from email
    saveUser(newUser);

    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
});

// Handle user login
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let users = getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("token", "fake-jwt-token");
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
});

// Logout function
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// Ensure protected routes
if (window.location.pathname.includes("dashboard.html") && !localStorage.getItem("token")) {
    window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", function () {
    const forgotPasswordLink = document.querySelector(".forgot-password");

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", function (event) {
            event.preventDefault();
            const email = prompt("Enter your registered email to receive a reset link:");

            if (email) {
                // Simulate API call to send a reset link
                fakePasswordResetAPI(email);
            }
        });
    }
});

function fakePasswordResetAPI(email) {
    console.log("Sending password reset request for:", email);

    // Simulate API delay
    setTimeout(() => {
        alert(`A password reset link has been sent to ${email}. Please check your inbox.`);
    }, 1500);
}
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            // Clear all stored user data
            localStorage.clear(); // Clears all localStorage data
            sessionStorage.clear(); // Clears all session data

            // Redirect to the login page
            window.location.href = "login.html";
        });
    }
});