
import React from 'react';
import { 
  Palette, Video, Layout, Code, PenTool, Smartphone, 
  ShoppingBag, Printer, Briefcase, Star, Zap, Rocket, Megaphone, Target
} from 'lucide-react';
import { Service, PackagePlan, TeamMember } from './types';

export const SERVICES: Service[] = [
  { 
    id: '1', 
    title: 'Thumbnail Design', 
    price: '₹300–₹400', 
    details: 'High-CTR YouTube thumbnails engineered for viral potential.', 
    specifications: ['A/B Testing Ready', '4K Resolution Assets', 'Custom Typography'],
    icon: 'Palette', 
    category: 'design' 
  },
  { 
    id: '2', 
    title: 'Social Media Assets', 
    price: '₹220–₹420', 
    details: 'Aesthetic-driven Instagram and Twitter graphics.', 
    specifications: ['Brand-Consistent Palette', 'Platform Optimized', 'Editable Source Files'],
    icon: 'Star', 
    category: 'design' 
  },
  { 
    id: '5', 
    title: 'Pitch Decks & PPT', 
    price: '₹250–₹500', 
    details: 'Professional investor-ready presentation systems.', 
    specifications: ['Data Visualization', 'Interactive Elements', 'PDF & PPTX Export'],
    icon: 'Layout', 
    category: 'design' 
  },
  { 
    id: '10', 
    title: 'Branding Kit', 
    price: '₹3/-', 
    details: 'Business cards and identity systems for modern brands.', 
    specifications: ['Vector Logo Design', 'Brand Usage Guide', 'Print-Ready Formats'],
    icon: 'Briefcase', 
    category: 'design' 
  },
  { 
    id: '3', 
    title: 'Reels & Shorts', 
    price: '₹300–₹400', 
    details: 'Fast-paced, high-retention short-form content editing.', 
    specifications: ['Trend Integration', 'Dynamic Captions', 'Audio Normalization'],
    icon: 'Video', 
    category: 'video' 
  },
  { 
    id: '4', 
    title: 'Production Editing', 
    price: '₹600–₹1100', 
    details: 'Full-length cinematic video processing and FX.', 
    specifications: ['Color Grading', 'Sound Design (SFX)', 'Multi-Cam Sync'],
    icon: 'Video', 
    category: 'video' 
  },
  { 
    id: '8', 
    title: 'E-commerce Engine', 
    price: '₹5000', 
    details: 'Shopify deployment with conversion optimization.', 
    specifications: ['Payment Gateway Sync', 'Inventory Management', 'SEO Setup'],
    icon: 'ShoppingBag', 
    category: 'social' 
  },
  { 
    id: '6', 
    title: 'Interface Design', 
    price: '₹5000', 
    details: 'Next-gen UI/UX layouts for mobile and web apps.', 
    specifications: ['Figma Prototypes', 'User Journey Mapping', 'Design System Docs'],
    icon: 'Smartphone', 
    category: 'social' 
  },
  { 
    id: '7', 
    title: 'Full-Stack Dev', 
    price: '₹15000', 
    details: 'Custom software architecture and business apps.', 
    specifications: ['React/Next.js Core', 'Secure API Integration', 'Scalable Backend'],
    icon: 'Code', 
    category: 'development' 
  },
  { 
    id: '9', 
    title: 'Merch Engineering', 
    price: '₹199/pc', 
    details: 'Custom apparel design and high-precision printing.', 
    specifications: ['Sublimation Options', 'Bulk Order Support', 'Global Distribution'],
    icon: 'Printer', 
    category: 'design' 
  },
];

export const PLANS: PackagePlan[] = [
  {
    id: 'starter',
    name: 'Starter Node',
    price: '₹999',
    description: 'Basic content package for emerging creators.',
    features: ['4 Thumbnails', '4 Social Media Posts', '2 Reels', '1 PPT', 'Standard Support']
  },
  {
    id: 'growth',
    name: 'Growth Sync',
    price: '₹2499',
    description: 'Optimized for high-frequency educational channels.',
    features: ['8 Thumbnails', '8 Posts', '4 Reels', '2 PPTs', 'SEO Boost', 'Priority Support'],
    recommended: true
  },
  {
    id: 'pro',
    name: 'Pro Interface',
    price: '₹4999',
    description: 'Total brand management and content scaling.',
    features: ['12 Thumbnails', '12 Posts', '6 Reels', '10 PPTs', 'Scheduling', 'Analytics'],
  },
  {
    id: 'elite',
    name: 'Elite Matrix',
    price: '₹7999',
    description: 'The ultimate agency-level content partnership.',
    features: ['20 Thumbnails', '20 Posts', '10 Reels', '20 PPTs', 'Full Strategy', 'Ultra-fast Delivery'],
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'AD-01',
    name: 'YASH',
    role: 'HEAD_OF_OPERATIONS',
    specialization: 'CREATIVE_DIRECTION',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'KE-02',
    name: 'KESHAV',
    role: 'CHIEF_DESIGN_ENGINEER',
    specialization: 'VISUAL_SYSTEMS',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'YA-03',
    name: 'ADITYA',
    role: 'LEAD_CONTENT_ARCHITECT',
    specialization: 'SOCIAL_DYNAMICS',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'YS-04',
    name: 'YASKH',
    role: 'FULL_STACK_DEVELOPER',
    specialization: 'NEURAL_APPS',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop'
  }
];

export const PORTFOLIO = [];
