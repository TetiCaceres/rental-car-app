import { api } from './axiosInstance';
import type { BookingRequestData, BookingRequestResponse } from '@/types/car';

export const createBookingRequest = async (
  carId: string,
  data: BookingRequestData
): Promise<BookingRequestResponse> => {
  const response = await api.post<BookingRequestResponse>(
    `/cars/${carId}/booking-requests`,
    data
  );
  return response.data;
};
