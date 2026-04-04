import React from 'react';
import HomeClient from './HomeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EcoRetail | Shop Smart, Save the Planet',
  description: 'Track carbon emissions, choose sustainable products, and make eco-friendly shopping decisions with our comprehensive platform.',
};

export default function HomePage() {
  return <HomeClient />;
}
