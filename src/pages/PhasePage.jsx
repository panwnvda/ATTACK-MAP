import React from "react";
import { motion } from "framer-motion";
import PhaseHero from "../components/attack/PhaseHero";
// Uses allPhases data via getPhaseById
import TechniqueMap from "../components/attack/TechniqueMap";
import TechniqueCard from "../components/attack/TechniqueCard";
import useStepProgress from "../components/attack/useStepProgress";

export default function PhasePage({ phase }) {
  const { completedSteps, toggleStep } = useStepProgress();

  if (!phase) return null;

  return (
    <div className="min-h-screen">
      <PhaseHero phase={phase} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar map */}
          <motion.div
            className="lg:sticky lg:top-20 lg:self-start shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TechniqueMap phase={phase} />
          </motion.div>

          {/* Technique detail cards */}
          <div className="flex-1 space-y-6 min-w-0">
            {phase.techniques.map((tech, idx) => (
              <motion.div
                key={tech.name}
                id={tech.name.replace(/\s+/g, "-").toLowerCase()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <TechniqueCard
                  technique={tech}
                  color={phase.color}
                  phaseId={phase.id}
                  completedSteps={completedSteps}
                  onToggleStep={toggleStep}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}