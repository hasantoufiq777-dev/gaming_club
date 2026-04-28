function setupMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function setupProfileMenu() {
  const profileBtn = document.getElementById('profile-btn');
  const profileMenu = document.getElementById('profile-menu');
  if (!profileBtn || !profileMenu) return;

  profileBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = !profileMenu.hasAttribute('hidden');
    if (isOpen) {
      profileMenu.setAttribute('hidden', '');
      profileBtn.setAttribute('aria-expanded', 'false');
    } else {
      profileMenu.removeAttribute('hidden');
      profileBtn.setAttribute('aria-expanded', 'true');
    }
  });

  document.addEventListener('click', (event) => {
    if (!profileMenu.contains(event.target) && !profileBtn.contains(event.target)) {
      profileMenu.setAttribute('hidden', '');
      profileBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupReveals() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const speed = 110;

  const animate = (counter) => {
    const target = Number(counter.dataset.counter);
    let current = 0;
    const increment = Math.ceil(target / speed);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = String(target);
        clearInterval(timer);
      } else {
        counter.textContent = String(current);
      }
    }, 16);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function setupSlider() {
  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('[data-prev]');
  const nextBtn = slider.querySelector('[data-next]');
  let index = 0;

  const showSlide = (nextIndex) => {
    slides[index].classList.remove('active');
    index = (nextIndex + slides.length) % slides.length;
    slides[index].classList.add('active');
  };

  prevBtn?.addEventListener('click', () => showSlide(index - 1));
  nextBtn?.addEventListener('click', () => showSlide(index + 1));

  setInterval(() => showSlide(index + 1), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupProfileMenu();
  setupReveals();
  setupCounters();
  setupSlider();
});