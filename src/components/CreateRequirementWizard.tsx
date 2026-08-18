"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";
import { DeliveryMode, Requirement } from "../types";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  FileUp,
  Sparkles,
  X,
  Search,
  BookOpen,
  Users,
  Compass
} from "lucide-react";

const steps = [
  "Requirement",
  "Audience",
  "Programme",
  "Trainer",
  "Budget",
  "Extras",
  "Details",
];

const trainingTypes = [
  { title: "Leadership & Management", note: "Managers, CXOs, high-potential leaders" },
  { title: "Sales & Business Development", note: "Negotiation, key accounts, sales process" },
  { title: "Communication & Soft Skills", note: "Presentation, collaboration, workplace skills" },
  { title: "Finance & Financial Markets", note: "BFSI, investments, financial capability" },
  { title: "Technology", note: "Software, tools, cloud, enterprise platforms" },
  { title: "AI & Data", note: "AI adoption, analytics, data literacy" },
  { title: "HR", note: "HR capability, engagement, workplace policy" },
  { title: "Marketing", note: "Brand, campaigns, growth, digital marketing" },
  { title: "Legal & Compliance", note: "Compliance, regulations, risk awareness" },
  { title: "Operations", note: "Process, productivity, service excellence" },
  { title: "Industry-specific", note: "Specialized domain or sector-led training" },
  { title: "Other", note: "Describe the need in your own words" },
];

const audiences = [
  "Junior / Entry-level employees",
  "Middle management",
  "Senior management",
  "CXO / Leadership",
  "Sales team",
  "Technical team",
  "Mixed audience",
  "Other",
];

const formats = ["In-person", "Online", "Hybrid", "No preference"];
const durations = ["1-2 hours", "Half day", "1 day", "2 days", "3-5 days", "Multiple sessions", "Long-term engagement"];
const timelines = ["Within 7 days", "Within 2-4 weeks", "Within 1-3 months", "More than 3 months", "Flexible"];

const trainerPrefs = [
  "Corporate training experience",
  "Industry experience",
  "Academic / teaching experience",
  "International experience",
  "Leadership experience",
  "Specific domain expertise",
  "Experience with similar organisations",
  "Celebrity / recognised speaker",
  "Practitioner / hands-on expert",
  "No specific preference",
];

const budgets = [
  "Under Rs 25,000",
  "Rs 25,000-Rs 50,000",
  "Rs 50,000-Rs 1 lakh",
  "Rs 1-2 lakh",
  "Rs 2-5 lakh",
  "Rs 5 lakh+",
  "Not decided yet",
  "Not sure",
];

const extras = [
  "Training content / curriculum development",
  "Customisation of existing content",
  "Assessments / tests",
  "Certification",
  "Pre-training assessment",
  "Post-training assessment",
  "Follow-up / coaching",
  "Training material",
  "No additional requirements",
];

function OptionCard({
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
          ? "border-[#0E9F88] bg-[#E8FAF5]/70 text-[#072B24] shadow-md shadow-[#0E9F88]/10"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#18BFA5]/50 hover:shadow-md"
      } ${small ? "min-h-[56px]" : ""}`}
    >
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
          selected ? "border-[#0E9F88] bg-[#0E9F88] text-white" : "border-slate-300 bg-white group-hover:border-[#18BFA5]"
        }`}
      >
        {selected ? <Check className="size-3.5 text-white stroke-[3]" /> : null}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </button>
  );
}

