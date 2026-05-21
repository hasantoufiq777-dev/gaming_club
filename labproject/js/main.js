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
  const caption = document.querySelector('[data-slider-caption]');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('[data-prev]');
  const nextBtn = slider.querySelector('[data-next]');
  let index = 0;

  const captions = [
    'Start your journey',
    'Level up with KUET',
    'Join the next match'
  ];

  const showSlide = (nextIndex) => {
    slides[index].classList.remove('active');
    index = (nextIndex + slides.length) % slides.length;
    slides[index].classList.add('active');

    if (caption) {
      caption.classList.remove('animating');
      caption.textContent = captions[index % captions.length];
      requestAnimationFrame(() => caption.classList.add('animating'));
    }
  };

  prevBtn?.addEventListener('click', () => showSlide(index - 1));
  nextBtn?.addEventListener('click', () => showSlide(index + 1));

  if (caption) {
    caption.textContent = captions[0];
    caption.classList.add('animating');
  }

  setInterval(() => showSlide(index + 1), 5000);
}

function setupHeroLogoAnimation() {
  const canvas = document.getElementById('hero-logo-animation');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const baseWidth = 680;
  const baseHeight = 420;
  const particles = [];
  const bgStars = [];
  const rings = [
    { r: 92, width: 1.5, speed: 0.3, dash: [8, 6], phase: 0, color: '#00cfff', alpha: 0.5 },
    { r: 112, width: 1, speed: -0.2, dash: [4, 10], phase: 1, color: '#0077ff', alpha: 0.35 },
    { r: 130, width: 2, speed: 0.15, dash: [16, 4], phase: 2, color: '#00cfff', alpha: 0.2 },
  ];

  let animationFrame = 0;
  let startTime = 0;
  let currentWidth = 0;
  let currentHeight = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, value) {
    return a + (b - a) * value;
  }

  function easeOut(value) {
    return 1 - Math.pow(1 - value, 3);
  }

  function easeInOut(value) {
    return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    currentWidth = Math.max(1, Math.round(rect.width));
    currentHeight = Math.max(1, Math.round(rect.height));

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(currentWidth * dpr);
    canvas.height = Math.round(currentHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function setupScene() {
    particles.length = 0;
    bgStars.length = 0;

    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 95 + Math.random() * 55;
      particles.push({
        angle,
        r,
        speed: (0.4 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1),
        size: 1 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.7,
        trail: [],
        color: Math.random() > 0.4 ? '#00cfff' : '#ffffff',
      });
    }

    for (let i = 0; i < 90; i++) {
      bgStars.push({ x: Math.random() * baseWidth, y: Math.random() * baseHeight, r: Math.random() * 1.2, a: Math.random() });
    }
  }

  function drawFrame(now) {
    if (!startTime) startTime = now;

    const elapsed = now - startTime;
    const duration = 7000;
    const prog = clamp(elapsed / duration, 0, 1);

    const width = currentWidth || baseWidth;
    const height = currentHeight || baseHeight;
    const scale = Math.min(width / baseWidth, height / baseHeight);
    const drawWidth = baseWidth * scale;
    const drawHeight = baseHeight * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    const W = baseWidth;
    const H = baseHeight;
    const cx = W / 2;
    const cy = H / 2 - 10;

    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 380);
    bg.addColorStop(0, '#0a0a1a');
    bg.addColorStop(0.5, '#050510');
    bg.addColorStop(1, '#000008');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const starAlpha = easeOut(clamp(prog * 3, 0, 1));
    bgStars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,210,255,${star.a * starAlpha * 0.6})`;
      ctx.fill();
    });

    if (prog > 0.05) {
      const gridA = easeOut(clamp((prog - 0.05) * 4, 0, 1)) * 0.08;
      ctx.save();
      ctx.strokeStyle = `rgba(0, 160, 255, ${gridA})`;
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }
      ctx.restore();
    }

    let zoom = 1;
    if (prog < 0.7) zoom = lerp(0.85, 1.05, easeInOut(prog / 0.7));
    else zoom = lerp(1.05, 1.0, easeInOut((prog - 0.7) / 0.3));

    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-W / 2, -H / 2);

    const spinPhase = clamp(prog / 0.28, 0, 1);
    const spinProgress = easeInOut(spinPhase);
    let scaleX = 1;
    if (spinPhase < 1) {
      const angle = spinProgress * Math.PI * 2.5;
      scaleX = Math.cos(angle);
    }

    const glowA = easeOut(clamp(prog * 2, 0, 1));
    const glowR = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140);
    glowR.addColorStop(0, `rgba(0, 140, 255, ${0.18 * glowA})`);
    glowR.addColorStop(0.5, `rgba(0, 80, 200, ${0.1 * glowA})`);
    glowR.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glowR;
    ctx.beginPath();
    ctx.arc(cx, cy, 140, 0, Math.PI * 2);
    ctx.fill();

    const ringA = easeOut(clamp((prog - 0.15) * 3, 0, 1));
    if (ringA > 0) {
      rings.forEach((ring) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(elapsed * 0.001 * ring.speed + ring.phase);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.r, ring.r * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = ring.alpha * ringA;
        ctx.lineWidth = ring.width;
        ctx.setLineDash(ring.dash);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
    }

    const partA = easeOut(clamp((prog - 0.1) * 2.5, 0, 1));
    if (partA > 0) {
      particles.forEach((particle) => {
        particle.angle += particle.speed * 0.012;
        const px = cx + Math.cos(particle.angle) * particle.r;
        const py = cy + Math.sin(particle.angle) * particle.r * 0.28;
        particle.trail.push({ x: px, y: py });
        if (particle.trail.length > 18) particle.trail.shift();

        for (let i = 0; i < particle.trail.length - 1; i++) {
          const ta = (i / particle.trail.length) * particle.alpha * partA * 0.6;
          ctx.beginPath();
          ctx.moveTo(particle.trail[i].x, particle.trail[i].y);
          ctx.lineTo(particle.trail[i + 1].x, particle.trail[i + 1].y);
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = ta;
          ctx.lineWidth = particle.size * 0.6;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(px, py, particle.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha * partA;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    const emblA = easeOut(clamp(prog * 4, 0, 1));
    const emblR = 70;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scaleX, 1);

    const lightX = scaleX * emblR * 0.4;

    ctx.beginPath();
    ctx.arc(0, 0, emblR + 6, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 180, 255, ${0.7 * emblA})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = i * (Math.PI / 3) - Math.PI / 6;
      const hx = Math.cos(a) * emblR;
      const hy = Math.sin(a) * emblR;
      i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
    }
    ctx.closePath();

    const hexGrad = ctx.createLinearGradient(-emblR + lightX, -emblR, emblR + lightX, emblR);
    hexGrad.addColorStop(0, `rgba(0, 20, 60, ${0.95 * emblA})`);
    hexGrad.addColorStop(0.3, `rgba(0, 40, 100, ${0.95 * emblA})`);
    hexGrad.addColorStop(0.5 + scaleX * 0.2, `rgba(0, 80, 180, ${0.9 * emblA})`);
    hexGrad.addColorStop(0.7, `rgba(0, 30, 80, ${0.95 * emblA})`);
    hexGrad.addColorStop(1, `rgba(0, 10, 40, ${0.95 * emblA})`);
    ctx.fillStyle = hexGrad;
    ctx.fill();
    ctx.strokeStyle = `rgba(0, 200, 255, ${0.8 * emblA})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (emblA > 0.3) {
      ctx.save();
      ctx.clip();
      const glossGrad = ctx.createLinearGradient(lightX - 30, -emblR, lightX + 10, 0);
      glossGrad.addColorStop(0, `rgba(255,255,255,${0.25 * emblA})`);
      glossGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glossGrad;
      ctx.fillRect(-emblR, -emblR, emblR * 2, emblR * 2);
      ctx.restore();
    }

    if (emblA > 0.05 && Math.abs(scaleX) > 0.05) {
      ctx.save();
      ctx.scale(1 / (scaleX || 0.001) * scaleX, 1);
      ctx.font = 'bold 36px Arial Black, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#00cfff';
      ctx.shadowBlur = 20;
      ctx.fillStyle = `rgba(200, 240, 255, ${emblA})`;
      ctx.fillText('KGC', 0, 0);
      ctx.shadowBlur = 8;
      ctx.fillStyle = `rgba(255, 255, 255, ${emblA})`;
      ctx.fillText('KGC', 0, 0);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    ctx.restore();

    if (prog > 0.3) {
      const lineA = easeOut(clamp((prog - 0.3) * 4, 0, 1));
      const lineW = lerp(0, 220, easeOut(clamp((prog - 0.3) * 5, 0, 1)));
      ctx.save();
      ctx.globalAlpha = lineA * 0.8;
      const lineGrad = ctx.createLinearGradient(cx - lineW, cy + 85, cx + lineW, cy + 85);
      lineGrad.addColorStop(0, 'rgba(0,180,255,0)');
      lineGrad.addColorStop(0.5, '#00cfff');
      lineGrad.addColorStop(1, 'rgba(0,180,255,0)');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - lineW, cy + 85);
      ctx.lineTo(cx + lineW, cy + 85);
      ctx.stroke();
      ctx.restore();
    }

    if (prog > 0.45) {
      const textA = easeOut(clamp((prog - 0.45) * 3.5, 0, 1));
      ctx.save();
      ctx.globalAlpha = textA;

      ctx.font = '700 22px "Arial Narrow", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#0088ff';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#aaddff';
      ctx.fillText('KUET GAMING CLUB', cx, cy + 105);
      ctx.shadowBlur = 6;
      ctx.fillStyle = '#ddf2ff';
      ctx.fillText('KUET GAMING CLUB', cx, cy + 105);
      ctx.shadowBlur = 0;

      const dotSpacing = 135;
      [[cx - dotSpacing, cy + 105], [cx + dotSpacing, cy + 105]].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#00cfff';
        ctx.shadowColor = '#00cfff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.font = '400 10.5px Arial, sans-serif';
      ctx.fillStyle = `rgba(100, 180, 255, ${textA * 0.85})`;
      ctx.shadowColor = '#0066cc';
      ctx.shadowBlur = 6;
      ctx.fillText('Khulna University of Engineering & Technology', cx, cy + 130);
      ctx.shadowBlur = 0;

      ctx.restore();
    }

    ctx.restore();

    animationFrame = requestAnimationFrame(drawFrame);
  }

  const start = () => {
    resizeCanvas();
    setupScene();
    cancelAnimationFrame(animationFrame);
    startTime = 0;
    animationFrame = requestAnimationFrame(drawFrame);
  };

  start();
  window.addEventListener('resize', start);
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupProfileMenu();
  setupReveals();
  setupCounters();
  setupSlider();
  setupHeroLogoAnimation();
});