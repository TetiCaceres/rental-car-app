import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchCars, fetchCarsFilters } from '@/lib/api/cars';
import { PER_PAGE } from '@/lib/constans';
import CatalogClient from './Catalog.client';

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars', {}],
    queryFn: () => fetchCars({ page: 1, perPage: PER_PAGE }),
    initialPageParam: 1,
  });

  await queryClient.prefetchQuery({
    queryKey: ['carsFilters'],
    queryFn: fetchCarsFilters,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
