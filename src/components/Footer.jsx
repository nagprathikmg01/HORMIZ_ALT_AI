import React from 'react';
import { 
  Zap, 
  ExternalLink, 
  Globe, 
  Award, 
  CheckCircle2,
  Code2,
  Share2
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Fellowship Info (5 Columns) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5">
                <div className="h-full w-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Zap className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-base font-bold text-white font-mono">HORMIZ-ALT AI</span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Global Energy Logistics & Strategic Rerouting Engine. Step 3 Problem Statement Submission for the Polymath Innovae Fellowship (Eonexea AI): "Strait of Hormuz: Design an Alternative".
            </p>

            <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-400">
              <Award className="h-3.5 w-3.5" />
              <span>Polymath Innovae Fellowship 2026 Submission</span>
            </div>
          </div>

          {/* Candidate Metadata (4 Columns) */}
          <div className="md:col-span-4 space-y-3 font-mono">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Candidate Metadata</h4>
            <div className="space-y-1.5 text-slate-300">
              <p><strong className="text-slate-500">Candidate:</strong> Nag Prathik M G</p>
              <p><strong className="text-slate-500">Institution:</strong> NMIT Bangalore</p>
              <p><strong className="text-slate-500">Track:</strong> AI Systems Engineering & Strategic Product Design</p>
              <p><strong className="text-slate-500">Challenge:</strong> Step 3 Submission • Problem Statement #3</p>
            </div>
          </div>

          {/* Verification & Portfolio Links (3 Columns) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Verified Portfolios</h4>
            
            <div className="space-y-2 font-mono">
              <a
                href="https://prathikrepo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 hover:border-cyan-500/40"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Main Portfolio</span>
                <ExternalLink className="h-3 w-3 ml-auto" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800"
              >
                <Code2 className="h-3.5 w-3.5 text-slate-400" />
                <span>GitHub Repository</span>
                <ExternalLink className="h-3 w-3 ml-auto" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800"
              >
                <Share2 className="h-3.5 w-3.5 text-slate-400" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="h-3 w-3 ml-auto" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>© 2026 HORMIZ-ALT AI • Built for Polymath Innovae Fellowship (Eonexea AI).</p>
          <p className="flex items-center space-x-1">
            <span>Engineered with React 18, Tailwind CSS & MILP Optimization</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
