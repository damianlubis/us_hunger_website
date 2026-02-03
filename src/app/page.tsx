import Link from "next/link";
import { 
  ArrowRight, 
  BarChart3, 
  Download, 
  TrendingUp, 
  ShieldAlert, 
  Users, 
  Layers,
  SearchX
} from "lucide-react";

// ----------------------------------------------------------------------
import StateImpactMap from "./components/StateImpactMap";

// ----------------------------------------------------------------------
// DATA SOURCE: NotebookLM (U.S. Hunger Grounded Data)
// ----------------------------------------------------------------------
const TOTAL_FOOD_INSECURE_2024 = "47,900,000"; 
const CHILD_FOOD_INSECURE_LAST_RECORDED = "14.1 Million"; // 2024 Baseline (2026 data unavailable)
const HOUSEHOLD_RATE = "13.7%";
const SNAP_PARTICIPATION_DROP = "2.4 Million";
const FISCAL_ADMIN_SHIFT = "75%";

const DRIVER_1 = {
  title: "OBBBA Policy Restructuring",
  desc: "$200 Billion in direct SNAP cuts and the elimination of SNAP-Ed programs.",
  icon: <Layers className="w-6 h-6 text-white" aria-hidden="true" />
};

const DRIVER_2 = {
  title: "Expanded Work Mandates",
  desc: "Mandatory work/training requirements extended through age 64 for all SNAP recipients.",
  icon: <Users className="w-6 h-6 text-white" aria-hidden="true" />
};

