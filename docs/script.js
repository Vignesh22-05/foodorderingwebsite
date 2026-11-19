const menuItems = [
    { id: 1, name: "Classic Cheeseburger", category: "burgers", price: 8.99, desc: "Beef patty, cheddar, lettuce, house sauce." },
    { id: 2, name: "Spicy Crispy Chicken", category: "burgers", price: 9.49, desc: "Fried chicken breast, pickles, spicy mayo." },
    { id: 3, name: "Margherita Pizza", category: "pizza", price: 12.50, desc: "Fresh mozzarella, basil, San Marzano tomato sauce." },
    { id: 4, name: "Pepperoni Feast", category: "pizza", price: 14.00, desc: "Double pepperoni, oregano, mozzarella blend." },
    { id: 5, name: "Iced Mint Lemonade", category: "drinks", price: 3.50, desc: "Freshly squeezed lemons with crushed mint." },
    { id: 6, name: "Cold Brew Coffee", category: "drinks", price: 4.25, desc: "Steeped for 18 hours, served over ice." }
];

let cart = [];

const menuGrid = document.getElementById("menu-grid");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function renderMenu(category = "all") {
    menuGrid.innerHTML = "";
    const filtered = category === "all"
        ? menuItems
        : menuItems.filter(item => item.category === category);

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
      </div>
      <div class="card-bottom">
        <span class="price">$${item.price.toFixed(2)}</span>
        <button class="add-btn" onclick="addToCart(${item.id})">Add +</button>
      </div>
    `;
        menuGrid.appendChild(card);
    });
}

function addToCart(id) {
    const item = menuItems.find(product => product.id === id);
    const existing = cart.find(entry => entry.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>$${item.price.toFixed(2)} x ${item.qty}</small>
      </div>
      <button onclick="removeFromCart(${item.id})" style="background:none;border:none;color:#e63946;cursor:pointer;">Remove</button>
    `;
        cartItemsContainer.appendChild(row);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);
}

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        renderMenu(btn.dataset.category);
    });
});

document.getElementById("cart-toggle").addEventListener("click", () => {
    cartSidebar.classList.add("open");
});

document.getElementById("close-cart").addEventListener("click", () => {
    cartSidebar.classList.remove("open");
});

document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert(`Order placed! Total charged: $${cartTotal.textContent}`);
    cart = [];
    updateCartUI();
    cartSidebar.classList.remove("open");
});

renderMenu();
