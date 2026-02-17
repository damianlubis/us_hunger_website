'use client';

import React, { useState, useEffect } from 'react';
import { Timer, AlertTriangle } from 'lucide-react';

export default function BlackoutCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target Date: October 1, 2026 (Start of Fiscal Year 2026)
    const targetDate = new Date('2026-10-01T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
        {/* Ambient Glitch Background */}
        <div className="absolute inset-0 bg-danger/5 animate-pulse"></div>
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-danger to-transparent opacity-50 animate-[shimmer_2s_infinite]"></div>

        <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-danger font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                System Failure Imminent
            </div>

            <div className="flex gap-4 md:gap-8 text-white text-center">
                <TimeUnit value={timeLeft.days} label="Days" />
                <div className="text-4xl md:text-6xl font-black text-white/20 -mt-2">:</div>
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <div className="text-4xl md:text-6xl font-black text-white/20 -mt-2">:</div>
                <TimeUnit value={timeLeft.minutes} label="Mins" />
                <div className="text-4xl md:text-6xl font-black text-white/20 -mt-2">:</div>
                <TimeUnit value={timeLeft.seconds} label="Secs" isGlitch={true} />
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-white text-lg font-black uppercase tracking-tight">Time Until Data Blackout</h3>
                <p className="text-white/40 text-xs font-mono max-w-sm mx-auto">
                    Official USDA household reporting ceases. Fiscal cliff monitoring shifts to independent observation.
                </p>
            </div>
        </div>
    </div>
  );
}

function TimeUnit({ value, label, isGlitch = false }: { value: number; label: string; isGlitch?: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <div className={`text-4xl md:text-6xl font-black tabular-nums leading-none tracking-tighter ${isGlitch ? 'text-danger animate-[pulse_0.1s_infinite]' : 'text-white'}`}>
                {value.toString().padStart(2, '0')}
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">{label}</span>
        </div>
    );
}
