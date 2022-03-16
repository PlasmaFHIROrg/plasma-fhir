import * as r4 from "fhir/r4";
import { FamilyMemberRoleCodes } from "./FamilyMemberRoleCodes";
import { CodeableConcept, Coding, Reference } from "./FHIRResourceHelpers";


export interface FamilyMemberHistory extends r4.FamilyMemberHistory { }
export class FamilyMemberHistory {
    constructor(patientId: string, id: string, relationship: keyof typeof FamilyMemberRoleCodes | Coding) {
        this.resourceType = "FamilyMemberHistory";
        this.status = "completed";
        this.relationship = (typeof relationship === "string") 
            ? CodeableConcept.fromSingleCoding(FamilyMemberRoleCodes[relationship])
            : CodeableConcept.fromSingleCoding(relationship);
        this.patient = FamilyMemberHistory.createPatientReference(patientId);

        this.id = id;
        this.condition = [];
    }

    // Create a FamilyMemberHistory.patient value...
    private static createPatientReference(patientId: string): Reference {
        return new Reference("Patient/" + patientId);
    }
}