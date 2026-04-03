import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function Execution() { return <PhasePage phase={getPhaseById("execution")} />; }