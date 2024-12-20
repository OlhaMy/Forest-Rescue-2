import { activateLink } from './headerSmoothScroll.js';

const header = document.querySelector('.header');
let lastScroll = 0;
const defaultOffset = 60;
let isScrollingProgrammatically = false;

const sections = document.querySelectorAll('section');
const observerOptions = {
  root: null,
  threshold: 0.6,
};

function sectionObserverCallback(entries, observer) {
  if (isScrollingProgrammatically) return;

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetId = entry.target.getAttribute('id');
      activateLink(targetId);
    }
  });
}

const observer = new IntersectionObserver(
  sectionObserverCallback,
  observerOptions
);

sections.forEach(section => observer.observe(section));

export function setIsAutoScrolling(value) {
  isScrollingProgrammatically = value;
}

function scrollPosition() {
  return window.scrollY || document.documentElement.scrollTop;
}

function containHide() {
  return header.classList.contains('hide');
}

window.addEventListener('scroll', () => {
  if (!isScrollingProgrammatically) {
    lastScroll = scrollPosition();
  }
});
