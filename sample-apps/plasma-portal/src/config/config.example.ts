/**
 * This config file contains the API keys for various platforms.
 * 
 * Since this app is also deployed on plasmafhir.com, and because there's a redirect URL,
 * we have a switch to determine whether we're running in local or production mode.
 */

// VERSION...
const appVersion = "";

// TESTING MODE...
let mode = "LOCAL";
//let mode = "PRODUCTION";

// URL configurations based on mode...
const baseUrl = (mode === "LOCAL") ? "https://localhost:3000" : "https://plasmafhir.com/portal";
const routerBasename = (mode === "LOCAL") ? "" : "/portal";

export { mode, routerBasename, appVersion };
export default {    

    // SMART-on-FHIR
    "SMART": { },

    // Epic (Patient-Context, Sandbox)
    "EPIC_PATIENT_SANDBOX": { },

    // Epic (Patient Context, Production, DSTU2)
    "EPIC_PATIENT_DSTU2": { },

    // Epic (Patient Context, Production, R4)
    "EPIC_PATIENT_R4": { },

    // Cerner (R4)
    "CERNER_PATIENT_R4": { },
}