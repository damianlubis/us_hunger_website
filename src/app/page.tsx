import Link from "next/link";
import { ArrowRight, BarChart3, AlertTriangle, FileText, Download } from "lucide-react";

// ----------------------------------------------------------------------
// DATA SOURCE: NotebookLM (ID: 7703cef2-ca3f-43d7-aac2-244599206e7e)
// ----------------------------------------------------------------------
// Please replace these constants with the actual values from the ASK_QUESTION tool.
const TOTAL_FOOD_INSECURE_2026 = "42,000,000"; // Placeholder: Replace with real number
const CAUSE_1 = "Supply Chain Disruptions"; // Placeholder
const CAUSE_2 = "Climate Crisis Impacts"; // Placeholder
const CAUSE_3 = "Policy Stagnation"; // Placeholder

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-surface text-primary">
      
      {/* HEADER: Primary Dark Navy */}
      <header className="bg-primary text-white py-6 px-8 shadow-lg z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">US Hunger Research <span className="text-accent font-light">2026</span></span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
            <Link href="#" className="hover:text-white transition-colors">Methodology</Link>
            <Link href="#" className="hover:text-white transition-colors">Data Sets</Link>
            <Link href="#" className="hover:text-white transition-colors">Policy Briefs</Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT: Surface Gray Background */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-12">
        <div className="max-w-5xl w-full space-y-12">

          {/* HERO SECTION */}
          <section className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-accent/30 text-primary text-sm font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              OFFICIAL 2026 REPORT
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight max-w-3xl mx-auto leading-tight">
              The State of <span className="text-secondary relative">
                Food Insecurity
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span> in America
            </h1>

            {/* MAIN STAT CARD */}
            <div className="relative mt-8 p-10 bg-white rounded-3xl shadow-xl border border-slate-200 max-w-2xl mx-auto overflow-hidden">
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent left-0"></div>
              <div className="uppercase tracking-widest text-slate-500 font-bold text-sm mb-2">Total Affected Population</div>
              <div className="text-7xl md:text-8xl font-black text-primary tracking-tighter tabular-nums leading-none">
                {TOTAL_FOOD_INSECURE_2026}
              </div>
              <div className="mt-4 text-secondary font-medium flex justify-center items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Critical Threshold Exceeded</span>
              </div>
            </div>
          </section>

          {/* CAUSES GRID */}
          <section className="grid md:grid-cols-3 gap-6 pt-8">
            <CauseCard 
              number="01" 
              title="Primary Driver" 
              description={CAUSE_1} 
              icon={<FileText className="w-6 h-6 text-white" />}
            />
            <CauseCard 
              number="02" 
              title="Secondary Driver" 
              description={CAUSE_2} 
              icon={<AlertTriangle className="w-6 h-6 text-white" />}
            />
            <CauseCard 
              number="03" 
              title="Tertiary Driver" 
              description={CAUSE_3} 
              icon={<BarChart3 className="w-6 h-6 text-white" />}
            />
          </section>

          {/* CTA SECTION */}
          <div className="flex justify-center pt-8">
            <button className="flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-xl text-lg font-bold shadow-lg hover:bg-[#1a82c0] hover:shadow-xl transition-all hover:-translate-y-1">
              <Download className="w-5 h-5" />
              Download Full 2026 Assessment
            </button>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-200 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 US Hunger Research Initiative. Data sourced via NotebookLM.</p>
      </footer>
    </div>
  );
}

function CauseCard({ number, title, description, icon }: { number: string, title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="group bg-white p-6 rounded-xl shadow-md border-l-4 border-accent hover:border-secondary transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-inner group-hover:bg-secondary transition-colors">
          {icon}
        </div>
        <span className="text-5xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none">
          {number}
        </span>
      </div>
      <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-1 group-hover:text-secondary transition-colors">
        {title}
      </h3>
      <p className="text-xl font-bold text-primary leading-tight">
        {description}
      </p>
    </div>
  );
}
