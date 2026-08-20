"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileCheck2,
  FileText,
  FileUp,
  Globe,
  GraduationCap,
  HelpCircle,
  IndianRupee,
  Linkedin,
  MapPin,
  Plus,
  Play,
  Award,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Upload,
  User,
  Users,
  Video,
  X,
  Briefcase,
  Layers,
  Clock,
  Send,
  Zap,
} from "lucide-react";

// Stages and Steps Definition
const stages = [
  { id: 1, title: "About You", desc: "Basic information & professional identity" },
  { id: 2, title: "Your Expertise", desc: "Subjects, experience & audience" },
  { id: 3, title: "Track Record", desc: "Clients, credentials & testimonials" },
  { id: 4, title: "Availability & Fees", desc: "Locations, notice & commercials" },
  { id: 5, title: "Trust & Media", desc: "CV, video pitch & verification" },
];

const steps = [
  { id: 0, stageIndex: 0, title: "Basic Information", subtitle: "Personal & contact details" },
  { id: 1, stageIndex: 0, title: "Tell Us About Yourself", subtitle: "Identity, headline & bio" },
  { id: 2, stageIndex: 1, title: "Your Specialisations", subtitle: "Subjects & domains matrix" },
  { id: 3, stageIndex: 1, title: "Professional Background", subtitle: "Corporate & industry history" },
  { id: 4, stageIndex: 1, title: "Audience & Delivery", subtitle: "Cohort profiles & formats" },
  { id: 5, stageIndex: 2, title: "Credentials & Clients", subtitle: "Education, certs & notable orgs" },
  { id: 6, stageIndex: 2, title: "Track Record & Impact", subtitle: "Participants & testimonials" },
  { id: 7, stageIndex: 3, title: "Geography & Travel", subtitle: "Delivery locations & notice" },
  { id: 8, stageIndex: 3, title: "Commercials & Rates", subtitle: "Engagement models & fee guidance" },
  { id: 9, stageIndex: 3, title: "Content & Customisation", subtitle: "Materials & course building" },
  { id: 10, stageIndex: 4, title: "Profile & Video Pitch", subtitle: "CV and 60-90s introduction" },
  { id: 11, stageIndex: 4, title: "Atlas Verification", subtitle: "Trust badges & identity proof" },
  { id: 12, stageIndex: 4, title: "The Atlas Promise", subtitle: "Assignment preferences & notes" },
];

// Options Data
const roleDescriptors = [
  "Corporate Trainer",
  "Leadership Coach",
  "Industry Practitioner",
  "Consultant",
  "Academic / Professor",
  "Subject Matter Expert",
  "Executive Coach",
  "Independent Trainer",
  "Freelance Consultant",
  "Speaker",
];

const subjectCategories = [
  {
    category: "Leadership & Management",
    topics: [
      "Leadership",
      "People Management",
      "Team Building",
      "Emotional Intelligence",
      "Decision Making",
      "Strategic Thinking",
      "Executive Development",
    ],
  },
  {
    category: "Sales & Business",
    topics: [
      "Sales",
      "Negotiation",
      "Business Development",
      "Key Account Management",
      "Customer Experience",
    ],
  },
  {
    category: "Communication",
    topics: [
      "Communication Skills",
      "Presentation Skills",
      "Public Speaking",
      "Business Writing",
      "Storytelling",
    ],
  },
  {
    category: "Finance",
    topics: [
      "Financial Markets",
      "Investment",
      "Banking",
      "Corporate Finance",
      "Financial Planning",
      "Risk Management",
    ],
  },
  {
    category: "Technology",
    topics: [
      "AI",
      "Data Science",
      "Digital Transformation",
      "Cybersecurity",
      "Cloud",
      "Software / Programming",
    ],
  },
  {
    category: "Other Domains",
    topics: [
      "HR",
      "Marketing",
      "Operations",
      "Legal & Compliance",
      "Entrepreneurship",
      "Industry-specific expertise",
    ],
  },
];

const totalExpOptions = [
  "<5 years",
  "5–10 years",
  "10–15 years",
  "15–20 years",
  "20–25 years",
  "25+ years",
];

const trainingExpOptions = [
  "<2 years",
  "2–5 years",
  "5–10 years",
  "10–15 years",
  "15+ years",
];

const industryOptions = [
  "BFSI & Banking",
  "IT & Technology",
  "Healthcare & Pharma",
  "FMCG & Retail",
  "Manufacturing & Auto",
  "Consulting & Professional Services",
  "Telecom & Media",
  "Energy, Oil & Utilities",
  "Real Estate & Infrastructure",
  "E-Commerce & Internet",
  "Public Sector & Government",
  "Higher Education",
];

const audienceOptions = [
  "Students",
  "Entry-level employees",
  "Middle management",
  "Senior management",
  "CXOs",
  "Entrepreneurs",
  "Sales teams",
  "Technical teams",
  "HR teams",
  "Mixed audiences",
];

const groupSizes = ["1–10", "11–25", "26–50", "51–100", "100–250", "250+"];

const deliveryFormats = [
  "Classroom",
  "Virtual",
  "Hybrid",
  "Workshops",
  "Keynotes",
  "Executive coaching",
  "One-on-one coaching",
  "Bootcamps",
  "Certification programmes",
];

const educationQualifications = [
  "Doctorate / Ph.D.",
  "Post Graduate / MBA / Master's",
  "Executive Post Graduate",
  "Bachelor's Degree",
  "Professional CA / CFA / CS",
  "Other Professional Diploma",
];

const popularCertifications = [
  "ICF PCC / MCC Coach",
  "PMP - Project Management",
  "Lean Six Sigma Black Belt",
  "DISC Certified Assessor",
  "Hogan Certified",
  "Agile / Scrum Master",
  "ATD Master Trainer",
  "NLP Master Practitioner",
  "AWS / Cloud Certified",
  "SHRM-SCP / HRCI",
];

const popularOrganisations = [
  "Tata Consultancy Services",
  "HDFC Bank",
  "Deloitte",
  "Infosys",
  "Google",
  "Microsoft",
  "Amazon",
  "Larsen & Toubro",
  "Reliance Industries",
  "Accenture",
  "McKinsey & Company",
  "Unilever",
  "ICICI Bank",
  "Wipro",
  "KPMG",
];

const participantTrainedRanges = [
  "<100",
  "100–500",
  "500–1,000",
  "1,000–5,000",
  "5,000–10,000",
  "10,000+",
];

const orgsTrainedRanges = ["1–5", "6–20", "21–50", "51–100", "100+"];

const deliveryLocations = [
  "Online — India",
  "Online — International",
  "In-person — My city",
  "In-person — Anywhere in India",
  "International",
];

const popularCities = [
  "Mumbai",
  "Bengaluru",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Kochi",
  "Dubai",
  "Singapore",
  "London",
];

const noticeRequiredOptions = [
  "1–3 days",
  "4–7 days",
  "1–2 weeks",
  "2–4 weeks",
  "1+ month",
];

const availabilityFrequencyOptions = [
  "Multiple assignments per month",
  "1–2 assignments per month",
  "A few assignments per quarter",
  "Selective / limited availability",
];

const engagementModels = [
  "Per hour",
  "Half day",
  "Full day",
  "Per programme",
  "Monthly / retainer",
  "Flexible",
];

