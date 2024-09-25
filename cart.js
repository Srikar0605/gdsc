document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalMrp = document.getElementById("total-mrp");
    const totalAmount = document.getElementById("total-amount");

    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to display cart items
    function displayCartItems() {
        cartItemsContainer.innerHTML = ""; // Clear the existing cart content

        cart.forEach((item, index) => {
            const itemMarkup = `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <div>
                    <p>${item.title} - ₹${item.price} x <span id="quantity-${item.id}">${item.quantity}</span></p>
                </div>
                <div>
                    <button class="btn btn-sm btn-danger" onclick="updateQuantity(${index}, 'decrease')">-</button>
                    <button class="btn btn-sm btn-success" onclick="updateQuantity(${index}, 'increase')">+</button>
                </div>
            </div>
            `;
            cartItemsContainer.innerHTML += itemMarkup;
        });

        // Update the total MRP and total amount
        updateCartSummary();
    }

    // Function to update the quantity
    window.updateQuantity = function(index, action) {
        if (action === 'increase') {
            cart[index].quantity++;
        } else if (action === 'decrease' && cart[index].quantity > 1) {
            cart[index].quantity--;
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        displayCartItems(); // Re-render the cart items
    };

    // Function to update the cart summary (MRP and total amount)
    function updateCartSummary() {
        const totalMrpValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalMrp.textContent = totalMrpValue;
        totalAmount.textContent = totalMrpValue + 30; // Including platform fee and shipping
    }

    // Initial call to display the cart items and summary
    displayCartItems();
});
