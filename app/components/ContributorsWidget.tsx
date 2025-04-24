"use client"

import { useEffect, useState, useCallback } from "react"
import type { Contributor } from "@/types"
import { ContributorCard } from "./ContributorCard"
import { Button } from "./ui/button"
import { RefreshCw, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ContributorWidgetProps {
  randomize?: boolean
  maxDisplay?: number
  autoRotate?: boolean
  rotationInterval?: number
  className?: string
  showControls?: boolean
  theme?: "dark" | "light"
}

export function ContributorsWidget({
  randomize = true,
  maxDisplay = 1,
  autoRotate = true,
  rotationInterval = 5000,
  className,
  showControls = true,
  theme = "dark",
}: ContributorWidgetProps) {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [displayedContributors, setDisplayedContributors] = useState<Contributor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showOrgMembersOnly, setShowOrgMembersOnly] = useState(false)
  const [showLastYearOnly, setShowLastYearOnly] = useState(false)
  const [isRotating, setIsRotating] = useState(autoRotate)

  const getRandomContributors = useCallback(
    (contributors: Contributor[], count: number) => {
      let filteredContributors = [...contributors]

      if (showOrgMembersOnly) {
        filteredContributors = filteredContributors.filter((c) => c.org_member)
      }

      if (showLastYearOnly) {
        filteredContributors = filteredContributors.filter((c) => c.yearly_contributions > 0)
      }

      if (filteredContributors.length === 0) {
        return []
      }

      return randomize
        ? filteredContributors.sort(() => Math.random() - 0.5).slice(0, count)
        : filteredContributors.slice(0, count)
    },
    [randomize, showOrgMembersOnly, showLastYearOnly],
  )

  useEffect(() => {
    async function fetchContributors() {
      try {
        setLoading(true)
        const response = await fetch("/api/contributors")
        if (!response.ok) throw new Error("Failed to fetch contributors")

        const data = await response.json()
        if (!Array.isArray(data)) throw new Error("Invalid data format")

        setContributors(data)
        setDisplayedContributors(getRandomContributors(data, maxDisplay))
        setError(null)
      } catch (err) {
        console.error("Failed to fetch contributors:", err)
        setError("Failed to load contributors")
      } finally {
        setLoading(false)
      }
    }

    fetchContributors()
  }, [maxDisplay, getRandomContributors])

  useEffect(() => {
    // Set initial rotation state based on autoRotate prop
    setIsRotating(autoRotate)
  }, [autoRotate])

  useEffect(() => {
    if (!isRotating || !contributors.length) return

    const interval = setInterval(() => {
      setDisplayedContributors(getRandomContributors(contributors, maxDisplay))
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [isRotating, contributors, maxDisplay, rotationInterval, getRandomContributors])

  useEffect(() => {
    if (contributors.length) {
      setDisplayedContributors(getRandomContributors(contributors, maxDisplay))
    }
  }, [showOrgMembersOnly, showLastYearOnly, contributors, maxDisplay, getRandomContributors])

  const handleRefresh = () => {
    setDisplayedContributors(getRandomContributors(contributors, maxDisplay))
  }

  const toggleOrgMembers = () => {
    setShowOrgMembersOnly(!showOrgMembersOnly)
  }

  const toggleLastYear = () => {
    setShowLastYearOnly(!showLastYearOnly)
  }

  const toggleRotation = () => {
    setIsRotating(!isRotating)
  }

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center h-64", className)}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#07FBB2] border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("flex items-center justify-center h-64 text-[#D9D9D9]", className)}>
        <p>{error}</p>
      </div>
    )
  }

  if (!displayedContributors.length) {
    return (
      <div className={cn("flex items-center justify-center h-64 text-[#D9D9D9]", className)}>
        <p>No contributors found</p>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col">
        {showControls && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <Button
              variant={showOrgMembersOnly ? "default" : "outline"}
              size="sm"
              onClick={toggleOrgMembers}
              className={cn(
                "text-xs rounded-full",
                showOrgMembersOnly ? "bg-[#07FBB2] text-black hover:bg-[#07FBB2]/90" : "border-[#282828] text-white",
              )}
            >
              <Users className="w-4 h-4 mr-1" /> Org Members
            </Button>
            <Button
              variant={showLastYearOnly ? "default" : "outline"}
              size="sm"
              onClick={toggleLastYear}
              className={cn(
                "text-xs rounded-full",
                showLastYearOnly ? "bg-[#07FBB2] text-black hover:bg-[#07FBB2]/90" : "border-[#282828] text-white",
              )}
            >
              Last Year
            </Button>
            <Button
              variant={isRotating ? "default" : "outline"}
              size="sm"
              onClick={toggleRotation}
              className={cn(
                "text-xs rounded-full",
                isRotating ? "bg-[#07FBB2] text-black hover:bg-[#07FBB2]/90" : "border-[#282828] text-white",
              )}
            >
              {isRotating ? "Pause" : "Auto Rotate"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="text-xs rounded-full border-[#282828] text-white"
            >
              <RefreshCw className="w-3 h-3 mr-1" /> Refresh
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 w-full mx-auto">
          {displayedContributors.map((contributor) => (
            <ContributorCard key={contributor.login} contributor={contributor} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  )
}
