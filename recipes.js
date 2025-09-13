const recipeContainer = document.querySelector(".recipe-container");
const searchButton = document.querySelector(".find-button");

searchButton.addEventListener("click", async () => {
    const searchBox = document.querySelector(".search-box").value.trim();
    document.querySelector(".search-box").value = "";
    recipeContainer.innerHTML = "";
    if (!searchBox) {
        recipeContainer.innerHTML = `<h2>Please enter a recipe</h2>`;
        return;
    } else {
        try {
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox}`;
            const response = await fetch(url);
            let data = await response.json();
            if (!data.meals) {
                recipeContainer.innerHTML = `<h2>There is no result for ${searchBox}.</h2>`;
            } else {
                data.meals.forEach((meal) => {
                    recipeContainer.innerHTML += `
                    <div class="card">
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="card-content">
                      <h3>${meal.strMeal}</h3>
                      <p><strong>Category: </strong>${meal.strCategory}</p>
                      <p><strong>Area: </strong>${meal.strArea}</p>
                      <button onclick="window.open('${meal.strYouTube}, _blank')">Watch Recipe</button>
                      </div>
                      </div>;`
                });
            }
        } catch (error){
            console.log(error);
            alert(error);
        }
    }
});

const getAllMeals() = async () => {
    recipeContainer.innerHTML = "";

    const letters = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < letters.length; i++) {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letters[i]}`);
            const data = await res.json();

            if (data.meals) {
                data.meals.forEach((meal) => {
                    recipeContainer.innerHTML += `
                    <div class="card">
                    <h3>${meal.strMeal}</h3>
                      <p><strong>Category: </strong>${meal.strCategory}</p>
                      <p><strong>Area: </strong>${meal.strArea}</p>
                      <button onclick="window.open('${meal.strYouTube}, _blank')">Watch Recipe</button>
                    </div>
                    </div>;`
                });
            }
        } catch (error) {
            console.log(`Error loading meals for ${letters[i]}:`, error)
        }
    }
};

window.onload = getAllMeals;








