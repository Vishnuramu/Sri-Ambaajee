document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO PARALLAX ================= */
  const hero = document.getElementById("hero");
  const heroBg = document.querySelector(".hero-bg");

  if (hero && heroBg) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const moveX = (e.clientX - r.left - r.width / 2) / 25;
      const moveY = (e.clientY - r.top - r.height / 2) / 25;
      heroBg.style.transform = `translate(${-moveX}px, ${-moveY}px) scale(1.05)`;
    });

    hero.addEventListener("mouseleave", () => {
      heroBg.style.transform = "translate(0,0) scale(1)";
    });
  }

  /* ================= CATEGORY CARD ANIMATION ================= */
  const categoryCards = document.querySelectorAll(".category-card");

  if (categoryCards.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("show"), i * 120);
        }
      });
    }, { threshold: 0.2 });

    categoryCards.forEach(card => observer.observe(card));
  }

  /* ================= INDUSTRIES SLIDER ================= */
  const industriesTrack = document.getElementById("industriesTrack");
  const industriesPrev = document.getElementById("industriesPrev");
  const industriesNext = document.getElementById("industriesNext");

  if (industriesTrack && industriesPrev && industriesNext) {
    const cardsPerView = 3;
    const steps = Math.ceil(industriesTrack.children.length / cardsPerView);
    let index = 0;

    const update = () => {
      industriesTrack.style.transform = `translateX(-${index * 100}%)`;
    };

    industriesNext.onclick = () => {
      index = (index + 1) % steps;
      update();
    };

    industriesPrev.onclick = () => {
      index = (index - 1 + steps) % steps;
      update();
    };
  }

  /* ================= WHY SECTION (INFINITE) ================= */
  const whyTrack = document.getElementById("sliderTrack");
  const whyPrev = document.getElementById("whyPrev");
  const whyNext = document.getElementById("whyNext");

  if (whyTrack && whyPrev && whyNext) {
    const visible = 3;
    let cards = [...whyTrack.children];
    const originalCount = cards.length;

    cards.slice(-visible).forEach(c => whyTrack.prepend(c.cloneNode(true)));
    cards.slice(0, visible).forEach(c => whyTrack.append(c.cloneNode(true)));

    cards = [...whyTrack.children];
    let cardWidth = cards[0].offsetWidth;
    let index = visible;

    whyTrack.style.transform = `translateX(-${index * cardWidth}px)`;

    const move = () => {
      whyTrack.style.transition = "transform 0.6s ease";
      whyTrack.style.transform = `translateX(-${index * cardWidth}px)`;
    };

    whyNext.onclick = () => {
      index++;
      move();

      if (index === cards.length - visible) {
        setTimeout(() => {
          whyTrack.style.transition = "none";
          index = visible;
          whyTrack.style.transform = `translateX(-${index * cardWidth}px)`;
        }, 600);
      }
    };

    whyPrev.onclick = () => {
      index--;
      move();

      if (index === 0) {
        setTimeout(() => {
          whyTrack.style.transition = "none";
          index = originalCount;
          whyTrack.style.transform = `translateX(-${index * cardWidth}px)`;
        }, 600);
      }
    };

    window.addEventListener("resize", () => {
      cardWidth = cards[0].offsetWidth;
      whyTrack.style.transition = "none";
      whyTrack.style.transform = `translateX(-${index * cardWidth}px)`;
    });
  }

  /* ================= TESTIMONIALS (INFINITE LOOP) ================= */
  const testimonialTrack = document.getElementById("track");
  const testimonialPrev = document.getElementById("testimonialPrev");
  const testimonialNext = document.getElementById("testimonialNext");

  if (testimonialTrack && testimonialPrev && testimonialNext) {
    const visible = 3;
    let cards = [...testimonialTrack.children];

    cards.slice(-visible).forEach(c => testimonialTrack.prepend(c.cloneNode(true)));
    cards.slice(0, visible).forEach(c => testimonialTrack.append(c.cloneNode(true)));

    cards = [...testimonialTrack.children];
    let index = visible;

    testimonialTrack.style.transform = `translateX(-${index * (100 / visible)}%)`;

    const slide = () => {
      testimonialTrack.style.transition = "transform 0.6s ease";
      testimonialTrack.style.transform = `translateX(-${index * (100 / visible)}%)`;

      setTimeout(() => {
        if (index >= cards.length - visible) {
          index = visible;
          testimonialTrack.style.transition = "none";
          testimonialTrack.style.transform = `translateX(-${index * (100 / visible)}%)`;
        }
        if (index <= 0) {
          index = cards.length - visible * 2;
          testimonialTrack.style.transition = "none";
          testimonialTrack.style.transform = `translateX(-${index * (100 / visible)}%)`;
        }
      }, 600);
    };

    testimonialNext.onclick = () => {
      index++;
      slide();
    };

    testimonialPrev.onclick = () => {
      index--;
      slide();
    };
  }

});
