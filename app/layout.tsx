import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';

import QueryProvider from '@/components/TanStackProvider/TanStackProvider';

const manrope = Manrope({
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RentalCar — Rent a car easily',
  description:
    'Find and rent the perfect car for your next trip with RentalCar.',
  keywords: ['car rental', 'rental car', 'rent a car', 'cars'],
  openGraph: {
    title: 'RentalCar — Rent a car easily',
    description:
      'Find and rent the perfect car for your next trip with RentalCar.',
    url: 'https://your-rentalcar.vercel.app',
    siteName: 'RentalCar',
    type: 'website',
    images: [
      {
        url: 'https://your-rentalcar.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RentalCar',
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
