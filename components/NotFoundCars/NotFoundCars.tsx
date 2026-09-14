import Image from 'next/image';

import css from './NotFoundCars.module.css';

interface NotFoundCarsProps {
  onReset: () => void;
}

export default function NotFoundCars({ onReset }: NotFoundCarsProps) {
  return (
    <div className={css.wrapper}>
      <Image
        src="/images/not-found-car.svg"
        alt="No cars found"
        width={414}
        height={388}
        className={css.illustration}
      />

      <h2 className={css.title}>No cars found</h2>
      <p className={css.description}>
        We couldn`t find any cars that match your current filters. Try changing
        your search criteria or reset the filters.
      </p>

      <button type="button" className={css.resetButton} onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
