// script.js

// SCROLL REVEAL ANIMATIONS
const sections = document.querySelectorAll(".section");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("reveal");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const skillsSection = document.querySelector("#skills");
//   const skillRows = document.querySelectorAll(".skills-list");

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         setTimeout(() => {
//           skillRows.forEach(row => row.style.animationPlayState = "running");
//         }, 3000); // wait 3 seconds after it's visible
//       }
//     });
//   }, { threshold: 0.5 });

//   observer.observe(skillsSection);
// });

document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.querySelector("#skills");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillsSection.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsSection);
});

// --- EmailJS init with your public key ---
emailjs.init({ publicKey: "gzbOuWu9zw8iivlFi" });

// --- Contact form handling ---
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("contact-submit");
const statusEl = document.getElementById("contact-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Lock button
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    statusEl.textContent = "";

    try {
      await emailjs.sendForm("service_5d13le8", "template_br1mlso", form);
      statusEl.textContent = "✅ Message sent! I’ll get back to you soon.";
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      statusEl.textContent = "❌ Failed to send. Please try again.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}


// Highlight active navbar link on scroll
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 100; // offset for navbar height
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  sections.forEach(section => {
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").replace("#", "") === section.id) {
          link.classList.add("active");
        }
      });
    }
  });
});
// Toggle mobile navbar
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});