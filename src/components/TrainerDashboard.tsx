'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  UserCheck, 
  Briefcase, 
  CalendarCheck, 
  Building2, 
  Award, 
  TrendingUp, 
  IndianRupee, 
  Calendar, 
  FolderCheck, 
  MessageSquare, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  ChevronRight, 
  ChevronLeft,
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Check, 
  X, 
  Send, 
  Sparkles, 
  Home,
  ShieldCheck,
  ChevronDown,
  Info,
  ArrowUpRight,
  Plus,
  Lock,
  ExternalLink,
  Layers,
  HelpCircle,
  Menu,
  Edit3,
  Upload,
  Eye,
  Trash2,
  Paperclip
} from 'lucide-react';
import { Requirement } from '../types';
import {
  MOCK_TRAINER_ATTENTION,
  MOCK_TRAINER_OPPORTUNITIES,
  MOCK_UPCOMING_ASSIGNMENTS,
  MOCK_COMPLETED_ASSIGNMENTS,
  MOCK_CORPORATE_RELATIONSHIPS,
  MOCK_TRAINER_EARNINGS,
  TrainerCorporateRelationship,
  TrainerOpportunity,
  TrainerAssignment
} from '../data/trainerDashboardData';

interface TrainerDashboardProps {
  requirements?: Requirement[];
  onOpenRequirement?: (req: Requirement) => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = () => {
  const router = useRouter();

  // Tab state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [dashSubTab, setDashSubTab] = useState<'overview' | 'insights' | 'tasks'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Editable Profile state
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [trainerName, setTrainerName] = useState('Rahul Sharma');
  const [trainerTitle, setTrainerTitle] = useState('Leadership & Management Trainer');
  const [trainerEmail, setTrainerEmail] = useState('rahul.sharma@experttrainers.com');
  const [trainerPhone, setTrainerPhone] = useState('+91 98765 43210');
  const [trainerCity, setTrainerCity] = useState('Mumbai, India');
  const [trainerLinkedin, setTrainerLinkedin] = useState('https://linkedin.com/in/rahulsharma-facilitator');
  const [trainerBio, setTrainerBio] = useState('Executive coach and corporate strategist with over 15 years experience advising Fortune 500 enterprises, financial institutions, and tech teams.');
  const [trainerExpYears, setTrainerExpYears] = useState('15');
  const [trainerPrimaryDomain, setTrainerPrimaryDomain] = useState('Executive Leadership & Strategy');
  const [trainerDayRate, setTrainerDayRate] = useState('60000');
  const [trainerHourlyRate, setTrainerHourlyRate] = useState('7500');
  const [trainerNoticePeriod, setTrainerNoticePeriod] = useState('2 Weeks');
  const [trainerVideoUrl, setTrainerVideoUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
  const [trainerEdu, setTrainerEdu] = useState('MBA in Organizational Behavior (TISS Mumbai)');
  const [trainerCertsStr, setTrainerCertsStr] = useState('ICF Master Certified Coach (MCC), Harvard Executive Leadership Certificate, DiSC Certified');
  const [trainerLanguagesStr, setTrainerLanguagesStr] = useState('English, Hindi');
  const [trainerSkillsStr, setTrainerSkillsStr] = useState('Leadership, Executive Coaching, Sales Negotiation, Strategic Planning, Emotional Intelligence');
  const [trainerIndustriesStr, setTrainerIndustriesStr] = useState('Banking & Finance, Enterprise SaaS, Technology, Healthcare');

  const [profileCompletion, setProfileCompletion] = useState(94);
  const [availabilityStatus, setAvailabilityStatus] = useState<boolean>(true);

  // Interactive modal states
  const [selectedCorporate, setSelectedCorporate] = useState<TrainerCorporateRelationship | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<TrainerOpportunity | null>(null);
  const [proposalRate, setProposalRate] = useState<string>('60000');
  const [proposalNotes, setProposalNotes] = useState<string>('');
  const [submittedProposalIds, setSubmittedProposalIds] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Interactive Calendar State
  const [calYear, setCalYear] = useState<number>(2026);
  const [calMonth, setCalMonth] = useState<number>(8); // 0-indexed (8 = September)
  
  interface CalendarDayData {
    status: 'available' | 'unavailable' | 'booked' | 'tentative';
    eventTitle?: string;
    client?: string;
    location?: string;
    timeSlot?: string;
    note?: string;
  }

  const [calData, setCalData] = useState<Record<string, CalendarDayData>>({
    '2026-09-02': { status: 'booked', eventTitle: 'Leadership & Strategy Workshop', client: 'HDFC Bank', location: 'Mumbai (In-Person)', timeSlot: '09:30 AM - 05:30 PM' },
    '2026-09-03': { status: 'booked', eventTitle: 'Leadership & Strategy Workshop', client: 'HDFC Bank', location: 'Mumbai (In-Person)', timeSlot: '09:30 AM - 05:30 PM' },
    '2026-09-10': { status: 'tentative', eventTitle: 'Executive Communication', client: 'TCS Virtual', location: 'Zoom / Virtual', timeSlot: '02:00 PM - 05:00 PM' },
    '2026-09-15': { status: 'booked', eventTitle: 'Sales Excellence Workshop', client: 'ABC Corp', location: 'Bengaluru (In-Person)', timeSlot: '09:00 AM - 05:00 PM' },
    '2026-09-16': { status: 'booked', eventTitle: 'Sales Excellence Workshop', client: 'ABC Corp', location: 'Bengaluru (In-Person)', timeSlot: '09:00 AM - 05:00 PM' },
    '2026-09-22': { status: 'booked', eventTitle: 'High-Impact Presentation', client: 'XYZ Ltd', location: 'Virtual / Zoom', timeSlot: '10:00 AM - 01:00 PM' },
    '2026-09-28': { status: 'booked', eventTitle: 'Business Storytelling Bootcamp', client: 'PQR Corp', location: 'Delhi (In-Person)', timeSlot: '09:00 AM - 06:00 PM' },
    '2026-09-06': { status: 'unavailable', note: 'Out of office / Personal leave' },
    '2026-09-13': { status: 'unavailable', note: 'Weekend Block' },
    '2026-09-20': { status: 'unavailable', note: 'Weekend Block' },
    '2026-09-27': { status: 'unavailable', note: 'Weekend Block' }
  });

  const [selectedCalDateStr, setSelectedCalDateStr] = useState<string | null>(null);
  const [editCalStatus, setEditCalStatus] = useState<'available' | 'unavailable' | 'booked' | 'tentative'>('available');
  const [editCalTimeSlot, setEditCalTimeSlot] = useState<string>('Full Day (09:00 AM - 06:00 PM)');
  const [editCalLocation, setEditCalLocation] = useState<string>('Classroom (In-Person)');
  const [editCalTitle, setEditCalTitle] = useState<string>('');
  const [editCalClient, setEditCalClient] = useState<string>('');
  const [editCalNote, setEditCalNote] = useState<string>('');

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(prev => prev - 1);
    } else {
      setCalMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(prev => prev + 1);
    } else {
      setCalMonth(prev => prev + 1);
    }
  };

  const openCalDateEditor = (dateStr: string) => {
    setSelectedCalDateStr(dateStr);
    const existing = calData[dateStr];
    if (existing) {
      setEditCalStatus(existing.status);
      setEditCalTimeSlot(existing.timeSlot || 'Full Day (09:00 AM - 06:00 PM)');
      setEditCalLocation(existing.location || 'Classroom (In-Person)');
      setEditCalTitle(existing.eventTitle || '');
      setEditCalClient(existing.client || '');
      setEditCalNote(existing.note || '');
    } else {
      setEditCalStatus('available');
      setEditCalTimeSlot('Full Day (09:00 AM - 06:00 PM)');
      setEditCalLocation('Classroom (In-Person)');
      setEditCalTitle('');
      setEditCalClient('');
      setEditCalNote('');
    }
  };

  const handleSaveCalAvailability = () => {
    if (!selectedCalDateStr) return;
    setCalData(prev => ({
      ...prev,
      [selectedCalDateStr]: {
        status: editCalStatus,
        eventTitle: editCalTitle,
        client: editCalClient,
        location: editCalLocation,
        timeSlot: editCalTimeSlot,
        note: editCalNote
      }
    }));
    triggerToast(`Availability updated for ${selectedCalDateStr} (${editCalStatus.toUpperCase()})`);
    setSelectedCalDateStr(null);
  };

  const handleUnsetSingleDateAvailability = () => {
    if (!selectedCalDateStr) return;
    setCalData(prev => {
      const updated = { ...prev };
      delete updated[selectedCalDateStr];
      return updated;
    });
    triggerToast(`Reset / Unset availability for ${selectedCalDateStr}`);
    setSelectedCalDateStr(null);
  };

