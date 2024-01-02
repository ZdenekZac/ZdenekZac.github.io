'use strict';
/*
__________________________________
| 185. How the DOM really works
¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
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

console.log('|  186. SELECTING, CREATING & DELETING ELEMENTS');
console.log('');

// -- SELECTING ELEMENTS --

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header2 = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section-1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// -- CREATING AND INSERTING ELEMENTS --

// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'we use cookies for improved functionality and analytics';
message.innerHTML =
  ' we use cookies for improved functionality and analytics <button class="btn btn--close-cookies">Got IT!</button>';

// header2.prepend(message);
header2.append(message);
// header.append(message.cloneNode(true))

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
// === 187. Styles, Atributes and Classes ======
// ============================================
console.log('');
console.log('=========================================');
console.log('=== 187.  STYLES, ATRIBUTES & CLASSES ===');
console.log('=========================================');
console.log('');

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.height);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).
// height,10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered')

// -- ATRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

//-- NON-STANDARD
console.log(logo.desginer); // undefined
console.log(logo.className);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'bankist');

console.log(logo.src); // absolute version
console.log(logo.getAttribute('src')); // relative version

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

//-- DATA ATRIBUTES // must starts with ,,data-"
console.log(logo.dataset.versionNumber);

// -- CLASSES
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes like in arrays

// -- ! DON'T USE THIS ! - will overwrite all exist. classes
// logo.className = 'jonas';

/*
=================================================
======= 188. Implementing Smooth Scrolling ======
=================================================
*/

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click',function(e){
//     const s1coords = section1.getBoundingClientRect();
//     console.log(s1coords);

//     console.log(e.target.getBoundingClientRect());

//     console.log("Current scrool (X/Y)", window.pageXOffset,
//     pageYOffset);

//     console.log(
//         'height/width viewport',
//         document.documentElement.clientHeight,
//         document.documentElement.clientWidth
//     );

//     // = = Scrolling

//     // window.scrollTo(
//     //     s1coords.left + window.pageXOffset,
//     //     s1coords.top + window.pageYOffset
//     //     );

//         // window.scrollTo({
//         //     left: s1coords.left + window.pageXOffset,
//         //     top: s1coords.top + window.pageYOffset,
//         //     behavior: 'smooth',
//         // });

//         section1.scrollIntoView({behavior: 'smooth'});
// });

/*
================================================
=== 189. Types of Events and Event Handlers ====
================================================
*/
console.log('');
console.log('==============================================');
console.log('===  189.  TYPES OF EVENTS & EVENT HANDLERS ==');
console.log('==============================================');
console.log('');
/*
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('some bullshit text');

  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading');
// });

// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading again');
// };
*/
/*
================================================
=== 189. Types of Events and Event Handlers ====
================================================
*/
console.log('');
console.log('===============================================');
console.log('=== 190. EVENT PROPAGATION: BUBLING & CAPTURING');
console.log('===============================================');
console.log('');

// CLICK EVENT TRAVELS TO ITS TARGET THRU ALL PARENT ELEMENTS
// 1. CAPTURING PHASE - (the way of event from document to the target)
// 2. TARGET PHASE - (the target element itself)
// 3. BUBBLING PHASE - (the way back to the document thru all parents el.)

/*
===========================================
=== 191. Event Propagation in Practice ====
===========================================
*/
console.log('');
console.log('===========================================');
console.log('===  191. EVENT PROPAGATION IN PRACTICE ===');
console.log('===========================================');
console.log('');
/*
// rgb(255, 255, 255);
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true

  // STOP PROPAGATION
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // true
);

// !!!!! if you set up third parameter ,,true", it will be the first element who listens for the event traveling down from the document, the rest is gonna listen when it travels back up through bubbling phase  !!!!!
//
*/
/*
= = = = = = = = = = = = = = = = = = = = = = = = = = = = =
= = 192. Event Delegation: Implementing Page Navigation
= = = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/
console.log('');
console.log('===========================================');
console.log('===  192. EVENT DELEGATION: IMPLEMENTING PAGE NAVIGATION ===');
console.log('===========================================');
console.log('');

// === PAGE NAVIGATION ===

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getaAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// = = IN SCRIPT.JS FILE = = =

/*
= = = = = = = = = = = = = = = = = = = = = = = = = = = = =
= = 193. DOM Traversing
= = = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/

/* 
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
= = = =         193. DOM Traversing             = = = =
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
*/
console.log('');
console.log('===========================================');
console.log('=======  194. DOM TRAVERSING  =============');
console.log('===========================================');
console.log('');
/*
const h1 = document.querySelector('h1');

// === GOING DOWNWARDS: CHILD ===

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red'; //'var(--color-primary-darker)';

// === GOING UPWARDS: PARENTS ===

console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// === GOING SIDEWAYS: SIBLINGS

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
*/
