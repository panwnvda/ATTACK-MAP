import React from "react";
import { getPhaseById } from "../components/attack/allPhases";
import PhasePage from "./PhasePage";
export default function CommandAndControl() { return <PhasePage phase={getPhaseById("command-and-control")} />; }