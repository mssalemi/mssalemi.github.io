/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

console.log("Script Linked Successfully");

/**
 * Define Global Variables
 * 
*/
const navBar = document.getElementById("navbar__list");
const sectionsForNav = document.getElementsByTagName("section");
let pageSectionListeners = [];
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

for (let i=0; i<sectionsForNav.length; i++) {
  const currentSection = sectionsForNav[i];
  const title = currentSection.getElementsByTagName("H2")[0].innerHTML;
  const node = document.createElement("li");
  const id = "#" + currentSection.id ;
  let link = document.createElement('a');
  link.setAttribute("href", id);
  link.appendChild(document.createTextNode(title));
  node.appendChild(link);
  node.id = id;
  console.log(node.innerHTML);
  /* for testing 
  if (i==1) {
    node.classList += "active";
  } 
*/
/*
 const options = {
   root: null,
   threshold: .25
 };

 const oberver = new IntersectionObserver(function(entries, oberver) {
  entries.forEach(entry => {
    console.log(currentSection.id);
    for (let i=0; i<navBar.childNodes.length; i++) {
      if (`#${currentSection.id}` == navBar.children[i].id) {
        navBar.children[i].classList.toggle("active");
      }
    }
  });
 }, options);
 oberver.observe(currentSection);
 */

  navBar.appendChild(node);
}

// Add class 'active' to section when near top of viewport
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  console.log(scrolled)
  switch (true) {
    case (scrolled > 250 && scrolled < 650):
      navBar.children[0].classList.add("active");
      navBar.children[1].classList.remove("active");
      navBar.children[2].classList.remove("active");
      break;
    case (scrolled > 650 && scrolled < 1190):
      navBar.children[0].classList.remove("active");
      navBar.children[1].classList.add("active");
      navBar.children[2].classList.remove("active");
      break;
    case (scrolled > 1195 && scrolled < 1670):
      navBar.children[0].classList.remove("active");
      navBar.children[1].classList.remove("active");
      navBar.children[2].classList.add("active");
      break;
    default: 
      navBar.children[0].classList.remove("active");
      navBar.children[1].classList.remove("active");
      navBar.children[2].classList.remove("active");
      break;
  }   
});

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


