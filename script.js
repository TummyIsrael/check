const products = [
    { id: 1, name: "Shirt", price: 10, image:
        "images/a1.jpg", category: "Electronics" },

    { id: 2, name: "Product 2", price: 15, image:
        "images/product 2.jpg", category: "Clothing" },

    { id: 3, name: "Product 3", price: 20, image:
        "images/product 3.jpg", category: "Clothing" },
    { id: 4, name: "Product 4", price: 30, image:
        "images/f4.jpg", category: "Home" },
    { id: 5, name: "Product 5", price: 250, image:
        "images/f5.jpg", category: "Electronics" },
    { id: 6, name: "Product 6", price: 120, image:
        "images/f6.jpg", category: "Home" },
    { id: 7, name: "Product 7", price: 220, image:
        "images/f7.jpg",category: "Clothing" },
    { id: 8, name: "Product 8", price: 1220, image:
        "images/f8.jpg",category: "Placeholder" },
    { id: 8, name: "Product 8", price: 1220, image:
        "images/f8.jpg",category: "Placeholder" },
    { id: 8, name: "Product 8", price: 1220, image:
        "images/f8.jpg",category: "Placeholder" }      
];

const productList = 
document.getElementById("product-list");

const cartModal = 
document.querySelector(".cart-modal");

const cartItemsList = 
document.getElementById("cart-items");

const Cart =
document.getElementsByClassName("cart");

const cartCount = 
document.getElementById("cart-count");

const checkoutBtn = 
document.getElementById("checkout");

const closeCartBtn = 
document.getElementById("clsoe-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Display products
function renderProducts(category = "all", searchQuery = "") {
    productList.innerHTML = ""; // Clear products

    products
    .filter(product => 
    (category === "all" || product.category === category) &&
    
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    .forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML =`
        <img src="${product.image}" alt="${product.name}"
        onclick="openProductDetails(${product.id})">
            <h3 onclick="openProductDetails(${product.id})">${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
         `;
        productList.appendChild(productDiv);
    });
}

// Handle category filter change 
document.getElementById("category-filter").addEventListener("change", (e) => {
    renderProducts(e.target.value, document.getElementById("search-input").value);
});

// Handle search input
document.getElementById("search-input").addEventListener("input", (e) => {
    renderProducts(document.getElementById("category-filter").value, e.target.value);
});

// Initialize with all products
renderProducts();

// Add to cart (without duplicate)
function addToCart(productId) {
    const product = products.find(p => p.id ===
productId
    );
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1; // Increase qunatity if item exists
    }  else {
        cart.push({ ...product, quantity: 1 }); // Add new item
    }

    updateCart();
    showToast(`${product.name} added to cart!`); // Show notification

    
}

// Update cart UI
function updateCart() {
    cartItemsList.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${item.image}" alt="${item.name}"
        width="50" style="margin-right : 10px;">
        ${item.name} - $${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsList.appendChild(li);
    });
    // Update cart count with animation
cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
cartCount.classList.add("cart-bounce");

// Remove animation after it completes
setTimeout(() => {
    cartCount.classList.remove("cart-bounce");
}, 300); 

    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to local storage
}

// Update cart count with animation
cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
cartCount.classList.add("cart-bounce");

// Remove animation after it completes
setTimeout(() => {
    cartCount.classList.remove("cart-bounce");
}, 300); 

// Remove items from cart
function removeFromCart(index) {

    const removedItem = cart[index];

    cart[index].quantity -= 1;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
    showToast(`${removedItem.name} removed from cart!`); // Show notification
} 

// Open cart modal
cartCount.onclick = () => {
    cartModal.style.display = "block";
};

// Close cart modal
closeCartBtn.onclick = () => {
    cartModal.style.display = "none"
};

// Checkout
checkoutBtn.onclick = () => {
    alert("Checkout successful!");
    cart = [];
    updateCart();
    cartModal.style.display = "none";
};

// Load cart on page load
window.onload = () => {
    renderProducts();
updateCart(); 
};


const darkModeToggle = 
document.getElementById("dark-mode-toggle");

// Check if dark mode was enabled before
if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
}

// Toggle dark mode 
darkModeToggle.onclick = () => {

    document.body.classList.add("theme-transition"); // Apply transition effect

    setTimeout(() => {
        document.body.classList.toggle("dark-mode");

        document.body.classList.remove("theme-transition"); // Remove effect after trransition

        if 
        (document.body.classList.contains("dark-mode"))
        {
            localStorage.setItem("dark-mode", "enabled");
            darkModeToggle.textContent = "Light Mode";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            darkModeToggle.textContent = "Dark Mode";
        }
    }, 300); // Delay for smooth animation

    const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

};

window.addEventListener("load", () => {
    const loader =
    document.getElementById("page-loader");
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1000); // Fade out after 1 second
});

function showToast(message) {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Remove toast after animation
    setTimeout(() => {
        toast.remove();
    }, 3000);
    

    
}







document.getElementById("clear-cart").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Cart is already empty!");
        return;
    }

    const confirmClear = confirm("Are you sure you want to clear the cart?");
    if (confirmClear) {
        cart = [];
        updateCart();
        showToast("Cart cleared successfully!");
    }
});


const searchInput = document.getElementById("search-input");
const searchSuggestions = document.getElementById("search-suggestions");

// Function to update autocomplete suggestions
function updateSearchSuggestions() {
    searchSuggestions.innerHTML = ""; // Clear previous suggestions
    const query = searchInput.value.toLowerCase();

    if (query.length === 0) return;

    const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(query))
    .slice(0, 5); // Limit to 10 suggestions

    filteredProducts.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name;
        searchSuggestions.appendChild(option);
    });
}

// Listen for input changes
searchInput.addEventListener("input", updateSearchSuggestions);


function openProductDetails(productId) {
    window.location.href = `product.html?id=${productId}`;
}

