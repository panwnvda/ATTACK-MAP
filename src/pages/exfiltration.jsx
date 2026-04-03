import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function Exfiltration() { return <PhasePage phase={getPhaseById("exfiltration")} />; }