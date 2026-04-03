import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function Discovery() { return <PhasePage phase={getPhaseById("discovery")} />; }