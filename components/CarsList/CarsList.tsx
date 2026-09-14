import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '../../types/car';
import css from './CarsList.module.css';

export interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <ul className={css.list}>
      {cars.map(car => (
        <li className={css.card} key={car.id}>
          <div className={css.imageWrapper}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 768px) 100vw, 274px"
              className={css.image}
            />
          </div>

          <div className={css.titleRow}>
            <h2 className={css.title}>
              {car.brand} <span className={css.accent}>{car.model}</span>,{' '}
              {car.year}
            </h2>
            <span className={css.price}>${car.rentalPrice}</span>
          </div>

          <div className={css.details}>
            <span className={css.detailItem}>{car.location?.city}</span>
            <span className={css.detailItem}>{car.location?.country}</span>
            <span className={css.detailItem}>{car.rentalCompany}</span>
            <span className={css.detailItem}>{car.type}</span>
            <span className={css.detailItem}>
              {car.mileage.toLocaleString('uk-UA')} km
            </span>
          </div>

          <Link
            href={`/catalog/${car.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={css.button}
          >
            Read more
          </Link>
        </li>
      ))}
    </ul>
  );
}
