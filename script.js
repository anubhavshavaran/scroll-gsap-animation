gsap.registerPlugin(ScrollTrigger);

// Horizontal scroll animation
gsap.to(".horizontal-scroll-container", {
  x: () => -(document.querySelector(".horizontal-scroll-container").scrollWidth - window.innerWidth) + "px",
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll-wrapper",
    start: "top top",
    end: () => "+=" + document.querySelector(".horizontal-scroll-container").scrollWidth,
    scrub: 2,
    pin: true,
    anticipatePin: 1,
  },
});

// Cursor circle movement
const cursorCircle = document.querySelector('.cursor-circle');
document.addEventListener('mousemove', (e) => {
  cursorCircle.style.left = `${e.pageX}px`;
  cursorCircle.style.top = `${e.pageY}px`;
});

// Cursor circle invert effect
const imageContainers = document.querySelectorAll('.image-container');
imageContainers.forEach((container) => {
  container.addEventListener('mouseenter', () => {
    cursorCircle.classList.add('invert');
  });
  container.addEventListener('mouseleave', () => {
    cursorCircle.classList.remove('invert');
  });
});

// GSAP animation for image-link following cursor
imageContainers.forEach((container) => {
  const link = container.querySelector('.image-link');

  container.addEventListener('mouseenter', () => {
    gsap.to(link, {
      scale: 1, // Pop up to normal size
      opacity: 1, // Match CSS hover state
      x: -100, // Ensure it starts centered
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    // Calculate cursor position relative to the center of the image-container
    const x = e.clientX - rect.left - rect.width / 2; // Center is at rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2; // Center is at rect.height / 2

    // Limit the movement range (e.g., ±20px) and scale down for subtlety
    const moveX = gsap.utils.clamp(-20, 20, x * 0.2);
    const moveY = gsap.utils.clamp(-20, 20, y * 0.2);

    gsap.to(link, {
      x: moveX, // Apply only the offset, not affecting initial centering
      y: moveY,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  container.addEventListener('mouseleave', () => {
    gsap.to(link, {
      x: -100, // Reset to exact center
      y: 0,
      scale: 0, // Shrink back down
      opacity: 0, // Hide
      duration: 0.3,
      ease: "power2.in",
    });
  });
});