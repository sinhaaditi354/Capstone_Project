// ================= SIGNUP VALIDATION =================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

        if (password.value.trim().length < 6) {
            showError(password, "Password must be at least 6 characters");
            return;
        }

        if (password.value !== confirmPassword.value) {
            showError(password, "Passwords do not match");
            showError(confirmPassword, "Passwords do not match");
            return;
        }

        alert("Account created successfully! (Backend coming soon)");
        signupForm.reset();
    });
}

/* ================= HELPERS ================= */

function showError(input, message) {
    const group = input.parentElement;
    group.classList.add("error");

    const small = document.createElement("div");
    small.className = "error-text";
    small.innerText = message;

    group.appendChild(small);
}

function clearErrors() {
    document.querySelectorAll(".input-group").forEach(group => {
        group.classList.remove("error");
        const error = group.querySelector(".error-text");
        if (error) error.remove();
    });
}