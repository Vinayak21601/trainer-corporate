'use client';

import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Play, 
  Award, 
  MapPin, 
  Briefcase, 
  Bookmark, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Clock, 
  Users, 
  Globe, 
  FileText 
} from 'lucide-react';
import { Trainer } from '../types';

interface TrainerProfileModalProps {
  trainer: Trainer | null;
  onClose: () => void;
  onToggleShortlist: (trainerId: string) => void;
  onSendMessage: (trainerId: string) => void;
}

export const TrainerProfileModal: React.FC<TrainerProfileModalProps> = ({
  trainer,
  onClose,
  onToggleShortlist,
  onSendMessage
}) => {
  if (!trainer) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'clients' | 'reviews'>('overview');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);

  const handleRequestProposal = () => {
    setProposalSent(true);
    setTimeout(() => {
      setProposalSent(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAFAFA] w-full max-w-4xl rounded-[24px] shadow-2xl border border-[#D5D5D5] overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="bg-[#111111] text-white p-6 relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#A0A0A0] hover:text-white bg-[#222222] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex gap-4 items-center">
            <img 
              src={trainer.avatarUrl} 
              alt={trainer.name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#F15B3A] shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-white">{trainer.name}</h2>
                {trainer.verified && (
                  <span className="bg-[#F15B3A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    ✓ Verified Expert
                  </span>
                )}
                <span className="bg-[#EEEEEE] text-[#111111] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {trainer.matchScore}% Match
                </span>
              </div>
              <p className="text-xs text-[#F15B3A] font-medium">{trainer.title}</p>
              <div className="flex items-center gap-3 text-xs text-[#A0A0A0]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A0A0A0]" />
                  {trainer.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#F4C542] text-[#F4C542]" />
                  {trainer.rating} ({trainer.reviewCount} Reviews)
                </span>
                <span>•</span>
                <span>{trainer.yearsExperience}+ Yrs Exp.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => onToggleShortlist(trainer.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                trainer.shortlisted
                  ? 'bg-[#222222] text-white border border-[#333333]'
                  : 'bg-[#F15B3A] text-white hover:bg-[#e05232]'
              }`}
            >
              {trainer.shortlisted ? 'Shortlisted ✓' : 'Shortlist'}
            </button>

            <button
              onClick={() => {
                onSendMessage(trainer.id);
                onClose();
              }}
              className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-white font-semibold text-xs rounded-full transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#F15B3A]" />
              <span>Message</span>
            </button>
          </div>
        </div>

        {/* MODAL TABS */}
        <div className="bg-[#EEEEEE] border-b border-[#D5D5D5] px-6 py-2 flex items-center gap-2 text-xs font-semibold text-[#777777]">
          {[
            { id: 'overview', label: 'Overview & Bio' },
            { id: 'modules', label: `Modules (${trainer.modules.length})` },
            { id: 'clients', label: `Client References (${trainer.clientsTrained.length})` },
            { id: 'reviews', label: `Reviews (${trainer.reviews.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === tab.id
                  ? 'bg-[#111111] text-white font-bold'
                  : 'hover:text-[#111111]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MODAL CONTENT BODY */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-[#111111]">
          
          {proposalSent && (
            <div className="p-4 bg-[#111111] text-white rounded-[16px] flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#F15B3A]" />
              <div>
                <div className="font-bold">Proposal Request Dispatched</div>
                <div className="text-[11px] text-[#A0A0A0]">An automated RFP notification has been sent to {trainer.name}.</div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Video Pitch & Bio */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Video Intro Pitch Player */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#111111] text-sm flex items-center gap-2">
                    <Play className="w-4 h-4 text-[#F15B3A]" />
                    <span>2-Minute Executive Introduction Video</span>
                  </h3>
                  <div className="relative aspect-video rounded-[16px] bg-[#111111] overflow-hidden group shadow-md">
                    {!isPlayingVideo ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent p-6 text-center text-white">
                        <img 
                          src={trainer.avatarUrl} 
                          alt={trainer.name} 
                          className="w-full h-full object-cover absolute inset-0 opacity-40 blur-xs"
                        />
                        <button
                          onClick={() => setIsPlayingVideo(true)}
                          className="relative z-10 w-14 h-14 rounded-full bg-[#111111] border border-white/20 hover:bg-[#F15B3A] hover:border-transparent text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
                        >
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        </button>
                        <p className="relative z-10 text-xs font-semibold mt-3 text-white">
                          Watch {trainer.name}’s Delivery Style
                        </p>
                      </div>
                    ) : (
                      <video
                        src={trainer.featuredVideoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* About & Bio */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#111111] text-sm">Executive Biography</h3>
                  <p className="text-[#777777] leading-relaxed text-xs">{trainer.longBio}</p>
                </div>

                {/* Certifications */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#111111] text-sm">Verified Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.map((cert) => (
                      <span key={cert} className="bg-[#EEEEEE] text-[#111111] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#F15B3A]" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Col: Rates & Quick Stats */}
              <div className="bg-[#F5F5F5] p-5 rounded-[20px] border border-[#E0E0E0] space-y-6 h-fit">
                <div>
                  <span className="text-[11px] text-[#777777] font-semibold uppercase tracking-wider block">Commercial Rates</span>
                  <div className="text-2xl font-bold text-[#111111] mt-1">
                    ${trainer.dayRate} <span className="text-xs font-normal text-[#777777]">/ Day Workshop</span>
                  </div>
                  <div className="text-xs text-[#777777] mt-0.5">
                    ${trainer.hourlyRate} / Hour Coaching
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#D5D5D5]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#777777]">Availability:</span>
                    <span className="font-semibold text-[#111111]">{trainer.availableFrom}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#777777]">Delivery Formats:</span>
                    <span className="font-semibold text-[#111111]">{trainer.deliveryModes.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#777777]">Languages:</span>
                    <span className="font-semibold text-[#111111]">{trainer.languages.join(', ')}</span>
                  </div>
                </div>

                <button
                  onClick={handleRequestProposal}
                  className="w-full bg-[#111111] hover:bg-black text-white font-semibold py-3 rounded-full text-xs transition-all text-center"
                >
                  Request RFP Quote ↗
                </button>
              </div>

            </div>
          )}

          {/* MODULES TAB */}
          {activeTab === 'modules' && (
            <div className="space-y-4">
              {trainer.modules.map((mod) => (
                <div key={mod.id} className="bg-[#F5F5F5] p-5 rounded-[20px] border border-[#E0E0E0] space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-[#111111] text-sm">{mod.title}</h4>
                      <div className="flex items-center gap-2 text-[#777777] text-xs mt-1">
                        <Clock className="w-3.5 h-3.5 text-[#F15B3A]" />
                        <span>{mod.durationHours} Hours Interactive Workshop</span>
                      </div>
                    </div>
                    <span className="bg-[#EEEEEE] text-[#111111] text-xs font-semibold px-3 py-1 rounded-full">
                      Ready to Deliver
                    </span>
                  </div>

                  <p className="text-[#777777] leading-relaxed">{mod.description}</p>

                  <div className="space-y-1">
                    <span className="font-semibold text-[#111111] text-[11px]">Syllabus Topics Covered:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {mod.topics.map((t) => (
                        <span key={t} className="bg-[#FAFAFA] border border-[#D5D5D5] px-3 py-1 rounded-full text-[#111111] font-medium text-[11px]">
                          • {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CLIENTS TAB */}
          {activeTab === 'clients' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trainer.clientsTrained.map((c, i) => (
                <div key={i} className="bg-[#F5F5F5] p-5 rounded-[20px] border border-[#E0E0E0] space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center mx-auto font-bold text-sm">
                    {c.name.charAt(0)}
                  </div>
                  <h4 className="font-semibold text-[#111111]">{c.name}</h4>
                  <p className="text-[11px] text-[#777777]">{c.industry}</p>
                </div>
              ))}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {trainer.reviews.length === 0 ? (
                <p className="text-[#A0A0A0] text-center py-6">No public reviews written yet for this expert.</p>
              ) : (
                trainer.reviews.map((rev) => (
                  <div key={rev.id} className="bg-[#F5F5F5] p-4 rounded-[20px] border border-[#E0E0E0] space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-[#111111]">{rev.authorName}</span>
                        <span className="text-[#777777] ml-2">({rev.authorRole}, {rev.companyName})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#F4C542] text-[#F4C542]" />
                        <span className="font-bold text-[#111111]">{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-[#777777] italic">"{rev.comment}"</p>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
