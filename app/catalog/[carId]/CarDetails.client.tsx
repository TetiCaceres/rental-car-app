// app/catalog/[carId]/CarDetails.client.tsx
'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchCarById } from '@/lib/api/cars';
import type { Car } from '@/types/car';
import RentalForm from '@/components/RentalForm/RentalForm';
import CatalogLoadingOverlay from '@/components/CatalogLoadingOverlay/CatalogLoadingOverlay';

import {
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoCalendarOutline,
 
} from 'react-icons/io5';
import { BsFuelPump } from 'react-icons/bs';
import css from './CarDetails.module.css';
import { BsCarFront } from 'react-icons/bs';
import { GoGear } from 'react-icons/go';
import { PiRoadHorizon } from 'react-icons/pi';

interface CarDetailsClientProps {
  carId: string;
}

export default function CarDetailsClient({ carId }: CarDetailsClientProps) {
  const {
    data: car,
    isLoading,
    isError,
  } = useQuery<Car>({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
  });

  if (isLoading) return <CatalogLoadingOverlay />;
  if (isError || !car) return <p>Something went wrong.</p>;

  return (
    <main className={css.page}>
      <div className={css.card}>
        <div className={css.leftColumn}>
          <div className={css.gallery}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 768px) 100vw, 512px"
              className={css.image}
              priority
            />
          </div>

          <RentalForm carId={car.id} carName={`${car.brand} ${car.model}`} />
        </div>

        <div className={css.info}>
          <div className={css.headerRow}>
            <h1 className={css.title}>
              {car.brand} {car.model}, {car.year}
            </h1>
            {car.stockNumber && (
              <span className={css.articleId}>Article: {car.stockNumber}</span>
            )}
          </div>

          <p className={css.location}>
            <IoLocationOutline className={css.icon} />
            {car.location.city}, {car.location.country}
          </p>

          <p className={css.price}>${car.rentalPrice}</p>

          <p className={css.description}>{car.description}</p>

          <h2 className={css.subtitle}>Rental Conditions:</h2>
          <ul className={css.checklist}>
            {car.rentalConditions.map(condition => (
              <li key={condition}>
                <IoCheckmarkCircleOutline className={css.checkIcon} />
                {condition}
              </li>
            ))}
          </ul>

          <h2 className={css.subtitle}>Car Specifications:</h2>
          <ul className={css.specsList}>
            <li>
              <IoCalendarOutline className={css.specIcon} />
              Year: {car.year}
            </li>
            <li>
              <BsCarFront className={css.specIcon} />
              Type: {car.type}
            </li>
            <li>
              <BsFuelPump className={css.specIcon} />
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li>
              <GoGear className={css.specIcon} />
              Engine: {car.engine}
            </li>
            <li>
              <PiRoadHorizon className={css.specIcon} />
              Mileage: {car.mileage.toLocaleString()} km
            </li>
          </ul>

          <h2 className={css.subtitle}>Features:</h2>
          <ul className={css.checklist}>
            {car.features.map(feature => (
              <li key={feature}>
                <IoCheckmarkCircleOutline className={css.checkIcon} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
