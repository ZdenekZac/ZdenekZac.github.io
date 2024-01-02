'use strict';
// BANKIST JS //

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

////////////////// MODAL WINDOW ////////////
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// BUTTON SCROLLING
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log('CURRENT SCROLL (X/Y): ', window.scrollX, window.scrollY);

  console.log(
    'height/width viewport:',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // = = Scrolling = =

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////// PAGE NAVIGATION /////////////////

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

///// --- using page delegation --- more eficiaent !!! /////////
//1. Add event listener to common parent element
//2. Determine what element originated  the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  // MATCHING STRATEGY
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
/*
_________________________________
| 185. How the DOM really works
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
*/
/* 
D O M (Document Object Model)
- Allows us to make JavaScript interact with the browser
- We can write JavaScript to create, modify and delete HTML elements, set styles, classses and attributes, listen and respond to events;
- DOM tree is generated from an HTML document, which we can then interact with;
- DOM is very complex API that contains lots of methods and properties to interact with the DOM tree

- ! INHERITANCE OF METHOS ! :
EXAMPLE:
Any HTML element will have access to 
.addEventListener(), .cloneNode() or .closest() methods
*/

// __________________________________________________
// |  186. Selecting, Deleting and Creating elements
// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨

// -- SELECTING ELEMENTS --

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header2 = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section-1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// -- CREATING AND INSERTING ELEMENTS --

// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'we use cookies for improved functionality and analytics';
message.innerHTML =
  ' we use cookies for improved functionality and analytics <button class="btn btn--close-cookies">Got IT!</button>';

// header2.prepend(message);
header2.append(message);
// header2.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// -- DELETE ELEMENTS --

document
  .querySelector('.btn--close-cookies')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message); -  OLD METHOD
  });

// ============================================
// === 187. Styles, Atributes and Classes =====
// ============================================

// -- STYLES
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

//-- ATRIBUTES
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'this is a minimalist logo';

// // -- NON STANDART
// console.log(logo.designer); //not working, its not a standart property
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankinst');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // -- DATA ATRIBUTES
// //start with word ,,data" in HTML, then use camelCase in JS
// console.log(logo.dataset.versionNumber);

// -- CLASSES
// logo.classList.add('c', 'j', 'b');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); //not includes like in arrays

// -- ! DON'T USE THIS ! - will overwrite all exist. classes
// logo.className = 'jonas';

/*
=================================================
======= 188. Implementing Smooth Scrolling ======
=================================================
*/

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);
//   console.log(e.target.getBoundingClientRect());

//   console.log('CURRENT SCROLL (X/Y): ', window.scrollX, window.scrollY);

//   console.log(
//     'height/width viewport:',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // = = Scrolling = =

//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

/*
================================================
=== 189. Types of Events and Event Handlers ====
================================================
*/

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventLIstener: Great, it is working!');

//   // h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: cool, you do you!');
// };

/*
================================================
=== 189. Types of Events and Event Handlers ====
================================================
*/

// CLICK EVENT TRAVELS TO ITS TARGET THRU ALL PARENT ELEMENTS
// 1. CAPTURING PHASE - (the way of event from document to the target)
// 2. TARGET PHASE - (the target element itself)
// 3. BUBBLING PHASE - (the way back to the document thru all parents el.)

/*
===========================================
=== 191. Event Propagation in Practice ====
===========================================
*/

// // rgb(255, 255, 255);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this); // true

//   // STOP PROPAGATION
//   //e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   }
//   // , true
// );

// !!!!! if you set up third parameter ,,true", it will be the first element who listens for the event traveling down from the document, the rest is gonna listen when it travels back up through bubbling phase  !!!!!
//

/*
= = = = = = = = = = = = = = = = = = = = = = = = = = = = =
= = 192. Event Delegation: Implementing Page Navigation
= = = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/

// === PAGE NAVIGATION ===

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getaAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

/* 
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
= = = =         193. DOM Traversing             = = = =
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/

// const h1 = document.querySelector('h1');
// const h4 = document.querySelector('h4');

// // GOING DOWNWARDS: CHILD

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'red';

// // GOING UPARDS: PARENTS

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // GOING SIDEWAYS: SIBLINGS

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

/* 
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
= = = =    194. Building a Tabbed Component     = = = =
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// !! using event delegation !!
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //GUARD CLAUSE
  if (!clicked) return;

  // REMOVE ACTIVE CLASSES
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // ACTIVATE TAB
  clicked.classList.add('operations__tab--active');

  // ACTIVATE CONTENT AREA
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/* 
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
= = = =    195. Passing Arguments to Event Handlers    = = = =
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/

// MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/* 
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =  
= = 196. Implementing a Sticky Navigation: The Scroll Event = =
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/* 
= = = = = = = = = = = = = = = = = = = = = = = = = = = =  
= = 197. A Better Way: The Intersection Observer API  =
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/

// obsCallback fce will be called each time that the observed
// element (target element - section1) is intersecting the
// root element at the treshold that we defined

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
});

headerObserver.observe(header);

/* 
= = = = = = = = = = = = = = = = = = = = = = = = = = = =  
= = = =     198. Revealing Elements on Scroll   = = = =
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
///////////////////200-slider/////////////////
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

/* 
= = = = = = = = = = = = = = = = = = = = = = =  
= = = =     199. Lazy Loading Images  = = = =
= = = = = = = = = = = = = = = = = = = = = = =
*/
// picture about 16kb filtered by blur filter in CSS
// Great for performance !!

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  // guard clause
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

/* 
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
= = 200 + 202. Building a Slider Component - Part 1 + 2 =
= = = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/
const slider = function () {
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slides = document.querySelectorAll('.slide');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  /////////////////// FUNCTIONS:  ////////////////////////

  // CREATE DOTS
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };

  // ACTIVATE DOTS
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // GO TO SLIDE
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
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
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    // or this way works too
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/* 
= = = = = = = = = = = = = = = = = = = = =
= = = =  202. Lifecycle DOM events  = = =
= = = = = = = = = = = = = = = = = = = = = 
*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded');
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

/* 
= = = = = = = = = = = = = = = = = = = = =
= = = =  203. Efficient Script Loading: defer & async  = = =
= = = = = = = = = = = = = = = = = = = = = 
*/