  const handleBulkMarkWeekendsAvailable = () => {
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const updated = { ...calData };
    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = new Date(calYear, calMonth, d).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        if (!updated[dateStr] || updated[dateStr].status !== 'booked') {
          updated[dateStr] = { status: 'available' };
        }
      }
    }
    setCalData(updated);
    triggerToast(`Marked all weekends in ${MONTH_NAMES[calMonth]} as Available`);
  };

  const handleBulkMarkWeekendsUnavailable = () => {
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const updated = { ...calData };
    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = new Date(calYear, calMonth, d).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        if (!updated[dateStr] || updated[dateStr].status !== 'booked') {
          updated[dateStr] = { status: 'unavailable', note: 'Weekend Block' };
        }
      }
    }
    setCalData(updated);
    triggerToast(`Marked all weekends in ${MONTH_NAMES[calMonth]} as Blocked / Unavailable`);
  };

  const handleBulkUnsetWeekends = () => {
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const updated = { ...calData };
    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = new Date(calYear, calMonth, d).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        if (updated[dateStr] && updated[dateStr].status !== 'booked') {
          delete updated[dateStr];
        }
      }
    }
    setCalData(updated);
    triggerToast(`Unset / Cleared status for all weekends in ${MONTH_NAMES[calMonth]}`);
  };

  const handleBulkMarkWeekdaysAvailable = () => {
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const updated = { ...calData };
    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = new Date(calYear, calMonth, d).getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        if (!updated[dateStr] || updated[dateStr].status !== 'booked') {
          updated[dateStr] = { status: 'available' };
        }
      }
    }
    setCalData(updated);
    triggerToast(`Marked all weekdays in ${MONTH_NAMES[calMonth]} as Available`);
  };

  const handleBulkUnsetWeekdays = () => {
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const updated = { ...calData };
    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = new Date(calYear, calMonth, d).getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        if (updated[dateStr] && updated[dateStr].status !== 'booked') {
          delete updated[dateStr];
        }
      }
    }
    setCalData(updated);
    triggerToast(`Unset / Cleared status for all weekdays in ${MONTH_NAMES[calMonth]}`);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('user_name');
      const email = localStorage.getItem('registered_email');
      const profile = localStorage.getItem('atlas_trainer_profile');

      if (name) setTrainerName(name);
      if (email) setTrainerEmail(email);

      if (profile) {
        try {
          const parsed = JSON.parse(profile);
          if (parsed.fullName) setTrainerName(parsed.fullName);
          if (parsed.headline) setTrainerTitle(parsed.headline);
          if (parsed.email) setTrainerEmail(parsed.email);
          if (parsed.phone) setTrainerPhone(parsed.phone);
          if (parsed.city) setTrainerCity(parsed.city);
          if (parsed.bio) setTrainerBio(parsed.bio);
          if (parsed.dayRate) setTrainerDayRate(parsed.dayRate);
        } catch (e) {
          // fallback
        }
      }
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    if (typeof window !== 'undefined') {
      const updated = {
        fullName: trainerName,
        headline: trainerTitle,
        email: trainerEmail,
        phone: trainerPhone,
        city: trainerCity,
        bio: trainerBio,
        dayRate: trainerDayRate
      };
      localStorage.setItem('atlas_trainer_profile', JSON.stringify(updated));
      localStorage.setItem('user_name', trainerName);
    }
    triggerToast('Profile changes saved successfully!');
  };

  const handleOpenEditProfile = () => {
    setActiveTab('profile');
    setIsEditingProfile(true);
    setTimeout(() => {
      const el = document.getElementById('edit-profile-form-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Interactive Documents Vault State
  interface VaultDocument {
    id: string;
    name: string;
    category: 'contracts' | 'certificates' | 'tax_id' | 'decks';
    client?: string;
    uploadDate: string;
    expiryDate?: string;
    size: string;
    status: 'Verified' | 'Pending' | 'Expired';
    fileType: 'PDF' | 'DOCX' | 'PNG';
  }

  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('all');
  const [docSearchQuery, setDocSearchQuery] = useState<string>('');

  const [vaultDocs, setVaultDocs] = useState<VaultDocument[]>([
    {
      id: 'doc-1',
      name: 'Atlas Master Facilitator Agreement (MSA_2026).pdf',
      category: 'contracts',
      client: 'AtlasCircle Platform',
      uploadDate: '15 Jan 2026',
      expiryDate: '15 Jan 2028',
      size: '2.4 MB',
      status: 'Verified',
      fileType: 'PDF'
    },
    {
      id: 'doc-2',
      name: 'ICF Master Certified Coach (MCC) Certificate.pdf',
      category: 'certificates',
      client: 'International Coaching Federation',
      uploadDate: '10 Feb 2025',
      expiryDate: 'Lifetime',
      size: '3.1 MB',
      status: 'Verified',
      fileType: 'PDF'
    },
    {
      id: 'doc-3',
      name: 'Harvard Executive Leadership Certificate.pdf',
      category: 'certificates',
      client: 'Harvard Business School',
      uploadDate: '20 Aug 2024',
      expiryDate: 'Lifetime',
      size: '1.8 MB',
      status: 'Verified',
      fileType: 'PDF'
    },
    {
      id: 'doc-4',
      name: 'PAN & GST Registration Copy - Rahul Sharma.pdf',
      category: 'tax_id',
      client: 'Govt of India Tax Dept',
      uploadDate: '01 Jan 2026',
      expiryDate: 'N/A',
      size: '1.2 MB',
      status: 'Verified',
      fileType: 'PDF'
    },
    {
      id: 'doc-5',
      name: 'HDFC Bank Corporate NDA & Non-Compete.pdf',
      category: 'contracts',
      client: 'HDFC Bank Enterprise',
      uploadDate: '02 Sep 2026',
      expiryDate: '02 Sep 2027',
      size: '1.6 MB',
      status: 'Verified',
      fileType: 'PDF'
    },
    {
      id: 'doc-6',
      name: 'Leadership & Executive Strategy Deck (Module 1-4).pptx',
      category: 'decks',
      client: 'Atlas Master Courseware',
      uploadDate: '18 Aug 2026',
      expiryDate: 'N/A',
      size: '14.5 MB',
      status: 'Verified',
      fileType: 'DOCX'
    },
    {
      id: 'doc-7',
      name: 'Bank Cancelled Cheque - Payout Verification.png',
      category: 'tax_id',
      client: 'Atlas Finance Desk',
      uploadDate: '05 Jan 2026',
      expiryDate: 'N/A',
      size: '850 KB',
      status: 'Verified',
      fileType: 'PNG'
    }
  ]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [newDocName, setNewDocName] = useState<string>('');
  const [newDocCategory, setNewDocCategory] = useState<'contracts' | 'certificates' | 'tax_id' | 'decks'>('certificates');
  const [newDocClient, setNewDocClient] = useState<string>('');
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName) return;
    const newDoc: VaultDocument = {
      id: `doc-${Date.now()}`,
      name: newDocName.endsWith('.pdf') || newDocName.endsWith('.docx') ? newDocName : `${newDocName}.pdf`,
      category: newDocCategory,
      client: newDocClient || 'Atlas Partner Workspace',
      uploadDate: 'Today',
      expiryDate: 'N/A',
      size: '2.1 MB',
      status: 'Verified',
      fileType: 'PDF'
    };
    setVaultDocs(prev => [newDoc, ...prev]);
    triggerToast(`Document "${newDoc.name}" uploaded successfully to Vault!`);
    setIsUploadModalOpen(false);
    setNewDocName('');
    setNewDocClient('');
  };

  const handleDeleteDocument = (id: string, name: string) => {
    setVaultDocs(prev => prev.filter(d => d.id !== id));
    triggerToast(`Removed "${name}" from Vault`);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpportunity) return;
    setSubmittedProposalIds(prev => [...prev, selectedOpportunity.id]);
    triggerToast(`Proposal successfully submitted to ${selectedOpportunity.companyName}!`);
    setSelectedOpportunity(null);
    setProposalNotes('');
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-[#091536] antialiased">
      {/* TOAST FEEDBACK */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-2xl bg-[#091536] text-white px-5 py-3.5 shadow-2xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-5 w-5 text-[#0E9F88]" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* MOBILE BACKDROP OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white text-[#091536] border-r border-slate-200 shadow-2xs flex flex-col justify-between transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* BRAND HEADER */}
          <div className="p-4 px-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth < 768) setIsSidebarOpen(false);
              router.push('/');
            }}>
              <img src="/logo/atlas-logo.png" alt="AtlasCircle Logo" className="h-8 w-auto object-contain" />
              <div>
                <p className="text-xs font-black tracking-wider uppercase text-[#1677FF] leading-none">Trainer Hub</p>
                <p className="text-[10px] text-slate-500 font-semibold leading-tight mt-0.5">AtlasCircle Enterprise</p>
              </div>
            </div>
          </div>

          {/* DECLUTTERED TRAINER USER BADGE */}
          <div 
            onClick={() => {
              handleOpenEditProfile();
              if (typeof window !== 'undefined' && window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="mx-3 my-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 hover:border-blue-300 transition cursor-pointer group space-y-2.5 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-[#1677FF] text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                  {trainerName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-[#091536] truncate leading-tight">{trainerName}</p>
                  <p className="text-[10px] text-slate-500 font-semibold truncate leading-tight mt-0.5">{trainerTitle}</p>
                </div>
              </div>

              <button 
                type="button" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleOpenEditProfile(); 
                  if (typeof window !== 'undefined' && window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className="p-1.5 rounded-lg bg-white text-slate-600 border border-slate-200 group-hover:bg-[#1677FF] group-hover:text-white group-hover:border-[#1677FF] transition shrink-0 shadow-2xs"
                title="Edit Profile"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* CLEAN PROGRESS BAR */}
            <div className="space-y-1 pt-1.5 border-t border-slate-200/60">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-emerald-700 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Profile Status
                </span>
                <span className="text-[#091536] font-black">{profileCompletion}% Complete</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${profileCompletion}%` }}></div>
              </div>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="px-3 space-y-1 py-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'profile', label: 'My Profile', icon: UserCheck },
              { id: 'opportunities', label: 'Opportunities', icon: Briefcase, badge: '3 New' },
              { id: 'performance', label: 'Performance & Feedback', icon: Award },
              { id: 'earnings', label: 'Earnings', icon: IndianRupee },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'documents', label: 'Documents', icon: FolderCheck }
              // { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '2' }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-[#1677FF] text-white shadow-md shadow-[#1677FF]/25 font-black' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-[#091536] font-bold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white text-[#1677FF]' : 'bg-blue-50 text-[#1677FF] border border-blue-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth < 768) setIsSidebarOpen(false);
              router.push('/');
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-3.5 py-2 text-xs font-bold text-[#091536] hover:bg-slate-200 transition"
          >
            <Home className="h-4 w-4 text-slate-500" />
            <span>Return to Website</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT CANVAS */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        
        {/* TOP APP HEADER */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-slate-200 bg-white/90 px-3 sm:px-8 py-3 shadow-2xs backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 shrink-0"
              aria-label="Toggle Sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg font-black text-[#091536] capitalize tracking-tight truncate">
                {activeTab.replaceAll('-', ' ')}
              </h1>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold truncate">
                Atlas Facilitator Ecosystem &bull; <span className="text-[#1677FF] hidden sm:inline">{trainerName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Availability Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setAvailabilityStatus(!availabilityStatus);
                triggerToast(availabilityStatus ? 'Status updated: Offline for new briefs' : 'Status updated: Available for September assignments!');
              }}
              className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold border transition ${
                availabilityStatus
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${availabilityStatus ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
              <span className="hidden sm:inline">{availabilityStatus ? 'Available for Bookings' : 'Set Unavailable'}</span>
              <span className="sm:hidden">{availabilityStatus ? 'Available' : 'Unavailable'}</span>
            </button>

            <div className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-black shadow-2xs">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>4.8</span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* TAB 1: DASHBOARD OVERVIEW (HOMEPAGE VIEW) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* MINIMAL WELCOME HERO WITH DATE & PROGRESS */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-blue-50 text-[#1677FF] border border-blue-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide">
                      Verified Facilitator
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Completion Rate 94%
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#091536] tracking-tight">
                    Welcome back, {trainerName}!
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Here's an overview of your assigned corporate training programs, delivery performance, and schedule.
                  </p>
                </div>

                <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleOpenEditProfile}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-bold text-[#091536] shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition active:scale-98"
                  >
                    <Edit3 className="h-4 w-4 text-[#1677FF]" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('opportunities')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E9F88] px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-[#0C8975] transition active:scale-98"
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Browse Opportunities</span>
                  </button>
                </div>
              </div>

              {/* TOP STATS ROW (FROM REFERENCE LAYOUT) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Programs</span>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5">+2 New</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#091536]">35</span>
                    <span className="text-xs font-semibold text-slate-400">Briefs &amp; Modules</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Delivery Hours</span>
                    <Clock className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#091536]">485</span>
                    <span className="text-sm font-bold text-slate-500">h</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Engagements Completed</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#091536]">16</span>
                    <span className="text-sm font-bold text-slate-400">/ 35 Total</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Training Load (7 Days)</span>
                    <span className="text-xs font-bold text-[#1677FF]">7 Days &darr;</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#091536]">42%</span>
                    <span className="text-xs font-bold text-emerald-600">Optimal Schedule</span>
                  </div>
                </div>
              </div>



              {/* MAIN HOMEPAGE DASHBOARD GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT COLUMN: TRAINING PERFORMANCE & UPCOMING ASSIGNMENTS */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* PERFORMANCE CARD */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-[#091536]">Training Performance</h3>
                      <span className="text-xs font-bold text-slate-400">Last 7 Days &darr;</span>
                    </div>

                    {/* MULTI-COLOR PROGRESS BAR */}
                    <div className="space-y-2">
                      <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="bg-rose-500 h-full" style={{ width: '60%' }}></div>
                        <div className="bg-[#1677FF] h-full" style={{ width: '30%' }}></div>
                        <div className="bg-amber-500 h-full" style={{ width: '10%' }}></div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-slate-500 pt-1">
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500"></span> In Progress (60%)</span>
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#1677FF]"></span> Completed (30%)</span>
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500"></span> Pending (10%)</span>
                      </div>
                    </div>

                    {/* 3 STATS ROW */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-slate-100 text-center">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Proposals</span>
                        <span className="text-base sm:text-lg font-black text-[#091536]">46%</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Avg Score</span>
                        <span className="text-base sm:text-lg font-black text-emerald-600">78%</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Attendance</span>
                        <span className="text-base sm:text-lg font-black text-[#1677FF]">94%</span>
                      </div>
                    </div>
                  </div>

                  {/* PAST COMPLETED TRAININGS & ENGAGEMENTS CARD */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-black text-[#091536]">Past Completed Trainings &amp; Engagements</h3>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">Historical record of corporate training programs delivered by {trainerName}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('performance')}
                        className="text-xs font-extrabold text-[#1677FF] hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>View All (28)</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs min-w-[650px]">
                        <thead>
                          <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400">
                            <th className="py-2.5 px-3">Corporate Client</th>
                            <th className="py-2.5 px-3">Program Title</th>
                            <th className="py-2.5 px-3">Date</th>
                            <th className="py-2.5 px-3">Delivery Mode</th>
                            <th className="py-2.5 px-3">Rating</th>
                            <th className="py-2.5 px-3 text-right">Fee Paid</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-[#091536]">
                          {MOCK_COMPLETED_ASSIGNMENTS.map(casg => (
                            <tr key={casg.id} className="hover:bg-slate-50/80 transition">
                              <td className="py-3 px-3 font-black text-[#091536]">{casg.companyName}</td>
                              <td className="py-3 px-3 font-bold text-slate-700">{casg.programTitle}</td>
                              <td className="py-3 px-3 text-slate-500">{casg.dateRange}</td>
                              <td className="py-3 px-3">
                                <span className="rounded-md bg-blue-50 text-[#1677FF] border border-blue-100 px-2 py-0.5 text-[10px] font-black">
                                  {casg.deliveryMode}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-black text-amber-500">
                                ⭐ {casg.rating || 4.8}
                              </td>
                              <td className="py-3 px-3 text-right font-black text-[#091536]">
                                ₹{casg.commercialFee.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: SCHEDULE & FEATURED OPPORTUNITY */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* SCHEDULE CALENDAR WIDGET */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-[#091536]">Schedule</h3>
                      <span className="text-xs font-bold text-slate-500">September &bull; 2026</span>
                    </div>

                    {/* MINI CALENDAR GRID */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-extrabold text-slate-400">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                      {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(day => {
                        const isBooked = day === 15 || day === 16 || day === 22 || day === 28;
                        return (
                          <div 
                            key={day}
                            className={`h-7 w-7 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                              isBooked 
                                ? 'bg-[#1677FF] text-white shadow-xs' 
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('calendar')}
                      className="w-full rounded-xl bg-slate-100 py-2 text-xs font-extrabold text-[#1677FF] hover:bg-blue-50 transition"
                    >
                      Open Full Calendar &rarr;
                    </button>
                  </div>

                  {/* MATCHED OPPORTUNITY BRIEF */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#1677FF] bg-blue-50 px-2 py-0.5 rounded-md">Featured Brief</span>
                      <span className="text-xs font-black text-emerald-600">94% Match</span>
                    </div>
                    <h4 className="text-xs font-black text-[#091536]">Leadership Development — ABC Corp</h4>
                    <p className="text-[11px] font-medium text-slate-500">2 Days &bull; Mumbai &bull; ₹60,000</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('opportunities')}
                      className="w-full rounded-xl bg-[#0E9F88] py-2 text-xs font-black text-white hover:bg-[#0C8975] transition"
                    >
                      View &amp; Submit Proposal
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MY PROFILE (ALWAYS SHOW PROFILE SUMMARY + EDIT FORM BELOW) */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* EDIT PROFILE HEADER BAR */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#091536] tracking-tight">Trainer Profile &amp; Credentials</h2>
                  <p className="text-xs text-slate-500 font-medium">Manage your professional bio, domain matrix, commercials &amp; verified certifications</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition active:scale-98 ${
                      isEditingProfile 
                        ? 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200' 
                        : 'bg-[#1677FF] text-white shadow-2xs hover:bg-blue-700'
                    }`}
                  >
                    <UserCheck className="h-4 w-4" />
                    <span>{isEditingProfile ? 'Close Edit Form' : 'Edit Profile Fields'}</span>
                  </button>
                </div>
              </div>

              {/* ALWAYS VISIBLE PROFILE SUMMARY CARD */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                
                {/* PROFILE HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-[#1677FF] text-white font-black text-2xl flex items-center justify-center shadow-lg">
                      {trainerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-[#091536]">{trainerName}</h2>
                        <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-black">
                          Atlas Verified Facilitator
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-600 mt-0.5">{trainerTitle}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">📍 {trainerCity} &bull; 📧 {trainerEmail} &bull; 📞 {trainerPhone}</p>
                      <button
                        type="button"
                        onClick={handleOpenEditProfile}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-100 px-2.5 py-1 text-[11px] font-bold text-[#1677FF] hover:bg-blue-100 transition"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Edit Bio &amp; Basic Info</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-extrabold uppercase text-slate-400">Atlas Overall Rating</p>
                    <p className="text-3xl font-black text-amber-500 flex items-center justify-end gap-1">
                      <Star className="h-6 w-6 fill-amber-400 text-amber-400" /> 4.8<span className="text-xs text-slate-400 font-bold">/5.0</span>
                    </p>
                    <p className="text-[11px] font-semibold text-slate-500">Based on 28 corporate engagements</p>
                  </div>
                </div>

                {/* PROFILE DETAILS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* EXPERTISE */}
                  <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Expertise &amp; Topics</h3>
                      <button type="button" onClick={handleOpenEditProfile} className="text-xs font-bold text-[#1677FF] hover:underline flex items-center gap-1">
                        <Edit3 className="h-3 w-3" /> Edit
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {trainerSkillsStr.split(',').map(exp => (
                        <span key={exp.trim()} className="rounded-xl bg-white border border-slate-200 px-3 py-1 text-xs font-bold text-[#091536] shadow-2xs">
                          {exp.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* EXPERIENCE & INDUSTRIES */}
                  <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Experience &amp; Sectors</h3>
                      <button type="button" onClick={handleOpenEditProfile} className="text-xs font-bold text-[#1677FF] hover:underline flex items-center gap-1">
                        <Edit3 className="h-3 w-3" /> Edit
                      </button>
                    </div>
                    <div className="space-y-1.5 text-xs font-extrabold text-[#091536]">
                      <p>Experience: <span className="text-[#1677FF]">{trainerExpYears} Years</span></p>
                      <p>Primary Domain: {trainerPrimaryDomain}</p>
                      <p>Sectors: {trainerIndustriesStr}</p>
                    </div>
                  </div>

                  {/* DELIVERY & COMMERCIALS */}
                  <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Commercials &amp; Delivery</h3>
                      <button type="button" onClick={handleOpenEditProfile} className="text-xs font-bold text-[#1677FF] hover:underline flex items-center gap-1">
                        <Edit3 className="h-3 w-3" /> Edit
                      </button>
                    </div>
                    <div className="space-y-2 text-xs font-bold text-slate-700">
                      <p className="text-[#091536] font-black">Base Day Rate: ₹{parseInt(trainerDayRate).toLocaleString('en-IN')}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-600 font-black">✓ Classroom</span>
                        <span className="text-emerald-600 font-black">✓ Virtual</span>
                        <span className="text-emerald-600 font-black">✓ Hybrid</span>
                      </div>
                      <p className="text-slate-600">Notice Period: {trainerNoticePeriod}</p>
                      <p className="text-slate-600">Languages: {trainerLanguagesStr}</p>
                    </div>
                  </div>

                </div>

                {/* CERTIFICATIONS */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Education &amp; Verified Certifications</h3>
                    <button type="button" onClick={handleOpenEditProfile} className="text-xs font-bold text-[#1677FF] hover:underline flex items-center gap-1">
                      <Edit3 className="h-3 w-3" /> Edit
                    </button>
                  </div>
                  <p className="text-xs font-extrabold text-slate-800">Education: {trainerEdu}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {trainerCertsStr.split(',').map((cert, idx) => (
                      <div key={idx} className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 flex items-center gap-3">
                        <Award className="h-5 w-5 text-emerald-600 shrink-0" />
                        <span className="text-xs font-extrabold text-slate-800">{cert.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* EDIT FORM OPENS DIRECTLY BELOW THE SUMMARY CARD */}
              {isEditingProfile && (
                <form id="edit-profile-form-section" onSubmit={handleSaveProfile} className="rounded-3xl border border-[#1677FF]/30 bg-white p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in slide-in-from-top-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <h3 className="text-base font-black text-[#091536]">Edit Facilitator Registration Fields</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Update your profile parameters below and save changes</p>
                    </div>
                    <span className="text-xs font-bold text-[#1677FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      Registration Form Fields
                    </span>
                  </div>

                  {/* STAGE 1: ABOUT YOU */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">1. Basic Info &amp; Professional Identity</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={trainerName}
                          onChange={(e) => setTrainerName(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Headline / Role Descriptors</label>
                        <input
                          type="text"
                          required
                          value={trainerTitle}
                          onChange={(e) => setTrainerTitle(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={trainerEmail}
                          onChange={(e) => setTrainerEmail(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={trainerPhone}
                          onChange={(e) => setTrainerPhone(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Base City &amp; Country</label>
                        <input
                          type="text"
                          value={trainerCity}
                          onChange={(e) => setTrainerCity(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">LinkedIn URL</label>
                        <input
                          type="url"
                          value={trainerLinkedin}
                          onChange={(e) => setTrainerLinkedin(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#091536] mb-1">Tell Us About Yourself (Professional Bio)</label>
                      <textarea
                        rows={3}
                        value={trainerBio}
                        onChange={(e) => setTrainerBio(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                      ></textarea>
                    </div>
                  </div>

                  {/* STAGE 2: EXPERTISE & DOMAINS */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">2. Domain Matrix &amp; Corporate Experience</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Total Experience (Years)</label>
                        <input
                          type="number"
                          value={trainerExpYears}
                          onChange={(e) => setTrainerExpYears(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Primary Domain</label>
                        <input
                          type="text"
                          value={trainerPrimaryDomain}
                          onChange={(e) => setTrainerPrimaryDomain(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Notice Period / Lead Time</label>
                        <input
                          type="text"
                          value={trainerNoticePeriod}
                          onChange={(e) => setTrainerNoticePeriod(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Specialisation Topics &amp; Skills (Comma Separated)</label>
                        <input
                          type="text"
                          value={trainerSkillsStr}
                          onChange={(e) => setTrainerSkillsStr(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Industries &amp; Corporate Sectors Trained</label>
                        <input
                          type="text"
                          value={trainerIndustriesStr}
                          onChange={(e) => setTrainerIndustriesStr(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STAGE 3 & 4: COMMERCIALS & AVAILABILITY */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">3. Commercial Guidance &amp; Education</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Base Day Rate (INR ₹)</label>
                        <input
                          type="number"
                          value={trainerDayRate}
                          onChange={(e) => setTrainerDayRate(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Hourly Rate (INR ₹)</label>
                        <input
                          type="number"
                          value={trainerHourlyRate}
                          onChange={(e) => setTrainerHourlyRate(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Highest Education Qualification</label>
                        <input
                          type="text"
                          value={trainerEdu}
                          onChange={(e) => setTrainerEdu(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Certifications (Comma Separated)</label>
                        <input
                          type="text"
                          value={trainerCertsStr}
                          onChange={(e) => setTrainerCertsStr(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-[#091536] mb-1">Spoken Languages</label>
                        <input
                          type="text"
                          value={trainerLanguagesStr}
                          onChange={(e) => setTrainerLanguagesStr(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#091536] mb-1">Sample Pitch Video / Demo Reel URL</label>
                      <input
                        type="url"
                        value={trainerVideoUrl}
                        onChange={(e) => setTrainerVideoUrl(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#091536] focus:bg-white focus:border-[#1677FF] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                    >
                      Close Form
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-[#0E9F88] px-7 py-2.5 text-xs font-black text-white shadow-md shadow-[#0E9F88]/20 hover:bg-[#0C8975] transition active:scale-98"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* TAB 3: OPPORTUNITIES (MATCH ENGINE) */}
          {activeTab === 'opportunities' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#091536] tracking-tight">Recommended Opportunities for You</h2>
                  <p className="text-xs text-slate-500 font-medium">Smart AI matched training briefs based on your profile, location &amp; fee structure</p>
                </div>
              </div>

              <div className="space-y-5">
                {MOCK_TRAINER_OPPORTUNITIES.map(opp => {
                  const isSubmitted = submittedProposalIds.includes(opp.id);
                  return (
                    <div key={opp.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-blue-50 text-[#1677FF] border border-blue-200 px-2.5 py-0.5 text-[10px] font-black uppercase">
                              {opp.category}
                            </span>
                            <span className="text-xs font-bold text-slate-500">{opp.companyName}</span>
                          </div>
                          <h3 className="text-lg font-black text-[#091536] mt-1">{opp.title}</h3>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            📍 {opp.location} &bull; 👥 {opp.participants} Participants &bull; ⏱️ {opp.durationDays} Days &bull; 📅 {opp.startDate}
                          </p>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-[#1677FF] border border-blue-300 px-3.5 py-1 text-xs font-black">
                            <Sparkles className="h-3.5 w-3.5 text-[#1677FF]" /> Match Score: {opp.matchScore}%
                          </span>
                          <p className="text-xs font-black text-[#091536] mt-1.5">Budget: {opp.budgetRange}</p>
                        </div>
                      </div>

                      {/* WHY MATCHED BREAKDOWN */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Why is this recommended?</p>
                        <div className="flex flex-wrap gap-2">
                          {opp.whyMatch.map((reason, rIdx) => (
                            <span key={rIdx} className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setSelectedOpportunity(opp)}
                          className="text-xs font-bold text-[#1677FF] hover:underline text-left sm:text-left"
                        >
                          View Full Requirement Details &rarr;
                        </button>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                          {isSubmitted ? (
                            <span className="rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-2 text-xs font-black inline-flex items-center justify-center gap-1.5">
                              <Check className="h-4 w-4 text-emerald-700" /> Proposal Submitted
                            </span>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => triggerToast(`Marked interest in ${opp.companyName}'s brief!`)}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition text-center"
                              >
                                I'm Interested
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedOpportunity(opp)}
                                className="rounded-xl bg-[#0E9F88] px-5 py-2.5 text-xs font-black text-white shadow-md shadow-[#0E9F88]/20 hover:bg-[#0C8975] transition text-center"
                              >
                                Submit Proposal
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: MY ASSIGNMENTS (CRM) */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              
              {/* UPCOMING SECTION */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-base font-black text-[#091536]">Upcoming Training Engagements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_UPCOMING_ASSIGNMENTS.map(asg => (
                    <div key={asg.id} className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#1677FF]">{asg.companyName}</span>
                        <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-black">
                          {asg.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-[#091536]">{asg.programTitle}</h4>
                      <div className="text-xs text-slate-600 space-y-1 font-medium">
                        <p>🗓️ Dates: <span className="font-bold text-[#091536]">{asg.dateRange}</span> ({asg.days} Days)</p>
                        <p>📍 Location: {asg.location} ({asg.deliveryMode})</p>
                        <p>👥 Cohort Size: {asg.participantsCount} Participants</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COMPLETED HISTORICAL CRM TABLE */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-base font-black text-[#091536]">Completed Assignments History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[650px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400">
                        <th className="py-3 px-3">Corporate Client</th>
                        <th className="py-3 px-3">Program Title</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Days</th>
                        <th className="py-3 px-3">Mode</th>
                        <th className="py-3 px-3">Fee Paid</th>
                        <th className="py-3 px-3 text-right">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_COMPLETED_ASSIGNMENTS.map(casg => (
                        <tr key={casg.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-3 font-black text-[#091536]">{casg.companyName}</td>
                          <td className="py-3 px-3 font-bold text-slate-700">{casg.programTitle}</td>
                          <td className="py-3 px-3 text-slate-500">{casg.dateRange}</td>
                          <td className="py-3 px-3 text-slate-700 font-semibold">{casg.days} Days</td>
                          <td className="py-3 px-3 text-slate-600">{casg.deliveryMode}</td>
                          <td className="py-3 px-3 font-extrabold text-[#091536]">₹{casg.commercialFee.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3 text-right font-black text-amber-500">
                            ⭐ {casg.rating || 4.8}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: MY CORPORATE RELATIONSHIPS */}
          {activeTab === 'corporates' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#091536] tracking-tight">My Corporate Relationships</h2>
                <p className="text-xs text-slate-500 font-medium">Organizations you have delivered training programs for on Atlas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {MOCK_CORPORATE_RELATIONSHIPS.map(corp => (
                  <div 
                    key={corp.id}
                    onClick={() => setSelectedCorporate(corp)}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition cursor-pointer space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#1677FF] font-black text-base flex items-center justify-center border border-blue-100">
                        {corp.companyName.charAt(0)}
                      </div>
                      <span className="rounded-full bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 text-xs font-black">
                        ⭐ {corp.averageRating}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-[#091536]">{corp.companyName}</h3>
                      <p className="text-xs text-slate-500 font-medium">{corp.industry}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Assignments</span>
                        <span className="font-extrabold text-[#091536]">{corp.totalAssignments} Completed</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Training Days</span>
                        <span className="font-extrabold text-[#091536]">{corp.totalTrainingDays} Days</span>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="w-full rounded-xl bg-slate-100 py-2 text-xs font-extrabold text-[#1677FF] hover:bg-blue-50 transition"
                    >
                      View History &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PERFORMANCE & FEEDBACK */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-black text-[#091536]">Your Atlas Performance Dashboard</h2>
                  <p className="text-xs text-slate-500 font-medium">Quality ratings and corporate conversion analytics calculated across all engagements</p>
                </div>

                {/* RATINGS RADAR BREAKDOWN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                  <div className="sm:col-span-2 md:col-span-1 border-b md:border-b-0 md:border-r border-slate-200/80 pb-4 md:pb-0 md:pr-4">
                    <p className="text-xs font-black uppercase text-slate-400">Overall Rating</p>
                    <p className="text-3xl font-black text-amber-500 mt-1">⭐ 4.8</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">Top 2% Trainer</p>
                  </div>
                  {[
                    { label: 'Content Quality', score: '4.9' },
                    { label: 'Delivery Style', score: '4.8' },
                    { label: 'Learner Engagement', score: '4.7' },
                    { label: 'Business Relevance', score: '4.9' }
                  ].map((sub, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-500">{sub.label}</p>
                      <p className="text-xl font-black text-[#091536]">{sub.score} / 5.0</p>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                        <div className="bg-[#0E9F88] h-1.5 rounded-full" style={{ width: `${(parseFloat(sub.score)/5)*100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CONVERSION & REPEAT RATIOS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Repeat Assignment Rate', val: '85%' },
                    { label: 'Corporate Repeat Rate', val: '78%' },
                    { label: 'Proposal Acceptance', val: '92%' },
                    { label: 'Proposal Conversion', val: '65%' }
                  ].map((stat, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 p-5 bg-white shadow-2xs space-y-1">
                      <p className="text-xs font-extrabold uppercase text-slate-400">{stat.label}</p>
                      <p className="text-2xl font-black text-[#1677FF]">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* COMPLETED ASSIGNMENTS & HISTORICAL PERFORMANCE TABLE */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-[#091536]">Completed Assignments &amp; Client Feedback History</h3>
                    <p className="text-xs text-slate-500 font-medium">Historical audit of all corporate training programs completed on Atlas Platform</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 text-xs font-black">
                    28 Programs Delivered
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[650px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400">
                        <th className="py-3 px-3">Corporate Client</th>
                        <th className="py-3 px-3">Program Title</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Days</th>
                        <th className="py-3 px-3">Mode</th>
                        <th className="py-3 px-3">Fee Paid</th>
                        <th className="py-3 px-3 text-right">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-[#091536]">
                      {MOCK_COMPLETED_ASSIGNMENTS.map(casg => (
                        <tr key={casg.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-3 font-black text-[#091536]">{casg.companyName}</td>
                          <td className="py-3 px-3 font-bold text-slate-700">{casg.programTitle}</td>
                          <td className="py-3 px-3 text-slate-500">{casg.dateRange}</td>
                          <td className="py-3 px-3 text-slate-700 font-semibold">{casg.days} Days</td>
                          <td className="py-3 px-3">
                            <span className="rounded-md bg-blue-50 text-[#1677FF] border border-blue-100 px-2 py-0.5 text-[10px] font-black">
                              {casg.deliveryMode}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-extrabold text-[#091536]">₹{casg.commercialFee.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3 text-right font-black text-amber-500">
                            ⭐ {casg.rating || 4.8}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: EARNINGS */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              
              {/* EARNINGS STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-1">
                  <p className="text-xs font-extrabold uppercase text-slate-400">This Month</p>
                  <p className="text-2xl font-black text-[#091536]">₹95,000</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-1">
                  <p className="text-xs font-extrabold uppercase text-slate-400">Year to Date (YTD)</p>
                  <p className="text-2xl font-black text-[#1677FF]">₹4,85,000</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-1">
                  <p className="text-xs font-extrabold uppercase text-slate-400">Pending Processing</p>
                  <p className="text-2xl font-black text-amber-600">₹50,000</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-1">
                  <p className="text-xs font-extrabold uppercase text-slate-400">Total Paid Out</p>
                  <p className="text-2xl font-black text-emerald-600">₹4,35,000</p>
                </div>
              </div>

              {/* TRANSACTIONS TABLE */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-[#091536]">Earnings &amp; Payout Statements</h3>
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => triggerToast('Downloaded all payment statements (PDF)')}
                      className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" /> Invoices &amp; TDS Statements
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[650px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400">
                        <th className="py-3 px-3">Assignment</th>
                        <th className="py-3 px-3">Corporate Client</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Gross Fee</th>
                        <th className="py-3 px-3">TDS (10%)</th>
                        <th className="py-3 px-3">Net Payout</th>
                        <th className="py-3 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_TRAINER_EARNINGS.map(earn => (
                        <tr key={earn.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-3 font-bold text-[#091536]">{earn.assignmentTitle}</td>
                          <td className="py-3 px-3 text-slate-600">{earn.companyName}</td>
                          <td className="py-3 px-3 text-slate-500">{earn.date}</td>
                          <td className="py-3 px-3 font-bold text-slate-800">₹{earn.fee.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3 text-slate-400">₹{earn.taxDeducted.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3 font-black text-emerald-700">₹{earn.netPayout.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3 text-right">
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                              earn.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {earn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 8: INTERACTIVE CALENDAR */}
          {activeTab === 'calendar' && (() => {
            const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
            const firstDayIndex = new Date(calYear, calMonth, 1).getDay(); // 0 = Sun
            const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

            return (
              <div className="space-y-6">
                {/* CALENDAR CONTAINER CARD */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
                  {/* HEADER WITH MONTH NAVIGATION & QUICK ACTIONS */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-xl font-black text-[#091536] tracking-tight">
                          {MONTH_NAMES[calMonth]} {calYear}
                        </h2>
                        <span className="rounded-full bg-blue-50 text-[#1677FF] border border-blue-100 px-3 py-0.5 text-xs font-bold">
                          Interactive Availability Editor
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Click on any date to set availability, manage time slots, or view scheduled corporate sessions.
                      </p>
                    </div>

                    {/* CONTROLS */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          className="rounded-lg p-1.5 text-slate-600 hover:bg-white hover:shadow-xs transition"
                          title="Previous Month"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => { setCalYear(2026); setCalMonth(8); }}
                          className="px-3 py-1 text-xs font-black text-[#091536] hover:text-[#1677FF]"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="rounded-lg p-1.5 text-slate-600 hover:bg-white hover:shadow-xs transition"
                          title="Next Month"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* 1. Set Weekends Available */}
                      <div className="relative group/tooltip inline-flex items-center">
                        <button
                          type="button"
                          onClick={handleBulkMarkWeekendsAvailable}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition shadow-2xs"
                        >
                          <span>🟢 Set Weekends Available</span>
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-200/80 text-emerald-800">
                            <Info className="h-2.5 w-2.5" />
                          </span>
                        </button>
                        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-52 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-medium text-white shadow-xl group-hover/tooltip:block z-50">
                          <div className="font-bold text-emerald-400 mb-0.5">Set Weekends Available</div>
                          Marks all Saturdays &amp; Sundays in the current month as Available (Green) for corporate bookings.
                          <div className="absolute top-full left-1/2 -ml-1 border-4 border-transparent border-t-slate-900" />
                        </div>
                      </div>

                      {/* 2. Block Weekends */}
                      <div className="relative group/tooltip inline-flex items-center">
                        <button
                          type="button"
                          onClick={handleBulkMarkWeekendsUnavailable}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition shadow-2xs"
                        >
                          <span>🔴 Block Weekends</span>
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-200/80 text-rose-800">
                            <Info className="h-2.5 w-2.5" />
                          </span>
                        </button>
                        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-52 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-medium text-white shadow-xl group-hover/tooltip:block z-50">
                          <div className="font-bold text-rose-400 mb-0.5">Block Weekends</div>
                          Marks all Saturdays &amp; Sundays in the current month as Blocked / Out of Office (Red/Gray).
                          <div className="absolute top-full left-1/2 -ml-1 border-4 border-transparent border-t-slate-900" />
                        </div>
                      </div>

                      {/* 3. Unset / Unblock Weekends */}
                      <div className="relative group/tooltip inline-flex items-center">
                        <button
                          type="button"
                          onClick={handleBulkUnsetWeekends}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition shadow-2xs"
                        >
                          <span>⚪ Unset / Unblock Weekends</span>
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                            <Info className="h-2.5 w-2.5" />
                          </span>
                        </button>
                        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-56 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-medium text-white shadow-xl group-hover/tooltip:block z-50">
                          <div className="font-bold text-slate-300 mb-0.5">Unset / Unblock Weekends</div>
                          Clears custom weekend availability or blocks, resetting Saturdays &amp; Sundays back to default.
                          <div className="absolute top-full left-1/2 -ml-1 border-4 border-transparent border-t-slate-900" />
                        </div>
                      </div>

                      {/* 4. Set Weekdays Available */}
                      <div className="relative group/tooltip inline-flex items-center">
                        <button
                          type="button"
                          onClick={handleBulkMarkWeekdaysAvailable}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 border border-blue-200 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition shadow-2xs"
                        >
                          <span>🟢 Set Weekdays Available</span>
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-200/80 text-blue-800">
                            <Info className="h-2.5 w-2.5" />
                          </span>
                        </button>
                        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-52 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-medium text-white shadow-xl group-hover/tooltip:block z-50">
                          <div className="font-bold text-blue-400 mb-0.5">Set Weekdays Available</div>
                          Marks all Mondays to Fridays in the current month as Available (Green) for corporate bookings.
                          <div className="absolute top-full left-1/2 -ml-1 border-4 border-transparent border-t-slate-900" />
                        </div>
                      </div>

                      {/* 5. Unset Weekdays */}
                      <div className="relative group/tooltip inline-flex items-center">
                        <button
                          type="button"
                          onClick={handleBulkUnsetWeekdays}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition shadow-2xs"
                        >
                          <span>⚪ Unset Weekdays</span>
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                            <Info className="h-2.5 w-2.5" />
                          </span>
                        </button>
                        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-52 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-medium text-white shadow-xl group-hover/tooltip:block z-50">
                          <div className="font-bold text-slate-300 mb-0.5">Unset Weekdays</div>
                          Clears custom status or blocks on Mondays to Fridays, resetting weekdays back to default.
                          <div className="absolute top-full left-1/2 -ml-1 border-4 border-transparent border-t-slate-900" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CALENDAR LEGEND */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Legend:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-slate-400"></span>
                      <span>Blocked / Out of Office</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-[#1677FF]"></span>
                      <span>Booked Assignment</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                      <span>Tentative Hold</span>
                    </div>
                  </div>

                  {/* MONTHLY CALENDAR GRID */}
                  <div className="border border-slate-200 rounded-2xl overflow-x-auto bg-slate-100/50">
                    <div className="min-w-[640px]">
                      {/* DAYS OF THE WEEK HEADER */}
                      <div className="grid grid-cols-7 bg-slate-800 text-white text-center text-xs font-black py-2.5">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                          <div key={day} className={idx === 0 || idx === 6 ? 'text-amber-300' : 'text-slate-200'}>
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* CALENDAR CELLS GRID */}
                      <div className="grid grid-cols-7 bg-slate-200 gap-px">
                        {/* Leading Blank Cells */}
                        {Array.from({ length: firstDayIndex }).map((_, i) => (
                          <div key={`blank-${i}`} className="bg-slate-50 min-h-[85px] sm:min-h-[110px] p-1.5 sm:p-2 text-slate-300 select-none">
                          </div>
                        ))}

                        {/* Day Cells */}
                        {daysArray.map(dayNum => {
                          const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                          const dayData = calData[dateStr] || { status: 'available' };
                          const isToday = calYear === 2026 && calMonth === 8 && dayNum === 6;

                          let cellBg = 'bg-white hover:bg-slate-50';
                          let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                          let statusText = 'Available';

                          if (dayData.status === 'booked') {
                            cellBg = 'bg-blue-50/70 hover:bg-blue-100/70 border-blue-200';
                            badgeBg = 'bg-[#1677FF] text-white border-blue-600';
                            statusText = dayData.client ? `${dayData.client}` : 'Booked';
                          } else if (dayData.status === 'unavailable') {
                            cellBg = 'bg-slate-100/90 hover:bg-slate-200/90 text-slate-400';
                            badgeBg = 'bg-slate-200 text-slate-600 border-slate-300';
                            statusText = 'Blocked';
                          } else if (dayData.status === 'tentative') {
                            cellBg = 'bg-amber-50/80 hover:bg-amber-100/80';
                            badgeBg = 'bg-amber-500 text-white border-amber-600';
                            statusText = 'Hold';
                          }

                          return (
                            <div
                              key={dateStr}
                              onClick={() => openCalDateEditor(dateStr)}
                              className={`min-h-[85px] sm:min-h-[110px] p-1.5 sm:p-2.5 cursor-pointer transition flex flex-col justify-between group relative ${cellBg}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-black ${
                                  isToday 
                                    ? 'h-6 w-6 rounded-full bg-[#1677FF] text-white flex items-center justify-center shadow-xs' 
                                    : 'text-[#091536]'
                                }`}>
                                  {dayNum}
                                </span>
                                
                                <span className={`text-[9px] sm:text-[10px] font-black px-1 sm:px-1.5 py-0.5 rounded-md border truncate max-w-[70px] sm:max-w-[80px] ${badgeBg}`}>
                                  {statusText}
                                </span>
                              </div>

                              {/* Details inside cell */}
                              <div className="mt-1 space-y-0.5 text-left">
                                {dayData.eventTitle && (
                                  <p className="text-[10px] font-black text-[#091536] leading-tight line-clamp-2">
                                    {dayData.eventTitle}
                                  </p>
                                )}
                                {dayData.location && (
                                  <p className="text-[9px] text-slate-500 font-medium truncate">
                                    📍 {dayData.location}
                                  </p>
                                )}
                                {dayData.note && !dayData.eventTitle && (
                                  <p className="text-[9px] text-slate-400 font-medium italic truncate">
                                    {dayData.note}
                                  </p>
                                )}
                              </div>

                              {/* Hover prompt */}
                              <div className="opacity-0 group-hover:opacity-100 transition text-[9px] font-bold text-[#1677FF] text-right mt-1">
                                Edit ✏️
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SCHEDULED ENGAGEMENTS SUMMARY */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                  <h3 className="text-base font-black text-[#091536]">
                    Upcoming Booked Sessions in {MONTH_NAMES[calMonth]} {calYear}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(calData)
                      .filter(([d, val]) => d.startsWith(`${calYear}-${String(calMonth + 1).padStart(2, '0')}`) && (val.status === 'booked' || val.status === 'tentative'))
                      .map(([dStr, val]) => (
                        <div key={dStr} className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#1677FF]">
                              {dStr.split('-')[2]} {MONTH_NAMES[calMonth]}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              val.status === 'booked' ? 'bg-blue-100 text-[#1677FF]' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {val.status}
                            </span>
                          </div>
                          <p className="text-sm font-black text-[#091536]">{val.client || 'Client Corporate'}</p>
                          <p className="text-xs text-slate-600 font-medium">{val.eventTitle || 'Training Session'}</p>
                          <div className="text-[11px] text-slate-500 flex items-center justify-between">
                            <span>📍 {val.location || 'Location'}</span>
                            <span className="font-semibold">{val.timeSlot || 'Full Day'}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TAB 9: DOCUMENTS VAULT & WORKSPACE */}
          {activeTab === 'documents' && (() => {
            const filteredDocs = vaultDocs.filter(doc => {
              const matchesCat = docCategoryFilter === 'all' || doc.category === docCategoryFilter;
              const matchesSearch = doc.name.toLowerCase().includes(docSearchQuery.toLowerCase()) || 
                                    (doc.client && doc.client.toLowerCase().includes(docSearchQuery.toLowerCase()));
              return matchesCat && matchesSearch;
            });

            return (
              <div className="space-y-6">
                {/* HEADER BANNER & STORAGE METRICS */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-xl font-black text-[#091536] tracking-tight">Documents Vault &amp; Workspace</h2>
                        <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-0.5 text-xs font-bold flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          100% Compliant Partner
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Securely store master agreements, verified coaching certificates, tax credentials, and facilitation decks.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsUploadModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#1677FF] px-5 py-2.5 text-xs font-black text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition active:scale-98 shrink-0"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload New Document</span>
                    </button>
                  </div>

                  {/* VAULT STATS ROW */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Total Documents</p>
                      <p className="text-2xl font-black text-[#091536]">{vaultDocs.length}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Contracts &amp; MSAs</p>
                      <p className="text-2xl font-black text-[#1677FF]">
                        {vaultDocs.filter(d => d.category === 'contracts').length}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Certificates</p>
                      <p className="text-2xl font-black text-emerald-600">
                        {vaultDocs.filter(d => d.category === 'certificates').length}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Vault Security</p>
                      <p className="text-xs font-black text-slate-700 flex items-center gap-1 mt-2">
                        <Lock className="h-3.5 w-3.5 text-emerald-600" /> AES-256 Encrypted
                      </p>
                    </div>
                  </div>
                </div>

                {/* CONTROLS BAR: CATEGORY PILLS & SEARCH */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  {/* CATEGORY PILLS */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: 'all', label: 'All Files' },
                      { id: 'contracts', label: '📜 Contracts & MSAs' },
                      { id: 'certificates', label: '🎓 Certificates' },
                      { id: 'tax_id', label: '💳 Tax & Identity' },
                      { id: 'decks', label: '📊 Course Decks' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setDocCategoryFilter(cat.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition ${
                          docCategoryFilter === cat.id
                            ? 'bg-[#091536] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* SEARCH BOX */}
                  <div className="relative w-full sm:w-auto min-w-0 sm:min-w-[220px]">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search vault..."
                      value={docSearchQuery}
                      onChange={e => setDocSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3.5 py-1.5 text-xs font-medium text-[#091536] focus:border-[#1677FF] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* DOCUMENTS TABLE GRID */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[700px]">
                      <thead className="bg-slate-800 text-white font-black uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4">Document Title</th>
                          <th className="py-3.5 px-4">Category</th>
                          <th className="py-3.5 px-4">Issuer / Client</th>
                          <th className="py-3.5 px-4">Upload Date</th>
                          <th className="py-3.5 px-4">Size</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-[#091536]">
                        {filteredDocs.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                              No documents found matching filters
                            </td>
                          </tr>
                        ) : (
                          filteredDocs.map(doc => (
                            <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                              <td className="py-3.5 px-4 font-black">
                                <div className="flex items-center gap-2.5">
                                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 ${
                                    doc.fileType === 'PDF' 
                                      ? 'bg-rose-100 text-rose-700' 
                                      : doc.fileType === 'DOCX' 
                                      ? 'bg-blue-100 text-blue-700' 
                                      : 'bg-emerald-100 text-emerald-700'
                                  }`}>
                                    {doc.fileType}
                                  </div>
                                  <span className="truncate max-w-xs">{doc.name}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="rounded-md bg-slate-100 text-slate-700 px-2.5 py-1 text-[10px] font-black capitalize border border-slate-200">
                                  {doc.category.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600">{doc.client || 'Atlas Platform'}</td>
                              <td className="py-3.5 px-4 text-slate-500">{doc.uploadDate}</td>
                              <td className="py-3.5 px-4 text-slate-500">{doc.size}</td>
                              <td className="py-3.5 px-4">
                                <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-black inline-flex items-center gap-1">
                                  ✓ {doc.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setPreviewDoc(doc)}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-[#1677FF] hover:text-white hover:border-[#1677FF] transition"
                                    title="Preview Document"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => triggerToast(`Downloading ${doc.name}...`)}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-[#0E9F88] hover:text-white hover:border-[#0E9F88] transition"
                                    title="Download File"
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteDocument(doc.id, doc.name)}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
                                    title="Delete Document"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* COMPLIANCE CHECKLIST SUMMARY CARD */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-[#091536]">Facilitator Compliance Checklist</h3>
                      <p className="text-xs text-slate-500 font-medium">Atlas platform verification requirements for active payout processing</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 border border-emerald-300">
                      5/5 Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { title: 'Atlas Master Services Agreement (MSA)', desc: 'Signed & Active till Jan 2028', done: true },
                      { title: 'Verified PAN & Tax Proof', desc: 'Government PAN verified', done: true },
                      { title: 'Bank Payout Cheque / Details', desc: 'Verified for NEFT / RTGS transfers', done: true },
                      { title: 'Executive Coaching Certification', desc: 'ICF MCC verified credential', done: true },
                      { title: 'Corporate NDA & Confidentiality', desc: 'Signed enterprise NDA', done: true }
                    ].map((item, idx) => (
                      <div key={idx} className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <p className="text-xs font-black text-[#091536]">{item.title}</p>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium pl-6">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TAB 10: MESSAGES WORKSPACE */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs text-center space-y-4">
                <div className="mx-auto h-16 w-16 rounded-3xl bg-blue-50 text-[#1677FF] flex items-center justify-center">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-black text-[#091536]">Atlas Corporate Messaging Hub</h3>
                <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                  Direct encrypted chat channel between Rahul Sharma and corporate L&amp;D program managers.
                </p>
                <div className="max-w-md mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#1677FF] text-white text-xs font-black flex items-center justify-center">
                      HB
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#091536]">HDFC Bank Enterprise Team</p>
                      <p className="text-[10px] text-slate-500">"Please share the attendee pre-read materials for Sep 15th."</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Opened HDFC Bank Chat Channel')}
                  className="rounded-xl bg-[#1677FF] px-6 py-2.5 text-xs font-black text-white hover:bg-blue-700 transition"
                >
                  Open Corporate Conversation
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CORPORATE RELATIONSHIP DETAIL DRAWER/MODAL */}
      {selectedCorporate && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-full sm:max-w-lg h-full max-h-screen bg-white p-5 sm:p-8 shadow-2xl overflow-y-auto space-y-6 border-l border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedCorporate(null)}
              className="absolute right-5 top-5 h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-[10px] font-black uppercase text-[#1677FF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                Corporate CRM History
              </span>
              <h3 className="text-xl font-black text-[#091536] mt-2">{selectedCorporate.companyName}</h3>
              <p className="text-xs text-slate-500 font-medium">{selectedCorporate.industry}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1 text-xs">
              <p className="font-extrabold text-[#091536]">Contact Person</p>
              <p className="text-slate-700 font-bold">{selectedCorporate.contactPerson} &bull; {selectedCorporate.contactRole}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Past Delivered Programs</h4>
              {selectedCorporate.history.map(item => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4 space-y-2 bg-white shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#091536]">{item.programTitle}</span>
                    <span className="text-xs font-black text-amber-500">⭐ {item.rating}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">🗓️ {item.date} &bull; {item.days} Days &bull; {item.participants} Learners</p>
                  <p className="text-xs italic text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">"{item.feedback}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROPOSAL SUBMISSION MODAL */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-8 shadow-2xl space-y-5 border border-slate-100 my-auto">
            <button
              type="button"
              onClick={() => setSelectedOpportunity(null)}
              className="absolute right-5 top-5 h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-[10px] font-black uppercase text-[#1677FF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                Submit Proposal
              </span>
              <h3 className="text-lg font-black text-[#091536] mt-2 leading-snug">
                {selectedOpportunity.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Client: <span className="font-bold text-slate-700">{selectedOpportunity.companyName}</span>
              </p>
            </div>

            <form onSubmit={handleProposalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#091536] mb-1">
                  Proposed Commercial Day Rate (INR ₹)
                </label>
                <input
                  type="number"
                  required
                  value={proposalRate}
                  onChange={(e) => setProposalRate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-[#091536] focus:border-[#1677FF] focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#091536] mb-1">
                  Custom Pitch &amp; Outline Note
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your facilitation approach, custom case study modules, and availability..."
                  value={proposalNotes}
                  onChange={(e) => setProposalNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-[#091536] focus:border-[#1677FF] focus:bg-white focus:outline-hidden"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOpportunity(null)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E9F88] px-6 py-2.5 text-xs font-black text-white shadow-md shadow-[#0E9F88]/20 hover:bg-[#0C8975] transition active:scale-98"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CALENDAR AVAILABILITY & DATE EDITOR MODAL */}
      {selectedCalDateStr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 border border-slate-200 my-auto">
            <button
              type="button"
              onClick={() => setSelectedCalDateStr(null)}
              className="absolute right-5 top-5 h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-[10px] font-black uppercase text-[#1677FF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                Update Calendar Slot
              </span>
              <h3 className="text-lg font-black text-[#091536] mt-2">
                Manage Availability
              </h3>
              <p className="text-xs font-bold text-slate-500">
                Date: <span className="text-[#1677FF]">{selectedCalDateStr}</span>
              </p>
            </div>

            {/* STATUS SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-[#091536]">Availability Status</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'available', label: '🟢 Available', bg: 'hover:border-emerald-500 text-emerald-700' },
                  { id: 'unavailable', label: '🔴 Blocked / Leave', bg: 'hover:border-slate-500 text-slate-700' },
                  { id: 'booked', label: '🔵 Booked Assignment', bg: 'hover:border-blue-500 text-blue-700' },
                  { id: 'tentative', label: '🟡 Tentative Hold', bg: 'hover:border-amber-500 text-amber-700' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setEditCalStatus(opt.id as any)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-black border text-left transition ${
                      editCalStatus === opt.id 
                        ? 'border-[#1677FF] bg-blue-50/80 shadow-xs' 
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TIME SLOT */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#091536]">Preferred Time Slot</label>
              <select
                value={editCalTimeSlot}
                onChange={e => setEditCalTimeSlot(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#091536] focus:border-[#1677FF] focus:outline-hidden"
              >
                <option value="Full Day (09:00 AM - 06:00 PM)">Full Day (09:00 AM - 06:00 PM)</option>
                <option value="Morning Slot (09:00 AM - 01:00 PM)">Morning Slot (09:00 AM - 01:00 PM)</option>
                <option value="Afternoon Slot (02:00 PM - 06:00 PM)">Afternoon Slot (02:00 PM - 06:00 PM)</option>
                <option value="Evening Virtual Slot (06:00 PM - 09:00 PM)">Evening Virtual Slot (06:00 PM - 09:00 PM)</option>
              </select>
            </div>

            {/* DELIVERY MODE */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#091536]">Mode / Location</label>
              <select
                value={editCalLocation}
                onChange={e => setEditCalLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#091536] focus:border-[#1677FF] focus:outline-hidden"
              >
                <option value="Classroom (In-Person)">Classroom (In-Person)</option>
                <option value="Virtual (Zoom / Teams)">Virtual (Zoom / Teams)</option>
                <option value="Hybrid (Both In-Person & Virtual)">Hybrid (Both In-Person & Virtual)</option>
              </select>
            </div>

            {/* TITLE & CLIENT (IF BOOKED/TENTATIVE) */}
            {(editCalStatus === 'booked' || editCalStatus === 'tentative') && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-[#091536]">Client Name</label>
                  <input
                    type="text"
                    value={editCalClient}
                    onChange={e => setEditCalClient(e.target.value)}
                    placeholder="e.g. HDFC Bank, TCS"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#091536]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-[#091536]">Program Title</label>
                  <input
                    type="text"
                    value={editCalTitle}
                    onChange={e => setEditCalTitle(e.target.value)}
                    placeholder="e.g. Leadership Workshop"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#091536]"
                  />
                </div>
              </>
            )}

            {/* NOTE / REASON */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#091536]">Notes / Reminders</label>
              <textarea
                rows={2}
                value={editCalNote}
                onChange={e => setEditCalNote(e.target.value)}
                placeholder="Add availability constraints, leave notes, or location preferences..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-[#091536]"
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handleUnsetSingleDateAvailability}
                className="px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-700 hover:bg-rose-100 transition text-center"
              >
                🗑️ Unset / Clear Slot
              </button>
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCalDateStr(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition text-center"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCalAvailability}
                  className="px-5 py-2.5 rounded-xl bg-[#1677FF] text-xs font-black text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20 text-center"
                >
                  Save Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD DOCUMENT MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 border border-slate-200 my-auto">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute right-5 top-5 h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-[10px] font-black uppercase text-[#1677FF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                Cloud Vault Storage
              </span>
              <h3 className="text-lg font-black text-[#091536] mt-2">
                Upload New Document
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Upload contracts, certifications, tax documents or training deck presentations.
              </p>
            </div>

            <form onSubmit={handleUploadDocument} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-[#091536]">Document Name / Title</label>
                <input
                  type="text"
                  required
                  value={newDocName}
                  onChange={e => setNewDocName(e.target.value)}
                  placeholder="e.g. DiSC Leadership Certification 2026"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-[#091536] focus:border-[#1677FF] focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-[#091536]">Document Category</label>
                <select
                  value={newDocCategory}
                  onChange={e => setNewDocCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-[#091536] focus:border-[#1677FF] focus:bg-white focus:outline-hidden"
                >
                  <option value="certificates">🎓 Verified Certificate</option>
                  <option value="contracts">📜 Contract / Master Agreement (MSA)</option>
                  <option value="tax_id">💳 Tax & Identification Proof</option>
                  <option value="decks">📊 Training Presentation Deck</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-[#091536]">Client / Issuing Organization</label>
                <input
                  type="text"
                  value={newDocClient}
                  onChange={e => setNewDocClient(e.target.value)}
                  placeholder="e.g. Harvard Business School, HDFC Bank"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-[#091536] focus:border-[#1677FF] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* SIMULATED DRAG & DROP FILE BOX */}
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-6 text-center space-y-2 hover:border-[#1677FF] transition cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-[#1677FF]" />
                <p className="text-xs font-bold text-[#091536]">Drag and drop your file here or browse</p>
                <p className="text-[10px] text-slate-400 font-semibold">Supports PDF, DOCX, PPTX, PNG (Max 25MB)</p>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1677FF] text-xs font-black text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20 text-center"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW DOCUMENT MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 border border-slate-200 my-auto">
            <button
              type="button"
              onClick={() => setPreviewDoc(null)}
              className="absolute right-5 top-5 h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#1677FF] font-black text-sm flex items-center justify-center shrink-0 border border-blue-100">
                {previewDoc.fileType}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-black text-[#091536] truncate">{previewDoc.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{previewDoc.client} &bull; {previewDoc.size}</p>
              </div>
            </div>

            {/* PREVIEW WATERMARK BOX */}
            <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-8 text-center space-y-3 min-h-[200px] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none rotate-[-15deg]">
                <p className="text-4xl font-black uppercase tracking-widest text-[#091536]">VERIFIED VAULT COPY</p>
              </div>
              <ShieldCheck className="h-12 w-12 text-[#1677FF]" />
              <p className="text-xs font-black text-[#091536]">Atlas Cloud Security Watermark Verified</p>
              <p className="text-[11px] text-slate-500 font-medium max-w-sm">
                Document uploaded on {previewDoc.uploadDate}. Validated for corporate compliance and engagement contracts.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black px-3 py-1 border border-emerald-300 text-center sm:text-left">
                Status: {previewDoc.status}
              </span>
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition text-center"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerToast(`Downloading ${previewDoc.name}...`);
                    setPreviewDoc(null);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E9F88] px-5 py-2 text-xs font-black text-white hover:bg-[#0C8975] transition shadow-md shadow-[#0E9F88]/20"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