function CheckCard({
  children,
  onClick,
  selected,
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? "border-[#0E9F88] bg-[#E8FAF5]/70 text-[#072B24] shadow-md shadow-[#0E9F88]/10"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#18BFA5]/50 hover:shadow-md"
      }`}
    >
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
          selected ? "border-[#0E9F88] bg-[#0E9F88] text-white" : "border-slate-300 bg-white group-hover:border-[#18BFA5]"
        }`}
      >
        {selected ? <Check className="size-3.5 text-white stroke-[3]" /> : null}
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
}: {
  hint?: string;
  label: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  value?: string;
}) {
  return (
    <label className="block">
      {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className={`${label ? 'mt-2' : ''} h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#0E9F88] focus:ring-4 focus:ring-[#0E9F88]/12`}
      />
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
}: {
  hint?: string;
  label: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#0E9F88] focus:ring-4 focus:ring-[#0E9F88]/12"
      />
      {hint ? <p className="mt-1.5 text-xs text-slate-400">{hint}</p> : null}
    </label>
  );
}

interface CreateRequirementWizardProps {
  onComplete?: (newRequirement: Requirement) => void;
  onCancel?: () => void;
  onOpenAiAssistant?: () => void;
}

export function CreateRequirementWizard({
  onComplete,
  onCancel,
  onOpenAiAssistant
}: CreateRequirementWizardProps) {
  const router = useRouter();
  const appContext = useApp();

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTrainingTypes, setSelectedTrainingTypes] = useState<string[]>(["Leadership & Management"]);
  const [topic, setTopic] = useState("");
  const [outcome, setOutcome] = useState("");
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>(["Middle management"]);
  const [participants, setParticipants] = useState("");
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>(["Intermediate"]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["Hybrid"]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedDurations, setSelectedDurations] = useState<string[]>(["1 day"]);
  const [selectedTimelines, setSelectedTimelines] = useState<string[]>(["Flexible"]);
  const [preferredDate, setPreferredDate] = useState("");
  const [selectedTrainerPrefs, setSelectedTrainerPrefs] = useState<string[]>([]);
  const [specificPref, setSpecificPref] = useState("");
  const [selectedProfileChoices, setSelectedProfileChoices] = useState<string[]>(["Recommend best match"]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>(["Not sure"]);
  const [budgetPerDay, setBudgetPerDay] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [companyName, setCompanyName] = useState("");
  const [yourName, setYourName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("onboarding_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.name) setYourName(parsed.name);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.organization) setCompanyName(parsed.organization);
        }
      } catch (err) {
        // ignore parse error
      }
    }
  }, []);

  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  const sidebarSummary = [
    { label: "Training", value: selectedTrainingTypes.join(", ") || "-" },
    { label: "Audience", value: selectedAudiences.join(", ") || "-" },
    { label: "Format", value: selectedFormats.join(", ") || "-" },
    { label: "Duration", value: selectedDurations.join(", ") || "-" },
    { label: "Budget", value: selectedBudgets.join(", ") || "-" },
  ];

  function toggle(list: string[], setList: (items: string[]) => void, item: string) {
    setList(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  }

  function reset() {
    setSubmitted(false);
    setStep(0);
  }

  function handleSubmit() {
    // Map form state to Requirement interface
    const primaryFormat = selectedFormats[0] || "No preference";
    const mappedDeliveryMode: DeliveryMode = 
      primaryFormat === "In-person" ? "In-Person" :
      primaryFormat === "Online" ? "Virtual" :
      primaryFormat === "Hybrid" ? "Hybrid" : "All";

    const parsedCohort = parseInt(participants, 10) || 25;
    const firstDuration = selectedDurations[0] || "1 day";
    const parsedDurationDays = 
      firstDuration.includes("1-2 hours") ? 0.25 :
      firstDuration.includes("Half day") ? 0.5 :
      firstDuration.includes("1 day") ? 1 :
      firstDuration.includes("2 days") ? 2 :
      firstDuration.includes("3-5 days") ? 4 : 3;

    const formattedLocation = [city, state, country].filter(Boolean).join(", ") || (selectedFormats.includes("Online") ? "Virtual / Remote" : "India");

    const newReq: Requirement = {
      id: `req-${Date.now()}`,
      title: topic || (selectedTrainingTypes.length ? `${selectedTrainingTypes.join(", ")} Workshop` : "Corporate Trainer Matching Requirement"),
      companyName: companyName || "Enterprise Client",
      category: selectedTrainingTypes.join(", ") || "Leadership & Management",
      targetAudience: selectedAudiences.join(", ") || "Corporate Employees",
      deliveryMode: mappedDeliveryMode,
      cohortSize: parsedCohort,
      durationDays: parsedDurationDays,
      startDate: preferredDate || selectedTimelines.join(", ") || "Flexible",
      budgetRange: selectedBudgets.length ? selectedBudgets.join(", ") : (budgetPerDay ? `Rs ${budgetPerDay}/day` : "Flexible"),
      location: formattedLocation,
      objectives: outcome || "Deliver customized interactive training session to elevate team performance.",
      additionalRequirements: [...selectedExtras, ...selectedTrainerPrefs, specificPref].filter(Boolean).join("; "),
      status: "Matching",
      createdAt: new Date().toISOString().split("T")[0],
      matchedCount: 24,
    };

    if (appContext?.addRequirement) {
      appContext.addRequirement(newReq);
    }
    if (onComplete) {
      onComplete(newReq);
    }

    setSubmitted(true);
  }

  function goNext() {
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    handleSubmit();
  }

  function goBack() {
    if (step === 0) {
      if (onCancel) onCancel();
      else router.push("/requirements");
      return;
    }
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleClose() {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/");
    }
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f0f2] px-4 py-8 text-slate-950">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#E8FAF5] text-[#0E9F88]">
            <CheckCircle2 className="size-8 text-[#0E9F88]" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-slate-900">You are all set</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Atlas will use your requirement to prepare a trainer shortlist.
          </p>
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => router.push("/experts")}
              className="h-12 w-full rounded-xl bg-[#0E9F88] text-sm font-bold text-white transition hover:bg-[#0C8B77] shadow-md shadow-[#0E9F88]/20"
            >
              View Matched Trainers
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Go to Dashboard
            </button>
            <button
              type="button"
              onClick={reset}
              className="text-xs font-medium text-slate-500 hover:text-slate-700 underline pt-2"
            >
              Submit another requirement
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f0f2] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[calc(100vh-48px)] gap-6 lg:grid-cols-[340px_1fr]">
          {/* SIDEBAR */}
          <aside className="relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 text-slate-900 shadow-xl border border-slate-200/90">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[#0E9F88]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#0E9F88] text-xs font-black text-white shadow-sm">
                    A
                  </div>
                  <span className="atlas-display text-base font-black text-[#091536] tracking-tight">Atlas</span>
                </div>
                {onOpenAiAssistant && (
                  <button
                    type="button"
                    onClick={onOpenAiAssistant}
                    className="flex items-center gap-1.5 rounded-full bg-[#E8FAF5] px-3 py-1 text-xs font-bold text-[#0E9F88] border border-[#0E9F88]/20 transition hover:bg-[#D3F5EC]"
                  >
                    <Sparkles className="size-3.5 text-[#0E9F88]" />
                    <span>AI Assist</span>
                  </button>
                )}
              </div>
              <h1 className="atlas-display mt-5 text-2xl font-black leading-snug tracking-tight text-[#091536]">
                Corporate trainer matching
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Tell Atlas what outcome you need. The form turns a business requirement into trainer matching signals.
              </p>
            </div>

            <div className="relative mt-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Progress</span>
                <span className="text-[#0E9F88] font-bold">{progress}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#0E9F88] transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <nav className="relative mt-6 flex-1 space-y-1">
              {steps.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-all duration-200 ${
                    index === step
                      ? "bg-[#E8FAF5] text-[#072B24] border border-[#0E9F88]/40 shadow-sm"
                      : index < step
                        ? "text-slate-700 hover:bg-slate-50"
                        : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold transition-all ${
                      index === step
                        ? "bg-[#0E9F88] text-white"
                        : index < step
                          ? "bg-[#0E9F88]/15 text-[#0E9F88] border border-[#0E9F88]/30"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {index < step ? "OK" : index + 1}
                  </span>
                  <span className="truncate">{item}</span>
                </button>
              ))}
            </nav>

            <div className="relative mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0E9F88]">
                Match brief
              </p>
              <dl className="mt-3 space-y-2">
                {sidebarSummary.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 text-xs">
                    <dt className="text-slate-500 font-medium">{row.label}</dt>
                    <dd className="max-w-[170px] truncate text-right font-semibold text-slate-800">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          {/* MAIN CONTENT FORM */}
          <section className="flex items-start">
            <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200/80">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 sm:px-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0E9F88]">
                    Step {step + 1} of {steps.length}
                  </p>
                  <h2 className="mt-0.5 text-xl font-bold tracking-tight text-[#091536] sm:text-2xl">
                    {steps[step]}
                  </h2>
                </div>
                {/* <button
                  type="button"
                  onClick={handleClose}
                  className="flex size-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  title="Close / Cancel"
                >
                  <X className="size-5" />
                </button> */}
              </div>

              <div className="px-6 py-7 sm:px-8" key={step} style={{ animation: "fadeUp 0.3s ease-out" }}>
                {step === 0 && (
                  <div className="space-y-7">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Select training category</p>
                      <p className="mt-1 text-xs text-slate-400">Select all that apply</p>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {trainingTypes.map((type) => (
                          <OptionCard key={type.title} selected={selectedTrainingTypes.includes(type.title)} onClick={() => toggle(selectedTrainingTypes, setSelectedTrainingTypes, type.title)}>
                            <p className="text-sm font-semibold">{type.title}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{type.note}</p>
                          </OptionCard>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <TextArea label="What specific topic / skill do you need the trainer for?" value={topic} onChange={setTopic} placeholder="“Negotiation skills for senior sales managers”" />
                      <TextArea label="Briefly describe what you want the trainer to achieve." value={outcome} onChange={setOutcome} placeholder="“Participants should be able to negotiate better with enterprise clients.”" hint="This is important because Atlas should eventually use this to match trainers, not just keywords." />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-7">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Who will be attending the programme?</p>
                      <p className="mt-1 text-xs text-slate-400">Select all that apply</p>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {audiences.map((item) => (
                          <OptionCard key={item} selected={selectedAudiences.includes(item)} onClick={() => toggle(selectedAudiences, setSelectedAudiences, item)}>
                            <p className="text-sm font-semibold">{item}</p>
                          </OptionCard>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input label="Number of participants" value={participants} onChange={setParticipants} placeholder="e.g. 30" type="number" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Experience level</p>
                        <div className="mt-3 grid grid-cols-2 gap-2.5">
                          {["Beginner", "Intermediate", "Advanced", "Mixed"].map((level) => (
                            <OptionCard key={level} selected={selectedExperienceLevels.includes(level)} onClick={() => toggle(selectedExperienceLevels, setSelectedExperienceLevels, level)} small>
                              <p className="text-sm font-semibold">{level}</p>
                            </OptionCard>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-7">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">What format do you prefer?</p>
                      <p className="mt-1 text-xs text-slate-400">Select all that apply</p>
                      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {formats.map((item) => (
                          <OptionCard key={item} selected={selectedFormats.includes(item)} onClick={() => toggle(selectedFormats, setSelectedFormats, item)} small>
                            <p className="text-center text-sm font-semibold">{item}</p>
                          </OptionCard>
                        ))}
                      </div>
                    </div>
                    {!selectedFormats.includes("Online") && (
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Where will the training take place?</p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-3">
                          <Input label="" value={country} onChange={setCountry} placeholder="Country" />
                          <Input label="" value={state} onChange={setState} placeholder="State" />
                          <Input label="" value={city} onChange={setCity} placeholder="City" />
                        </div>
                      </div>
                    )}
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Programme duration</p>
                        <div className="mt-3 grid grid-cols-2 gap-2.5">
                          {durations.map((item) => (
                            <OptionCard key={item} selected={selectedDurations.includes(item)} onClick={() => toggle(selectedDurations, setSelectedDurations, item)} small>
                              <p className="text-sm font-semibold">{item}</p>
                            </OptionCard>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">When do you need the trainer?</p>
                        <div className="mt-3 grid grid-cols-2 gap-2.5">
                          {timelines.map((item) => (
                            <OptionCard key={item} selected={selectedTimelines.includes(item)} onClick={() => toggle(selectedTimelines, setSelectedTimelines, item)} small>
                              <p className="text-sm font-semibold">{item}</p>
                            </OptionCard>
                          ))}
                        </div>
                        <div className="mt-4">
                          <Input label="Preferred date (optional)" value={preferredDate} onChange={setPreferredDate} type="date" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-7">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">What are you looking for in a trainer?</p>
                      <p className="mt-1 text-xs text-slate-400">Select all that apply</p>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {trainerPrefs.map((item) => (
                          <CheckCard key={item} selected={selectedTrainerPrefs.includes(item)} onClick={() => toggle(selectedTrainerPrefs, setSelectedTrainerPrefs, item)}>
                            <p className="text-sm font-semibold">{item}</p>
                          </CheckCard>
                        ))}
                      </div>
                    </div>
                    <TextArea label="Any specific trainer preferences? (optional)" value={specificPref} onChange={setSpecificPref} placeholder="e.g. Prefer someone with BFSI experience" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Would you like to see multiple trainer profiles?</p>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {["Recommend best match", "Show multiple profiles"].map((option) => (
                          <OptionCard key={option} selected={selectedProfileChoices.includes(option)} onClick={() => toggle(selectedProfileChoices, setSelectedProfileChoices, option)}>
                            <p className="text-sm font-semibold">{option}</p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                              {option === "Recommend best match"
                                ? "Fastest path. Atlas picks the top match."
                                : "Useful when stakeholders want to compare options."}
                            </p>
                          </OptionCard>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-7">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Do you have an approximate budget?</p>
                      <p className="mt-1 text-xs text-slate-400">Select all that apply</p>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {budgets.map((item) => (
                          <OptionCard key={item} selected={selectedBudgets.includes(item)} onClick={() => toggle(selectedBudgets, setSelectedBudgets, item)} small>
                            <p className="text-sm font-semibold">{item}</p>
                          </OptionCard>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-slate-400">Not sure is fine. It will not block the shortlist.</p>
                    </div>
                    <Input label="Or enter a per-day budget (optional)" value={budgetPerDay} onChange={setBudgetPerDay} placeholder="Amount in Rs" type="number" hint="This helps narrow down trainer recommendations." />
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-7">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Do you require any of the following?</p>
                      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {extras.map((item) => (
                          <CheckCard key={item} selected={selectedExtras.includes(item)} onClick={() => toggle(selectedExtras, setSelectedExtras, item)}>
                            <p className="text-sm font-semibold">{item}</p>
                          </CheckCard>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-slate-300">
                      <FileUp className="mx-auto size-8 text-slate-400 mb-2" />
                      <p className="text-sm font-medium text-slate-700">Upload training brief / RFP / existing content</p>
                      <p className="mt-1 text-xs text-slate-400">Optional. PDF, DOC, or PPT up to 10MB.</p>
                      {uploadedFileName && (
                        <p className="mt-2 text-xs font-semibold text-emerald-600">Attached: {uploadedFileName}</p>
                      )}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadedFileName(e.target.files[0].name);
                          }
                        }}
                        className="mt-3 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition file:hover:bg-blue-700 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-7">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input label="Company name" value={companyName} onChange={setCompanyName} placeholder="Company Pvt Ltd" />
                      <Input label="Your name *" value={yourName} onChange={setYourName} placeholder="Full name" />
                      <Input label="Designation" value={designation} onChange={setDesignation} placeholder="HR Manager" />
                      <Input label="Work email *" value={email} onChange={setEmail} placeholder="name@company.com" type="email" />
                      <div className="sm:col-span-2">
                        <Input label="Mobile number" value={mobile} onChange={setMobile} placeholder="+91 98765 43210" type="tel" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                      <p className="text-sm font-semibold text-slate-900">What happens next?</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        Atlas will match trainers for your requirement and prepare a shortlist. You will receive it by email.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* FOOTER ACTIONS */}
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
                    onClick={() => router.push("/requirements")}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-700"
                  >
                    Save draft
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-xl bg-[#0E9F88] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#0C8B77] shadow-md shadow-[#0E9F88]/20"
                  >
                    {step < steps.length - 1 ? "Continue" : "Find My Trainers"}
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

export default CreateRequirementWizard;
