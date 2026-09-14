'use client';

import { useState } from 'react';
import type { CatalogFilters } from '@/app/catalog/Catalog.client';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import css from './Filters.module.css';

interface FiltersProps {
  brands: string[];
  priceRange: { min: number; max: number };
  onApply: (filters: CatalogFilters) => void;
}

export default function Filters({ brands, priceRange, onApply }: FiltersProps) {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const priceOptions = Array.from(
    { length: Math.ceil((priceRange.max - priceRange.min) / 10) + 1 },
    (_, i) => String(priceRange.min + i * 10)
  ).filter(p => Number(p) <= priceRange.max);

  const handleSearch = () => {
    onApply({
      brand: brand || undefined,
      price: price ? Number(price) : undefined,
      minMileage: minMileage ? Number(minMileage) : undefined,
      maxMileage: maxMileage ? Number(maxMileage) : undefined,
    });
  };

  const handleClear = () => {
    setBrand('');
    setPrice('');
    setMinMileage('');
    setMaxMileage('');
    onApply({});
  };

  return (
    <div className={css.filtersWrapper}>
      <CustomSelect
        label="Car brand"
        placeholder="Choose a brand"
        value={brand}
        options={brands}
        onChange={setBrand}
      />

      <CustomSelect
        label="Price/ 1 hour"
        placeholder="Choose a price"
        value={price}
        options={priceOptions}
        onChange={setPrice}
        formatSelected={v => `To $${v}`}
      />

      <div className={css.field}>
        <span className={css.label}>Car mileage / km</span>
        <div className={css.mileageContainer}>
          <input
            type="number"
            placeholder="From"
            className={`${css.mileageInput} ${css.fromInput}`}
            value={minMileage}
            onChange={e => setMinMileage(e.target.value)}
          />
          <div className={css.divider} />
          <input
            type="number"
            placeholder="To"
            className={`${css.mileageInput} ${css.toInput}`}
            value={maxMileage}
            onChange={e => setMaxMileage(e.target.value)}
          />
        </div>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.searchButton}
          onClick={handleSearch}
        >
          Search
        </button>
        <button type="button" className={css.clearButton} onClick={handleClear}>
          Clear filters
        </button>
      </div>
    </div>
  );
}
