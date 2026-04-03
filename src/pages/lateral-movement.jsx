import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function LateralMovement() { return <PhasePage phase={getPhaseById("lateral-movement")} />; }