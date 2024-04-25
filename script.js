// Task 1
// Filter PLACES by type. If the type property of an object in PLACES matches the typePreference parameter.
function filterPlacesByType(typePreference) {
  // Step 1: Create a new filteredPlaces array and store it in a variable
  let filteredPlaces = [];  
  // Step 2: Loop through PLACES
  for (let i = 0; i < PLACES.length; i++){
  // Step 3: If a place object's type property matches the typePreference parameter, add it to filteredPlaces
    if (PLACES[i].type === typePreference){
      filteredPlaces.push(PLACES[i]);
    }
  }
  // Step 4: After the loop, return filteredPlaces
  return filteredPlaces;
}

// Task 2
function createCard(place) {
  // Step 1: Create a new div element and store it in a variable
  let card = document.createElement("div");
  // Step 2: Add the col class to the new div element
  card.classList.add("col");
  // Step 3: Set the innerHTML of the div with a template string. It should resemble the structure shown in the readme. Interpolate the values for place.name, place.img, and place.location where needed. More info - https://wesbos.com/template-strings-html
  card.innerHTML =
  `<div class="card h-100" onclick="centerPlaceOnMap('${place.name}')">
    <img src="${place.img}" class="card-img-top h-100" alt="${place.name}">
    <div class="card-body">
      <h5 class="card-title">${place.name}</h5>
      <div class="d-flex justify-content-between">
        <p class="card-text">${place.location}</p>
        <i class="bi bi-bookmark-heart" onclick="savePlace('${place.name}')"></i>
      </div>
    </div>
  </div>`;
  // Step 4: Return the element
  return card;
}

// Task 3
function populateRecommendationCards(filteredPlaces) {
  // Step 1: Store the DOM element with the id of "recommendations" in a variable
  let recommendations = document.getElementById("recommendations");
  // Step 2: Clear the "recommendations" innerHTML
  recommendations.innerHTML = "";
  // Step 3: Loop through the filteredPlaces array
  console.log("FILTER")
  console.log(filteredPlaces);
  for (let i = 0; i < filteredPlaces.length; i++){
  // Step 4: Create a card for each place using the createCard function
    let card = createCard(filteredPlaces[i]);
  // Step 5: Add/append each card to the recommendations DOM element
    recommendations.appendChild(card);
  }
}

// Task 4
function findPlaceByName(placeName) {
  let foundName = {}; // Change initial value to null
    for (let i = 0; i < PLACES.length; i++) {
    if (PLACES[i].name.toLowerCase() === placeName.toLowerCase()) {
      foundName = PLACES[i];
      break;
    }
  }
  return foundName;
}

const searchButton = document.querySelector("#search-homes-button");
const searchInputElement = document.querySelector("#destination");
// Moved click event listener outside keyup event listener
searchButton.addEventListener("click", () => {
  checkInputAndDisplay();
});

searchInputElement.addEventListener("keyup", () => {
  searchButton.removeAttribute('disabled');
});

function checkInputAndDisplay() {
  const inputName = searchInputElement.value.trim().toLowerCase();
  let place = [];
  if (inputName) {
    const foundPlace = findPlaceByName(inputName);
    if (foundPlace) {
      place.push(foundPlace);
      populateRecommendationCards(place);
    } else {
      // Handle case where no place is found
      console.log("No place found with that name.");
    }
  } else {
    // Handle empty input
    console.log("Please enter a place name.");
  }
}

// LEVELUP
// Adding a reload of all the available places when the page loads
const homesButton = document.querySelector(".home-logo");
homesButton.addEventListener("click", () => {
  populateRecommendationCards(PLACES);
})

let favoritePlace = [];

// Added Bookmark to save the favorite places
function savePlace(place){
  let placeObject = {};
  placeObject = findPlaceByName(place);
  favoritePlace.push(placeObject);

}

// Call the populateRecommendationCards function to display the favorite save places.
function listSavePlaces(){
  populateRecommendationCards(favoritePlace);
  for (let i = 0; i < favoritePlace.length; i++){
    let favePlace = document.querySelector(".bi-bookmark-heart");
    favePlace.style.color = "red";
  }
}