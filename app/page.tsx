import { ContributorsWidget } from './components/ContributorsWidget';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F0F0F]">
      <ContributorsWidget 
        randomize={true}
        maxDisplay={1}
        autoRotate={true}
        rotationInterval={5000}
      />
    </main>
  );
}
