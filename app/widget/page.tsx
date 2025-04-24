'use client';

import { useSearchParams } from 'next/navigation';
import { ContributorsWidget } from '../components/ContributorsWidget';

export default function WidgetPage() {
  const searchParams = useSearchParams();
  
  const config = {
    maxDisplay: Number(searchParams.get('maxDisplay') || '1'),
    autoRotate: searchParams.get('autoRotate') !== 'false',
    rotationInterval: Number(searchParams.get('rotationInterval') || '5000'),
    randomize: searchParams.get('randomize') !== 'false'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131716]">
      <ContributorsWidget {...config} />
    </div>
  );
} 