import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function PrivilegeEscalation() { return <PhasePage phase={getPhaseById("privilege-escalation")} />; }