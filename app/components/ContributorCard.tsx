"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { Contributor } from "@/types"
import { ExternalLink, Github, MapPin, Building, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContributorCardProps {
  contributor: Contributor
  theme?: "dark" | "light"
}

interface GitHubUser {
  avatar_url: string
  name: string | null
  bio: string | null
  location: string | null
  company: string | null
  blog: string
  twitter_username: string | null
  followers: number
  following: number
  public_repos: number
}

export function ContributorCard({ contributor, theme = "dark" }: ContributorCardProps) {
  const [imageError, setImageError] = useState(false)
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchGitHubUser() {
      if (!contributor.login) return

      try {
        setIsLoading(true)
        const response = await fetch(`/api/github-user?username=${contributor.login}`)

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub user data")
        }

        const userData = await response.json()
        setGithubUser(userData)
      } catch (error) {
        console.error("Error fetching GitHub user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGitHubUser()
  }, [contributor.login])

  const isDark = theme === "dark"

  // Use GitHub data if available, otherwise fall back to contributor data
  const avatarUrl = githubUser?.avatar_url || contributor.avatar_url
  const name = githubUser?.name || contributor.name || contributor.login
  const bio = githubUser?.bio || contributor.bio
  const location = githubUser?.location || contributor.location
  const company = githubUser?.company || contributor.company
  const blog = githubUser?.blog || contributor.blog_url
  const twitter = githubUser?.twitter_username || contributor.twitter_username

  return (
    <div
      className={cn(
        "contributor-card relative flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl transition-all",
        isDark
          ? "border border-[#282828] bg-gradient-to-b from-[#131716] to-[#181818] hover:shadow-lg hover:shadow-[#07fbb2]/10"
          : "border border-gray-200 bg-white hover:shadow-lg",
      )}
    >
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07fbb2] to-[#7B5ED4] opacity-10 blur-xl rounded-2xl -z-10" />

      <div className="relative w-24 h-24 md:w-28 md:h-28">
        {!isLoading && avatarUrl && !imageError ? (
          <Image
            src={avatarUrl || "/placeholder.svg"}
            alt={`${contributor.login}'s avatar`}
            fill
            className="rounded-full object-cover border-2 border-[#07fbb2]"
            priority
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 96px, 112px"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#282828] flex items-center justify-center border-2 border-[#07fbb2]">
            <span className="text-2xl text-[#07fbb2]">{contributor.login.charAt(0).toUpperCase()}</span>
          </div>
        )}
        {contributor.org_member && (
          <div className="absolute -top-2 -right-2 bg-[#07fbb2] text-[#131716] text-xs px-3 py-1 rounded-full font-bold">
            Team
          </div>
        )}
      </div>

      <div className="flex flex-col items-center md:items-start">
        <h3 className={cn("text-xl md:text-2xl font-bold mb-1", isDark ? "text-[#07fbb2]" : "text-[#07fbb2]")}>
          {name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <a
            href={`https://github.com/${contributor.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-sm flex items-center gap-1 hover:underline",
              isDark ? "text-[#53b9ab]" : "text-[#53b9ab]",
            )}
          >
            <Github className="w-3 h-3" />@{contributor.login}
          </a>

          {blog && (
            <a
              href={blog.startsWith("http") ? blog : `https://${blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-sm flex items-center gap-1 hover:underline",
                isDark ? "text-[#53b9ab]" : "text-[#53b9ab]",
              )}
            >
              <ExternalLink className="w-3 h-3" />
              Website
            </a>
          )}

          {twitter && (
            <a
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-sm flex items-center gap-1 hover:underline",
                isDark ? "text-[#53b9ab]" : "text-[#53b9ab]",
              )}
            >
              <Twitter className="w-3 h-3" />
              Twitter
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex items-center gap-1">
            <span className={cn("text-lg font-bold", isDark ? "text-[#07fbb2]" : "text-[#07fbb2]")}>
              {contributor.contributions}
            </span>
            <span className={cn("text-sm", isDark ? "text-[#D9D9D9]" : "text-gray-600")}>total contributions</span>
          </div>

          {contributor.yearly_contributions > 0 && (
            <div className="flex items-center gap-1">
              <span className={cn("text-lg font-bold", isDark ? "text-[#07fbb2]" : "text-[#07fbb2]")}>
                {contributor.yearly_contributions}
              </span>
              <span className={cn("text-sm", isDark ? "text-[#D9D9D9]" : "text-gray-600")}>this year</span>
            </div>
          )}
        </div>

        {/* Additional GitHub info */}
        {!isLoading && githubUser && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2 w-full">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#53b9ab]" />
                <span className={cn("text-xs", isDark ? "text-[#D9D9D9]" : "text-gray-600")}>{location}</span>
              </div>
            )}

            {company && (
              <div className="flex items-center gap-1">
                <Building className="w-3 h-3 text-[#53b9ab]" />
                <span className={cn("text-xs", isDark ? "text-[#D9D9D9]" : "text-gray-600")}>{company}</span>
              </div>
            )}

            {githubUser.public_repos > 0 && (
              <div className="flex items-center gap-1">
                <span className={cn("text-xs font-medium", isDark ? "text-[#07fbb2]" : "text-[#07fbb2]")}>
                  {githubUser.public_repos}
                </span>
                <span className={cn("text-xs", isDark ? "text-[#D9D9D9]" : "text-gray-600")}>repositories</span>
              </div>
            )}

            {githubUser.followers > 0 && (
              <div className="flex items-center gap-1">
                <span className={cn("text-xs font-medium", isDark ? "text-[#07fbb2]" : "text-[#07fbb2]")}>
                  {githubUser.followers}
                </span>
                <span className={cn("text-xs", isDark ? "text-[#D9D9D9]" : "text-gray-600")}>followers</span>
              </div>
            )}
          </div>
        )}

        {bio && <p className={cn("text-sm max-w-md mt-2", isDark ? "text-[#D9D9D9]" : "text-gray-600")}>{bio}</p>}
      </div>
    </div>
  )
}
