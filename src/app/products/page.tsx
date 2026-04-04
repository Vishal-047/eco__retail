import React from 'react';
import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Sustainable Products | EcoRetail',
  description: 'Discover eco-friendly products with transparent carbon emission data and green scores.',
};

export default function ProductsPage() {
  return <ProductsClient />;
}