'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  Sparkles, 
  Save, 
  ArrowRight, 
  Info, 
  Check, 
  Users, 
  Calendar, 
  DollarSign, 
  FileText 
} from 'lucide-react';
import { Requirement, DeliveryMode } from '../types';

interface CreateRequirementWizardProps {
  onComplete: (newRequirement: Requirement) => void;
  onCancel: () => void;
  onOpenAiAssistant: () => void;
}

export const CreateRequirementWizard: React.FC<CreateRequirementWizardProps> = ({
  onComplete,
  onCancel,
  onOpenAiAssistant
}) => {
  const [currentStep, setCurrentStep] = useState<number>(4); // Default to Step 4 as in Image 2, but allow navigating 1-5

  // Form State
  const [title, setTitle] = useState('Leadership Training for Middle Management');
  const [category, setCategory] = useState('Executive Leadership');
  const [targetAudience, setTargetAudience] = useState('Middle Management (AVPs & Directors)');
  const [cohortSize, setCohortSize] = useState<number>(30);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('Hybrid');
  const [location, setLocation] = useState('Mumbai, India');
  const [startDate, setStartDate] = useState('2026-09-15');
  const [durationDays, setDurationDays] = useState<number>(2);
  const [budgetRange, setBudgetRange] = useState('₹1,000,000 - ₹2,500,000');
  const [programObjectives, setProgramObjectives] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [anythingElse, setAnythingElse] = useState('');

  const steps = [
    { number: 1, label: 'Basic Details' },
    { number: 2, label: 'Audience & Delivery' },
    { number: 3, label: 'Date & Duration' },
    { number: 4, label: 'Budget & Additional' },
    { number: 5, label: 'Review & Submit' }
  ];

  const budgetOptions = [
    'Below ₹50,000',
    '₹50,000 - ₹1,000,000',
    '₹1,000,000 - ₹2,500,000',
    'Above ₹2,500,000',
    'Not Sure'
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Create Requirement object
      const newReq: Requirement = {
        id: `req-${Date.now()}`,
        title: title || 'New Corporate Requirement',
        companyName: 'FinServe Pvt. Ltd.',
        category,
        targetAudience,
        deliveryMode,
        cohortSize,
        durationDays,
        startDate,
        budgetRange,
        location,
        objectives: programObjectives || 'Develop executive leadership capabilities and team alignment.',
        additionalRequirements,
        status: 'Matching',
        createdAt: new Date().toISOString().split('T')[0],
        matchedCount: 24
      };
      onComplete(newReq);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* HEADER BAR (Matching Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Requirement</h1>
            <p className="text-xs text-slate-500 font-medium">Tell us what you need and we'll help you find the right expert.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-orange-50 border border-orange-200 text-[#ff603d] text-xs font-bold rounded-xl hover:bg-orange-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ff603d]" />
            <span>Auto-fill with AI</span>
          </button>

          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50"
          >
            Save as Draft
          </button>
        </div>
      </div>

      {/* PROGRESS STEPS INDICATOR */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          
          {/* Connector Line */}
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 -z-0"></div>

          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <div 
                key={step.number}
                onClick={() => setCurrentStep(step.number)}
                className="flex flex-col items-center gap-2 cursor-pointer relative z-10 group"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-[#ff603d] text-white ring-4 ring-orange-100'
                      : 'bg-white border-2 border-slate-300 text-slate-400 group-hover:border-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    isCurrent ? 'text-blue-600 font-bold' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FORM BODY BASED ON CURRENT STEP */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-5xl mx-auto">
        
        {/* STEP 1: BASIC DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2">Step 1: Program Basic Details</h2>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Requirement Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Leadership Training for Middle Management"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Domain / Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  >
                    <option value="Executive Leadership">Executive Leadership</option>
                    <option value="Generative AI & Tech">Generative AI & Tech</option>
                    <option value="Soft Skills & DE&I">Soft Skills & DE&I</option>
                    <option value="Sales & Revenue Enablement">Sales & Revenue</option>
                    <option value="Agile & Transformation">Agile Culture</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Audience Level *</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Vice Presidents, AVPs, Team Leads"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: AUDIENCE & DELIVERY */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2">Step 2: Audience & Delivery Mode</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cohort Size (Participants)</label>
                <input
                  type="number"
                  value={cohortSize}
                  onChange={(e) => setCohortSize(Number(e.target.value))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Delivery Format</label>
                <select
                  value={deliveryMode}
                  onChange={(e) => setDeliveryMode(e.target.value as any)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="In-Person">In-Person</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & DURATION */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2">Step 3: Schedule & Duration</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Expected Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Program Duration (Days)</label>
                <input
                  type="number"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: BUDGET & ADDITIONAL (Directly matching Image 2 layout!) */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Budget & Additional Information</h2>
              <p className="text-xs text-slate-500 mt-0.5">Help us understand your budget and any specific requirements.</p>
            </div>

            {/* Budget Range Radio Cards (Matching Image 2) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Budget Range (INR) <span className="text-blue-600">*</span>
              </label>
              <p className="text-[11px] text-slate-400">Select your expected budget range</p>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                {budgetOptions.map((option) => {
                  const isSelected = budgetRange === option;
                  return (
                    <div
                      key={option}
                      onClick={() => setBudgetRange(option)}
                      className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-500 text-blue-900 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs font-bold">{option}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Objectives & Additional Requirements Textareas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Program Objectives <span className="text-slate-400 font-normal">(Optional)</span></label>
                <p className="text-[11px] text-slate-400">What do you want to achieve from this program?</p>
                <textarea
                  rows={4}
                  value={programObjectives}
                  onChange={(e) => setProgramObjectives(e.target.value)}
                  placeholder="E.g., Improve leadership skills, Enhance communication, Team alignment, etc."
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Anything else we should know? <span className="text-slate-400 font-normal">(Optional)</span></label>
                <p className="text-[11px] text-slate-400">Share any other details that can help us match you better.</p>
                <textarea
                  rows={4}
                  value={anythingElse}
                  onChange={(e) => setAnythingElse(e.target.value)}
                  placeholder="Share any specific context, expectations, or preferences."
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="block font-bold text-slate-800">Additional Requirements <span className="text-slate-400 font-normal">(Optional)</span></label>
              <p className="text-[11px] text-slate-400">Any must-have requirements for the expert or program?</p>
              <textarea
                rows={3}
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="E.g., Certifications, Tools, Pre-work, Reporting needs, etc."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
              />
            </div>

            {/* Info Box (Matching Image 2 blue box at bottom) */}
            <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl flex items-center gap-3 text-xs text-sky-800">
              <Info className="w-5 h-5 text-sky-600 shrink-0" />
              <span>The more details you share, the better we can match you with the right experts.</span>
            </div>

          </div>
        )}

        {/* STEP 5: REVIEW & SUBMIT */}
        {currentStep === 5 && (
          <div className="space-y-6 text-xs">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2">Step 5: Review Requirement Summary</h2>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
                  <p className="text-xs text-blue-600 font-bold mt-0.5">{category} • {deliveryMode}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  Matching Ready
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-200/80">
                <div>
                  <span className="text-slate-400 block font-medium">Cohort Size</span>
                  <span className="font-bold text-slate-800">{cohortSize} Leaders</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Start Date</span>
                  <span className="font-bold text-slate-800">{startDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Duration</span>
                  <span className="font-bold text-slate-800">{durationDays} Days</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Budget Range</span>
                  <span className="font-bold text-slate-800">{budgetRange}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#ff603d]" />
                <div>
                  <span className="font-bold text-slate-900">Estimated Instant AI Matches:</span>
                  <span className="text-[#ff603d] font-extrabold ml-1">24 Vetted Experts</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER ACTIONS BAR */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-colors"
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#ff603d] hover:bg-[#e05232] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>{currentStep === 5 ? 'Publish & Match Experts' : 'Next: Review & Submit'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
