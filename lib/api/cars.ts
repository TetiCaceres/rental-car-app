import { api } from './axiosInstance';
import type {
  Car,
  CarsResponse,
  CarsFilters,
  FetchCarsParams,
} from '@/types/car';

export const fetchCarsFilters = async (): Promise<CarsFilters> => {
  const response = await api.get<CarsFilters>('/cars/filters');
  return response.data;
};

export const fetchCars = async ({
  page,
  perPage,
  brand,
  price,
  minMileage,
  maxMileage,
}: FetchCarsParams): Promise<CarsResponse> => {
  const response = await api.get<CarsResponse>('/cars', {
    params: {
      page,
      perPage,
      brand: brand || undefined,
      price: price ?? undefined,
      minMileage: minMileage ?? undefined,
      maxMileage: maxMileage ?? undefined,
    },
  });

  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};
