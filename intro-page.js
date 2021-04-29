const toggleSwitch = document.querySelector("#toggle-theme-switch");
const toggleIcon = document.getElementById("toggle-icon");
const textBox = document.getElementById("text-box");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");


toggleSwitch.addEventListener("change", (e) => {
  console.log(e);
  if (e.target.checked) {
    toDarkMode();
  } else if (!e.target.checked) {
    toLightMode();
    toggleIcon.children[0].textContent = "Light Mode";
    toggleIcon.children[1].classList.toggle("fa-sun");
    toggleIcon.children[1].classList.toggle("fa-moon");
  }
});

/* Helper Functions for Switching Light/Dark Mode */
function toDarkMode() {
  // Change Color
  document.documentElement.style.setProperty('--primary-color', 'rgb(150, 65, 255)');
  document.documentElement.style.setProperty('--primary-variant', '#6c63ff');
  document.documentElement.style.setProperty('--secondary-color', '#03dac5');
  document.documentElement.style.setProperty('--on-primary', '#000');
  document.documentElement.style.setProperty('--on-background', 'rgba(255, 255, 255, 0.9)');
  document.documentElement.style.setProperty('--on-background-alt', 'rgba(255, 255, 255, 0.7)');
  document.documentElement.style.setProperty('--background', '#121212');
  // Change Icon/Text in Nav
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.toggle("fa-sun");
  toggleIcon.children[1].classList.toggle("fa-moon");
  textBox.style.background = 'white';
  // Change Icon Photos
  image1.src = "img/project-img-dark.svg";
  image2.src = "img/remote-dark.svg";
  image3.src ="img/results-dark.svg"

}

function toLightMode() {
  // Change Color
  document.documentElement.style.setProperty('--primary-color', 'rgb(255, 92, 92)');
  document.documentElement.style.setProperty('--primary-variant', '#ff2d2d');
  document.documentElement.style.setProperty('--secondary-color', '#1b9999');
  document.documentElement.style.setProperty('--on-primary', 'rgb(250, 250, 250)');
  document.documentElement.style.setProperty('--on-background', 'rgb(66, 66, 66)');
  document.documentElement.style.setProperty('--on-background-alt', 'rgba(66, 66, 66, 0.7)');
  document.documentElement.style.setProperty('--background', 'rgb(255, 255, 255)');
  document.documentElement.style.setProperty('--box-shadow:', '0 5px 20px 1px rgba(0, 0, 0, 0.5)');
  // Change Icon/Text in Nav
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.toggle("fa-sun");
  toggleIcon.children[1].classList.toggle("fa-moon");
  textBox.style.background = 'grey';
  // Change Icon Photos
  image1.src = "img/project-img-light.svg";
  image2.src = "img/remote-light.svg";
  image3.src ="img/results-light.svg"
}