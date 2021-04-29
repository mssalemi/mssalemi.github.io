const API_REQUEST = "http://www.omdbapi.com/?apikey=9928c885&s=";

// FORMAT {title-year: [title, year]}
const nominated = [
	{title: "Zoolander 2", year: "2016", id: "https://m.media-amazon.com/images/M/MV5BODI4NDY2NDM5M15BMl5BanBnXkFtZTgwNzEwOTMxMDE@._V1_SX300.jpg"}
];

let movieState = [];
let currentIndex = 0;

// API Call to OMBD
async function searchMovie(request) {
  let response = await fetch(request);
  try {
  	console.log(response);
  	let value = await response.json();
  	console.log(value.Search);
		movieState = value.Search; 
		currentState = 0;
		checkForBlankImage();
  	updateUIMovieSearch(movieState[currentState]);
		document.getElementById("instructions").innerHTML = createScrollMessage();
  } catch (e){
  	// No Movies Found 
		let errorMessage = "";
		if (document.getElementById("search-title").value) {
			errorMessage = `Check your spelling for '${document.getElementById("search-title").value}'!`
		} else {
			errorMessage = "Check your search, you forgot to enter a movie!";
		}
		updateUIMovieSearch({Poster:"img/error.png", Title: "No Movie Found", Year: errorMessage})
  }
}

// Check if image loaded for movies
// Set Placeholder Image is no image is found from OMBD for Movie 
function checkForBlankImage() {
	const placeholder = "img/placeholder";
	for (let i=0; i<movieState.length; i++) {
		if (movieState[i].Poster === "N/A") {
			movieState[i].Poster = "img/placeholder.png";
		}
	}
}

// Display Search results to Display Search
function updateUIMovieSearch(movie) {
	
	const searchMovieList = document.getElementById("data");
	searchMovieList.innerHTML = "";
	let node = document.createElement("IMG");
	node.src = movie.Poster;  
	node.classList.add("movie-img");
	searchMovieList.appendChild(node);

	let infoNode = document.createElement("DIV");
	infoNode.classList.add("movie-info");
	
	if (movie.Poster === "img/error.png") {
		infoNode.innerHTML = `<h4>No movie found for the search ' ${document.getElementById("search-title").value} '.<h4><h6>Please check your spelling and try again</h6>`
		searchMovieList.appendChild(infoNode);
	} else {
		infoNode.innerHTML = `<h4>'${movie.Title}' - (${movie.Year})</h4><h6>Click below to nominat this movie!</h6>`
		searchMovieList.appendChild(infoNode);
		let btnNode = document.createElement("DIV");
		btnNode.classList.add("movie-action");

		let button = document.createElement("BUTTON");
		button.innerText = "Nominate";
		button.id = "nominate-btn";
		btnNode.appendChild(button);

		if (movieState.length > 1) {
			let button2 = document.createElement("BUTTON");
			button2.innerText = "Next";
			button2.id = "next-btn";
			btnNode.appendChild(button2);
		}

		searchMovieList.appendChild(btnNode);  
	}
}

// Display Nominated Movies 
function updateUINominated() {
	const nominatedList = document.getElementById("nominated-display");
	nominatedList.innerHTML = "";
	nominated.forEach((nominee) => {
		let node = document.createElement("LI");                 
		node.innerText = `${nominee.title}-${nominee.year}`;
		node.id = nominee.id;
		
		let button = document.createElement("BUTTON");
		button.innerText = `Remove`;
		button.id = "remove-btn";
		node.appendChild(button);

		nominatedList.appendChild(node);
	});
	if (nominated.length === 5) {
		console.log("MAX NOMIANTED ADD BUTTON")
		document.getElementById("pick-winner").style.visibility = "visible";
	} else {
		document.getElementById("pick-winner").style.visibility = "hidden";
	}
}

// Event Listen for Winner
document.getElementById("pick-winner").addEventListener('click', () => {
const winner = pickRandomWinner();
	document.getElementById("instructions").innerHTML = createInstructions("pickWinner", winner);
});

function pickRandomWinner() {
	const randomIndex = Math.floor(Math.random() * 5);
	document.getElementById("winner-title").innerHTML = `<h1>WINNER!!!</h1>`
		document.getElementById("winner-img").src = nominated[randomIndex].id;
	return `${nominated[randomIndex].title}(${nominated[randomIndex].year})`;
}

