import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function Reconnaissance() { return <PhasePage phase={getPhaseById("reconnaissance")} />; }