// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== NEWSLETTER FORM VALIDATION ==========
const newsletterForm = document.getElementById("newsletter-form");

newsletterForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector("input[type='email']").value.trim();

  if (validateEmail(email)) {
    alert("🎉 Thank you for subscribing!");
    this.reset();
  } else {
    alert("⚠️ Please enter a valid email address.");
  }
});

function validateEmail(email) {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return pattern.test(email.toLowerCase());
}

// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById("contact-form");

contactForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("⚠️ Please fill out all fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("⚠️ Invalid email format.");
    return;
  }

  // Simulate sending message
  alert("✅ Your message has been sent!");
  this.reset();
});

// ========== CAROUSEL AUTO-SCROLL ==========
const carousel = document.querySelector(".carousel");
let scrollAmount = 0;
let carouselInterval;

function startCarouselScroll() {
  if (!carousel) return;

  carouselInterval = setInterval(() => {
    carousel.scrollBy({ left: 220, behavior: "smooth" });
    scrollAmount += 220;

    // Reset to start if scrolled to end
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0;
      carousel.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, 3000);
}

function stopCarouselScroll() {
  clearInterval(carouselInterval);
}

carousel?.addEventListener("mouseover", stopCarouselScroll);
carousel?.addEventListener("mouseout", startCarouselScroll);

startCarouselScroll();

// ========== ADD TO CART BUTTON LOGIC ==========
const cartButtons = document.querySelectorAll(".btn.small");

cartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const bookTitle = button.closest(".book-card")?.querySelector("h4")?.innerText;
    alert(`📚 "${bookTitle}" added to cart!`);
  });
});

// ========== DARK MODE TOGGLE (Optional Feature) ==========
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (prefersDark) {
  document.body.classList.add("dark-mode");
}

// Optional: Add toggle switch if needed in future

// ========== DYNAMIC DATE IN FOOTER ==========
const footer = document.querySelector(".legal-container p");
if (footer) {
  const year = new Date().getFullYear();
  footer.innerHTML = `&copy; ${year} BookVerse. All rights reserved.`;
}

// ========== FOCUS OUTLINE FIX FOR ACCESSIBILITY ==========
window.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
  }
});

window.addEventListener("mousedown", function () {
  document.body.classList.remove("user-is-tabbing");
});

// ========== SMOOTH SCROLL ON NAV LINKS ==========
document.querySelectorAll(".main-nav a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ========== LOCAL STORAGE WELCOME POPUP ==========
window.addEventListener("load", () => {
  if (!localStorage.getItem("hasVisited")) {
    setTimeout(() => {
      alert("👋 Welcome to BookVerse! Enjoy exploring.");
      localStorage.setItem("hasVisited", "true");
    }, 1000);
  }
});

// ========== INTERSECTION OBSERVER FOR ANIMATION CLASSES ==========
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1
  }
);

document.querySelectorAll(".book-card, .author-card, .review-card, .faq-item").forEach(el => {
  observer.observe(el);
});

// ========== KEYBOARD SHORTCUTS (Easter Eggs 🤫) ==========
window.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    alert("🔎 Ctrl+K Pressed! (Search coming soon...)");
  }
});

// ========== STICKY HEADER ON SCROLL ==========
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header?.classList.add("sticky");
  } else {
    header?.classList.remove("sticky");
  }
});

// Sticky header CSS hint:
// .sticky { position: fixed; top: 0; width: 100%; z-index: 1000; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }

// ========== ANIMATION DELAY UTILITY ==========
document.querySelectorAll(".book-card, .author-card").forEach((card, index) => {
  card.style.transitionDelay = `${index * 100}ms`;
});

// ========== FOCUS TRAP FOR MODALS (Future Ready UX) ==========
function trapFocus(modal) {
  const focusable = modal.querySelectorAll("a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])");
  const firstEl = focusable[0];
  const lastEl = focusable[focusable.length - 1];

  modal.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });
}

// ========== FORM AUTO-EXPAND ON FOCUS ==========
const messageField = document.getElementById("message");
messageField?.addEventListener("focus", () => {
  messageField.setAttribute("rows", "8");
});

// ========== CUSTOM EVENT DISPATCH FOR CART (extensible) ==========
function dispatchCartAdd(bookName) {
  const event = new CustomEvent("bookAddedToCart", {
    detail: { book: bookName, time: Date.now() }
  });
  document.dispatchEvent(event);
}

cartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const bookTitle = button.closest(".book-card")?.querySelector("h4")?.innerText;
    if (bookTitle) {
      dispatchCartAdd(bookTitle);
    }
  });
});

// ========== EVENT LISTENER FOR EXTERNAL TRACKING ==========
document.addEventListener("bookAddedToCart", function (e) {
  console.log(`📦 Cart event: ${e.detail.book} added at ${new Date(e.detail.time).toLocaleTimeString()}`);
});

// ========== TOOLTIP ON HOVER (SUGGESTIVE) ==========
document.querySelectorAll(".btn.small").forEach(btn => {
  btn.setAttribute("title", "Click to add this book to your cart");
});

// ========== DEBOUNCE FUNCTION (UTILITY) ==========
function debounce(func, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Example Usage - Scroll Tracking
window.addEventListener(
  "scroll",
  debounce(() => {
    console.log("Scrolling...");
  }, 1000)
);

// ========== EASTER EGG 2 - Konami Code 🔼🔼🔽🔽◀️▶️◀️▶️B A ==========
const keys = [];
const secretCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

window.addEventListener("keydown", e => {
  keys.push(e.key);
  keys.splice(-secretCode.length - 1, keys.length - secretCode.length);
  if (keys.join("").toLowerCase().includes(secretCode.toLowerCase())) {
    alert("🎮 Konami Code Activated: Bonus unlocked!");
  }
});

// ========== INIT COMPLETE ==========
console.log("✅ BookVerse JS Loaded");
