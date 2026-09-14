// app/catalog/[carId]/error.tsx
'use client';

export default function Error({ error }: { error: Error }) {
  return <p>Could not load car details. {error.message}</p>;
}
