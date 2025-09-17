export interface CartItem {
	id: number;
	nombre: string;
	precio: number;
	cantidad: number;
	imagen: string;
}

// Importar StorageService dinámicamente para compatibilidad
let StorageService: any = null;

try {
  // Intentar importar el StorageService
  import('./storageService').then(module => {
    StorageService = module.StorageService;
  }).catch(() => {
    console.warn('StorageService no disponible, usando localStorage nativo');
  });
} catch {
  console.warn('Error importando StorageService');
}

export class CartService {
  private static CART_KEY = 'cart';

  static getCart(): CartItem[] {
    if (StorageService) {
      return StorageService.getCart();
    }

    // Fallback a localStorage nativo
    if (typeof window === 'undefined') return [];
    try {
      const cart = localStorage.getItem(this.CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error leyendo carrito:', error);
      return [];
    }
  }

  static addToCart(producto: Omit<CartItem, 'cantidad'>): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === producto.id);

    if (existingItem) {
      existingItem.cantidad += 1;
    } else {
      cart.push({ ...producto, cantidad: 1 });
    }

    this.saveCart(cart);
  }

  static removeFromCart(productId: number): void {
    const cart = this.getCart().filter(item => item.id !== productId);
    this.saveCart(cart);
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

    this.saveCart(cart);
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
    if (StorageService) {
      StorageService.clearCart();
    } else {
      localStorage.removeItem(this.CART_KEY);
    }
    this.notifyCartUpdate();
  }

  private static saveCart(cart: CartItem[]): void {
    if (StorageService) {
      StorageService.saveCart(cart);
    } else {
      // Fallback a localStorage nativo
      try {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
        this.notifyCartUpdate();
      } catch (error) {
        console.error('Error guardando carrito:', error);
      }
    }
  }

  private static notifyCartUpdate(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }, 10);
    }
  }
}