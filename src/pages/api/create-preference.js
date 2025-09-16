import { MercadoPagoConfig, Preference } from 'mercadopago';

export const prerender = false;

export const POST = async ({ request }) => {
  try {
    console.log('API create-preference called');
    const { items, customerInfo } = await request.json();
    console.log('Received items:', items);
    console.log('Received customerInfo:', customerInfo);

    const accessToken = import.meta.env.MERCADOPAGO_ACCESS_TOKEN;
    console.log('Access token available:', !!accessToken);
    console.log('Access token value:', accessToken ? 'Present' : 'Missing');

    if (!accessToken) {
      throw new Error('MERCADOPAGO_ACCESS_TOKEN no está configurado');
    }

    // Configurar MercadoPago
    const client = new MercadoPagoConfig({
      accessToken: accessToken,
    });

    // Crear items para la preferencia
    const preferenceItems = items.map((item) => ({
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