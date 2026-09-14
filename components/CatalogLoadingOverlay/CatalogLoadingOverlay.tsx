import css from './CatalogLoadingOverlay.module.css';

export default function CatalogLoadingOverlay() {
  return (
    <div className={css.overlayWrapper}>
      <div className={css.overlay}>
        <div className={css.spinner} />
        <h3 className={css.title}>Loading cars...</h3>
        <p className={css.description}>
          Please wait while we fetch the best cars for you
        </p>
      </div>
    </div>
  );
}
