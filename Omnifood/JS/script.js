"use strict";

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/

// __________________
// SET CURRENT YEAR
// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
const yearEl = document.querySelector(".year");
const date = new Date().getFullYear();
yearEl.textContent = date;

// ____________________
// MAKE MOBILE NAV WORK
// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const btnClose = document.querySelector('.icon-mobile-nav[name="close-outline"]');
const btnOpen = document.querySelector('.icon-mobile-nav[name="menu-outline"]');

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  btnOpen.classList.toggle("nav-open");
  btnClose.classList.toggle("nav-open");
});

// ____________________
// SMOOTH SCROLLING
// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    btnOpen.classList.toggle("nav-open");
    btnClose.classList.toggle("nav-open");
    const href = link.getAttribute("href");

    // SCROLL BACK TO THE TOP
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // SCROLL TO OTHER LINKS
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // CLOSE MOBILE NAVIGATION AFTER CLICK ON THE LINK
    if (link.classList.contains("main-nav-link")) headerEl.classList.toggle("nav-open");
  });
});

// _________________
// STICKY NAVIGATION
// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
