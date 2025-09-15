export interface CartItem {
	id: number;
	nombre: string;
	precio: number;
	cantidad: number;
	imagen: string;
}

export class CartService {
	private static CART_KEY = 'cart';

	static getCart(): CartItem[] {
		if (typeof window === 'undefined') return [];
		const cart = localStorage.getItem(this.CART_KEY);
		return cart ? JSON.parse(cart) : [];
	}

	static addToCart(producto: Omit<CartItem, 'cantidad'>): void {
		const cart = this.getCart();
		const existingItem = cart.find(item => item.id === producto.id);

		if (existingItem) {
			existingItem.cantidad += 1;
		} else {
			cart.push({ ...producto, cantidad: 1 });
		}

		localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
		this.notifyCartUpdate();
	}

	static removeFromCart(productId: number): void {
		const cart = this.getCart().filter(item => item.id !== productId);
		localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
		this.notifyCartUpdate();
	}

	static updateQuantity(productId: number, cantidad: number): void {
		const cart = this.getCart();
		const item = cart.find(item => item.id === productId);

		if (item) {
			item.cantidad = cantidad;
			if (item.cantidad <= 0) {
				this.removeFromCart(productId);
				return;
			}
		}

		localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
		this.notifyCartUpdate();
	}

	static getTotal(): number {
		const cart = this.getCart();
		return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
	}

	static getItemCount(): number {
		const cart = this.getCart();
		return cart.reduce((count, item) => count + item.cantidad, 0);
	}

	static clearCart(): void {
		localStorage.removeItem(this.CART_KEY);
		this.notifyCartUpdate();
	}

	private static notifyCartUpdate(): void {
		window.dispatchEvent(new CustomEvent('cartUpdated'));
	}
}