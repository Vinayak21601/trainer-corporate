export interface TrainerAttentionItem {
  id: string;
  type: 'urgent' | 'warning' | 'info' | 'doc';
  badgeColor: string;
  text: string;
  actionText: string;
  targetTab: string;
}

export interface TrainerCorporateRelationship {
  id: string;
  companyName: string;
  logoUrl?: string;
  industry: string;
  totalAssignments: number;
  totalTrainingDays: number;
  averageRating: number;
  contactPerson: string;
  contactRole: string;
  history: {
    id: string;
    programTitle: string;
    date: string;
    days: number;
    participants: number;
    rating: number;
    feedback: string;
  }[];
}

export interface TrainerAssignment {
  id: string;
  companyName: string;
  programTitle: string;
  dateRange: string;
  location: string;
  deliveryMode: 'Classroom' | 'Virtual' | 'Hybrid';
  status: 'Confirmed' | 'Completed' | 'In Progress' | 'Draft';
  participantsCount: number;
  days: number;
  rating?: number;
  commercialFee: number;
}

export interface TrainerOpportunity {
  id: string;
  title: string;
  companyName: string;
  location: string;
  participants: number;
  durationDays: number;
  startDate: string;
  matchScore: number;
  whyMatch: string[];
  category: string;
  budgetRange: string;
  objectives: string;
}

export interface TrainerEarningItem {
  id: string;
  assignmentTitle: string;
  companyName: string;
  date: string;
  fee: number;
  taxDeducted: number;
  netPayout: number;
  status: 'Paid' | 'Processing' | 'Pending Invoice';
  invoiceNumber: string;
}

export const MOCK_TRAINER_ATTENTION: TrainerAttentionItem[] = [
  {
    id: 'att-1',
    type: 'urgent',
    badgeColor: 'bg-red-500',
    text: 'Submit proposal — Leadership Program for FinServe VPs',
    actionText: 'Submit Proposal',
    targetTab: 'opportunities'
  },
  {
    id: 'att-2',
    type: 'warning',
    badgeColor: 'bg-amber-500',
    text: 'Confirm availability — Sales Training (22-23 Sep)',
    actionText: 'Confirm Dates',
    targetTab: 'calendar'
  },
  {
    id: 'att-3',
    type: 'info',
    badgeColor: 'bg-emerald-500',
    text: 'Training completed — TechScale Asia feedback pending',
    actionText: 'View Feedback',
    targetTab: 'assignments'
  },
  {
    id: 'att-4',
    type: 'doc',
    badgeColor: 'bg-blue-500',
    text: 'Upload updated ICF Coaching certification',
    actionText: 'Upload Document',
    targetTab: 'documents'
  }
];

export const MOCK_TRAINER_OPPORTUNITIES: TrainerOpportunity[] = [
  {
    id: 'opp-1',
    title: 'Leadership Development Workshop',
    companyName: 'ABC Corporation',
    location: 'Mumbai (In-Person)',
    participants: 30,
    durationDays: 2,
    startDate: '15 September 2026',
    matchScore: 94,
    category: 'Leadership & Management',
    budgetRange: '₹50,000 - ₹70,000',
    objectives: 'Executive coaching for middle management VPs focusing on strategic delegation and emotional intelligence.',
    whyMatch: [
      'Relevant expertise in Executive Leadership',
      'Mumbai based facilitator',
      'Similar corporate banking experience',
      'Available on requested dates (15-16 Sep)'
    ]
  },
  {
    id: 'opp-2',
    title: 'Executive Communication & Storytelling',
    companyName: 'XYZ Ltd',
    location: 'Virtual / Online',
    participants: 45,
    durationDays: 1,
    startDate: '22 September 2026',
    matchScore: 91,
    category: 'Communication',
    budgetRange: '₹30,000 - ₹40,000',
    objectives: 'High-impact townhall speaking and presentation skills for senior engineering managers.',
    whyMatch: [
      'Top 1% rated in Communication',
      'Virtual hybrid delivery certified',
      'Strong past reviews from Tech enterprises'
    ]
  },
  {
    id: 'opp-3',
    title: 'Strategic Sales & Key Account Negotiation',
    companyName: 'Global SaaS Solutions',
    location: 'Bengaluru (Hybrid)',
    participants: 25,
    durationDays: 3,
    startDate: '05 October 2026',
    matchScore: 88,
    category: 'Sales & Revenue',
    budgetRange: '₹90,000 - ₹1,20,000',
    objectives: 'Enterprise B2B deal qualification, MEDDPICC framework application, and value-based negotiation.',
    whyMatch: [
      'Experience in SaaS B2B sales coaching',
      'High repeat assignment rating with tech firms'
    ]
  }
];

export const MOCK_UPCOMING_ASSIGNMENTS: TrainerAssignment[] = [
  {
    id: 'asg-1',
    companyName: 'ABC Corporation',
    programTitle: 'Leadership Development Workshop',
    dateRange: '15–16 September 2026',
    location: 'Mumbai',
    deliveryMode: 'Classroom',
    status: 'Confirmed',
    participantsCount: 30,
    days: 2,
    commercialFee: 60000
  },
  {
    id: 'asg-2',
    companyName: 'XYZ Ltd',
    programTitle: 'Executive Communication Masterclass',
    dateRange: '22 September 2026',
    location: 'Online / Zoom',
    deliveryMode: 'Virtual',
    status: 'Confirmed',
    participantsCount: 45,
    days: 1,
    commercialFee: 35000
  }
];

