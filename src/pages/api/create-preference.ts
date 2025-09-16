import type { APIRoute } from 'astro';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { items, customerInfo } = await request.json();

    // Configurar MercadoPago
    const client = new MercadoPagoConfig({
      accessToken: import.meta.env.MERCADOPAGO_ACCESS_TOKEN,
    });

    // Crear items para la preferencia
    const preferenceItems = items.map((item: any) => ({
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      currency_id: 'ARS', // Moneda Argentina
    }));

    // Crear preferencia
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: preferenceItems,
        payer: {
          name: customerInfo.name,
          email: customerInfo.email,
        },
        back_urls: {
          success: `${new URL(request.url).origin}/success`,
          failure: `${new URL(request.url).origin}/failure`,
          pending: `${new URL(request.url).origin}/pending`,
        },
        auto_return: 'approved',
        external_reference: `order_${Date.now()}`,
      },
    });

    return new Response(JSON.stringify({
      preferenceId: result.id,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating preference:', error);
    return new Response(JSON.stringify({
      error: 'Error al crear la preferencia de pago',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};