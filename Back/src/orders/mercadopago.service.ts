import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Preference } from 'mercadopago';
import { MercadoPagoConfig } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
    private client: MercadoPagoConfig;

    constructor(private configService: ConfigService) {
        const accessToken = this.configService.get<string>('apikeyMP') || '';
        console.log('Mercado Pago Access Token:', accessToken);
        this.client = new MercadoPagoConfig({
            accessToken: accessToken,
        });

    }

    async createPreference(order: any, items: any[]) {
        try {
            const preference = new Preference(this.client);

            const siteUrl = this.configService.get('UrlSite') || 'http://localhost:5173';

            console.log('Site URL from config:', siteUrl);

            const body = {
                items: items.map(item => ({
                    id: item.productId.toString(),
                    title: item.productName,
                    quantity: Number(item.quantity),
                    unit_price: Number(item.price),
                    currency_id: 'ARS',
                })),
                back_urls: {
                    success: `${siteUrl}/success`,
                    failure: `${siteUrl}/failure`,
                    pending: `${siteUrl}/pending`,
                },
                external_reference: order.id.toString(),
            };

            console.log('Mercado Pago Request Body:', JSON.stringify(body, null, 2));

            const response = await preference.create({ body });
            return response.init_point;
        } catch (error) {
            console.error('Error creating Mercado Pago preference:', error);
            if (error.response) {
                console.error('Mercado Pago Error Response:', JSON.stringify(error.response, null, 2));
            }
            throw error;
        }
    }
}