const contentDeliverables = [
  "Existing training content",
  "Customised content",
  "Participant material",
  "Presentation decks",
  "Assessments",
  "Certification",
  "Post-training support",
  "Coaching",
  "Other",
];

const verificationOptions = [
  { id: "gov_id", label: "Government ID", desc: "Aadhaar / Passport / Voter ID", icon: ShieldCheck },
  { id: "edu_cert", label: "Educational certificates", desc: "Degree / Masters certificates", icon: GraduationCap },
  { id: "prof_cert", label: "Professional certifications", desc: "ICF, PMP, Six Sigma credentials", icon: Award },
  { id: "employer", label: "Previous employer details", desc: "Relieving letter / Experience proof", icon: Building2 },
  { id: "client_ref", label: "Client references", desc: "Contactable L&D / HR leads", icon: Users },
  { id: "linkedin", label: "LinkedIn profile", desc: "Verified public work history", icon: Linkedin },
];

const assignmentInterests = [
  "Short workshops",
  "Full-day corporate training",
  "Multi-day programmes",
  "Leadership programmes",
  "Executive coaching",
  "Long-term corporate engagements",
  "Speaking opportunities",
  "International assignments",
  "Academic / institutional assignments",
  "Any suitable opportunity",
];

// Helper UI Components
function OptionCard({
  children,
  onClick,
  selected,
  small = false,
  badge,
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
  small?: boolean;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? "border-[#0E9F88] bg-[#E8FAF5]/80 text-[#072B24] shadow-md shadow-[#0E9F88]/10"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#18BFA5]/50 hover:shadow-sm"
      } ${small ? "min-h-[52px] p-3" : ""}`}
    >
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
          selected
            ? "border-[#0E9F88] bg-[#0E9F88] text-white"
            : "border-slate-300 bg-white group-hover:border-[#18BFA5]"
        }`}
      >
        {selected ? <Check className="size-3.5 text-white stroke-[3]" /> : null}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
      {badge && (
        <span className="rounded-full bg-[#0E9F88]/10 px-2 py-0.5 text-[10px] font-bold text-[#0E9F88]">
          {badge}
        </span>
      )}
    </button>
  );
}

function RadioCard({
  children,
  onClick,
  selected,
  small = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? "border-[#0E9F88] bg-[#E8FAF5]/80 text-[#072B24] shadow-md shadow-[#0E9F88]/10"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#18BFA5]/50 hover:shadow-sm"
      } ${small ? "min-h-[52px] p-3" : ""}`}
    >
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          selected
            ? "border-[#0E9F88] bg-[#0E9F88] text-white"
            : "border-slate-300 bg-white group-hover:border-[#18BFA5]"
        }`}
      >
        {selected ? <span className="size-2 rounded-full bg-white" /> : null}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </button>
  );
}

