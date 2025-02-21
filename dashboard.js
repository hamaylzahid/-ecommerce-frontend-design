document.addEventListener("DOMContentLoaded", async () => {
    // ✅ Protect Dashboard
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
        return;
    }

    // ✅ Load User Data
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("username").innerText = `Welcome, ${user.name}`;
        document.getElementById("updateEmail").value = user.email;
        document.getElementById("updateAddress").value = user.address || "";
    } else {
        console.warn("No user found in localStorage");
    }

    // ✅ Select Elements
    const orderList = document.getElementById("orderList");
    const orderItemsContainer = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");

    console.log("Checking Elements:", orderList, orderItemsContainer, totalPriceElement);

    // ✅ Fetch Fake Orders from API
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) throw new Error("Failed to fetch fake orders.");
        
        const fakeOrders = await response.json();

        console.log("✅ Fake Orders Loaded:", fakeOrders.slice(0, 5)); // Debugging log

        // Display Fake Orders
        if (fakeOrders.length === 0) {
            orderList.innerHTML = "<p>No orders found.</p>";
        } else {
            orderList.innerHTML = ""; // Clear previous content

            fakeOrders.slice(0, 5).forEach(order => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>Order #${order.id}</strong>: ${order.title} <br> <small>Ordered on: ${new Date().toLocaleString()}</small>`;
                orderList.appendChild(li);
            });
        }
    } catch (error) {
        console.error("❌ Failed to load fake orders:", error);
        orderList.innerHTML = "<p>Error loading orders.</p>";
    }

    // ✅ Load Cart Items (User's Orders)
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

    // ✅ Logout Button
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "login.html";
        });
    }

    // ✅ Ensure Only One Section is Visible Initially
    showSection('orderHistory');
});

// ✅ Function to Show Only Selected Section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });
}
