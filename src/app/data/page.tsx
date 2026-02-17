'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, FileText, ExternalLink, Calendar, Building2 } from 'lucide-react';

// ----------------------------------------------------------------------
// DATA: Research & Citations
// ----------------------------------------------------------------------
const CITATIONS = [
  {
    id: '1',
    title: 'USDA FY 2026 Budget Summary',
    agency: 'U.S. Department of Agriculture',
    date: 'February 12, 2025',
    url: '#',
    type: 'Official Report'
  },
  {
    id: '2',
    title: 'The Budget and Economic Outlook: 2026 to 2036',
    agency: 'Congressional Budget Office (CBO)',
    date: 'January 15, 2026',
    url: '#',
    type: 'Fiscal Projections'
  },
  {
    id: '3',
    title: 'SNAP Administrative Cost Analysis: State-Level Impact',
    agency: 'NotebookLM Synthesis / CBPP',
    date: 'October 10, 2025',
    url: '#',
    type: 'AI Synthesis'
  },
  {
    id: '4',
    title: 'OBBBA Legislative Text: Title IV - Nutrition Reform',
    agency: 'Congress.gov',
    date: 'December 20, 2025',
    url: '#',
    type: 'Legislation'
  },
  {
    id: '5',
    title: 'Food Insecurity Trends: Post-Pandemic Analysis',
    agency: 'Economic Research Service',
    date: 'November 05, 2025',
    url: '#',
    type: 'Research Paper'
  },
  {
    id: '6',
    title: 'Fiscal Cliff Projection Model v2.4',
    agency: 'US Hunger Research Initiative',
    date: 'March 01, 2026',
    url: '#',
    type: 'Internal Data'
  }
];

export default function DataLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter citations based on search query
  const filteredCitations = CITATIONS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.agency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-black tracking-tight uppercase text-lg">Data Library</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* PAGE TITLE & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              Research & <br/>
              <span className="text-blue-600">Citations Library</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              The grounded truth dataset for the 2026 Fiscal Cliff claims. Sourced from official government documentation and AI-assisted synthesis.
            </p>
          </div>

          <div className="w-full md:w-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search citations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* CITATIONS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCitations.map((citation) => (
            <div 
              key={citation.id} 
              className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {citation.type}
                  </span>
                  <div className="text-slate-300 group-hover:text-blue-600 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {citation.title}
                </h3>

                <div className="space-y-3 text-sm text-slate-500 font-medium border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    {citation.agency}
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {citation.date}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl font-bold text-sm transition-all border border-transparent hover:border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                  View Source Document <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredCitations.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <p className="text-slate-500 font-medium">No citations found matching &quot;{searchQuery}&quot;</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-blue-600 font-bold hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
