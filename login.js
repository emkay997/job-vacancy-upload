import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Login Form Submission
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Authenticate with Firebase
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful Login
            const user = userCredential.user;
            alert(`Welcome, ${user.email}!`);
            window.location.href = "jobupload.html"; // Redirect to vacancy upload page
        })
        .catch((error) => {
            // Handle Errors
            const errorMessage = error.message;
            document.getElementById("error-message").innerText = errorMessage;
        });
});
