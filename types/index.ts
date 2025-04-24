export interface Contributor {
    login: string
    name: string | null
    avatar_url: string
    location: string | null
    company: string | null
    bio: string | null
    blog_url: string
    twitter_username: string | null
    org_member: boolean
    contributions: number
    yearly_contributions: number
    is_vip?: boolean
    vip_info?: {
      profile_url: string
    }
  }
  
  export interface ContributorWidgetProps {
    randomize?: boolean
    maxDisplay?: number
    autoRotate?: boolean
    rotationInterval?: number
    theme?: "dark" | "light"
    showControls?: boolean
  }
  