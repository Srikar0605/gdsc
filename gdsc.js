document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Fetch products from the Fake Store API
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(products => {
            displayProducts(products);
        });

    // Function to display products
    function displayProducts(products) {
        products.slice(0, 8).forEach(product => {
            const productCard = `
            <div class="col-md-3">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">₹${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
                    </div>
                </div>
            </div>
            `;
            productList.innerHTML += productCard;
        });
    }

    // Function to add products to the cart
    window.addToCart = function(id, title, price) {
        // Check if the item is already in the cart
        const existingProductIndex = cart.findIndex(item => item.id === id);

        if (existingProductIndex !== -1) {
            // If the product is already in the cart, increase the quantity
            cart[existingProductIndex].quantity++;
        } else {
            // If not, add the new product with quantity 1
            cart.push({ id, title, price, quantity: 1 });
        }

        // Save the cart in localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Optional: Provide feedback to the user (e.g., alert, notification)
        alert(`${title} added to the cart!`);
    }
});
