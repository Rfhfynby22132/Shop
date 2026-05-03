// Функция для получения корзины из localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Функция для сохранения корзины в localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция обновления счётчика корзины на главной странице
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) cartCountSpan.innerText = totalItems;
}

// Функция добавления товара в корзину
function addToCart(productName, productPrice) {
    let cart = getCart();
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
    showToast(`✅ ${productName} добавлен в корзину!`);
}

// Функция показа уведомления (toast)
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount(); // обновляем счётчик при загрузке

    const buttons = document.querySelectorAll('.product-card button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').innerText;
            const priceText = card.querySelector('p').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, '')); // извлекаем число из "Цена: 100 ₽"

            // Анимация кнопки
            this.classList.add('button-clicked');
            setTimeout(() => this.classList.remove('button-clicked'), 150);

            addToCart(productName, price);
        });
    });
});