export const MOCK_COMPLETED_ASSIGNMENTS: TrainerAssignment[] = [
  {
    id: 'casg-1',
    companyName: 'ABC Corporation',
    programTitle: 'Middle Management Leadership Blueprint',
    dateRange: '12–13 August 2026',
    location: 'Mumbai',
    deliveryMode: 'Classroom',
    status: 'Completed',
    participantsCount: 35,
    days: 2,
    rating: 4.9,
    commercialFee: 60000
  },
  {
    id: 'casg-2',
    companyName: 'XYZ Ltd',
    programTitle: 'High-Stakes Sales Negotiation',
    dateRange: '24–25 July 2026',
    location: 'Online',
    deliveryMode: 'Virtual',
    status: 'Completed',
    participantsCount: 40,
    days: 2,
    rating: 4.7,
    commercialFee: 50000
  },
  {
    id: 'casg-3',
    companyName: 'PQR Corporation',
    programTitle: 'Business Storytelling & Executive Gravitas',
    dateRange: '18 June 2026',
    location: 'Delhi',
    deliveryMode: 'Hybrid',
    status: 'Completed',
    participantsCount: 28,
    days: 1,
    rating: 4.8,
    commercialFee: 30000
  },
  {
    id: 'casg-4',
    companyName: 'FinServe Pvt. Ltd.',
    programTitle: 'Agile Leadership & Cross-Functional Alignment',
    dateRange: '05–06 May 2026',
    location: 'Mumbai',
    deliveryMode: 'Classroom',
    status: 'Completed',
    participantsCount: 50,
    days: 2,
    rating: 5.0,
    commercialFee: 70000
  }
];

export const MOCK_CORPORATE_RELATIONSHIPS: TrainerCorporateRelationship[] = [
  {
    id: 'corp-1',
    companyName: 'ABC Corporation',
    industry: 'Banking & Financial Services',
    totalAssignments: 6,
    totalTrainingDays: 14,
    averageRating: 4.9,
    contactPerson: 'Ritika Mehra',
    contactRole: 'Head of Learning & Talent Development',
    history: [
      {
        id: 'h1',
        programTitle: 'Middle Management Leadership Blueprint',
        date: 'Aug 2026',
        days: 2,
        participants: 35,
        rating: 4.9,
        feedback: 'Outstanding facilitation. 98% of attendees rated practical exercises 5/5.'
      },
      {
        id: 'h2',
        programTitle: 'Executive Strategic Alignment',
        date: 'May 2026',
        days: 2,
        participants: 20,
        rating: 5.0,
        feedback: 'Extremely well structured for our senior VP cohort.'
      },
      {
        id: 'h3',
        programTitle: 'Managerial Communication Bootcamp',
        date: 'Feb 2026',
        days: 3,
        participants: 40,
        rating: 4.8,
        feedback: 'Great energy and actionable frameworks.'
      }
    ]
  },
  {
    id: 'corp-2',
    companyName: 'XYZ Ltd',
    industry: 'Enterprise Software & Technology',
    totalAssignments: 4,
    totalTrainingDays: 8,
    averageRating: 4.7,
    contactPerson: 'Sanjay Deshmukh',
    contactRole: 'Director of People Experience',
    history: [
      {
        id: 'h4',
        programTitle: 'High-Stakes Sales Negotiation',
        date: 'Jul 2026',
        days: 2,
        participants: 40,
        rating: 4.7,
        feedback: 'Helped our AE team improve deal closing confidence.'
      },
      {
        id: 'h5',
        programTitle: 'Remote Team Management',
        date: 'Mar 2026',
        days: 2,
        participants: 30,
        rating: 4.8,
        feedback: 'Very practical strategies for distributed teams.'
      }
    ]
  },
  {
    id: 'corp-3',
    companyName: 'PQR Corporation',
    industry: 'Management Consulting & Advisory',
    totalAssignments: 3,
    totalTrainingDays: 6,
    averageRating: 4.8,
    contactPerson: 'Ananya Roy',
    contactRole: 'L&D Partner',
    history: [
      {
        id: 'h6',
        programTitle: 'Business Storytelling & Executive Gravitas',
        date: 'Jun 2026',
        days: 1,
        participants: 28,
        rating: 4.8,
        feedback: 'Engaging, insightful and deep expertise in executive presence.'
      }
    ]
  }
];

export const MOCK_TRAINER_EARNINGS: TrainerEarningItem[] = [
  {
    id: 'earn-1',
    assignmentTitle: 'Middle Management Leadership Blueprint',
    companyName: 'ABC Corporation',
    date: '15 Aug 2026',
    fee: 60000,
    taxDeducted: 6000,
    netPayout: 54000,
    status: 'Paid',
    invoiceNumber: 'INV-2026-089'
  },
  {
    id: 'earn-2',
    assignmentTitle: 'High-Stakes Sales Negotiation',
    companyName: 'XYZ Ltd',
    date: '28 Jul 2026',
    fee: 50000,
    taxDeducted: 5000,
    netPayout: 45000,
    status: 'Processing',
    invoiceNumber: 'INV-2026-074'
  },
  {
    id: 'earn-3',
    assignmentTitle: 'Business Storytelling Masterclass',
    companyName: 'PQR Corporation',
    date: '20 Jun 2026',
    fee: 30000,
    taxDeducted: 3000,
    netPayout: 27000,
    status: 'Paid',
    invoiceNumber: 'INV-2026-052'
  },
  {
    id: 'earn-4',
    assignmentTitle: 'Agile Leadership Bootcamp',
    companyName: 'FinServe Pvt. Ltd.',
    date: '10 May 2026',
    fee: 70000,
    taxDeducted: 7000,
    netPayout: 63000,
    status: 'Paid',
    invoiceNumber: 'INV-2026-038'
  }
];
