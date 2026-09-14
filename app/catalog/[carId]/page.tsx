// app/catalog/[carId]/page.tsx
import type { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchCarById } from '@/lib/api/cars';
import CarDetailsClient from './CarDetails.client'

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailsPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = await fetchCarById(carId);

  const title = `${car.brand} ${car.model} — RentalCar`;
  const description = car.description.slice(0, 150);

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: car.img }] },
  };
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient carId={carId} />
    </HydrationBoundary>
  );
}
