import { Product, Order } from '../types';

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

// Product helpers
export const getProducts = () => fetchJson<Product[]>('/api/products');
export const createProduct = (data: Omit<Product, '_id' | 'createdAt'>) =>
  fetchJson<Product>('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
export const deleteProduct = (id: string) =>
  fetchJson<void>(`/api/products/${id}`, { method: 'DELETE' });
export const updateProduct = (id: string, data: Partial<Product>) =>
  fetchJson<Product>(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

// Order helpers
export const getOrders = () => fetchJson<Order[]>('/api/orders');
export const createOrder = (data: Omit<Order, '_id' | 'status' | 'createdAt'>) =>
  fetchJson<Order>('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
export const updateOrder = (id: string, data: Partial<Order>) =>
  fetchJson<Order>(`/api/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
