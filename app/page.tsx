import css from './page.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className={css.main}>
      <section className={css.hero}>
        <div className={css.container}>
          <div className={css.textContainer}>
            <h1 className={css.title}>Find your perfect rental car</h1>

            <p className={css.description}>
              Reliable and budget-friendly rentals for any journey
            </p>
          </div>
          <Link href="/catalog/" className={css.button}>
            View Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
