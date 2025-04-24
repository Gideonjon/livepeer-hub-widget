import { NextResponse } from "next/server"

// Cache to store GitHub API responses and reduce API calls
const CACHE_DURATION = 3600000 // 1 hour in milliseconds
const userCache = new Map<string, { data: any; timestamp: number }>()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // Check if we have a cached response that's still valid
    const cachedResponse = userCache.get(username)
    const now = Date.now()

    if (cachedResponse && now - cachedResponse.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedResponse.data)
    }

    // Fetch from GitHub API
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Add GitHub token if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const userData = await response.json()

    // Cache the response
    userCache.set(username, { data: userData, timestamp: now })

    return NextResponse.json(userData)
  } catch (error) {
    console.error(`Error fetching GitHub data for ${username}:`, error)
    return NextResponse.json({ error: "Failed to fetch GitHub user data" }, { status: 500 })
  }
}
