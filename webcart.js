document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const totalEl = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkout");

    function getCartItems() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
        const cart = getCartItems();
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.classList.toggle("disabled", cart.length === 0);
    }
    function getWishlistItems() {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    }
    
    function saveWishlist(wishlist) {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    
    document.querySelectorAll(".save").forEach(button => {
        checkoutBtn.addEventListener("click", function () {
            let cart = getCartItems();
        
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
        
            // Create order entry
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            let order = {
                id: orders.length + 1,
                items: cart,
                total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                date: new Date().toLocaleString()
            };
        
            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));
        
            // Clear cart after checkout
            localStorage.removeItem("cart");
            updateCartCount();
            updateCartDisplay();
            
            alert("Order placed successfully!");
        });
        
    });
    
    function updateCartDisplay() {
        const cart = getCartItems();
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
    <img src="${item.image}" alt="${item.title}" width="50">
    <span>${item.title}</span>
    <span>$${item.price.toFixed(2)}</span>
    <button class="decrease" data-index="${index}">-</button>
    <span>${item.quantity}</span>
    <button class="increase" data-index="${index}" ${item.quantity >= 10 ? "disabled" : ""}>+</button>
    <span>$${(item.price * item.quantity).toFixed(2)}</span>
    <button class="remove" data-index="${index}">X</button>
    <button class="wishlist" data-index="${index}">♡ Move to Wishlist</button>
`;

            cartItemsContainer.appendChild(li);
            subtotal += item.price * item.quantity;
        });

        subtotalEl.textContent = subtotal.toFixed(2);
        const tax = subtotal * 0.1;
        taxEl.textContent = tax.toFixed(2);
        const total = subtotal + tax + 5;
        totalEl.textContent = total.toFixed(2);
    }

    // Function to add event listeners to all product sections
    document.querySelectorAll(".product-details").forEach(section => {
        const addToCartBtn = section.querySelector(".product-info button");
        const productTitle = section.querySelector(".product-info h2").textContent;
        const productPrice = parseFloat(section.querySelector(".product-info span").textContent);
        const productImage = section.querySelector("img").src;
        const cartNotification = section.querySelector(".hidden");

        addToCartBtn.addEventListener("click", function () {
            let cart = getCartItems();
            let existingItem = cart.find(item => item.title === productTitle);

            if (existingItem) {
                if (existingItem.quantity < 10) {
                    existingItem.quantity += 1;
                }
            } else {
                cart.push({
                    title: productTitle,
                    price: productPrice,
                    quantity: 1,
                    image: productImage
                });
            }
            
            saveCart(cart);
            updateCartCount();
            updateCartDisplay();
            cartNotification.style.display = "block";
            setTimeout(() => cartNotification.style.display = "none", 2000);
        });
    });

    // Event delegation for cart item updates
    cartItemsContainer.addEventListener("click", function (e) {
        let cart = getCartItems();
        const index = e.target.dataset.index;
        if (e.target.classList.contains("increase")) {
            if (cart[index].quantity < 10) {
                cart[index].quantity += 1;
            }

        } else if (e.target.classList.contains("decrease")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
        } else if (e.target.classList.contains("remove")) {
            cart.splice(index, 1);
        }
        if (e.target.classList.contains("wishlist")) {
            let cart = getCartItems();
            let wishlist = getWishlistItems();
            
            // Move item to wishlist
            wishlist.push(cart[index]);
            saveWishlist(wishlist);
            
            // Remove from cart
            cart.splice(index, 1);
            saveCart(cart);
            
            updateCartCount();
            updateCartDisplay();
            alert("Item moved to Wishlist!");
        }
        
        saveCart(cart);
        updateCartCount();
        updateCartDisplay();
    });

    updateCartCount();
    updateCartDisplay();
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



