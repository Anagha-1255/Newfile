document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("header button:nth-child(2)").addEventListener("click", seeRecipies);
    document.querySelector("header button:nth-child(3)").addEventListener("click", seeProduct);
});
let allRecipes = [];

async function seeRecipies() {
    try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        allRecipes = data.recipes; 

        const showDataContainer = document.getElementById("show-data");
        const recipetitle = document.getElementById("recipe-head");
        recipetitle.innerText = "Recipes";
        showDataContainer.innerHTML = "";

        const prepTimes = [...new Set(allRecipes.map(recipe => recipe.prepTimeMinutes))].sort((a, b) => a - b);
        const timeFilterContainer = document.getElementById("time-filter-section");
        timeFilterContainer.innerHTML = `<button onclick="filterRecipesByTime('all')">All</button>`;
        prepTimes.forEach(time => {
            let btn = document.createElement("button");
            btn.innerText = `${time} min`;
            btn.onclick = () => filterRecipesByTime(time);
            timeFilterContainer.appendChild(btn);
        });

        displayRecipes(allRecipes);
        recipetitle.scrollIntoView({ behavior: "smooth", block: "start" });

    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function filterRecipesByTime(time) {
    const filteredRecipes = time === "all" ? allRecipes : allRecipes.filter(recipe => recipe.prepTimeMinutes === time);
    displayRecipes(filteredRecipes);
}



function displayRecipes(recipes) {
    const showDataContainer = document.getElementById("show-data");
    showDataContainer.innerHTML = "";

    recipes.forEach(recipe => {
        let div = document.createElement("div");
        div.classList.add("item-section");
        div.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <p>Prep Time: ${recipe.prepTimeMinutes} minutes</p>
        `;
        showDataContainer.appendChild(div);
    });
}

async function filterRecipesByTime(time) {
    try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        const filteredRecipes = time === "all" ? data.recipes : data.recipes.filter(recipe => recipe.prepTimeMinutes === time);
        displayRecipes(filteredRecipes);
    } catch (error) {
        console.error("Error filtering recipes:", error);
    }
}

async function seeProduct() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const productList = document.getElementById("product-list");
        const prdtitle = document.getElementById("product-head");
        productList.innerHTML = "";

        fetchCategories(data.products);

        data.products.forEach(product => {
            let div = document.createElement("div");
            div.classList.add("product-card");
            div.setAttribute("data-category", product.category);
            div.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <h3 class="price">$${product.price}</h3>
                <button class="wishlist-btn">Add to Wishlist</button>
            `;
            prdtitle.innerText="Products"
            productList.appendChild(div);
        });

        prdtitle.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function fetchCategories(products) {
    const categorySection = document.getElementById("category-section");
    const categories = [...new Set(products.map(product => product.category))];
    categorySection.innerHTML = `<button class="category-btn" onclick="filterProducts('all')">All</button>`;

    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        button.classList.add("category-btn");
        button.addEventListener("click", () => filterProducts(category));
        categorySection.appendChild(button);
    });
}


function filterProducts(category) {
    const products = document.querySelectorAll(".product-card");
    products.forEach(product => {
        if (category === "all" || product.getAttribute("data-category") === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    fadeElements.forEach((el) => observer.observe(el));
});

let index = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

document.addEventListener("DOMContentLoaded", () => {
    let index = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;

    function moveSlide(direction) {
        index += direction;

        if (index >= totalTestimonials) {
            index = 0;
        } else if (index < 0) {
            index = totalTestimonials - 1;
        }

        const testimonialContainer = document.querySelector('.testimonial-container');
        if (testimonialContainer) {
            const offset = -index * 100;
            testimonialContainer.style.transform = `translateX(${offset}%)`;
        } else {
            console.error("Error: '.testimonial-container' not found in the DOM.");
        }
    }

    // Attach event listeners to buttons
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));
});