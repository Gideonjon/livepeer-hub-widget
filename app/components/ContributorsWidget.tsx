'use client';

import { useEffect, useState } from 'react';
import { Contributor } from '../types';
import { ContributorCard } from './ContributorCard';

export function ContributorsWidget({
  randomize = true,
  maxDisplay = 1,
  autoRotate = true,
  rotationInterval = 5000,
}: ContributorWidgetProps) {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [displayedContributors, setDisplayedContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await fetch('https://contributors-spotlight.vercel.app/api/contributors');
        const data = await response.json();
        setContributors(data);
        setDisplayedContributors(getRandomContributors(data, maxDisplay));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch contributors:', error);
        setLoading(false);
      }
    }

    fetchContributors();
  }, [maxDisplay]);

  useEffect(() => {
    if (!autoRotate || !contributors.length) return;

    const interval = setInterval(() => {
      setDisplayedContributors(getRandomContributors(contributors, maxDisplay));
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, contributors, maxDisplay, rotationInterval]);

  function getRandomContributors(contributors: Contributor[], count: number) {
    return [...contributors]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#00A55F]" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 w-full max-w-screen-xl mx-auto p-4">
      {displayedContributors.map((contributor) => (
        <ContributorCard key={contributor.login} contributor={contributor} />
      ))}
    </div>
  );
} 