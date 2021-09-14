const searchField = document.getElementById("search-field");
const buttonSearch = document.getElementById("button-search");

searchField.addEventListener("keypress", function (event) {
  // event.preventDefault();
  // console.log('key-triggered', event.key)
  if (event.key == 'Enter') {
    // console.log('inside-clicked')
    buttonSearch.click();
  }
});

document.getElementById("write-something").style.display = "none";
document.getElementById("no-result").style.display = "none";
document.getElementById("spinner").style.display = "none";
const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  //clear data
  searchField.value = "";
  if (searchText == "") {
    document.getElementById("write-something").style.display = "block";
  } else {
    document.getElementById("spinner").style.display = "block";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    //load data
    fetch(url)
      .then((response) => response.json())
      .then((data) => displaySearchResult(data.meals));
  }
};
const displaySearchResult = (meals) => {
  console.log(meals);
  const searchResult = document.getElementById("serach-result");
  // searchResult.innerHTML = ''  //People don't recommend it for memory problem
  searchResult.textContent = "";
  document.getElementById("spinner").style.display = "none";
  document.getElementById("no-result").style.display = "block";
  if (meals == null) {
    //NO RSULT FOUND
    document.getElementById("no-result").style.display = "block";
    // console.log('No result')
  } else {
    meals.forEach((meal) => {
      // console.log(meal);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = ` 
        <div onclick='loadMealDetails(${meal.idMeal})' class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">
                    ${meal.strInstructions.slice(0, 200)}</p>
                </div>
        </div>
        `;
      searchResult.appendChild(div);
    });
  }
};
const loadMealDetails = (mealId) => {
  console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}
`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};
//display meal details on browser
const displayMealDetail = (meal) => {
  console.log(meal);
  const mealDetails = document.getElementById("meal-details");
  const div = document.createElement("div");
  div.classList.add("card");
  mealDetails.innerHTML = `
    <img src="${
      meal.strMealThumb
    }" class="card-img-top img-fluid w-75" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text"> ${meal.strInstructions.slice(0, 150)}</p>
                <a href="
                ${meal.strYoutube}" class="btn btn-primary">Visit Youtube</a>
            </div>`;
  mealDetails.appendChild(div);
};
