import mailjet from 'node-mailjet';
import { Order } from '../types';

const apiKey = process.env.MAILJET_API_KEY || '';
const apiSecret = process.env.MAILJET_SECRET_KEY || '';

let client: any = null;
if (apiKey && apiSecret) {
  client = mailjet.apiConnect(apiKey, apiSecret);
}

export async function sendOrderEmail(order: Order) {
  if (!client || !order.email) return;

  const text = `Thank you ${order.customerName} for your order! We will contact you shortly.\n\nOrder items:\n` +
    order.items.map(i => `${i.name} - KES ${i.price}`).join('\n');

  await client.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: process.env.MAILJET_FROM || 'noreply@example.com',
          Name: process.env.MAILJET_FROM_NAME || 'Mtumba Online'
        },
        To: [{ Email: order.email }],
        Subject: 'Order Confirmation',
        TextPart: text
      }
    ]
  });
}
