"use strict";

const overlay = document.querySelector(".overlay");
const openModalBtns = document.querySelectorAll(".testimonial-bottom-link");
const closeModalBtn = document.querySelector(".icon-testimonial-close");
const modal = document.querySelector(".testimonial-modal");
const btnLeft = document.querySelector(".btn-slider-left");
const btnRight = document.querySelector(".btn-slider-right");
const slides = document.querySelectorAll(".slide");
const slide = document.querySelector(".slide-1");
const dotContainer = document.querySelector(".dots-div");

const tabs = document.querySelectorAll(".projects-tab");
const tabsContainer = document.querySelector(".div-projects-tabs");
const tabsContent = document.querySelectorAll(".projects-picture");
const pictureProjectLink = document.querySelector(".btn-project-link");
const nav = document.querySelector(".main_nav");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const sectionAbout = document.querySelector("#about");
const btnSeeDetails = document.querySelector(".projects-text-see-website");

///////// SLIDER //////////
const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;

  /////////////////// FUNCTIONS:  ////////////////////////
  ////////////////////////////////////////////////////////

  // CREATE DOTS
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML("beforeend", `<button class='btn-dot' data-slide='${i}'></button>`);
    });
  };

  // ACTIVATE DOTS
  const activateDot = function (slide) {
    document.querySelectorAll(".btn-dot").forEach((dot) => dot.classList.remove("btn-dot-active"));

    document.querySelector(`.btn-dot[data-slide="${slide}"]`).classList.add("btn-dot-active");
  };

  // GO TO SLIDE
  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  };

  // NEXT SLIDE
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // PREVIOUS SLIDE
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // EVENT HANDLERS
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    // or this way works too
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/////// MODAL - TESTIMONIAL //////

const openModal = function () {
  openModalBtns.forEach((btn, i) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.remove("display-none");
      overlay.classList.remove("hidden");
      modal.classList.add(`testimonial-background-${i + 1}`);
    });
  });
};
openModal();

const closeModal = function (e) {
  e.preventDefault();
  closeModalBtn.style.color = "black";
  modal.classList.add("display-none");
  overlay.classList.add("hidden");
  modal.classList.remove(
    `testimonial-background-1`,
    "testimonial-background-2",
    "testimonial-background-3",
    "testimonial-background-4",
    "testimonial-background-5"
  );
  modal.classList.add("display-none");
  overlay.classList.add("hidden");
  modal.classList.remove(
    `testimonial-background-1`,
    "testimonial-background-2",
    "testimonial-background-3",
    "testimonial-background-4",
    "testimonial-background-5"
  );
};
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

/////////// PROJECTS TABS //////////////
///////////////////////////////////////

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".projects-tab");

  //guard clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach((t) => t.classList.remove("projects-tab-active"));
  tabsContent.forEach((c) => c.classList.remove("projects-picture-active"));

  //activate tab
  clicked.classList.add("projects-tab-active");

  // activate button
  btnSeeDetails.classList.remove("hidden");

  //activate img
  document.querySelector(`.picture-${clicked.dataset.tab}`).classList.add("projects-picture-active");

  if (clicked.dataset.tab === "1") {
    pictureProjectLink.href = "Bankist_Page/index.html";
  } else if (clicked.dataset.tab === "2") {
    pictureProjectLink.href = "Bankist_App/index.html";
  } else if (clicked.dataset.tab === "3") {
    pictureProjectLink.href = "Omnifood/index.html";
  } else if (clicked.dataset.tab === "4") {
    pictureProjectLink.href = "Mapty/index.html";
  } else if (clicked.dataset.tab === "5") {
    pictureProjectLink.href = "Natours/index.html";
  } else if (clicked.dataset.tab === "6") {
    pictureProjectLink.href = "Nexter/index.html";
  }
});

//// MENU FADE ANIMATION  ////
//////////////////////////////
const handleHover = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav_link");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

///////////// STICKY NAV ////////////
/////////////////////////////////////

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    nav.classList.add("backgroundColor");
  } else {
    nav.classList.remove("backgroundColor");
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px `,
});

headerObserver.observe(header);

///////////// SMOOTH SCROLLING ////////////
/////////////////////////////////////

document.querySelector(".nav_list").addEventListener("click", function (e) {
  // MATCHING STRATEGY
  if (e.target.classList.contains("nav_link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// BUTTON SCROLLING
btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();
  const id = e.target.getAttribute("href");

  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

// ____________________
// MAKE MOBILE NAV WORK
// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".main_nav");
const btnClose = document.querySelector('.icon-mobile-nav[name="close-outline"]');
const btnOpen = document.querySelector('.icon-mobile-nav[name="menu-outline"]');
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  btnOpen.classList.toggle("nav-open");
  btnClose.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll(".nav_link");
console.log(allLinks);
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // SCROLL BACK TO THE TOP
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // CLOSE MOBILE NAVIGATION AFTER CLICK ON THE LINK
    if (link.classList.contains("nav_link")) {
      headerEl.classList.toggle("nav-open");
      btnOpen.classList.toggle("nav-open");
      btnClose.classList.toggle("nav-open");
    }
  });
});

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