// Add Movie to nomiated - Array for Nominated Movie 
// FORMAT {title-year: [title, year]}
function nominateMovie(title, year, id) {
	if (nominated.length < 5) {
		nominated.push({title: title, year: year, id:id});
		document.getElementById("instructions").innerHTML = SUCCESS_MESSAGE;
		updateUINominated();
	} else {
		document.getElementById("instructions").innerHTML = ALERT_MESSAGE;
	}
}

const MAX_MESSAGE = `<h5> You have selected the maximum(5)!</h5>
										<h6>Remove movies from your nominated list</h6>
										<button id="pick-winner></button>"`;
const ALERT_MESSAGE = `<div class="alert">
      You have reached the maximum nominees - Please Remove or Pick a Winner!!!
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    </div>`;

const SUCCESS_MESSAGE = `<div class="success">
      You have successfully added that movie to the nominee list!
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    </div>`

const MOVIECOUNT_MESSAGE = `<div class="scroll">
      There are X movies to scrool through - click new to see the next realted movie to your search!
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    </div>`
const DUPLICATENOMINEE_MESSAGE = `<div class="alert">
      You cannot add the same movie twice! Please click next to find a different movie or search for a new one!
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    </div>`;

function createInstructions(action, title){
	if (action === 'pickWinner') {
		return `<div class="winner">
      THE WINNER IN THE LAST ROUND WAS ${title}!!!
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    </div>`
	}
}
function createScrollMessage() {
	if (movieState.length === 1) {
		return `<div class="scroll">
		There is 1 moving in this search - if that's not the movie you were looking for, then check your spelling and search again.
		<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
		</div>`
	} else {
		return `<div class="scroll">
		There are ${movieState.length} movies to scroll through - click new to see the next realted movie to your search!
		<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
		</div>`
	}
}

function updateInstructions() {
	if (nominated.length <= 1) {
		document.getElementById("instructions").innerHTML = "";
	} else if (nominated.length === 5) {
		document.getElementById("instructions").innerHTML = MAX_MESSAGE;
	} else {
		document.getElementById("instructions").innerHTML = "";
	}
}


// Event Listener for Search Button
document.getElementById("search-btn").addEventListener('click', () => {
	const userSearch = searchToQuery(document.getElementById("search-title").value)
	updateInstructions();
	searchMovie(userSearch);
});

function timeoutInstructions(seconds) {
	setTimeout(() => {
			console.log("timeout");
			document.getElementById("instructions").style.display = "none";
	}, 1000*seconds);
}

// Event Listener for Nominate Movie 
document.getElementById("data").addEventListener('click', (e) => {
	if (e.target.id === "nominate-btn") {
		if (!checkIfNominated(movieState[currentIndex].Poster)) {
			nominateMovie(movieState[currentIndex].Title, movieState[currentIndex].Year, movieState[currentIndex].Poster);
		} else {
			document.getElementById("nominate-btn").disabled = true;
			document.getElementById("instructions").innerHTML = DUPLICATENOMINEE_MESSAGE;
		}
	} else if (e.target.id === "next-btn") {
		incrementState();
		updateUIMovieSearch(movieState[currentIndex]);
	}
});

function checkIfNominated(id) {
	for (let i=0; i< nominated.length; i++) {
		if (nominated[i].id === movieState[currentIndex].Poster) {
				return true;
		}
	}
	return false;
}

// Add Event Listener for Enter Button (KEYPRESS)
// TODO 

// Event Listener For Remove Nominee
document.getElementById("nominated-display").addEventListener(('click'), (e) => {
	console.log(e.target);
	if (e.target.id === "remove-btn") {
		console.log(e.target);
		for (let i = 0; i< nominated.length; i++) {
			if (nominated[i].id === e.target.parentNode.id) {
				nominated.splice(i, 1);
				updateUINominated();
				updateInstructions()
				break;
			}
		}
	}
});

//Function to turn search to an API query to grab Movie Data
function searchToQuery(search) {
	let query = search.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
	query = query.filter((value) => {
		return value != "";
	});
	query = query.join("+");
	query = API_REQUEST + query;
	return query;
} 

// Increment State 
function incrementState(){
	currentIndex++;
	if (currentIndex === movieState.length) {
		currentIndex = 0;
	}
}

// Modal / Popuer for Winner
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("pick-winner");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Run at start of loading page
updateUINominated();