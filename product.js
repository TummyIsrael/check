const products = [
    { id: 1, 
      name: "Product 1", 
      price: 10, 
      image: "images/a1.jpg", 
      description: "This is a great product." ,
      category: "Electronics",
      brand: "Brand A",
      stock: "15",
      rating: 4.5
    },

    { id: 2, 
      name: "Product 2", 
      price: 15, 
      image: "images/a2.jpg", 
      description: "High-quality and durable", 
      category: "Home & kitchen",
      brand: "Brand B",
      stock: "10",
      rating: 4.7
    },

    { id: 3, 
      name: "Product 3", 
      price: 20, 
      image: "images/a3.jpg", 
      description: "Best in its category",
      category: "Fashion",
      brand: "Brand C",
      stock: "5",
      rating: 4.8 
    }, 

    { id: 4, 
        name: "Product 4", 
        price: 30, 
        image: "images/x1.jpg", 
        description: "Best in its category",
        category: "Fashion",
        brand: "Brand C",
        stock: "5",
        rating: 4.8 
      },
    
    { id: 5, 
        name: "Product 5", 
        price: 250, 
        image: "images/x2.jpg", 
        description: "Best in its category",
        category: "Fashion",
        brand: "Brand C",
        stock: "5",
        rating: 4.8 
    },
    { id: 6, 
        name: "Product 6", 
        price: 120, 
        image: "images/x3.jpg", 
        description: "Best in its category",
        category: "Fashion",
        brand: "Brand C",
        stock: "5",
        rating: 4.8 
    },
    
    { id: 7, 
        name: "Product 7", 
        price: 220, 
        image: "images/f7.jpg", 
        description: "Best in its category",
        category: "Fashion",
        brand: "Brand C",
        stock: "5",
        rating: 4.8 
    },  

    { id: 8, 
        name: "Product 8", 
        price: 1220, 
        image: "images/f8.jpg", 
        description: "Best in its category",
        category: "Fashion",
        brand: "Brand C",
        stock: "5",
        rating: 4.8 
      }  
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));
const product = products.find(p => p.id === productId);


if (product) {
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `$${product.price}`;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-category").textContent = product.category;
    document.getElementById("product-brand").textContent = product.brand;
    document.getElementById("product-stock").textContent = product.stock > 0 ? `${product.stock} available` : "Out of stock";
    document.getElementById("product-rating").textContent = product.rating;
}

// Add product to cart with qunatity
function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const quantity = parseInt(document.getElementById("quantity").value);

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        alert("Product already in cart! Adjust quantity in cart.");
    } else {
        cart.push({ ...product, quantity});
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added in cart!");
    }
} 

const darkModeToggle = document.createElement("button");
darkModeToggle.id = "dark-mode-toggle";
darkModeToggle.textContent = "Dark Mode";
document.body.prepend(darkModeToggle);

// Load saved theme
if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
        darkModeToggle.textContent = "Light Mode";
    } else {
        localStorage.setItem("dark-mode", "disabled");
        darkModeToggle.textContent = "Dark Mode";
    }
});

// Fetch reviews from localStorage
const reviews =JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
const reviewsList = document.getElementById("reviews-list");

// Displayed existing reviews
function renderReviews() {
    reviewsList.innerHTML = "";
    reviews.forEach(review => {
        const reviewDiv = document.createElement("div");
        reviewDiv.classList.add("review");
        reviewDiv.innerHTML = `
        <strong>${review.name}</strong> - <span>${"x".repeat(review.rating)}</span>
        <p>${review.text}</p>
        <hr>
        `;
        reviewsList.appendChild(reviewDiv);
    });
}

// Submit a new review
function submitReview() {
    const name  = document.getElementById("review-name").value.trim();
    const text = document.getElementById("review-text").value.trim();
    const rating = parseInt(document.getElementById("review-rating").value);

    if (!name || !text) {
        alert("Please fill out all fields.");
        return;
    }

    const newReview = { name, text, rating };
    reviews.push(newReview);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(reviews));

    document.getElementById("review-name").value = "";
    document.getElementById("review-text").value = "";
    document.getElementById("review-rating").value = "5";

    renderReviews();
}

// Load reviews on page load
renderReviews();