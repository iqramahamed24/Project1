document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "https://www.themealdb.com/api/json/v1/1/filter.php";
    const searchTerm = "pasta"; 
    const endpoint = `${baseURL}?c=${searchTerm}`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    const randomPastaBtn = document.getElementById("random-pasta-btn");
    const showIngredientsBtn = document.getElementById("show-ingredients-btn");
    const ingredientsList = document.getElementById("ingredients-list");
    const mealImages = document.querySelectorAll(".meal-img");

    randomPastaBtn.addEventListener("click", function() {
        alert("Generate random pasta button clicked!");
    });

    showIngredientsBtn.addEventListener("click", function() {
        ingredientsList.classList.remove("hidden");
    });

    mealImages.forEach(img => {
        img.addEventListener("click", function() {
            img.classList.toggle("hidden");
        });
    });
});
