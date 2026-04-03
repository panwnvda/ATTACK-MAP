import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function DefenseEvasion() { return <PhasePage phase={getPhaseById("defense-evasion")} />; }