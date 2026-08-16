import { Trainer, Requirement, Conversation } from '../types';

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Vikram Malhotra',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    title: 'Leadership & Strategy Expert',
    location: 'Mumbai, India',
    rating: 4.8,
    reviewCount: 230,
    yearsExperience: 15,
    matchScore: 98,
    hourlyRate: 150,
    dayRate: 1200,
    bio: 'Helps leaders build high-performance teams and drive organizational growth with data-backed coaching frameworks.',
    longBio: 'Vikram Malhotra is an executive coach and corporate strategist with over 15 years of experience advising Fortune 500 companies, high-growth startups, and financial institutions across Asia and Europe. Former VP of Organizational Excellence at Global FinTech Corp, Vikram specializes in executive presence, cross-functional leadership, agile management, and strategic decision-making under uncertainty.',
    skills: ['Leadership', 'Strategy', 'Team Building', 'Coaching', 'Executive Presence'],
    domains: ['Executive Leadership', 'Strategy & Governance', 'Managerial Effectiveness'],
    deliveryModes: ['In-Person', 'Virtual', 'Hybrid'],
    featuredVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    certifications: [
      'ICF Master Certified Coach (MCC)',
      'Harvard Business School Executive Leadership Certificate',
      'OKR Certified Master'
    ],
    clientsTrained: [
      { name: 'FinServe Pvt. Ltd.', industry: 'Banking & Finance' },
      { name: 'TechScale Asia', industry: 'Enterprise SaaS' },
      { name: 'Global Logistics Corp', industry: 'Supply Chain' }
    ],
    modules: [
      {
        id: 'm1',
        title: 'Middle Management Leadership Blueprint',
        durationHours: 16,
        description: '2-day intensive workshop covering emotional intelligence, feedback loops, strategic delegation, and conflict resolution.',
        topics: ['Feedback Culture', 'Emotional Intelligence', 'Decision Frameworks', 'Delegation & Trust']
      },
      {
        id: 'm2',
        title: 'Executive Strategic Alignment & OKRs',
        durationHours: 8,
        description: '1-day session for senior executives to align organizational goals with measurable key results.',
        topics: ['Goal Cascading', 'OKR Implementation', 'Cross-Departmental Synergy']
      }
    ],
    reviews: [
      {
        id: 'r1',
        authorName: 'Ritika Mehra',
        authorRole: 'L&D Manager',
        companyName: 'FinServe Pvt. Ltd.',
        rating: 5.0,
        date: '2 weeks ago',
        comment: 'Vikram delivered an exceptional 2-day workshop for our 40 vice presidents. The feedback rating was 4.9/5 across all parameters.'
      },
      {
        id: 'r2',
        authorName: 'Sanjay Deshmukh',
        authorRole: 'Head of People',
        companyName: 'TechScale Asia',
        rating: 4.7,
        date: '1 month ago',
        comment: 'Practical, engaging, and deeply rooted in real business challenges. Highly recommended!'
      }
    ],
    availableFrom: 'Next Week',
    languages: ['English', 'Hindi']
  },
  {
    id: 'tr-2',
    name: 'Anjali Mehta',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    title: 'Leadership Development Expert',
    location: 'Bengaluru, India',
    rating: 4.7,
    reviewCount: 188,
    yearsExperience: 12,
    matchScore: 95,
    hourlyRate: 140,
    dayRate: 1100,
    bio: 'Specializes in leadership communication, people management, and driving psychological safety in remote teams.',
    longBio: 'Anjali Mehta has worked with over 80 tech enterprises across India and SEA to cultivate compassionate, resilient leaders. With a master’s degree in Industrial Psychology from TISS, Anjali brings deep psychological insights to managerial skill building, difficult conversations, and team alignment.',
    skills: ['Leadership', 'Communication', 'Coaching', 'People Management', 'Psychological Safety'],
    domains: ['Managerial Effectiveness', 'Executive Leadership', 'Soft Skills & DE&I'],
    deliveryModes: ['In-Person', 'Virtual', 'Hybrid'],
    featuredVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    certifications: [
      'Certified Everything DiSC Trainer',
      'Hogan Assessment Certified',
      'NeuroLeadership Institute Specialist'
    ],
    clientsTrained: [
      { name: 'Infosys Innovation Labs', industry: 'IT Services' },
      { name: 'Razorpay', industry: 'FinTech' },
      { name: 'Swiggy', industry: 'Consumer Tech' }
    ],
    modules: [
      {
        id: 'm3',
        title: 'Mastering Difficult Conversations & Feedback',
        durationHours: 12,
        description: 'Interactive simulations helping managers navigate performance discussions and team friction smoothly.',
        topics: ['SBI Feedback Model', 'Active Listening', 'De-escalating Conflict', 'Actionable PIPS']
      }
    ],
    reviews: [
      {
        id: 'r3',
        authorName: 'Priya Sundaram',
        authorRole: 'Director Talent',
        companyName: 'Razorpay',
        rating: 5.0,
        date: '3 weeks ago',
        comment: 'Anjali’s session transformed how our engineering leads communicate with their teams.'
      }
    ],
    availableFrom: 'Immediately',
    languages: ['English', 'Kannada', 'Hindi']
  },
  {
    id: 'tr-3',
    name: 'Rahul Kapoor',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    title: 'Organizational Leadership Coach',
    location: 'Delhi, India',
    rating: 4.6,
    reviewCount: 156,
    yearsExperience: 10,
    matchScore: 93,
    hourlyRate: 130,
    dayRate: 1000,
    bio: 'Focuses on leadership transformation, change management, and building high-trust agile cultures.',
    longBio: 'Rahul Kapoor is a certified leadership practitioner who helps legacy corporations transition into agile, human-centric organizations. He combines behavioral science with gamified learning simulations.',
    skills: ['Change Management', 'Leadership', 'Culture', 'Agile Mindset', 'Team Synergy'],
    domains: ['Executive Leadership', 'Agile & Transformation', 'Managerial Effectiveness'],
    deliveryModes: ['In-Person', 'Hybrid'],
    certifications: ['Certified Agile Leadership (CAL-1)', 'PROSCI Change Management Practitioner'],
    clientsTrained: [
      { name: 'Airtel Enterprise', industry: 'Telecom' },
      { name: 'Maruti Suzuki', industry: 'Automotive' }
    ],
    modules: [
      {
        id: 'm4',
        title: 'Leading Through Organizational Change',
        durationHours: 14,
        description: 'Frameworks to minimize resistance and drive employee engagement during M&A, restructuring, or digital shifts.',
        topics: ['Change Resistance Dynamics', 'Stakeholder Mapping', 'Agile Culture Transformation']
      }
    ],
    reviews: [],
    availableFrom: '2 weeks',
    languages: ['English', 'Hindi']
  },
  {
    id: 'tr-4',
    name: 'Neha Sharma',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    title: 'People & Leadership Specialist',
    location: 'Pune, India',
    rating: 4.5,
    reviewCount: 142,
    yearsExperience: 9,
    matchScore: 90,
    hourlyRate: 120,
    dayRate: 950,
    bio: 'Expert in developing people skills, emotional intelligence, and inclusive workplace leadership.',
    longBio: 'Neha Sharma is a corporate educator with 9+ years experience specializing in emotional intelligence, neurodiversity in management, and building psychologically safe team environments.',
    skills: ['People Skills', 'Emotional Intelligence', 'Coaching', 'Diversity & Inclusion'],
    domains: ['Soft Skills & DE&I', 'Managerial Effectiveness'],
    deliveryModes: ['Virtual', 'Hybrid'],
    certifications: ['EQ-i 2.0 Certified Assessor', 'SHRM Senior Certified Professional'],
    clientsTrained: [
      { name: 'Amdocs India', industry: 'Software' },
      { name: 'Tech Mahindra', industry: 'IT Services' }
    ],
    modules: [
      {
        id: 'm5',
        title: 'Emotional Intelligence in High-Stakes Management',
        durationHours: 8,
        description: 'Developing self-awareness, empathy, and social regulation for fast-paced corporate environments.',
        topics: ['Self-Regulation', 'Empathy in Leadership', 'Stress Resilience']
      }
    ],
    reviews: [],
    availableFrom: 'Immediately',
    languages: ['English', 'Hindi', 'Marathi']
  },
  {
    id: 'tr-5',
    name: 'Sandeep Iyer',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    title: 'Leadership & Business Coach',
    location: 'Hyderabad, India',
    rating: 4.4,
    reviewCount: 121,
    yearsExperience: 11,
    matchScore: 88,
    hourlyRate: 125,
    dayRate: 980,
    bio: 'Helps organizations build future-ready leaders, strategic execution capability, and strong cultures.',
    longBio: 'Sandeep Iyer spent 12 years in senior leadership at global tech consulting firms before becoming a full-time corporate trainer and business coach.',
    skills: ['Leadership', 'Culture', 'Strategy', 'Design Thinking'],
    domains: ['Executive Leadership', 'Strategy & Governance'],
    deliveryModes: ['In-Person', 'Virtual'],
    certifications: ['Design Thinking Practitioner (IDEO)', 'ICF Professional Certified Coach (PCC)'],
    clientsTrained: [
      { name: 'Deloitte Digital', industry: 'Consulting' },
      { name: 'Dr. Reddys', industry: 'Pharma' }
    ],
    modules: [],
    reviews: [],
    availableFrom: '3 weeks',
    languages: ['English', 'Telugu', 'Hindi']
  },
  {
    id: 'tr-6',
    name: 'Shweta Rao',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    title: 'Leadership Communication Expert',
    location: 'Mumbai, India',
    rating: 4.4,
    reviewCount: 98,
    yearsExperience: 8,
    matchScore: 87,
    hourlyRate: 115,
    dayRate: 900,
    bio: 'Specializes in executive presence, influential storytelling, and high-stakes presentation skills.',
    longBio: 'Shweta Rao works with CXOs, Vice Presidents, and Senior Managers to elevate their speaking clarity, executive gravitas, and townhall storytelling capabilities.',
    skills: ['Communication', 'Executive Presence', 'Coaching', 'Storytelling'],
    domains: ['Soft Skills & DE&I', 'Executive Leadership'],
    deliveryModes: ['In-Person', 'Virtual', 'Hybrid'],
    certifications: ['Toastmasters Distinguished Speaker', 'TEDx Speaker Coach'],
    clientsTrained: [
      { name: 'Standard Chartered', industry: 'Banking' },
      { name: 'Godrej Consumer', industry: 'FMCG' }
    ],
    modules: [],
    reviews: [],
    availableFrom: 'Immediately',
    languages: ['English', 'Hindi']
  },
  {
    id: 'tr-7',
    name: 'Dr. Marcus Vance',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    title: 'Generative AI & Enterprise Digital Transformation Leader',
    location: 'San Francisco, USA / Remote',
    rating: 4.9,
    reviewCount: 312,
    yearsExperience: 18,
    matchScore: 97,
    hourlyRate: 250,
    dayRate: 2200,
    bio: 'Empowers C-suite executives and engineering heads to integrate AI models, LLMs, and automated workflows into enterprise operations.',
    longBio: 'Dr. Marcus Vance holds a Ph.D. in Computer Science from Stanford and served as AI Transformation Director at two Fortune 100 technology firms. He conducts immersive bootcamps on AI strategy, enterprise LLM deployment, risk governance, and developer productivity.',
    skills: ['Generative AI', 'LLMs', 'Digital Transformation', 'Enterprise Architecture', 'AI Governance'],
    domains: ['Generative AI & Tech', 'Strategy & Governance'],
    deliveryModes: ['Virtual', 'Hybrid', 'In-Person'],
    certifications: [
      'Stanford AI Certified Professional',
      'AWS Certified Solutions Architect - Professional',
      'Google Cloud Certified Machine Learning Engineer'
    ],
    clientsTrained: [
      { name: 'Microsoft Enterprise Services', industry: 'Technology' },
      { name: 'JPMorgan Chase & Co.', industry: 'Banking' },
      { name: 'Pfizer Global', industry: 'Healthcare' }
    ],
    modules: [
      {
        id: 'm7',
        title: 'Executive Masterclass: Gen AI Strategy for C-Suite',
        durationHours: 8,
        description: 'Comprehensive roadmap for evaluating LLM ROI, governance, data privacy, and workplace adoption.',
        topics: ['LLM ROI Evaluation', 'Data Privacy & Security', 'Agentic Workflows', 'Change Management for AI']
      }
    ],
    reviews: [
      {
        id: 'r7',
        authorName: 'David Chen',
        authorRole: 'Chief Technology Officer',
        companyName: 'Global Capital Tech',
        rating: 5.0,
        date: '1 week ago',
        comment: 'Dr. Vance’s AI masterclass was the highest rated technical executive workshop we have ever hosted.'
      }
    ],
    availableFrom: 'Next Month',
    languages: ['English']
  },
  {
    id: 'tr-8',
    name: 'Elena Rostova',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    title: 'Enterprise Sales & Revenue Enablement Trainer',
    location: 'London, UK / Remote',
    rating: 4.9,
    reviewCount: 175,
    yearsExperience: 14,
    matchScore: 94,
    hourlyRate: 180,
    dayRate: 1500,
    bio: 'Transforms enterprise B2B sales teams using MEDDPICC methodology, strategic negotiation, and value-based selling.',
    longBio: 'Elena Rostova has trained over 5,000 enterprise account executives across SaaS, Cloud Infrastructure, and Financial Services. Former VP of Enterprise Sales at EMEA Tech, her hands-on workshops drive measurable quota attainment.',
    skills: ['Enterprise Sales', 'MEDDPICC', 'B2B Negotiation', 'Pipeline Generation', 'Account Management'],
    domains: ['Sales & Revenue Enablement', 'Managerial Effectiveness'],
    deliveryModes: ['In-Person', 'Virtual', 'Hybrid'],
    certifications: ['Master MEDDPICC Certified Trainer', 'Miller Heiman Strategic Selling Facilitator'],
    clientsTrained: [
      { name: 'SAP Enterprise', industry: 'Software' },
      { name: 'Salesforce EMEA', industry: 'Cloud Software' }
    ],
    modules: [
      {
        id: 'm8',
        title: 'MEDDPICC Enterprise Deal Mastery',
        durationHours: 16,
        description: '2-day intensive deal qualification framework for closing multi-million dollar corporate contracts.',
        topics: ['Metrics & Economic Buyer', 'Decision Criteria & Process', 'Identify Pain & Champion', 'Competition Defense']
      }
    ],
    reviews: [],
    availableFrom: 'Next Week',
    languages: ['English', 'German']
  }
];

