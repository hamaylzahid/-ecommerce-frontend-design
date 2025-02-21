//  for adding responsiveness to the navbar
window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;
    const nav = document.querySelector('nav');

    if (screenWidth < 768) {
        nav.classList.add('mobile-nav');
    } else {
        nav.classList.remove('mobile-nav');
    }
});
//  for toggling the menu in mobile view
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.createElement('button');
    menuToggle.innerText = 'Menu';
    menuToggle.className = 'menu-toggle';
    const navMenu = document.querySelector('.menu ul');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('visible');
    });

    document.querySelector('nav1 .menu').prepend(menuToggle);
});
// Adjust layout dynamically for .category-container
window.addEventListener('resize', () => {
    const categoryContainer = document.querySelector('.category-container');

    if (window.innerWidth < 768) {
        categoryContainer.style.flexDirection = 'column';
    } else {
        categoryContainer.style.flexDirection = 'row';
    }
});
// Resize grid items for responsiveness
document.addEventListener('DOMContentLoaded', () => {
    const gridSections = document.querySelectorAll('.grid, .grid1');

    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth < 768;

        gridSections.forEach(grid => {
            grid.style.gridTemplateColumns = isMobile ? '1fr' : 'repeat(4, 1fr)';
        });
    });
});

document.getElementById("category-filter").addEventListener("change", filterProducts);
document.getElementById("price-filter").addEventListener("input", filterProducts);

function filterProducts() {
    const category = document.getElementById("category-filter").value;
    const maxPrice = document.getElementById("price-filter").value;

    document.querySelectorAll(".product").forEach(product => {
        const productCategory = product.dataset.category;
        const productPrice = parseFloat(product.dataset.price);

        const matchesCategory = category === "all" || productCategory === category;
        const matchesPrice = productPrice <= maxPrice;

        product.style.display = matchesCategory && matchesPrice ? "block" : "none";
    });
}
