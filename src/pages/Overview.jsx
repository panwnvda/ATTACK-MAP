import React from "react";
import { PHASES } from "../components/attack/allPhases";
import MatrixColumn from "../components/attack/MatrixColumn";
import { motion } from "framer-motion";

export default function Overview() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="text-center pt-16 pb-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-slate-200">ATT&CK </span>
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Architecture Map
            </span>
          </h1>
          <p className="mt-4 mono text-sm text-slate-500">
            Comprehensive Reference — From Reconnaissance to Domain Dominance
          </p>
        </motion.div>
      </div>

      {/* Matrix Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-16">
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1100px]">
            {PHASES.map((phase, idx) => (
              <motion.div
                key={phase.id}
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
              >
                <MatrixColumn phase={phase} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 pt-6 border-t border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="mono text-[10px] text-slate-600 tracking-wider uppercase">
              Kill Chain Legend
            </span>
            {PHASES.map((phase, idx) => (
              <React.Fragment key={phase.id}>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                  <span className="mono text-[10px] text-slate-500">{phase.name}</span>
                </div>
                {idx < PHASES.length - 1 && (
                  <span className="text-slate-700 text-[10px]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-center mt-4 mono text-[10px] text-slate-600">
            Recon → Cred Access → Priv Esc → Lateral → Persist → Domain Dom.
          </p>
        </div>
      </div>
    </div>
  );
}