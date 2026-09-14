'use client';

import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchCars, fetchCarsFilters } from '@/lib/api/cars';
import { PER_PAGE } from '@/lib/constans';
import type { FetchCarsParams } from '@/types/car';

import Filters from '@/components/Filters/Filters';
import CarsList from '@/components/CarsList/CarsList';
import NotFoundCars from '@/components/NotFoundCars/NotFoundCars';
import CatalogLoadingOverlay from '@/components/CatalogLoadingOverlay/CatalogLoadingOverlay';

import css from './catalog.module.css';

export interface CatalogFilters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export default function CatalogClient() {
  const [filters, setFilters] = useState<CatalogFilters>({});
  const [filtersKey, setFiltersKey] = useState(0);

  const { data: filtersData } = useQuery({
    queryKey: ['carsFilters'],
    queryFn: fetchCarsFilters,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        perPage: PER_PAGE,
        ...filters,
      } as FetchCarsParams),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const cars = data?.pages.flatMap(page => page.cars) ?? [];

  const isInitialLoading =
    isFetching && cars.length === 0 && !isFetchingNextPage;
  const isBackgroundLoading =
    isFetching && cars.length > 0 && !isFetchingNextPage;

  const handleApplyFilters = (newFilters: CatalogFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
    setFiltersKey(prev => prev + 1);
  };

  return (
    <main className={css.catalog}>
      <Filters
        key={filtersKey}
        brands={filtersData?.brands ?? []}
        priceRange={filtersData?.price ?? { min: 0, max: 100 }}
        onApply={handleApplyFilters}
      />

      {isError && (
        <p className={css.errorMessage}>
          Something went wrong while loading cars.
        </p>
      )}

      {/* Initial loading (first visit to the page) */}
      {isInitialLoading && (
        <div className={css.gridWrapper} style={{ minHeight: '500px' }}>
          <CatalogLoadingOverlay />
        </div>
      )}

      {/* If nothing is found */}
      {!isInitialLoading && !isError && cars.length === 0 && (
        <NotFoundCars onReset={handleResetFilters} />
      )}

      {/* Список авто та фоновий лоудер під час фільтрації */}
      {cars.length > 0 && (
        <div className={css.gridWrapper}>
          <div className={isBackgroundLoading ? css.dimmed : ''}>
            <CarsList cars={cars} />
          </div>
          {isBackgroundLoading && <CatalogLoadingOverlay />}
        </div>
      )}

      {/* Load more button (outside the overlay) */}
      {hasNextPage && (
        <button
          type="button"
          className={css.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </main>
  );
}
