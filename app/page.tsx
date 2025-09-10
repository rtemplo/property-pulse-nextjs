import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';

// Add artificial delay to see loading component
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function HomePage() {
  // Add 0.3 second delay to see loading component
  // await delay(300);

  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
}
