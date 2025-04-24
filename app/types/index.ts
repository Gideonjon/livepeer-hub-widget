export interface Contributor {
  login: string;
  name: string | null;
  avatar_url: string;
  contributions: number;
  yearly_contributions: number;
  org_member: boolean;
  is_vip?: boolean;
  bio?: string | null;
  vip_info?: {
    profile_url: string;
  };
}

export interface ContributorWidgetProps {
  randomize?: boolean;
  maxDisplay?: number;
  autoRotate?: boolean;
  rotationInterval?: number;
} 