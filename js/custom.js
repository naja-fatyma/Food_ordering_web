// Custom JavaScript for Findzy - Handmade Craft Marketplace

document.addEventListener("DOMContentLoaded", function () {
    console.log("Findzy Marketplace Loaded!");

    // Search Functionality
    const searchForm = document.querySelector("#search-section form");
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const query = document.querySelector("input[name='query']").value.trim().toLowerCase();
            window.location.href = `craft.html?search=${query}`;
        });
    }

    // Category Filtering
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get("category");
    
    if (selectedCategory) {
        filterCraftsByCategory(selectedCategory);
    }

    function filterCraftsByCategory(category) {
        const craftItems = document.querySelectorAll(".craft-item");
        craftItems.forEach((item) => {
            const itemCategory = item.getAttribute("data-category");
            if (itemCategory !== category) {
                item.style.display = "none";
            } else {
                item.style.display = "block";
            }
        });
    }

    // Add to Cart Functionality
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".craft-item button").forEach((button) => {
        button.addEventListener("click", function () {
            const craftItem = this.parentElement;
            const itemName = craftItem.querySelector("h3").innerText;
            const itemPrice = craftItem.getAttribute("data-price") || "0"; // Default price 0 if not found
            const itemImage = craftItem.querySelector("img").src;

            const cartItem = { name: itemName, price: itemPrice, image: itemImage };
            cart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${itemName} has been added to your cart!`);
        });
    });
});