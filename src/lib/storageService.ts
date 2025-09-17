// Servicio robusto para gestión de localStorage con validaciones y manejo de errores

export interface StorageItem {
  id: string | number;
  data: any;
  timestamp: number;
  expiresAt?: number;
}

export class StorageService {
  private static readonly CART_KEY = 'cart_v2';
  private static readonly FAVORITES_KEY = 'favorites_v2';
  private static readonly STORAGE_VERSION = '2.0';

  // Verificar si localStorage está disponible
  private static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Obtener datos con validación
  private static getData(key: string): any[] {
    if (!this.isStorageAvailable()) {
      console.warn('localStorage no disponible');
      return [];
    }

    try {
      const data = localStorage.getItem(key);
      if (!data) return [];

      const parsed = JSON.parse(data);

      // Validar estructura de datos
      if (!Array.isArray(parsed)) {
        console.warn(`Datos inválidos en ${key}, reiniciando`);
        this.clearData(key);
        return [];
      }

      return parsed;
    } catch (error) {
      console.error(`Error al leer ${key}:`, error);
      this.clearData(key);
      return [];
    }
  }

  // Guardar datos con validación
  private static setData(key: string, data: any[]): boolean {
    if (!this.isStorageAvailable()) {
      console.warn('localStorage no disponible, no se puede guardar');
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error al guardar ${key}:`, error);
      return false;
    }
  }

  // Limpiar datos
  private static clearData(key: string): void {
    if (this.isStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  // Métodos públicos para carrito
  static getCart(): any[] {
    return this.getData(this.CART_KEY);
  }

  static saveCart(cart: any[]): boolean {
    const success = this.setData(this.CART_KEY, cart);
    if (success) {
      this.notifyCartUpdate();
    }
    return success;
  }

  static clearCart(): void {
    this.clearData(this.CART_KEY);
    this.notifyCartUpdate();
  }

  // Métodos públicos para favoritos
  static getFavorites(): number[] {
    return this.getData(this.FAVORITES_KEY);
  }

  static saveFavorites(favorites: number[]): boolean {
    const success = this.setData(this.FAVORITES_KEY, favorites);
    if (success) {
      this.notifyFavoritesUpdate();
    }
    return success;
  }

  static clearFavorites(): void {
    this.clearData(this.FAVORITES_KEY);
    this.notifyFavoritesUpdate();
  }

  // Sistema de notificaciones
  private static notifyCartUpdate(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }, 10);
    }
  }

  private static notifyFavoritesUpdate(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('favoritesUpdated'));
      }, 10);
    }
  }

  // Método para migrar datos antiguos
  static migrateOldData(): void {
    if (!this.isStorageAvailable()) return;

    try {
      // Migrar carrito antiguo
      const oldCart = localStorage.getItem('cart');
      if (oldCart && !localStorage.getItem(this.CART_KEY)) {
        localStorage.setItem(this.CART_KEY, oldCart);
        localStorage.removeItem('cart');
        console.log('Carrito migrado a nueva versión');
      }

      // Migrar favoritos antiguos
      const oldFavorites = localStorage.getItem('favorites');
      if (oldFavorites && !localStorage.getItem(this.FAVORITES_KEY)) {
        localStorage.setItem(this.FAVORITES_KEY, oldFavorites);
        localStorage.removeItem('favorites');
        console.log('Favoritos migrados a nueva versión');
      }
    } catch (error) {
      console.error('Error en migración:', error);
    }
  }
}