import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function ResourceDevelopment() { return <PhasePage phase={getPhaseById("resource-development")} />; }