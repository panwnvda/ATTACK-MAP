import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function Impact() { return <PhasePage phase={getPhaseById("impact")} />; }