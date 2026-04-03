import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PHASES } from "../components/attack/allPhases";
import { Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-500/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="mono text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-slate-100">MITRE ATT&CK</span>
              <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Attack Matrix
              </span>
            </h1>
            <p className="mt-6 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              A hands-on reference map of the adversary attack lifecycle, built on the MITRE ATT&CK framework. Each phase covers real-world techniques, tools, and step-by-step commands used by red teams and threat actors — from initial reconnaissance all the way through to impact.
            </p>
            <p className="mt-3 text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mono leading-relaxed">
              Use this site to study attack patterns, prepare for engagements, or understand how defenders should prioritize detection across each stage of the kill chain.
            </p>
            <div className="mt-8 w-16 h-0.5 bg-red-500/30 mx-auto rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Phase Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHASES.map((phase, idx) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link
                to={createPageUrl(phase.id)}
                className="group block p-6 rounded-xl border bg-[hsl(222,47%,8%)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl"
                style={{ borderColor: phase.color + "15" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="mono text-xs font-bold tracking-wider uppercase"
                    style={{ color: phase.color }}
                  >
                    {phase.name}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: phase.color }}
                  />
                </div>
                <p className="text-xs text-slate-500 mono leading-relaxed">
                  {phase.subtitle}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: phase.color }}
                  />
                  <span className="text-[10px] text-slate-600 mono">
                    {phase.techniques.length} techniques
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Kill Chain Flow */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="mono text-[10px] text-slate-600 tracking-wider uppercase text-center mb-6">
            Attack Chain Legend
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PHASES.map((phase, idx) => (
              <React.Fragment key={phase.id}>
                <span
                  className="mono text-[10px] font-medium px-3 py-1 rounded-full border"
                  style={{
                    color: phase.color,
                    borderColor: phase.color + "30",
                    background: phase.color + "08",
                  }}
                >
                  {phase.name}
                </span>
                {idx < PHASES.length - 1 && (
                  <span className="text-slate-600 text-xs">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Author Card */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="max-w-xl mx-auto p-6 rounded-xl border border-white/10 bg-[hsl(222,47%,8%)] flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shrink-0 text-white font-bold text-lg mono">
              WX
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Wencheng Xue</p>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Cybersecurity student at the <span className="text-slate-300">University of Cincinnati</span>. Holds the <span className="text-orange-400 font-semibold mono">OSCE3</span> certification.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to={createPageUrl("Overview")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 mono text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            View Full Matrix Overview
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}