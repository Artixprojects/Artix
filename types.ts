
export interface Service {
  id: string;
  title: string;
  price: string;
  details: string;
  specifications?: string[];
  icon: string;
  category: 'design' | 'video' | 'development' | 'social';
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PackagePlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  imageUrl: string;
}
