gsap.registerPlugin(ScrollTrigger);

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

const cursorCircle = document.querySelector('.cursor-circle');

document.addEventListener('mousemove', (e) => {
  cursorCircle.style.left = `${e.pageX}px`;
  cursorCircle.style.top = `${e.pageY}px`;
});

const images = document.querySelectorAll('img');
images.forEach((image) => {
  image.addEventListener('mouseenter', () => {
    cursorCircle.classList.add('invert');
  });
  image.addEventListener('mouseleave', () => {
    cursorCircle.classList.remove('invert');
  });
});