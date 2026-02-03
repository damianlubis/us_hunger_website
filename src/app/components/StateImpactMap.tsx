'use client';

import React, { useState } from 'react';
import { AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

// --- DATA: High Impact States (based on NotebookLM research) ---
interface StateData {
  id: string;
  name: string;
  riskLevel: 'critical' | 'high' | 'moderate' | 'low';
  projectedCost: string;
  adminCost?: string;
  perPenalty?: string;
  description: string;
}

const STATE_DATA: Record<string, StateData> = {
  NC: {
    id: 'NC', name: 'North Carolina', riskLevel: 'critical',
    projectedCost: '$436 Million',
    adminCost: '$16M',
    perPenalty: '$420M',
    description: 'Projected annual liability starting 2027 if PER remains > 6%. Could trigger program withdrawal considerations.'
  },
  MD: {
    id: 'MD', name: 'Maryland', riskLevel: 'critical',
    projectedCost: '$300 Million',
    adminCost: '$58M',
    perPenalty: '$240M',
    description: 'Faces a potential $240M benefit cost share annually by 2030 due to high Error Rates.'
  },
  CO: {
    id: 'CO', name: 'Colorado', riskLevel: 'high',
    projectedCost: '$180 Million',
    perPenalty: '$130M',
    description: 'Current 9.97% PER would trigger a 10% penalty share. Admin shift adds $50M/year.'
  },
  RI: {
    id: 'RI', name: 'Rhode Island', riskLevel: 'high',
    projectedCost: '$60 Million',
    description: 'New costs would expand the state’s existing structural deficit by 20%.'
  },
  UT: {
    id: 'UT', name: 'Utah', riskLevel: 'moderate',
    projectedCost: '$20 Million',
    description: 'Currently safe, but a 0.26% rise in error rate would trigger extended penalties.'
  },
  // Default fallback for others
  DEFAULT: {
    id: '??', name: 'State Analysis Pending', riskLevel: 'low',
    projectedCost: 'Data Unavailable',
    description: 'Detailed fiscal projection pending independent audit.'
  }
};

// --- GRID LAYOUT: Approximate US Map ---
// row, col, id
const MAP_LAYOUT = [
    { r: 1, c: 1, id: 'AK' }, { r: 1, c: 11, id: 'ME' },
    { r: 2, c: 6, id: 'WI' }, { r: 2, c: 10, id: 'VT' }, { r: 2, c: 11, id: 'NH' },
    { r: 3, c: 1, id: 'WA' }, { r: 3, c: 2, id: 'ID' }, { r: 3, c: 3, id: 'MT' }, { r: 3, c: 4, id: 'ND' }, { r: 3, c: 5, id: 'MN' }, { r: 3, c: 6, id: 'IL' }, { r: 3, c: 7, id: 'MI' }, { r: 3, c: 9, id: 'NY' }, { r: 3, c: 10, id: 'MA' },
    { r: 4, c: 1, id: 'OR' }, { r: 4, c: 2, id: 'NV' }, { r: 4, c: 3, id: 'WY' }, { r: 4, c: 4, id: 'SD' }, { r: 4, c: 5, id: 'IA' }, { r: 4, c: 6, id: 'IN' }, { r: 4, c: 7, id: 'OH' }, { r: 4, c: 8, id: 'PA' }, { r: 4, c: 9, id: 'NJ' }, { r: 4, c: 10, id: 'CT' }, { r: 4, c: 11, id: 'RI' },
    { r: 5, c: 1, id: 'CA' }, { r: 5, c: 2, id: 'UT' }, { r: 5, c: 3, id: 'CO' }, { r: 5, c: 4, id: 'NE' }, { r: 5, c: 5, id: 'MO' }, { r: 5, c: 6, id: 'KY' }, { r: 5, c: 7, id: 'WV' }, { r: 5, c: 8, id: 'VA' }, { r: 5, c: 9, id: 'MD' }, { r: 5, c: 10, id: 'DE' },
    { r: 6, c: 2, id: 'AZ' }, { r: 6, c: 3, id: 'NM' }, { r: 6, c: 4, id: 'KS' }, { r: 6, c: 5, id: 'AR' }, { r: 6, c: 6, id: 'TN' }, { r: 6, c: 7, id: 'NC' }, { r: 6, c: 8, id: 'SC' }, { r: 6, c: 9, id: 'DC' },
    { r: 7, c: 4, id: 'OK' }, { r: 7, c: 5, id: 'LA' }, { r: 7, c: 6, id: 'MS' }, { r: 7, c: 7, id: 'AL' }, { r: 7, c: 8, id: 'GA' },
    { r: 8, c: 1, id: 'HI' }, { r: 8, c: 4, id: 'TX' }, { r: 8, c: 8, id: 'FL' }
];

export default function StateImpactMap() {
    const [selectedState, setSelectedState] = useState<string | null>(null);

    const getRiskColor = (id: string) => {
        const data = STATE_DATA[id];
        if (!data) return 'bg-slate-200 text-slate-400 hover:bg-slate-300';
        if (data.riskLevel === 'critical') return 'bg-danger text-white shadow-lg shadow-danger/30 hover:scale-110 z-10';
        if (data.riskLevel === 'high') return 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:scale-110 z-10';
        if (data.riskLevel === 'moderate') return 'bg-yellow-400 text-white hover:scale-105';
        return 'bg-blue-100 text-primary hover:bg-blue-200';
    };

    const activeData = selectedState ? (STATE_DATA[selectedState] || { ...STATE_DATA.DEFAULT, name: selectedState, id: selectedState }) : null;

    return (
        <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* MAP GRID */}
            <div className="relative p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
                <div 
                    className="grid gap-2" 
                    style={{ 
                        gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
                        width: 'fit-content'
                    }}
                >
                    {MAP_LAYOUT.map((state) => (
                        <button
                            key={state.id}
                            onClick={() => setSelectedState(state.id)}
                            className={`
                                w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-black transition-all duration-300 cursor-pointer
                                ${getRiskColor(state.id)}
                                ${state.id === selectedState ? 'ring-4 ring-primary ring-offset-2 scale-125 z-20' : ''}
                            `}
                            style={{ 
                                gridColumn: state.c, 
                                gridRow: state.r 
                            }}
                        >
                            {state.id}
                        </button>
                    ))}
                </div>
                <div className="absolute bottom-4 left-4 flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200"></div>No Data</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-danger"></div>High Liability</div>
                </div>
            </div>

            {/* INFO PANEL */}
            <div className="flex-1 w-full min-h-[300px] md:min-h-[400px]">
                {activeData ? (
                    <div 
                        key={activeData.id}
                        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl space-y-6 h-full transition-all duration-500 animate-[fade-in_0.5s_ease-out]"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block
                                    ${activeData.riskLevel === 'critical' ? 'bg-danger/10 text-danger' : 
                                      activeData.riskLevel === 'high' ? 'bg-orange-500/10 text-orange-500' : 
                                      'bg-slate-100 text-slate-500'}
                                `}>
                                    {activeData.riskLevel} Risk
                                </span>
                                <h3 className="text-4xl font-black text-primary leading-none">{activeData.name}</h3>
                            </div>
                            <div className="text-4xl font-black text-slate-100">{activeData.id}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-surface rounded-2xl">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                                    <DollarSign className="w-3 h-3" /> Total Liability
                                </div>
                                <div className="text-2xl font-black text-primary">{activeData.projectedCost}</div>
                            </div>
                            <div className="p-4 bg-surface rounded-2xl">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                                    <AlertCircle className="w-3 h-3" /> PER Penalty
                                </div>
                                <div className="text-2xl font-black text-primary">{activeData.perPenalty || "N/A"}</div>
                            </div>
                        </div>

                        <p className="text-slate-500 font-medium leading-relaxed">
                            {activeData.description}
                        </p>

                        {activeData.riskLevel === 'critical' && (
                            <div className="p-4 bg-danger/5 border border-danger/10 rounded-xl flex gap-3 text-danger text-sm font-bold">
                                <TrendingUp className="w-5 h-5 shrink-0" />
                                This state is projected to exceed the 6% error rate threshold by 2027.
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black text-primary mb-2">Select a State</h3>
                        <p className="text-slate-400 max-w-xs mx-auto">Click on any highlighted state in the grid to view its Fiscal Year 2026 cost projection.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
