import CatalogLoadingOverlay from '@/components/CatalogLoadingOverlay/CatalogLoadingOverlay';
import css from '@/components/CatalogLoadingOverlay/CatalogLoadingOverlay.module.css';

export default function Loading() {
  return (
    <main className={css.catalog}>
      <div style={{ height: '76px' }} />

      <div className={css.gridWrapper} style={{ minHeight: '600px' }}>
        <CatalogLoadingOverlay />
      </div>
    </main>
  );
}
