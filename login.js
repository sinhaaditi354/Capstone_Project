const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='email']");
    const password = loginForm.querySelector("input[type='password']");

    clearErrors();

    // Email validation
    if (!email.value.includes("@")) {
        showError(email, "Enter a valid email");
        return;
    }

    // Password validation
    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters");
        return;
    }

    // ✅ Success
    showToast("✅ Login successful! Redirecting...", "success");
    redirectToDashboard();
});

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

/* ================= REDIRECT ================= */

function redirectToDashboard() {
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1800);
}