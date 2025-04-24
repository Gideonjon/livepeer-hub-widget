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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await fetch('/api/contributors');
        if (!response.ok) throw new Error('Failed to fetch contributors');
        
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid data format');

        setContributors(data);
        setDisplayedContributors(getRandomContributors(data, maxDisplay));
        setError(null);
      } catch (err) {
        console.error('Failed to fetch contributors:', err);
        setError('Failed to load contributors');
      } finally {
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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#07fbb2] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-[#D9D9D9]">
        <p>{error}</p>
      </div>
    );
  }

  if (!displayedContributors.length) {
    return (
      <div className="flex items-center justify-center h-64 text-[#D9D9D9]">
        <p>No contributors found</p>
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