const DRIVER_3 = {
  title: "Economic Cost Crisis",
  desc: "Sustained retail food price inflation combined with the expiration of pandemic-era stimulus.",
  icon: <TrendingUp className="w-6 h-6 text-white" aria-hidden="true" />
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-primary">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-slate-200" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <BarChart3 className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-lg font-black tracking-tight leading-none uppercase text-primary">US Hunger <span className="text-secondary font-light italic">Report</span></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block">Fiscal Year 2026</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            {["Methodology", "State Impact", "Policy Briefs", "Data Library"].map((item) => (
              <Link key={item} href="#" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors tracking-wide">
                {item}
              </Link>
            ))}
            <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-md hover:shadow-xl hover:bg-black transition-all">
              Live Tracker
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden bg-gradient-to-b from-surface/50 to-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden text-primary">
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col items-center relative gap-12 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 text-xs font-black shadow-sm text-secondary tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
              Emergency Status: Critical Threshold
            </div>
            
            <div className="space-y-6 max-w-4xl text-primary">
              <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                The Grounded <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Reality of Hunger</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                As federal policy shifts toward a &quot;Real Food&quot; reset, the administrative burden on states creates a 2026 fiscal cliff for millions.
              </p>
            </div>

            {/* HERO STATS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden group col-span-1 lg:col-span-1">
                <div className="absolute top-0 right-0 p-8 text-primary opacity-5 group-hover:opacity-10 transition-opacity">
                  <Users className="w-32 h-32" aria-hidden="true" />
                </div>
                <div className="relative text-left flex flex-col gap-2 pointer-events-none">
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Total Population Impacted</span>
                  <div className="text-5xl lg:text-6xl font-black text-primary tracking-tighter tabular-nums leading-none">
                    {TOTAL_FOOD_INSECURE_2024}
                  </div>
                  <div className="h-2 w-24 bg-danger mt-4 rounded-full"></div>
                  <p className="mt-4 text-slate-500 font-medium max-w-xs text-sm">
                    Current individuals experiencing persistent household food insecurity in the United States.
                  </p>
                </div>
              </div>

               {/* New Child Metric Card */}
               <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden group col-span-1">
                 <div className="absolute top-0 right-0 p-6 text-secondary opacity-5 group-hover:opacity-10 transition-opacity">
                   <ShieldAlert className="w-24 h-24" aria-hidden="true" />
                 </div>
                 <div className="relative text-left flex flex-col gap-2 pointer-events-none">
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Last Recorded Child Data</span>
                  <div className="text-5xl lg:text-6xl font-black text-secondary tracking-tighter tabular-nums leading-none">
                    {CHILD_FOOD_INSECURE_LAST_RECORDED}
                  </div>
                   <div className="h-2 w-24 bg-secondary mt-4 rounded-full"></div>
                   <p className="mt-4 text-slate-500 font-medium max-w-xs text-sm">
                     2024 Baseline. Exact 2026 projections unavailable due to USDA reporting cancellation.
                   </p>
                 </div>
               </div>

              <div className="grid grid-rows-2 gap-6 text-white col-span-1">
                <div className="bg-primary p-8 rounded-[2rem] flex flex-col justify-center gap-2 relative overflow-hidden group hover:bg-black transition-colors duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Household Rate</span>
                  <div className="text-5xl font-black leading-none">{HOUSEHOLD_RATE}</div>
                  <p className="text-xs text-white/70 font-medium max-w-[200px]">National average of households struggling to provide sufficient nutrition.</p>
                </div>
                <div className="bg-surface p-8 rounded-[2rem] border border-slate-200 flex flex-col justify-center gap-2 text-primary group hover:border-secondary transition-colors duration-500">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Projected SNAP Drop</span>
                  <div className="text-5xl font-black leading-none text-primary group-hover:text-secondary transition-colors">-{SNAP_PARTICIPATION_DROP}</div>
                  <p className="text-xs text-slate-500 font-medium max-w-[200px]">Monthly participation decline estimated under new OBBBA federal mandates.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRIMARY DRIVERS SECTION */}
        <section className="py-32 px-6 bg-primary">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="space-y-4">
                <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">Structural <br/>Restructuring Drivers</h2>
                <div className="h-1.5 w-32 bg-secondary rounded-full"></div>
              </div>
              <p className="text-white/60 font-medium max-w-md text-lg leading-relaxed italic">
                Three converging policy and economic forces are reshaping the national anti-hunger landscape through Fiscal Year 2026.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <DriverCard {...DRIVER_1} index="01" />
              <DriverCard {...DRIVER_2} index="02" />
              <DriverCard {...DRIVER_3} index="03" />
            </div>
          </div>
        </section>



        {/* STATE FISCAL CLIFF SECTION */}
        <section className="py-32 px-6 bg-white overflow-hidden text-primary">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest inline-block">Fiscal Rebalancing</span>
              <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter">The 2026 <br/>Administrative Shift</h2>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                States are facing a historical pivot in operational funding. Effective October 2026, the local share of SNAP administrative expenses will see an unprecedented surge.
              </p>
            </div>

            {/* INTERACTIVE MAP COMPONENT */}
            <StateImpactMap />
          </div>
        </section>

        {/* DATA BLACKOUT SECTION */}
        <section className="py-24 px-6 bg-surface/50 text-primary">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <SearchX className="w-16 h-16 text-primary mx-auto opacity-20" />
            <h2 className="text-4xl font-black tracking-tight leading-none uppercase">The Federal Data Blackout</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              The USDA&apos;s cancellation of the annual Household Food Security Report marks the end of official tracking just as the OBBBA restructuring takes effect.
            </p>
            <button className="inline-flex items-center gap-2 text-secondary font-black hover:gap-4 transition-all uppercase tracking-widest text-xs">
              Request Independent Analysis Report <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary via-primary to-black rounded-[3rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden text-white shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <h2 className="text-5xl md:text-6xl font-black leading-none tracking-tighter relative z-10 uppercase">Access the <br/>Full Grounded Dataset</h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto relative z-10 font-medium leading-relaxed italic">
              Download the comprehensive assessment of SNAP fiscal rebalancing and its impact on the nation&apos;s nutrition safety net.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <button className="flex items-center justify-center gap-3 px-10 py-5 bg-secondary text-white rounded-2xl text-lg font-black shadow-xl shadow-secondary/30 hover:scale-105 transition-all active:scale-95">
                <Download className="w-6 h-6" />
                Download Report (.PDF)
              </button>
              <button className="flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl text-lg font-black hover:bg-white/20 transition-all active:scale-95">
                API Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-20 px-6 text-primary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight uppercase">US Hunger</span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed">
              An independent data initiative exploring federal nutrition policy shifts and their local fiscal impacts.
            </p>
          </div>
          <div className="space-y-6 text-primary">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">Data Sources</h4>
            <ul className="space-y-3 font-bold text-slate-500">
              <li><Link href="#" className="hover:text-secondary transition-colors italic">USDA FY 2026 Budget</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors italic">OBBBA Legislative Text</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors italic">CBO Fiscal Projections</Link></li>
            </ul>
          </div>
          <div className="space-y-6 text-primary">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">Organization</h4>
            <ul className="space-y-3 font-bold text-slate-500">
              <li><Link href="#" className="hover:text-secondary transition-colors italic">About Initiative</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors italic">Methodology</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors italic">Contact Analyst</Link></li>
            </ul>
          </div>
          <div className="space-y-6 text-primary">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300 font-black italic">Updates</h4>
            <p className="text-slate-400 font-medium leading-relaxed">Join the independent data monitoring queue for October 2026.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-surface/50 border-none rounded-lg px-4 py-3 w-full font-bold text-xs" />
              <button className="bg-primary p-3 flex items-center justify-center shrink-0 rounded-lg text-white hover:bg-black transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <p>© 2026 US Hunger Research Initiative. Sourced via Grounded Data Notebook.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors italic">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors italic">Terms of Use</Link>
            <Link href="#" className="hover:text-primary transition-colors italic">Data Attribution</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DriverCard({ title, desc, icon, index }: { title: string, desc: string, icon: React.ReactNode, index: string }) {
  return (
    <div className="group bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
      <div className="flex justify-between items-start mb-8 text-white">
        <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <span className="text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors select-none leading-none">
          {index}
        </span>
      </div>
      <h3 className="text-white text-2xl font-black mb-4 leading-tight group-hover:text-secondary transition-colors tracking-tight uppercase">
        {title}
      </h3>
      <p className="text-white/60 font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
