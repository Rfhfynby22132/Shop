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


// Функция фильтрации товаров
function filterProducts() {
    const searchText = document.getElementById('searchInput').value.toLowerCase().trim();
    const priceFrom = parseFloat(document.getElementById('priceFrom').value);
    const priceTo = parseFloat(document.getElementById('priceTo').value);

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h3').innerText.toLowerCase();
        const priceText = card.querySelector('p').innerText;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));

        let matchesSearch = true;
        let matchesPrice = true;

        // Фильтр по названию
        if (searchText !== '') {
            matchesSearch = productName.includes(searchText);
        }

        // Фильтр по цене (от)
        if (!isNaN(priceFrom) && priceFrom !== '') {
            if (price < priceFrom) matchesPrice = false;
        }
        // Фильтр по цене (до)
        if (!isNaN(priceTo) && priceTo !== '') {
            if (price > priceTo) matchesPrice = false;
        }

        if (matchesSearch && matchesPrice) {
            card.style.display = ''; // показываем
        } else {
            card.style.display = 'none'; // скрываем
        }
    });
}

// Сброс фильтров
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('priceFrom').value = '';
    document.getElementById('priceTo').value = '';
    filterProducts(); // показываем все карточки
}

// Добавляем обработчики событий после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // ... (твой существующий код для кнопок и счётчика) ...

    // Навешиваем фильтры
    const searchInput = document.getElementById('searchInput');
    const priceFrom = document.getElementById('priceFrom');
    const priceTo = document.getElementById('priceTo');
    const resetBtn = document.getElementById('resetFilter');

    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (priceFrom) priceFrom.addEventListener('input', filterProducts);
    if (priceTo) priceTo.addEventListener('input', filterProducts);
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);
});