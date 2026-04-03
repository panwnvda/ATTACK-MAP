/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Evasion from './pages/Evasion';
import Home from './pages/Home';
import Overview from './pages/Overview';
import PhasePage from './pages/PhasePage';
import collection from './pages/collection';
import commandAndControl from './pages/command-and-control';
import credentialAccess from './pages/credential-access';
import defenseEvasion from './pages/defense-evasion';
import discovery from './pages/discovery';
import execution from './pages/execution';
import exfiltration from './pages/exfiltration';
import impact from './pages/impact';
import initialAccess from './pages/initial-access';
import lateralMovement from './pages/lateral-movement';
import persistence from './pages/persistence';
import privilegeEscalation from './pages/privilege-escalation';
import reconnaissance from './pages/reconnaissance';
import resourceDevelopment from './pages/resource-development';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Evasion": Evasion,
    "Home": Home,
    "Overview": Overview,
    "PhasePage": PhasePage,
    "collection": collection,
    "command-and-control": commandAndControl,
    "credential-access": credentialAccess,
    "defense-evasion": defenseEvasion,
    "discovery": discovery,
    "execution": execution,
    "exfiltration": exfiltration,
    "impact": impact,
    "initial-access": initialAccess,
    "lateral-movement": lateralMovement,
    "persistence": persistence,
    "privilege-escalation": privilegeEscalation,
    "reconnaissance": reconnaissance,
    "resource-development": resourceDevelopment,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};