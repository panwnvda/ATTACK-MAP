import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, Menu, X } from "lucide-react";
import { PHASES } from "./components/attack/allPhases";

const NAV_ITEMS = [
  { name: "Home", page: "Home" },
  { name: "Overview", page: "Overview" },
  ...PHASES.map(p => ({ name: p.name, page: p.id })),
  { name: "Tools", page: "Tools" }
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(222,47%,6%)]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(222,47%,7%)]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="mono text-sm font-semibold">
                <span className="text-red-400">ATT&CK</span>
                <span className="text-slate-400">MAP</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1 overflow-x-auto ml-10">
              {NAV_ITEMS.map(item => {
                const phase = PHASES.find(p => p.id === item.page);
                const isActive = currentPageName === item.page;
                return (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className={`px-3 py-1.5 rounded-md text-xs mono font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                    style={isActive && phase ? { color: phase.color } : {}}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[hsl(222,47%,7%)]/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {NAV_ITEMS.map(item => {
                const phase = PHASES.find(p => p.id === item.page);
                const isActive = currentPageName === item.page;
                return (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm mono font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                    style={isActive && phase ? { color: phase.color } : {}}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}