document.addEventListener("DOMContentLoaded", function () {
    const shippingName = document.getElementById("shipping-name");
    const shippingAddress = document.getElementById("shipping-address");
    const shippingCity = document.getElementById("shipping-city");
    const shippingZip = document.getElementById("shipping-zip");
    const shippingCountry = document.getElementById("shipping-country");
    
    const billingName = document.getElementById("billing-name");
    const billingAddress = document.getElementById("billing-address");
    const billingCity = document.getElementById("billing-city");
    const billingZip = document.getElementById("billing-zip");
    const billingCountry = document.getElementById("billing-country");
    
    const sameAsShipping = document.getElementById("same-as-shipping");
    
    sameAsShipping.addEventListener("change", function () {
        if (this.checked) {
            billingName.value = shippingName.value;
            billingAddress.value = shippingAddress.value;
            billingCity.value = shippingCity.value;
            billingZip.value = shippingZip.value;
            billingCountry.value = shippingCountry.value;
        } else {
            billingName.value = "";
            billingAddress.value = "";
            billingCity.value = "";
            billingZip.value = "";
            billingCountry.value = "";
        }
    });

    const paymentMethod = document.getElementById("payment-method");
    const cardInfo = document.getElementById("card-info");

    paymentMethod.addEventListener("change", function () {
        if (this.value === "card") {
            cardInfo.style.display = "block";
        } else {
            cardInfo.style.display = "none";
        }
    });

    // Fetch and display order items
    const orderItemsContainer = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");
    
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement("p");
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        orderItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;

    // Place order
    const placeOrderButton = document.getElementById("place-order");
    const loadingSpinner = document.getElementById("loading-spinner");
    const orderMessage = document.getElementById("order-message");
    
    placeOrderButton.addEventListener("click", function () {
        loadingSpinner.classList.remove("hidden");
        setTimeout(() => {
            loadingSpinner.classList.add("hidden");
            orderMessage.textContent = "Your order has been placed successfully!";
            orderMessage.classList.remove("hidden");
            localStorage.removeItem("cart");
        }, 2000);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const orderItemsContainer = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    orderItemsContainer.innerHTML = ""; // Clear previous items

    cartItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("order-item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="50">
            <span>${item.title} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;
});


const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Preserve dark mode on page reload
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});