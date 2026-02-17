'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  Database, 
  Cpu, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  FileSearch,
  Zap
} from 'lucide-react';
import Link from 'next/link';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MethodologyModal({ isOpen, onClose }: MethodologyModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="px-10 pt-16 pb-10 border-b border-slate-50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3 h-3" />
              Verified Architecture
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase">
              The Methodology of <br/>
              <span className="text-blue-600 italic font-light lowercase">ground truth synthesis</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
              This platform does not use speculative generative AI. Every metric shown is extracted from primary federal documentation using a multi-stage verification pipeline.
            </p>
          </div>

          {/* Pipeline Sections */}
          <div className="px-10 py-12 grid md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="space-y-6">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Step 01</span>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">Raw Ingestion</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  We ingest primary PDF documentation directly from USDA, CBO, and legal legislative texts (OBBBA). No secondary news aggregators are used.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Step 02</span>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">AI Synthesis</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Our Grounded AI engine performs semantic extraction of specific fiscal values, policy dates, and state-level administrative cost shifts.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Step 03</span>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">Expert Audit</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Every AI-synthesized conclusion is reviewed by a human policy analyst to ensure legislative context and technical accuracy.
                </p>
              </div>
            </div>

          </div>

          {/* Technical Specs Footer */}
          <div className="mx-10 mb-10 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm">
                <Zap className="w-8 h-8 text-slate-900" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase tracking-tight">Active Engine</h4>
                <p className="text-xs text-slate-400 font-mono">Grounded-Synthesis-v2.4-Audited</p>
              </div>
            </div>
            
            <Link 
              href="/data" 
              onClick={onClose}
              className="px-6 py-3 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-sm font-black text-slate-900 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
            >
              Explore Data Library
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
