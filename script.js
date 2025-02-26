document.querySelectorAll(".image-container").forEach((container) => {
  // Function to toggle text effect
  function toggleTextEffect(isHovered) {
    const heroTitle = document.querySelector(".hero-title");
    const titleSpans = heroTitle.querySelectorAll("span");

    if (isHovered) {
      heroTitle.style.color = "transparent";
      heroTitle.style.webkitTextStroke = "2px var(--primary-color)";
      titleSpans.forEach((span) => {
        span.style.color = "transparent";
        span.style.webkitTextStroke = "2px var(--primary-color)";
      });
    } else {
      heroTitle.style.color = "var(--primary-color)";
      heroTitle.style.webkitTextStroke = "none";
      titleSpans.forEach((span) => {
        span.style.color = "var(--primary-color)";
        span.style.webkitTextStroke = "none";
      });
    }
  }

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();

    // Get mouse position relative to container
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Super extreme movement range
    const moveX = (x - 0.5) * 1000;
    const moveY = (y - 0.5) * 1000;

    // Calculate rotation based on mouse position
    const rotateX = (y - 0.5) * 120;
    const rotateY = (x - 0.5) * 120;

    // Apply smooth transform to container instead of img
    container.style.transform = `
      translate(${moveX}px, ${moveY}px)
      scale(1.5)
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      perspective(1000px)
    `;

    // Toggle text effect on hover
    toggleTextEffect(true);
  });

  container.addEventListener("mouseleave", () => {
    // Reset position smoothly
    container.style.transform = `
      translate(0px, 0px)
      rotateX(0deg) 
      rotateY(0deg)
      scale(1)
    `;

    // Reset text effect when mouse leaves
    toggleTextEffect(false);
  });
});

// Add custom cursor
const cursor = document.createElement("div");
const cursorGlow = document.createElement("div");
cursor.classList.add("custom-cursor");
cursorGlow.classList.add("custom-cursor-glow");
document.body.appendChild(cursor);
document.body.appendChild(cursorGlow);

// Enhanced cursor interaction
const cursorElement = document.querySelector(".custom-cursor");
const cursorGlowElement = document.querySelector(".custom-cursor-glow");

document.addEventListener("mousemove", (e) => {
  const { clientX: x, clientY: y } = e;

  gsap.to(cursorElement, {
    x: x - 10,
    y: y - 10,
    duration: 0.2,
  });

  gsap.to(cursorGlowElement, {
    x: x - 20,
    y: y - 20,
    duration: 0.4,
  });
});

// Scale cursor on hover
document.querySelectorAll("a, .image-container").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to([cursorElement, cursorGlowElement], {
      scale: 1.5,
      duration: 0.3,
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to([cursorElement, cursorGlowElement], {
      scale: 1,
      duration: 0.3,
    });
  });
});

// GSAP Animations
gsap.from(".hero-title span", {
  duration: 1.5,
  y: 100,
  opacity: 0,
  stagger: 0.2,
  ease: "power4.out",
});

gsap.from(".image-container", {
  duration: 1,
  scale: 0.8,
  opacity: 0,
  stagger: 0.2,
  ease: "back.out(1.7)",
});

// Smooth parallax effect
gsap.to(".image-container", {
  y: "30px",
  duration: 2,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
});

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
