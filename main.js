// ================= NAVBAR SCROLL EFFECT =================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ================= PAGE LOAD ANIMATION =================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ================= FUTURE HOOKS (INTERVIEW SYSTEM) =================

// Placeholder: Start Interview
function startInterview(domain) {
  console.log("Interview started for:", domain);
}

// Placeholder: End Interview
function endInterview(reason) {
  console.log("Interview ended due to:", reason);
}

// Placeholder: Warning System
let warningCount = 0;

function addWarning(type) {
  warningCount++;
  alert(`⚠️ Warning ${warningCount}: ${type}`);

  if (warningCount >= 3) {
    endInterview("Multiple violations");
    alert("❌ Interview terminated due to violations.");
  }
}

// ================= PARTICLES BACKGROUND (SAFE) =================
const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.1;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = "rgba(100, 150, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
      particlesArray.push(new Particle());
    }
  }

  function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  initParticles();
  animateParticles();
}

// ================= HELPERS / TOAST =================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.className = "toast";
  }, 2500);
}

// ================= DASHBOARD: RESUME SCAN SIMULATION =================
const scanBtn = document.getElementById("scanResumeBtn");
if (scanBtn) {
  scanBtn.addEventListener("click", () => {
    const fileInput = document.getElementById("resumeUpload");
    if (!fileInput || !fileInput.files.length) {
      showToast("❌ Please upload a resume first!", "error");
      return;
    }

    showToast("🔍 Analyzing your resume... please wait", "success");
    scanBtn.disabled = true;
    scanBtn.innerText = "Analyzing...";

    // Simulated scanning delay
    setTimeout(() => {
      showToast("✨ Profile scan complete! Found 2 domain matches.", "success");
      scanBtn.disabled = false;
      scanBtn.innerText = "Scan Resume";

      // Show the recommended section
      const recommendedSection = document.getElementById("recommendedSection");
      const recommendedGrid = document.getElementById("recommendedGrid");

      if (recommendedSection && recommendedGrid) {
        // Clear previous recommendations
        recommendedGrid.innerHTML = "";

        // Add 2 recommended domains (simulation)
        const matches = [
          { name: "AI & ML", icon: "fa-brain" },
          { name: "Data Science", icon: "fa-database" }
        ];

        matches.forEach(m => {
          const card = document.createElement("div");
          card.className = "domain-card";
          card.onclick = () => startInterview(m.name);
          card.innerHTML = `
            <div class="icon-box"><i class="fa ${m.icon}"></i></div>
            <h3>${m.name}</h3>
          `;
          recommendedGrid.appendChild(card);
        });

        recommendedSection.style.display = "block";
        recommendedSection.scrollIntoView({ behavior: "smooth", block: "center" });

        // Add a slight entry animation class if you have one
        recommendedSection.classList.add("visible");
      }
    }, 2500);
  });
}

// ================= DASHBOARD: DOMAIN SELECTION =================
let selectedDomain = null;

function startInterview(domain) {
  selectedDomain = domain;

  // Visual feedback for selection
  document.querySelectorAll(".domain-card").forEach(card => {
    card.classList.remove("selected");
    // Match the text in h3 to find the correct card
    if (card.querySelector("h3").innerText === domain) {
      card.classList.add("selected");
    }
  });

  showToast(`📍 Selected Domain: ${domain}. Ready to start?`, "success");

  // Reveal the confirmation button
  const startBtnContainer = document.getElementById("startInterviewContainer");
  if (startBtnContainer) {
    startBtnContainer.style.display = "flex";
    // Scroll to the button for better UX
    startBtnContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// Handle final start click
const finalStartBtn = document.getElementById("finalStartBtn");
if (finalStartBtn) {
  finalStartBtn.addEventListener("click", () => {
    if (!selectedDomain) {
      showToast("❌ Please select a domain first!", "error");
      return;
    }

    showToast("🚀 Launching interview session...", "success");

    setTimeout(() => {
      window.location.href = `interview.html?domain=${encodeURIComponent(selectedDomain)}`;
    }, 1200);
  });
}

// ================= PASSWORD SHOW / HIDE =================
document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = document.getElementById(icon.dataset.target);
    if (!input) return;

    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});