function Input({
  hint,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
  prefix,
  required = false,
  icon: Icon,
}: {
  hint?: string;
  label: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  value?: string;
  prefix?: string;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <label className="block">
      {label ? (
        <span className="flex items-center gap-1 text-sm font-semibold text-slate-800">
          {label}
          {required && <span className="text-[#0E9F88] font-bold">*</span>}
        </span>
      ) : null}
      <div className="relative mt-2 flex items-center">
        {Icon && (
          <div className="pointer-events-none absolute left-3.5 text-slate-400">
            <Icon className="size-4" />
          </div>
        )}
        {prefix && (
          <div className="pointer-events-none absolute left-3.5 text-sm font-bold text-slate-500">
            {prefix}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          className={`h-11 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#0E9F88] focus:ring-4 focus:ring-[#0E9F88]/12 ${
            Icon ? "pl-10 pr-4" : prefix ? "pl-9 pr-4" : "px-4"
          }`}
        />
      </div>
      {hint ? <p className="mt-1.5 text-xs text-slate-400">{hint}</p> : null}
    </label>
  );
}

function TextArea({
  hint,
  label,
  onChange,
  placeholder,
  value,
  maxLength,
  rows = 3,
  required = false,
}: {
  hint?: string;
  label: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm font-semibold text-slate-800">
          {label}
          {required && <span className="text-[#0E9F88] font-bold">*</span>}
        </span>
        {maxLength && (
          <span
            className={`text-xs font-semibold ${
              (value?.length || 0) > maxLength - 30 ? "text-amber-600" : "text-slate-400"
            }`}
          >
            {value?.length || 0} / {maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(event) => {
          if (!maxLength || event.target.value.length <= maxLength) {
            onChange?.(event.target.value);
          }
        }}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#0E9F88] focus:ring-4 focus:ring-[#0E9F88]/12"
      />
      {hint ? <p className="mt-1.5 text-xs text-slate-400">{hint}</p> : null}
    </label>
  );
}

export function TrainerRegistrationWizard({
  onComplete,
  onCancel,
}: {
  onComplete?: (trainerData: any) => void;
  onCancel?: () => void;
}) {
  const router = useRouter();

  // Active step state
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // STEP 1: Basic Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarFileName, setAvatarFileName] = useState("");

  // STEP 2: Tell us about yourself
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Corporate Trainer"]);
  const [customRole, setCustomRole] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");

  // STEP 3: Specialisations
  const [selectedSpecialisations, setSelectedSpecialisations] = useState<string[]>([
    "Leadership",
    "People Management",
    "Communication Skills",
  ]);
  const [otherSpecialisationText, setOtherSpecialisationText] = useState("");
  const [customSpecialisations, setCustomSpecialisations] = useState<string[]>([]);

  // STEP 4: Experience
  const [totalExperience, setTotalExperience] = useState("10–15 years");
  const [trainingExperience, setTrainingExperience] = useState("5–10 years");
  const [workedInCorporate, setWorkedInCorporate] = useState<"Yes" | "No">("Yes");
  const [workedIndustries, setWorkedIndustries] = useState<string[]>(["BFSI & Banking", "IT & Technology"]);
  const [trainedIndustries, setTrainedIndustries] = useState<string[]>([
    "BFSI & Banking",
    "IT & Technology",
    "Manufacturing & Auto",
  ]);

  // STEP 5: Training Audience & Formats
  const [targetAudiences, setTargetAudiences] = useState<string[]>([
    "Middle management",
    "Senior management",
  ]);
  const [groupSize, setGroupSize] = useState("26–50");
  const [deliveryFormatList, setDeliveryFormatList] = useState<string[]>([
    "Classroom",
    "Virtual",
    "Hybrid",
    "Workshops",
  ]);

  // STEP 6: Credentials & Notable Clients
  const [highestQualification, setHighestQualification] = useState("Post Graduate / MBA / Master's");
  const [certificationsList, setCertificationsList] = useState<string[]>([
    "ICF PCC / MCC Coach",
    "DISC Certified Assessor",
  ]);
  const [customCertInput, setCustomCertInput] = useState("");
  const [taughtRecognisedOrgs, setTaughtRecognisedOrgs] = useState<"Yes" | "No">("Yes");
  const [notableOrganisations, setNotableOrganisations] = useState<string[]>([
    "Tata Consultancy Services",
    "HDFC Bank",
    "Deloitte",
    "Infosys",
  ]);
  const [customOrgInput, setCustomOrgInput] = useState("");

  // STEP 7: Track Record & Testimonials
  const [participantsTrained, setParticipantsTrained] = useState("1,000–5,000");
  const [orgsTrained, setOrgsTrained] = useState("21–50");
  const [hasTestimonials, setHasTestimonials] = useState<"Yes" | "No">("Yes");
  const [testimonialQuote, setTestimonialQuote] = useState(
    "Exceptional facilitation that transformed how our leadership team communicates and resolves cross-functional conflicts."
  );
  const [testimonialAuthor, setTestimonialAuthor] = useState("Head of Talent Development, Global Tech Firm");
  const [testimonialFileName, setTestimonialFileName] = useState("");

  // STEP 8: Geography & Availability
  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    "Online — India",
    "In-person — My city",
    "In-person — Anywhere in India",
  ]);
  const [travelCities, setTravelCities] = useState<string[]>(["Mumbai", "Bengaluru", "Delhi NCR", "Pune"]);
  const [customCityInput, setCustomCityInput] = useState("");
  const [advanceNotice, setAdvanceNotice] = useState("1–2 weeks");
  const [availabilityFrequency, setAvailabilityFrequency] = useState("Multiple assignments per month");

  // STEP 9: Commercials
  const [preferredEngagementModel, setPreferredEngagementModel] = useState("Full day");
  const [feeOnline, setFeeOnline] = useState("35,000");
  const [feeInPerson, setFeeInPerson] = useState("60,000");
  const [feeInternational, setFeeInternational] = useState("1,20,000");
  const [feesNegotiable, setFeesNegotiable] = useState<"Yes" | "No" | "Depends on the assignment">(
    "Depends on the assignment"
  );

  // STEP 10: Content & Customisation
  const [deliverables, setDeliverables] = useState<string[]>([
    "Existing training content",
    "Customised content",
    "Participant material",
    "Presentation decks",
    "Assessments",
  ]);
  const [willingToCustomise, setWillingToCustomise] = useState<"Yes" | "No" | "Depends on requirement">("Yes");
  const [canDevelopFromScratch, setCanDevelopFromScratch] = useState<"Yes" | "No">("Yes");

  // STEP 11: Upload Profile & Video Pitch
  const [cvFileName, setCvFileName] = useState("Resume_Corporate_Trainer_Profile.pdf");
  const [videoIntroType, setVideoIntroType] = useState<"recorded" | "uploaded" | "none">("recorded");
  const [videoFileName, setVideoFileName] = useState("Intro_Video_60s.mp4");

  // STEP 12: Verification
  const [selectedVerificationItems, setSelectedVerificationItems] = useState<string[]>([
    "gov_id",
    "edu_cert",
    "prof_cert",
    "linkedin",
    "client_ref",
  ]);

  // STEP 13: The Atlas Promise
  const [interestedAssignments, setInterestedAssignments] = useState<string[]>([
    "Full-day corporate training",
    "Leadership programmes",
    "Executive coaching",
    "Multi-day programmes",
  ]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Pre-fill user data from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("onboarding_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.name && !fullName) setFullName(parsed.name);
          if (parsed.email && !email) setEmail(parsed.email);
        }
      } catch (err) {
        // ignore
      }
    }
  }, []);

  // Helper toggle functions
  function toggleInList(list: string[], setList: (items: string[]) => void, item: string) {
    setList(list.includes(item) ? list.filter((val) => val !== item) : [...list, item]);
  }

  function toggleRole(role: string) {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      if (selectedRoles.length < 3) {
        setSelectedRoles([...selectedRoles, role]);
      }
    }
  }

  function addCustomSpecialisation() {
    if (otherSpecialisationText.trim() && !customSpecialisations.includes(otherSpecialisationText.trim())) {
      setCustomSpecialisations([...customSpecialisations, otherSpecialisationText.trim()]);
      setSelectedSpecialisations([...selectedSpecialisations, otherSpecialisationText.trim()]);
      setOtherSpecialisationText("");
    }
  }

  function addCertification() {
    if (customCertInput.trim() && !certificationsList.includes(customCertInput.trim())) {
      setCertificationsList([...certificationsList, customCertInput.trim()]);
      setCustomCertInput("");
    }
  }

  function addNotableOrganisation() {
    if (
      customOrgInput.trim() &&
      !notableOrganisations.includes(customOrgInput.trim()) &&
      notableOrganisations.length < 10
    ) {
      setNotableOrganisations([...notableOrganisations, customOrgInput.trim()]);
      setCustomOrgInput("");
    }
  }

  function addTravelCity() {
    if (customCityInput.trim() && !travelCities.includes(customCityInput.trim())) {
      setTravelCities([...travelCities, customCityInput.trim()]);
      setCustomCityInput("");
    }
  }

  // Live Atlas Profile Score Calculation (0 - 100)
  const trainerScore = useMemo(() => {
    let score = 20; // Base score

    if (fullName.trim().length > 2) score += 5;
    if (email.trim().includes("@")) score += 5;
    if (currentCity.trim().length > 1) score += 4;
    if (linkedin.trim().length > 5) score += 5;
    if (avatarUrl || avatarFileName) score += 5;

    if (selectedRoles.length > 0) score += 4;
    if (headline.trim().length > 10) score += 5;
    if (bio.trim().length > 20) score += 5;

    if (selectedSpecialisations.length >= 3) score += 6;
    if (selectedSpecialisations.length >= 6) score += 4;

    if (workedInCorporate === "Yes" && workedIndustries.length > 0) score += 5;
    if (trainedIndustries.length >= 2) score += 4;

    if (highestQualification) score += 3;
    if (certificationsList.length > 0) score += 5;
    if (notableOrganisations.length >= 2) score += 6;
    if (notableOrganisations.length >= 4) score += 4;

    if (hasTestimonials === "Yes") score += 4;

    if (selectedLocations.length > 0) score += 3;
    if (feeInPerson || feeOnline) score += 4;

    if (cvFileName) score += 4;
    if (videoIntroType !== "none") score += 5;
    if (selectedVerificationItems.length >= 3) score += 5;

    return Math.min(score, 100);
  }, [
    fullName,
    email,
    currentCity,
    linkedin,
    avatarUrl,
    avatarFileName,
    selectedRoles,
    headline,
    bio,
    selectedSpecialisations,
    workedInCorporate,
    workedIndustries,
    trainedIndustries,
    highestQualification,
    certificationsList,
    notableOrganisations,
    hasTestimonials,
    selectedLocations,
    feeInPerson,
    feeOnline,
    cvFileName,
    videoIntroType,
    selectedVerificationItems,
  ]);

  const scoreTier = useMemo(() => {
    if (trainerScore >= 90) return { title: "Platinum Verified", color: "text-[#0E9F88] bg-[#E8FAF5] border-[#0E9F88]/30" };
    if (trainerScore >= 75) return { title: "Gold Verified", color: "text-[#176BFF] bg-[#EAF4FF] border-[#176BFF]/30" };
    if (trainerScore >= 55) return { title: "Silver Profile", color: "text-amber-700 bg-amber-50 border-amber-200" };
    return { title: "Profile in Progress", color: "text-slate-600 bg-slate-100 border-slate-200" };
  }, [trainerScore]);

  const currentStep = steps[step];
  const currentStageIndex = currentStep.stageIndex;
  const progressPercent = Math.round(((step + 1) / steps.length) * 100);

  function goNext() {
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleFinalSubmit();
    }
  }

  function goBack() {
    if (step > 0) {
      setStep((current) => current - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (onCancel) onCancel();
      else router.push("/");
    }
  }

  function handleFinalSubmit() {
    const finalProfile = {
      fullName: fullName || "Rahul Sharma",
      email,
      mobile,
      city: currentCity || "Mumbai",
      linkedin,
      roles: selectedRoles,
      headline: headline || "Leadership & Executive Coach | 18+ years corporate experience",
      bio: bio || "Experienced facilitator specializing in executive leadership, strategic decision making and high performance team culture.",
      specialisations: selectedSpecialisations,
      totalExperience,
      trainingExperience,
      workedIndustries,
      trainedIndustries,
      targetAudiences,
      groupSize,
      deliveryFormats: deliveryFormatList,
      highestQualification,
      certifications: certificationsList,
      notableOrganisations,
      participantsTrained,
      orgsTrained,
      testimonial: { quote: testimonialQuote, author: testimonialAuthor },
      deliveryLocations: selectedLocations,
      travelCities,
      advanceNotice,
      fees: { online: feeOnline, inPerson: feeInPerson, international: feeInternational },
      verificationItems: selectedVerificationItems,
      trainerScore,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("atlas_trainer_profile", JSON.stringify(finalProfile));
    }

    if (onComplete) {
      onComplete(finalProfile);
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F0F2F5] px-4 py-12 text-slate-950">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100">
          <div className="relative bg-gradient-to-br from-[#091536] via-[#0D244D] to-[#0E9F88] p-8 text-white text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md ring-8 ring-white/10">
              <ShieldCheck className="size-9 text-[#31E6B1]" />
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#31E6B1]/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#31E6B1] border border-[#31E6B1]/40">
              <BadgeCheck className="size-3.5" /> Atlas Verified Candidate
            </span>
            <h1 className="atlas-display mt-3 text-3xl font-black tracking-tight">
              Welcome to the Atlas Marketplace!
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
              Your questionnaire is complete. Atlas algorithms will now begin matching your verified profile with corporate briefs.
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* SCORE CARD */}
            <div className="rounded-2xl border-2 border-[#0E9F88]/20 bg-[#E8FAF5]/40 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[#0E9F88]">
                    Generated Atlas Profile Score
                  </p>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">
                    {trainerScore} <span className="text-sm font-semibold text-slate-500">/ 100</span>
                  </p>
                </div>
                <div className={`rounded-xl border px-3.5 py-1.5 text-xs font-extrabold ${scoreTier.color}`}>
                  {scoreTier.title}
                </div>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#176BFF] via-[#0E9F88] to-[#31E6B1] transition-all duration-1000"
                  style={{ width: `${trainerScore}%` }}
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                  <div className="font-extrabold text-slate-900">{totalExperience}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Experience</div>
                </div>
                <div className="rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                  <div className="font-extrabold text-[#0E9F88]">{notableOrganisations.length}+ Clients</div>
                  <div className="text-[10px] text-slate-500 font-medium">Orgs Trained</div>
                </div>
                <div className="rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                  <div className="font-extrabold text-slate-900">{selectedSpecialisations.length} Skills</div>
                  <div className="text-[10px] text-slate-500 font-medium">Specialisations</div>
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW OF SEARCH RESULT */}
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                How corporate decision-makers will see your profile in search results:
              </p>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-[#091536] text-lg font-black text-white shadow-sm">
                      {fullName ? fullName.charAt(0).toUpperCase() : "T"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">
                          {fullName || "Rahul Sharma"}
                        </h4>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E8FAF5] px-2.5 py-0.5 text-[11px] font-bold text-[#0E9F88] border border-[#0E9F88]/30">
                          <BadgeCheck className="size-3.5" /> Atlas Verified
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-600 mt-0.5 line-clamp-1">
                        {headline || `${selectedRoles.join(" • ")} | ${totalExperience} Experience`}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-bold text-amber-600">
                          <Star className="size-3.5 fill-amber-500 text-amber-500" /> 4.9
                        </span>
                        <span>•</span>
                        <span>{totalExperience} exp</span>
                        <span>•</span>
                        <span>{notableOrganisations.slice(0, 2).join(", ") || "Top Enterprises"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400">Day Rate</span>
                    <p className="text-base font-black text-slate-900">₹{feeInPerson || "60,000"}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {selectedSpecialisations.slice(0, 4).map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700"
                    >
                      {spec}
                    </span>
                  ))}
                  <span className="rounded-full bg-[#E8FAF5] px-2.5 py-0.5 text-[11px] font-bold text-[#0E9F88]">
                    Available: {travelCities.slice(0, 2).join(", ") || "Pan-India / Online"}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => router.push("/trainer-portal")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0E9F88] text-sm font-bold text-white transition hover:bg-[#0C8B77] shadow-lg shadow-[#0E9F88]/20"
              >
                Go to Trainer Workspace & Calendar <ArrowRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => router.push("/experts")}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore Marketplace
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // MAIN ONBOARDING LAYOUT (Matching /create-requirement)
  return (
    <main className="min-h-screen bg-[#F0F2F5] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[calc(100vh-48px)] gap-6 lg:grid-cols-[340px_1fr]">
          {/* ======================= SIDEBAR ======================= */}
          <aside className="relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 text-slate-900 shadow-xl border border-slate-200/90">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[#0E9F88]" />

            {/* Header / Brand */}
            <div className="relative">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="flex items-center gap-2.5 text-left"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#0E9F88] text-xs font-black text-white shadow-sm">
                    A
                  </div>
                  <span className="atlas-display text-base font-black text-[#091536] tracking-tight">
                    Atlas
                  </span>
                </button>
                <span className="flex items-center gap-1 rounded-full bg-[#E8FAF5] px-2.5 py-1 text-[10px] font-extrabold text-[#0E9F88] border border-[#0E9F88]/20">
                  <BadgeCheck className="size-3" /> Trainer Onboarding
                </span>
              </div>

              <h1 className="atlas-display mt-5 text-xl font-black leading-snug tracking-tight text-[#091536]">
                Trainer Registration & Profile
              </h1>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                Join Atlas’s trusted network. Complete this profile questionnaire to power the matching engine and earn your Atlas Verified badge.
              </p>
            </div>

            {/* STAGES & PROGRESS INDICATOR */}
            <div className="relative mt-5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">
                  Stage {currentStageIndex + 1} of {stages.length}: {stages[currentStageIndex].title}
                </span>
                <span className="text-[#0E9F88] font-bold">{progressPercent}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#0E9F88] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* STAGES STEPPER NAVIGATION */}
            <nav className="relative mt-4 flex-1 space-y-1 overflow-y-auto max-h-[260px] pr-1">
              {steps.map((item, index) => {
                const isCurrent = index === step;
                const isPassed = index < step;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setStep(index)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold transition-all duration-200 ${
                      isCurrent
                        ? "bg-[#E8FAF5] text-[#072B24] border border-[#0E9F88]/40 shadow-sm"
                        : isPassed
                        ? "text-slate-700 hover:bg-slate-50"
                        : "text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black transition-all ${
                        isCurrent
                          ? "bg-[#0E9F88] text-white"
                          : isPassed
                          ? "bg-[#0E9F88]/15 text-[#0E9F88] border border-[#0E9F88]/30"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isPassed ? <Check className="size-3 stroke-[3]" /> : index + 1}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </button>
                );
              })}
            </nav>

            {/* LIVE ATLAS TRAINER SCORE & SEARCH CARD PREVIEW */}
            <div className="relative mt-4 space-y-3">
              {/* Dynamic Score Widget */}
              <div className="rounded-xl border border-[#0E9F88]/20 bg-gradient-to-br from-[#E8FAF5] to-white p-3.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#0E9F88]">
                    <Sparkles className="size-3.5 text-[#0E9F88]" /> Atlas Score
                  </div>
                  <span className="text-sm font-black text-[#091536]">{trainerScore}/100</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#0E9F88] transition-all duration-500"
                    style={{ width: `${trainerScore}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] font-bold text-slate-600">
                  Status: <span className="text-[#0E9F88]">{scoreTier.title}</span>
                </p>
              </div>

              {/* Mini Card Preview */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                  Live Search Card Preview
                </p>
                <div className="rounded-lg bg-white p-2.5 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#091536] text-xs font-bold text-white">
                      {fullName ? fullName.charAt(0).toUpperCase() : "T"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="truncate text-xs font-bold text-slate-900">
                          {fullName || "Your Full Name"}
                        </span>
                        <BadgeCheck className="size-3 shrink-0 text-[#0E9F88]" />
                      </div>
                      <p className="truncate text-[10px] text-slate-500">
                        {headline || "Leadership & Executive Coach"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-1.5 text-[10px] font-semibold text-slate-600">
                    <span>{totalExperience}</span>
                    <span className="text-[#0E9F88] font-bold">
                      {travelCities[0] || "Online"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ======================= MAIN FORM SECTION ======================= */}
          <section className="flex items-start">
            <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200/80">
              {/* Step Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 sm:px-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0E9F88]">
                    Stage {currentStageIndex + 1}: {stages[currentStageIndex].title} · Step {step + 1} of{" "}
                    {steps.length}
                  </p>
                  <h2 className="mt-0.5 text-xl font-bold tracking-tight text-[#091536] sm:text-2xl">
                    {currentStep.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{currentStep.subtitle}</p>
                </div>
              </div>

              {/* Step Form Container */}
              <div className="px-6 py-7 sm:px-8" key={step} style={{ animation: "fadeUp 0.3s ease-out" }}>
                {/* ---------------------------------------------------- */}
                {/* STEP 0: Basic Information */}
                {/* ---------------------------------------------------- */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Full Name"
                        value={fullName}
                        onChange={setFullName}
                        placeholder="e.g. Rahul Sharma"
                        required
                        icon={User}
                      />
                      <Input
                        label="Professional Email"
                        value={email}
                        onChange={setEmail}
                        placeholder="rahul@example.com"
                        type="email"
                        required
                      />
                      <Input
                        label="Mobile Number"
                        value={mobile}
                        onChange={setMobile}
                        placeholder="+91 98765 43210"
                        type="tel"
                        required
                      />
                      <Input
                        label="Current City"
                        value={currentCity}
                        onChange={setCurrentCity}
                        placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                        required
                        icon={MapPin}
                      />
                    </div>

                    <div className="space-y-2">
                      <Input
                        label="LinkedIn Profile URL"
                        value={linkedin}
                        onChange={setLinkedin}
                        placeholder="https://linkedin.com/in/rahulsharma-coach"
                        hint="Optional but strongly recommended. Used by Atlas matching engine for background verification."
                        icon={Linkedin}
                      />
                    </div>

                    {/* Profile Photo Upload */}
                    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-[#0E9F88]/40">
                      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#E8FAF5] text-[#0E9F88] mb-3">
                        <Upload className="size-6 text-[#0E9F88]" />
                      </div>
                      <p className="text-sm font-bold text-slate-800">Profile Photo</p>
                      <p className="text-xs text-slate-400 mt-1">
                        High resolution headshot with clean background (JPG, PNG up to 5MB)
                      </p>
                      {avatarFileName && (
                        <p className="mt-2 text-xs font-semibold text-[#0E9F88]">
                          Selected: {avatarFileName}
                        </p>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            setAvatarFileName(file.name);
                            setAvatarUrl(URL.createObjectURL(file));
                          }
                        }}
                        className="mt-3 block w-full text-xs text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#0E9F88] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white file:transition file:hover:bg-[#0C8B77] cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 1: Tell Us About Yourself & Identity */}
                {/* ---------------------------------------------------- */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        How would you describe yourself?
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Select up to 3 descriptions that best represent your practice:
                      </p>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {roleDescriptors.map((role) => (
                          <OptionCard
                            key={role}
                            selected={selectedRoles.includes(role)}
                            onClick={() => toggleRole(role)}
                            small
                          >
                            <p className="text-sm font-semibold">{role}</p>
                          </OptionCard>
                        ))}
                      </div>

                      {/* Custom role input */}
                      <div className="mt-3">
                        <Input
                          label="Other / Custom Description"
                          value={customRole}
                          onChange={(val) => {
                            setCustomRole(val);
                            if (val && !selectedRoles.includes(val)) {
                              setSelectedRoles([...selectedRoles, val]);
                            }
                          }}
                          placeholder="e.g. Behavioral Facilitator, Agile Transformation Coach"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Input
                        label="Professional Headline"
                        value={headline}
                        onChange={setHeadline}
                        placeholder="e.g. Leadership & Executive Coach | 18+ years of corporate experience"
                        hint="This is the one-line description that will appear on your Atlas search card."
                        required
                      />

                      <TextArea
                        label="Tell us about yourself (Bio)"
                        value={bio}
                        onChange={setBio}
                        placeholder="Briefly describe your professional background, core expertise, leadership philosophy and training experience..."
                        maxLength={500}
                        rows={4}
                        hint="Maximum 500 characters. Summarize your strengths for L&D decision makers."
                        required
                      />
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 2: Specialisations & Domains Matrix */}
                {/* ---------------------------------------------------- */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                      <p className="text-xs font-bold text-[#0D3270] flex items-center gap-1.5">
                        <Sparkles className="size-3.5 text-[#176BFF]" />
                        Most Important Section for Atlas's Matching Engine
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Atlas uses these specialized tags to match your profile directly with incoming corporate briefs and RFPs.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {subjectCategories.map((group) => (
                        <div key={group.category} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                          <p className="text-xs font-black uppercase tracking-wider text-[#0E9F88] mb-2.5">
                            {group.category}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {group.topics.map((topic) => {
                              const isSelected = selectedSpecialisations.includes(topic);
                              return (
                                <button
                                  key={topic}
                                  type="button"
                                  onClick={() =>
                                    toggleInList(
                                      selectedSpecialisations,
                                      setSelectedSpecialisations,
                                      topic
                                    )
                                  }
                                  className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                                    isSelected
                                      ? "border-[#0E9F88] bg-[#0E9F88] text-white shadow-xs"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-[#18BFA5]"
                                  }`}
                                >
                                  {isSelected && <Check className="inline size-3 mr-1 stroke-[3]" />}
                                  {topic}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Custom expertise input */}
                    <div className="pt-2">
                      <span className="text-sm font-semibold text-slate-800">
                        Add any other areas of expertise
                      </span>
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          value={otherSpecialisationText}
                          onChange={(e) => setOtherSpecialisationText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addCustomSpecialisation();
                            }
                          }}
                          placeholder="Type custom skill / framework (e.g. OKRs, Lean Six Sigma, DE&I) and press Add"
                          className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#0E9F88] focus:ring-4 focus:ring-[#0E9F88]/12"
                        />
                        <button
                          type="button"
                          onClick={addCustomSpecialisation}
                          className="h-11 rounded-xl bg-[#0E9F88] px-5 text-sm font-bold text-white hover:bg-[#0C8B77]"
                        >
                          Add
                        </button>
                      </div>
                      {customSpecialisations.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {customSpecialisations.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#E8FAF5] px-2.5 py-1 text-xs font-bold text-[#0E9F88]"
                            >
                              {item}
                              <X
                                className="size-3 cursor-pointer hover:text-red-500"
                                onClick={() => {
                                  setCustomSpecialisations(
                                    customSpecialisations.filter((s) => s !== item)
                                  );
                                  setSelectedSpecialisations(
                                    selectedSpecialisations.filter((s) => s !== item)
                                  );
                                }}
                              />
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 3: Professional Background & Industries */}
                {/* ---------------------------------------------------- */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Total professional experience</p>
                        <div className="mt-2.5 grid grid-cols-2 gap-2">
                          {totalExpOptions.map((opt) => (
                            <RadioCard
                              key={opt}
                              selected={totalExperience === opt}
                              onClick={() => setTotalExperience(opt)}
                              small
                            >
                              <p className="text-xs font-bold">{opt}</p>
                            </RadioCard>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Years of training / facilitation experience
                        </p>
                        <div className="mt-2.5 grid grid-cols-2 gap-2">
                          {trainingExpOptions.map((opt) => (
                            <RadioCard
                              key={opt}
                              selected={trainingExperience === opt}
                              onClick={() => setTrainingExperience(opt)}
                              small
                            >
                              <p className="text-xs font-bold">{opt}</p>
                            </RadioCard>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Corporate Experience Check */}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Have you worked in a corporate environment?
                      </p>
                      <div className="mt-2.5 grid grid-cols-2 gap-3 max-w-sm">
                        {["Yes", "No"].map((opt) => (
                          <RadioCard
                            key={opt}
                            selected={workedInCorporate === opt}
                            onClick={() => setWorkedInCorporate(opt as "Yes" | "No")}
                            small
                          >
                            <p className="text-sm font-bold">{opt}</p>
                          </RadioCard>
                        ))}
                      </div>
                    </div>

                    {workedInCorporate === "Yes" && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-wider text-slate-600">
                            Which industries have you worked in? (Multi-select)
                          </p>
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {industryOptions.map((ind) => (
                              <button
                                key={ind}
                                type="button"
                                onClick={() =>
                                  toggleInList(workedIndustries, setWorkedIndustries, ind)
                                }
                                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                                  workedIndustries.includes(ind)
                                    ? "border-[#0E9F88] bg-[#0E9F88] text-white"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                }`}
                              >
                                {ind}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Which industries have you delivered training in? (Multi-select)
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {industryOptions.map((ind) => (
                          <button
                            key={ind}
                            type="button"
                            onClick={() =>
                              toggleInList(trainedIndustries, setTrainedIndustries, ind)
                            }
                            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                              trainedIndustries.includes(ind)
                                ? "border-[#0E9F88] bg-[#0E9F88] text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            {ind}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 4: Audience Profiles & Formats */}
                {/* ---------------------------------------------------- */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Who do you typically train?
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">Select all that apply:</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {audienceOptions.map((aud) => (
                          <OptionCard
                            key={aud}
                            selected={targetAudiences.includes(aud)}
                            onClick={() => toggleInList(targetAudiences, setTargetAudiences, aud)}
                            small
                          >
                            <p className="text-xs font-bold">{aud}</p>
                          </OptionCard>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">Typical group size</p>
                      <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {groupSizes.map((size) => (
                          <RadioCard
                            key={size}
                            selected={groupSize === size}
                            onClick={() => setGroupSize(size)}
                            small
                          >
                            <p className="text-center text-xs font-extrabold">{size}</p>
                          </RadioCard>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        What formats do you deliver?
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">Select all that apply:</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {deliveryFormats.map((fmt) => (
                          <OptionCard
                            key={fmt}
                            selected={deliveryFormatList.includes(fmt)}
                            onClick={() =>
                              toggleInList(deliveryFormatList, setDeliveryFormatList, fmt)
                            }
                            small
                          >
                            <p className="text-xs font-bold">{fmt}</p>
                          </OptionCard>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 5: Credentials & Notable Client Orgs */}
                {/* ---------------------------------------------------- */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Highest educational qualification
                      </p>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                        {educationQualifications.map((edu) => (
                          <RadioCard
                            key={edu}
                            selected={highestQualification === edu}
                            onClick={() => setHighestQualification(edu)}
                            small
                          >
                            <p className="text-xs font-bold">{edu}</p>
                          </RadioCard>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Professional Certifications
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Click popular certifications to add, or enter your specific credentials:
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {popularCertifications.map((cert) => {
                          const isAdded = certificationsList.includes(cert);
                          return (
                            <button
                              key={cert}
                              type="button"
                              onClick={() =>
                                toggleInList(certificationsList, setCertificationsList, cert)
                              }
                              className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                                isAdded
                                  ? "border-[#0E9F88] bg-[#0E9F88] text-white"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {isAdded && <Check className="inline size-3 mr-1 stroke-[3]" />}
                              {cert}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          value={customCertInput}
                          onChange={(e) => setCustomCertInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addCertification();
                            }
                          }}
                          placeholder="e.g. Certified Scrum Master, Hogan Assessment Level 2"
                          className="h-10 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-xs outline-none focus:border-[#0E9F88]"
                        />
                        <button
                          type="button"
                          onClick={addCertification}
                          className="h-10 rounded-xl bg-[#0E9F88] px-4 text-xs font-bold text-white hover:bg-[#0C8B77]"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Notable Organisations Trained */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Have you taught / trained for recognised organisations?
                        </p>
                        <div className="mt-2 flex gap-3">
                          {["Yes", "No"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setTaughtRecognisedOrgs(opt as "Yes" | "No")}
                              className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
                                taughtRecognisedOrgs === opt
                                  ? "bg-[#0E9F88] text-white"
                                  : "border border-slate-200 bg-white text-slate-700"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {taughtRecognisedOrgs === "Yes" && (
                        <div>
                          <p className="text-xs font-bold text-slate-700">
                            Please list up to 10 notable organisations you've worked with
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            These become powerful search filters for enterprise clients.
                          </p>

                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {popularOrganisations.map((org) => {
                              const isSelected = notableOrganisations.includes(org);
                              return (
                                <button
                                  key={org}
                                  type="button"
                                  onClick={() => {
                                    if (isSelected) {
                                      setNotableOrganisations(
                                        notableOrganisations.filter((o) => o !== org)
                                      );
                                    } else if (notableOrganisations.length < 10) {
                                      setNotableOrganisations([...notableOrganisations, org]);
                                    }
                                  }}
                                  className={`rounded-md border px-2.5 py-1 text-[11px] font-bold transition ${
                                    isSelected
                                      ? "border-[#0E9F88] bg-[#0E9F88] text-white"
                                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                  }`}
                                >
                                  {isSelected ? "✓ " : "+ "}
                                  {org}
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-3 flex gap-2">
                            <input
                              type="text"
                              value={customOrgInput}
                              onChange={(e) => setCustomOrgInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addNotableOrganisation();
                                }
                              }}
                              placeholder="Type company name (e.g. Flipkart, Mahindra, L&T) and press Add"
                              className="h-10 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-xs outline-none focus:border-[#0E9F88]"
                            />
                            <button
                              type="button"
                              onClick={addNotableOrganisation}
                              className="h-10 rounded-xl bg-[#091536] px-4 text-xs font-bold text-white hover:bg-slate-800"
                            >
                              Add ({notableOrganisations.length}/10)
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 6: Metrics & Testimonials */}
                {/* ---------------------------------------------------- */}
                {step === 6 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Approximately how many participants have you trained?
                        </p>
                        <div className="mt-2.5 grid grid-cols-2 gap-2">
                          {participantTrainedRanges.map((range) => (
                            <RadioCard
                              key={range}
                              selected={participantsTrained === range}
                              onClick={() => setParticipantsTrained(range)}
                              small
                            >
                              <p className="text-xs font-bold">{range}</p>
                            </RadioCard>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Approximately how many organisations have you trained?
                        </p>
                        <div className="mt-2.5 grid grid-cols-2 gap-2">
                          {orgsTrainedRanges.map((range) => (
                            <RadioCard
                              key={range}
                              selected={orgsTrained === range}
                              onClick={() => setOrgsTrained(range)}
                              small
                            >
                              <p className="text-xs font-bold">{range}</p>
                            </RadioCard>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonials */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Do you have participant / client testimonials?
                        </p>
                        <div className="mt-2 flex gap-3">
                          {["Yes", "No"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setHasTestimonials(opt as "Yes" | "No")}
                              className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
                                hasTestimonials === opt
                                  ? "bg-[#0E9F88] text-white"
                                  : "border border-slate-200 bg-white text-slate-700"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {hasTestimonials === "Yes" && (
                        <div className="space-y-3 pt-1">
                          <TextArea
                            label="Key Client / Participant Testimonial Quote"
                            value={testimonialQuote}
                            onChange={setTestimonialQuote}
                            placeholder="“Rahul's negotiation masterclass gave our sales leaders practical frameworks that yielded direct revenue impact within 60 days.”"
                            rows={3}
                          />
                          <Input
                            label="Quote Author & Organization"
                            value={testimonialAuthor}
                            onChange={setTestimonialAuthor}
                            placeholder="e.g. VP Human Resources, Top Tier BFSI Company"
                          />

                          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-3 text-center">
                            <p className="text-xs font-bold text-slate-700">
                              Upload testimonial letters / feedback reports (Optional)
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              PDF, DOC or JPG up to 10MB
                            </p>
                            {testimonialFileName && (
                              <p className="mt-1 text-xs font-bold text-[#0E9F88]">
                                Attached: {testimonialFileName}
                              </p>
                            )}
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.png"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setTestimonialFileName(e.target.files[0].name);
                                }
                              }}
                              className="mt-2 text-xs text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-[#0E9F88] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white cursor-pointer"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 7: Geography & Availability */}
                {/* ---------------------------------------------------- */}
                {step === 7 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Where are you available to deliver training?
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">Select all that apply:</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {deliveryLocations.map((loc) => (
                          <OptionCard
                            key={loc}
                            selected={selectedLocations.includes(loc)}
                            onClick={() =>
                              toggleInList(selectedLocations, setSelectedLocations, loc)
                            }
                            small
                          >
                            <p className="text-xs font-bold">{loc}</p>
                          </OptionCard>
                        ))}
                      </div>
                    </div>

                    {/* Travel Cities */}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Cities you're willing to travel to
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {popularCities.map((city) => {
                          const isSelected = travelCities.includes(city);
                          return (
                            <button
                              key={city}
                              type="button"
                              onClick={() => toggleInList(travelCities, setTravelCities, city)}
                              className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                                isSelected
                                  ? "border-[#0E9F88] bg-[#0E9F88] text-white"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {isSelected ? "✓ " : "+ "}
                              {city}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          value={customCityInput}
                          onChange={(e) => setCustomCityInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTravelCity();
                            }
                          }}
                          placeholder="Type city name (e.g. Indore, Surat, Singapore) and press Add"
                          className="h-10 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-xs outline-none focus:border-[#0E9F88]"
                        />
                        <button
                          type="button"
                          onClick={addTravelCity}
                          className="h-10 rounded-xl bg-[#0E9F88] px-4 text-xs font-bold text-white hover:bg-[#0C8B77]"
                        >
                          Add City
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          How much advance notice do you typically require?
                        </p>
                        <div className="mt-2.5 grid grid-cols-2 gap-2">
                          {noticeRequiredOptions.map((opt) => (
                            <RadioCard
                              key={opt}
                              selected={advanceNotice === opt}
                              onClick={() => setAdvanceNotice(opt)}
                              small
                            >
                              <p className="text-xs font-bold">{opt}</p>
                            </RadioCard>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          How frequently are you available for assignments?
                        </p>
                        <div className="mt-2.5 space-y-2">
                          {availabilityFrequencyOptions.map((opt) => (
                            <RadioCard
                              key={opt}
                              selected={availabilityFrequency === opt}
                              onClick={() => setAvailabilityFrequency(opt)}
                              small
                            >
                              <p className="text-xs font-bold">{opt}</p>
                            </RadioCard>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 8: Commercials & Pricing */}
                {/* ---------------------------------------------------- */}
                {step === 8 && (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                      <p className="text-xs font-bold text-amber-900">
                        🔒 Confidential Fee Guidance
                      </p>
                      <p className="text-xs text-amber-800 mt-0.5">
                        These rates are used by Atlas to filter relevant corporate budgets and will not be displayed openly without your confirmation.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Preferred engagement model
                      </p>
                      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {engagementModels.map((model) => (
                          <RadioCard
                            key={model}
                            selected={preferredEngagementModel === model}
                            onClick={() => setPreferredEngagementModel(model)}
                            small
                          >
                            <p className="text-xs font-bold">{model}</p>
                          </RadioCard>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-2">
                        Typical professional fee (Per day indicative rate)
                      </p>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Input
                          label="Online (Virtual)"
                          value={feeOnline}
                          onChange={setFeeOnline}
                          placeholder="e.g. 35,000"
                          prefix="₹"
                          type="text"
                        />
                        <Input
                          label="In-Person (India)"
                          value={feeInPerson}
                          onChange={setFeeInPerson}
                          placeholder="e.g. 60,000"
                          prefix="₹"
                          type="text"
                        />
                        <Input
                          label="International"
                          value={feeInternational}
                          onChange={setFeeInternational}
                          placeholder="e.g. 1,20,000"
                          prefix="₹"
                          type="text"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Are your fees negotiable depending on the assignment?
                      </p>
                      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                        {["Yes", "No", "Depends on the assignment"].map((opt) => (
                          <RadioCard
                            key={opt}
                            selected={feesNegotiable === opt}
                            onClick={() => setFeesNegotiable(opt as any)}
                            small
                          >
                            <p className="text-xs font-bold text-center">{opt}</p>
                          </RadioCard>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 9: Content & Customisation */}
                {/* ---------------------------------------------------- */}
                {step === 9 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        What do you provide as part of your engagement?
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">Select all that apply:</p>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {contentDeliverables.map((item) => (
                          <OptionCard
                            key={item}
                            selected={deliverables.includes(item)}
                            onClick={() => toggleInList(deliverables, setDeliverables, item)}
                            small
                          >
                            <p className="text-xs font-bold">{item}</p>
                          </OptionCard>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Are you willing to customise your programme for a corporate requirement?
                        </p>
                        <div className="mt-2.5 space-y-2">
                          {["Yes", "No", "Depends on requirement"].map((opt) => (
                            <RadioCard
                              key={opt}
                              selected={willingToCustomise === opt}
                              onClick={() => setWillingToCustomise(opt as any)}
                              small
                            >
                              <p className="text-xs font-bold">{opt}</p>
                            </RadioCard>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Can you develop customised training content from scratch?
                        </p>
                        <div className="mt-2.5 space-y-2">
                          {["Yes", "No"].map((opt) => (
                            <RadioCard
                              key={opt}
                              selected={canDevelopFromScratch === opt}
                              onClick={() => setCanDevelopFromScratch(opt as any)}
                              small
                            >
                              <p className="text-xs font-bold">{opt}</p>
                            </RadioCard>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 10: Profile Upload & Video Pitch */}
                {/* ---------------------------------------------------- */}
                {step === 10 && (
                  <div className="space-y-6">
                    {/* CV Upload */}
                    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center transition hover:border-[#0E9F88]/50">
                      <FileUp className="mx-auto size-8 text-[#0E9F88] mb-2" />
                      <p className="text-sm font-bold text-slate-800">
                        Upload your CV / Trainer Profile Deck
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        PDF, DOCX, or PPT up to 15MB.
                      </p>
                      {cvFileName && (
                        <p className="mt-2 text-xs font-extrabold text-[#0E9F88]">
                          Attached: {cvFileName}
                        </p>
                      )}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setCvFileName(e.target.files[0].name);
                          }
                        }}
                        className="mt-3 block w-full text-xs text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#0E9F88] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white cursor-pointer"
                      />
                    </div>

                    {/* Video Pitch Differentiator */}
                    <div className="rounded-2xl border-2 border-[#176BFF]/20 bg-gradient-to-br from-[#EAF3FF]/40 to-white p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#176BFF] text-white">
                          <Video className="size-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">
                              60–90 Second Video Introduction
                            </h4>
                            <span className="rounded-full bg-[#176BFF]/10 px-2 py-0.5 text-[10px] font-black text-[#176BFF]">
                              HIGHLY RECOMMENDED
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                            “Tell corporates who you are, what you specialise in and why they should work with you.” Trainers with an intro video get{" "}
                            <span className="font-bold text-[#176BFF]">3.4x more shortlist invitations</span>.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setVideoIntroType("recorded")}
                          className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                            videoIntroType === "recorded"
                              ? "border-[#176BFF] bg-[#176BFF]/10 text-[#091536] font-bold"
                              : "border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          <Play className="size-5 text-[#176BFF]" />
                          <div>
                            <p className="text-xs font-bold">Record via Webcam / Camera</p>
                            <p className="text-[10px] text-slate-500">Record in browser</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setVideoIntroType("uploaded")}
                          className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                            videoIntroType === "uploaded"
                              ? "border-[#176BFF] bg-[#176BFF]/10 text-[#091536] font-bold"
                              : "border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          <Upload className="size-5 text-[#176BFF]" />
                          <div>
                            <p className="text-xs font-bold">Upload MP4 / MOV Video</p>
                            <p className="text-[10px] text-slate-500">Up to 100MB</p>
                          </div>
                        </button>
                      </div>

                      {videoIntroType !== "none" && (
                        <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3 border border-slate-200">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-[#0E9F88]" />
                            <span className="text-xs font-bold text-slate-800">
                              {videoFileName} (Ready for submission)
                            </span>
                          </div>
                          <span className="text-[10px] font-extrabold text-[#176BFF]">+10 Atlas Score pts</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 11: Atlas Verification Badges */}
                {/* ---------------------------------------------------- */}
                {step === 11 && (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-[#0E9F88]/30 bg-[#E8FAF5]/50 p-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#0E9F88]">
                        <ShieldCheck className="size-5" />
                        The Atlas Verification Promise
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        One of the biggest problems corporates have is not finding a trainer — it’s knowing whether the trainer is authentic and vetted. Select the items you are ready to provide to earn your <strong>“Atlas Verified”</strong> badge.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-1">
                        Which of the following can you provide for verification?
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {verificationOptions.map((item) => {
                          const IconComp = item.icon;
                          const isSelected = selectedVerificationItems.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() =>
                                toggleInList(
                                  selectedVerificationItems,
                                  setSelectedVerificationItems,
                                  item.id
                                )
                              }
                              className={`flex items-start gap-3 rounded-xl border-2 p-3.5 text-left transition ${
                                isSelected
                                  ? "border-[#0E9F88] bg-[#E8FAF5]/80 text-slate-900 shadow-xs"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              <div
                                className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                                  isSelected
                                    ? "bg-[#0E9F88] text-white"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                <IconComp className="size-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold">{item.label}</p>
                                <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                              </div>
                              <span
                                className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${
                                  isSelected
                                    ? "border-[#0E9F88] bg-[#0E9F88] text-white"
                                    : "border-slate-300"
                                }`}
                              >
                                {isSelected && <Check className="size-3 stroke-[3]" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 12: Assignment Preferences & Notes */}
                {/* ---------------------------------------------------- */}
                {step === 12 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        What type of assignments are you most interested in receiving through Atlas?
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">Select all that apply:</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {assignmentInterests.map((item) => (
                          <OptionCard
                            key={item}
                            selected={interestedAssignments.includes(item)}
                            onClick={() =>
                              toggleInList(interestedAssignments, setInterestedAssignments, item)
                            }
                            small
                          >
                            <p className="text-xs font-bold">{item}</p>
                          </OptionCard>
                        ))}
                      </div>
                    </div>

                    <div>
                      <TextArea
                        label="Anything else you'd like corporates to know about you? (Free text)"
                        value={additionalNotes}
                        onChange={setAdditionalNotes}
                        placeholder="Mention any proprietary frameworks, awards, publications, client satisfaction ratings or unique workshop formats..."
                        rows={3}
                      />
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <CheckCircle2 className="size-4 text-[#0E9F88]" /> Ready for Submission
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        By clicking "Complete Registration & Get Verified", your trainer profile will be processed and your Atlas Profile Score will be locked in.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ======================= FOOTER ACTIONS ======================= */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-200/60"
                >
                  {step === 0 ? "Cancel" : "Back"}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        localStorage.setItem(
                          "atlas_trainer_draft",
                          JSON.stringify({ fullName, email, currentCity, headline, bio })
                        );
                      }
                      router.push("/");
                    }}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-700"
                  >
                    Save draft
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-1.5 rounded-xl bg-[#0E9F88] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#0C8B77] shadow-md shadow-[#0E9F88]/20"
                  >
                    {step < steps.length - 1 ? (
                      <>
                        Continue <ArrowRight className="size-4" />
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="size-4" /> Complete Registration & Get Verified
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

export default TrainerRegistrationWizard;
