// Funciones del lado del cliente para carrito y favoritos

window.addToCart = function(id, nombre, precio, imagen) {
	const cart = JSON.parse(localStorage.getItem('cart') || '[]');
	const existingItem = cart.find(item => item.id === id);

	if (existingItem) {
		existingItem.cantidad += 1;
	} else {
		cart.push({ id, nombre, precio, cantidad: 1, imagen });
	}

	localStorage.setItem('cart', JSON.stringify(cart));
	window.dispatchEvent(new CustomEvent('cartUpdated'));
	alert('Producto agregado al carrito');
};

window.toggleFavorite = function(id) {
	const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
	const index = favorites.indexOf(id);

	if (index > -1) {
		favorites.splice(index, 1);
	} else {
		favorites.push(id);
	}

	localStorage.setItem('favorites', JSON.stringify(favorites));
	updateFavoriteIcon(id);
	window.dispatchEvent(new CustomEvent('favoritesUpdated'));
};

function updateFavoriteIcon(id) {
	const button = document.getElementById(`fav-${id}`);
	if (button) {
		const svg = button.querySelector('svg');
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		if (favorites.includes(id)) {
			svg?.classList.add('fill-current', 'text-[#EC0B43]');
		} else {
			svg?.classList.remove('fill-current', 'text-[#EC0B43]');
		}
	}
}

// Inicializar iconos de favoritos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('[id^="fav-"]');
	buttons.forEach(button => {
		const id = parseInt(button.id.split('-')[1]);
		updateFavoriteIcon(id);
	});
});