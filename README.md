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
- **Output Directory**: `dist`

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
