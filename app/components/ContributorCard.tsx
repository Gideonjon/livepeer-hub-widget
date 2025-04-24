'use client';

import Image from 'next/image';
import { Contributor } from '../types';

export function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <div className="contributor-card relative flex flex-col items-center p-8 rounded-2xl border border-[#282828] bg-gradient-to-b from-[#131716] to-[#181818] hover:shadow-xl transition-all">
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07fbb2] to-[#7B5ED4] opacity-20 blur-xl rounded-2xl -z-10" />
      
      <div className="relative w-32 h-32 mb-6">
        <Image
          src={contributor.avatar_url}
          alt={`${contributor.login}'s avatar`}
          fill
          className="rounded-full object-cover border-2 border-[#07fbb2]"
          priority
        />
        {contributor.org_member && (
          <div className="absolute -top-2 -right-2 bg-[#07fbb2] text-[#131716] text-xs px-3 py-1 rounded-full font-bold">
            Team
          </div>
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-[#07fbb2] mb-2 font-['At_Surt']">
        {contributor.name || contributor.login}
      </h3>
      
      <a
        href={`https://github.com/${contributor.login}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[#53b9ab] hover:text-[#07fbb2] transition-colors font-['Favoritpro']"
      >
        @{contributor.login}
      </a>
      
      <div className="mt-4 flex items-center gap-2">
        <span className="text-[#07fbb2] font-bold">{contributor.contributions}</span>
        <span className="text-sm text-[#D9D9D9]">contributions</span>
      </div>
      
      {contributor.bio && (
        <p className="mt-4 text-sm text-[#D9D9D9] text-center max-w-xs">
          {contributor.bio}
        </p>
      )}
    </div>
  );
} 