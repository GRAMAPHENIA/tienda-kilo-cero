# 🛒 Tienda Kilo Cero

Tienda en línea con integración completa de MercadoPago.

## 🚀 Despliegue en Vercel

### 1. Variables de Entorno
Configura estas variables en Vercel (Settings → Environment Variables):

```
PUBLIC_MERCADOPAGO_PUBLIC=APP_USR-tu-public-key-de-produccion
MERCADOPAGO_ACCESS_TOKEN=APP_USR-tu-access-token-de-produccion
```

### 2. Build Settings
Vercel detectará automáticamente:
- **Framework**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `.vercel/output`
- **Adapter**: Vercel (configurado en `astro.config.mjs`)

### 3. URLs de Redirección
Las URLs de éxito/error se configuran automáticamente basadas en tu dominio de Vercel.

## 🧪 Testing

### Desarrollo Local
```bash
npm run dev
```

### Producción
1. Despliega a Vercel
2. Configura variables de entorno
3. Prueba el flujo de pago completo

## 📋 Flujo de Pago

1. Usuario agrega productos al carrito
2. Completa formulario de checkout
3. API crea preferencia de MercadoPago
4. Redirect a checkout de MercadoPago
5. Usuario paga
6. Redirect de vuelta a página de éxito/error

## 🔧 Tecnologías

- **Frontend**: Astro + JavaScript
- **Styling**: Tailwind CSS
- **Pagos**: MercadoPago API
- **Despliegue**: Vercel

## 📝 Notas

- Service Worker activado para PWA
- API routes configuradas para server-side rendering
- Variables de entorno seguras (no expuestas al cliente)

## 🔔 Notificaciones Toast

El proyecto incluye un sistema de notificaciones tipo “toast” listo para usar, con enfoque en accesibilidad y rendimiento:
- Posición: bottom-right
- Máximo visible: 2 toasts simultáneos (el resto se encola)
- Duración por defecto: 3000 ms
- Pausa automática del temporizador en hover/focus
- Accesible (aria-live, role=&quot;status&quot;, aria-atomic)

Cómo usar (desde el cliente):
```html
&lt;script&gt;
// Éxito
window.showToast.success('Producto agregado al carrito', 3000);

// Información
window.showToast.info('Producto agregado a favoritos');

// Advertencia
window.showToast.warning('Producto eliminado del carrito');

// Error
window.showToast.error('No se pudo procesar la acción');
&lt;/script&gt;
```

Integración técnica:
- Componente global en [ToastContainer.astro](src/components/ToastContainer.astro)
- Inyectado en el layout: [BaseLayout.astro](src/layouts/BaseLayout.astro) antes de cargar clientUtils
- Las utilidades del cliente ya lo aprovechan: [clientUtils.js](src/lib/clientUtils.js)

Buenas prácticas aplicadas:
- Accesibilidad con aria-live (polite / assertive), role=&quot;status&quot; y aria-atomic
- Límite de toasts visibles y cola FIFO para evitar saturación visual
- Pausa/reanudación del temporizador con hover/focus
- Animaciones respetando prefers-reduced-motion
- Sin botón de acción por defecto (según configuración solicitada)
