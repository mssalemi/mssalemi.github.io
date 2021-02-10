const addBtn = document.querySelector(".add-btn");
console.log("HELLO EVENT LISTENER");

// Function connected to header add contentbutton
// toggle the ccf

//
// TO FIX - something wrong with initial add/delete click
// 
function toggleCCF(e) {
  if (document.querySelector(".main-section").style.display === "none") {
    resetInputFields();
    document.querySelector(".main-section").style.display = "grid";
    addBtn.innerHTML = "UNDO";
  } else {
    document.querySelector(".main-section").style.display = "none";
    addBtn.innerHTML = "ADD";
  }
}

// resets the ccf form when appears
function resetInputFields() {
  document.querySelector("#ccf-title").value = "";
  document.querySelector("#ccf-subject").value = "";
}

addBtn.addEventListener("click", toggleCCF);


/// ADD CONTENT
const submitContent = document.querySelector(".ccf-btn");

function addToPage() {
  console.log("add to page");

  if (document.querySelector("#ccf-title").value === "") {
    console.log("Please enter Title and Para");
  } else {
    let title = document.querySelector("#ccf-title").value;
    let para = document.querySelector("#ccf-subject").value;
    let abv = document.querySelector("#ccf-title").value.substring(0,3);
    console.log(`${abv} - ${title} \n${para}`);
    createContentSection(title, para, abv);
    addToHeader(abv);
    toggleCCF();
  }
}

function createContentSection(title, para, abv) {
  let node = document.createElement("DIV");
  node.setAttribute("id", abv);
  node.classList.add("content-section");
  node.innerHTML = `<h2>${title}</h2>
                    <p>${para}</p>
                    <button class="delete-btn">Delete</button>`;
  document.querySelector(".all-content-section").appendChild(node);
}

function addToHeader(abv) {
  let node = document.createElement("li");
  node.innerHTML = `<a href="#${abv}">${abv}</a>`;
  document.querySelector("#dynamic-nav-items").appendChild(node);
}

submitContent.addEventListener("click", function(e) {
  addToPage();
});




// DELETE BUTTONS  for Content 
const contentSection = document.querySelector(".all-content-section");

contentSection.addEventListener("click", function(e) {
  if (e.target.innerHTML == "Delete") {
    console.log(`Parent Node innerHTMl - ${e.target.parentNode.firstElementChild.innerHTML.substring(0,3)}`);
    e.target.parentNode.remove();
    
    let abvToDelete = e.target.parentNode.firstElementChild.innerHTML.substring(0,3);
    // ALSO NEED TO REMOVE FROM TOP BAR 
    let listItems = document.querySelectorAll("li");
    console.log(listItems.length);
    for (let i =0; i<listItems.length; i++) {
      if (listItems[i].innerText == abvToDelete) {
        console.log(listItems[i].remove());
      }
    }
  }
});

// Adding Active state to current mouve hover area
const contentArea = document.getElementById("all-content-section");

contentArea.addEventListener("mouseover", function(e) {
  e.target.classList.toggle("active");
});

contentArea.addEventListener("mouseout", function(e) {
  e.target.classList.toggle("active");
});