export const INITIAL_REQUIREMENTS: Requirement[] = [
  {
    id: 'req-1',
    title: 'Leadership Training for Middle Management',
    companyName: 'FinServe Pvt. Ltd.',
    category: 'Executive Leadership',
    targetAudience: 'Middle Management (AVPs & Directors)',
    deliveryMode: 'Hybrid',
    cohortSize: 45,
    durationDays: 2,
    startDate: '2026-09-15',
    budgetRange: '₹1,000,000 - ₹2,500,000',
    location: 'Mumbai, India',
    objectives: 'Improve leadership decision making, strategic alignment, cross-departmental communication, and constructive performance feedback.',
    additionalRequirements: 'Must have prior experience training BFSI / Financial services teams. Case study based interactive approach mandatory.',
    status: 'Matching',
    createdAt: '2026-08-10',
    matchedCount: 120
  },
  {
    id: 'req-2',
    title: 'Generative AI Productivity Workshop for Product Leads',
    companyName: 'FinServe Pvt. Ltd.',
    category: 'Generative AI & Tech',
    targetAudience: 'Product Managers & Engineering Leads',
    deliveryMode: 'Virtual',
    cohortSize: 30,
    durationDays: 1,
    startDate: '2026-10-01',
    budgetRange: '₹500,000 - ₹1,000,000',
    location: 'Remote',
    objectives: 'Hands-on training on prompt engineering, Copilot workflows, LLM API capabilities, and internal product integration.',
    additionalRequirements: 'Hands-on lab environment needed.',
    status: 'Proposals Received',
    createdAt: '2026-08-05',
    matchedCount: 28
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    trainerId: 'tr-1',
    trainerName: 'Vikram Malhotra',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    requirementTitle: 'Leadership Training for Middle Management',
    lastMessage: 'I have reviewed your custom requirements for FinServe VPs. Are you available for a 15-minute alignment call on Thursday?',
    lastTimestamp: '10:45 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-1',
        senderName: 'Ritika Mehra',
        senderRole: 'L&D Manager',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
        text: 'Hi Vikram, we shortlisted your profile for our upcoming Middle Management Leadership program in Mumbai!',
        timestamp: ' Yesterday 4:15 PM',
        isMine: true
      },
      {
        id: 'msg-2',
        senderId: 'tr-1',
        senderName: 'Vikram Malhotra',
        senderRole: 'Trainer',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        text: 'Thank you Ritika! I have reviewed your custom requirements for FinServe VPs. Are you available for a 15-minute alignment call on Thursday?',
        timestamp: '10:45 AM',
        isMine: false
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'cat-1', name: 'Executive Leadership', count: '450+ Experts', icon: 'Award' },
  { id: 'cat-2', name: 'Generative AI & Tech', count: '320+ Experts', icon: 'Cpu' },
  { id: 'cat-3', name: 'Soft Skills & DE&I', count: '580+ Experts', icon: 'Users' },
  { id: 'cat-4', name: 'Sales & Revenue Enablement', count: '290+ Experts', icon: 'TrendingUp' },
  { id: 'cat-5', name: 'Agile & Transformation', count: '210+ Experts', icon: 'RefreshCw' },
  { id: 'cat-6', name: 'Strategy & Governance', count: '180+ Experts', icon: 'Briefcase' }
];
