'use client';

import { useEffect } from 'react';

export default async function Home() {

  useEffect(() => {
    console.log('test');
  }, [1, 2, 3]);

  return (
    <button
      onClick={() => {
        console.log('test');
      }}
    >
      Test
    </button>
  );
}
