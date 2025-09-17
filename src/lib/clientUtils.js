// Funciones del lado del cliente para carrito y favoritos
// Definir funciones con fallback inmediato
window.addToCart = function(id, nombre, precio, imagen) {
	const cart = JSON.parse(localStorage.getItem('cart') || '[]');
	const existingItem = cart.find(item => item.id === id);

	if (existingItem) {
		existingItem.cantidad += 1;
	} else {
		cart.push({ id, nombre, precio, cantidad: 1, imagen });
	}

	localStorage.setItem('cart', JSON.stringify(cart));
	setTimeout(() => {
		window.dispatchEvent(new CustomEvent('cartUpdated'));
	}, 10);

	// Mostrar toast de éxito
	if (window.showToast) {
		window.showToast.success(`"${nombre}" agregado al carrito`);
	}
};

window.toggleFavorite = function(id) {
	const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
	const index = favorites.indexOf(id);

	if (index > -1) {
		favorites.splice(index, 1);
		if (window.showToast) {
			window.showToast.info('Producto removido de favoritos');
		}
	} else {
		favorites.push(id);
		if (window.showToast) {
			window.showToast.success('Producto agregado a favoritos');
		}
	}

	localStorage.setItem('favorites', JSON.stringify(favorites));
	window.dispatchEvent(new CustomEvent('favoritesUpdated'));
	updateFavoriteIcon(id);
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

// Importamos el StorageService dinámicamente para mejorar
import('./storageService').then(({ StorageService }) => {
	// Redefinir funciones para usar StorageService
	window.addToCart = function(id, nombre, precio, imagen) {
		try {
			const cart = StorageService.getCart();
			const existingItem = cart.find(item => item.id === id);

			if (existingItem) {
				existingItem.cantidad += 1;
			} else {
				cart.push({ id, nombre, precio, cantidad: 1, imagen });
			}

			const success = StorageService.saveCart(cart);

			if (success) {
				// Mostrar toast de éxito
				if (window.showToast) {
					window.showToast.success(`"${nombre}" agregado al carrito`);
				}
			} else {
				// Mostrar toast de error
				if (window.showToast) {
					window.showToast.error('Error al agregar producto al carrito');
				}
			}
		} catch (error) {
			console.error('Error en addToCart:', error);
			if (window.showToast) {
				window.showToast.error('Error interno del sistema');
			}
		}
	};

	window.toggleFavorite = function(id) {
		try {
			const favorites = StorageService.getFavorites();
			const index = favorites.indexOf(id);

			if (index > -1) {
				favorites.splice(index, 1);
				if (window.showToast) {
					window.showToast.info('Producto removido de favoritos');
				}
			} else {
				favorites.push(id);
				if (window.showToast) {
					window.showToast.success('Producto agregado a favoritos');
				}
			}

			const success = StorageService.saveFavorites(favorites);

			if (success) {
				updateFavoriteIcon(id);
			} else {
				if (window.showToast) {
					window.showToast.error('Error al actualizar favoritos');
				}
			}
		} catch (error) {
			console.error('Error en toggleFavorite:', error);
			if (window.showToast) {
				window.showToast.error('Error interno del sistema');
			}
		}
	};

	// Actualizar updateFavoriteIcon para usar StorageService
	function updateFavoriteIcon(id) {
		const button = document.getElementById(`fav-${id}`);
		if (button) {
			const svg = button.querySelector('svg');
			const favorites = StorageService.getFavorites();
			if (favorites.includes(id)) {
				svg?.classList.add('fill-current', 'text-[#EC0B43]');
			} else {
				svg?.classList.remove('fill-current', 'text-[#EC0B43]');
			}
		}
	}
}).catch(error => {
	console.error('Error cargando StorageService:', error);
	// Las funciones ya están definidas con fallback
});