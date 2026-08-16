export type DeliveryMode = 'In-Person' | 'Virtual' | 'Hybrid' | 'All';

export interface TrainerModule {
  id: string;
  title: string;
  durationHours: number;
  description: string;
  topics: string[];
}

export interface ClientRef {
  name: string;
  logoUrl?: string;
  industry: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorRole: string;
  companyName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Trainer {
  id: string;
  name: string;
  verified: boolean;
  avatarUrl: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  matchScore: number; // e.g. 98 -> 98%
  hourlyRate: number; // e.g. in USD or local
  dayRate: number;
  bio: string;
  longBio: string;
  skills: string[];
  domains: string[];
  primaryDomain?: string;
  deliveryModes: DeliveryMode[];
  featuredVideoUrl?: string;
  certifications: string[];
  clientsTrained: ClientRef[];
  modules: TrainerModule[];
  reviews: Review[];
  availableFrom: string;
  languages: string[];
  shortlisted?: boolean;
}

export interface Requirement {
  id: string;
  title: string;
  companyName: string;
  category: string;
  targetAudience: string;
  deliveryMode: DeliveryMode;
  cohortSize: number;
  durationDays: number;
  startDate: string;
  budgetRange: string;
  location: string;
  objectives: string;
  additionalRequirements: string;
  status: 'Matching' | 'Proposals Received' | 'Engagement Active' | 'Completed' | 'Draft';
  createdAt: string;
  matchedCount: number;
}

export interface Proposal {
  id: string;
  trainerId: string;
  requirementId: string;
  proposedRate: number;
  proposedSyllabus: string;
  deliveryFormat: DeliveryMode;
  status: 'Pending' | 'Accepted' | 'Declined';
  submittedAt: string;
}

export interface FilterState {
  searchQuery: string;
  selectedDomains: string[];
  deliveryMode: DeliveryMode;
  minExperience: number;
  maxDayRate: number;
  minRating: number;
  location: string;
  minMatchScore: number;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'L&D Manager' | 'Trainer';
  avatarUrl: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface Conversation {
  id: string;
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  requirementTitle: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: MessageItem[];
}
