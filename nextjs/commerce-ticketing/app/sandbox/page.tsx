'use client';

export default async function Home() {
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
