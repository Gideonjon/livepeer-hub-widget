"use client"

import { useSearchParams } from "next/navigation"
import { ContributorsWidget } from "@/app/components/ContributorsWidget"

export default function WidgetPage() {
  const searchParams = useSearchParams()

  const config = {
    maxDisplay: Number(searchParams.get("maxDisplay") || "1"),
    autoRotate: searchParams.get("autoRotate") !== "false",
    rotationInterval: Number(searchParams.get("rotationInterval") || "5000"), // In milliseconds
    randomize: searchParams.get("randomize") !== "false",
    theme: (searchParams.get("theme") || "dark") as "dark" | "light",
    showControls: searchParams.get("showControls") !== "false",
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${config.theme === "dark" ? "bg-[#131716]" : "bg-white"}`}
    >
      <ContributorsWidget {...config} />
    </div>
  )
}
