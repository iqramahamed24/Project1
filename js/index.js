document.addEventListener("DOMContentLoaded", function () {
    const baseURL = "https://www.themealdb.com/api/json/v1/1/filter.php";
    const ingredientsList = document.getElementById("ingredients-list");
    const mealImages = document.getElementById("meal-images");
    const defaultImage = document.getElementById("default-image");
  
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", function () {
      const searchTerm = document.getElementById("search-input").value.trim();
      if (!searchTerm) {
        alert("Enter a category.");
        return;
      }
      const endpoint = `${baseURL}?c=${searchTerm}`;
      fetch(endpoint)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          displayMealImages(data.meals);
        })
        .catch((error) => {
          console.error("Error fetching meal data:", error);
        });
    });
  
    mealImages.addEventListener("click", function (event) {
      const mealId = event.target.dataset.mealId;
      if (mealId) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            displayPastaIngredients(data.meals[0]);
          })
          .catch((error) => {
            console.error("Error fetching meal details:", error);
          });
      }
    });
  
    const showIngredientsBtn = document.getElementById("show-ingredients-btn");
    showIngredientsBtn.addEventListener("click", function () {
      ingredientsList.classList.toggle("hidden");
    });
  
    function displayMealImages(meals) {
      if (meals) {
        mealImages.innerHTML = meals
          .map(
            (meal) => `
                  <div class="meal-img" data-meal-id="${meal.idMeal}">
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                      <p>${meal.strMeal}</p>
                  </div>
              `
          )
          .join("");
        mealImages.classList.remove("hidden");
        defaultImage.classList.add("hidden");
      } else {
        mealImages.innerHTML = "";
        mealImages.classList.add("hidden");
        defaultImage.classList.remove("hidden");
      }
      ingredientsList.innerHTML = "";
      ingredientsList.classList.add("hidden");
    }
  
    function displayPastaIngredients(meal) {
      if (meal) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (!ingredient) break;
          ingredients.push(`${measure} ${ingredient}`);
        }
        const ingredientsHTML = `<h3>Ingredients for ${
          meal.strMeal
        }</h3><ul>${ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}</ul>`;
        ingredientsList.innerHTML = ingredientsHTML;
        ingredientsList.classList.remove("hidden");
      }
    }
  });
  