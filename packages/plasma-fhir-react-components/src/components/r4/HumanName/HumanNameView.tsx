import React from 'react';
import { HumanName } from 'fhir/r4';
import { Resources } from "plasma-fhir-app-utils";

export interface IHumanNameViewProps { humanName?: HumanName };
export function HumanNameView(props: IHumanNameViewProps) {
    // Check if data is available...
    if (!props.humanName) { return <div />; }

    return (
        <div className="HumanNameView_container">
            <span className="HumanNameView_formattedName">{formatName(props.humanName)}</span>
        </div>
    );
}

function formatName(name?: HumanName): string {
    // Check if name exists...
    if (!name) { return "Unknown"; }
    return Resources.HumanName.toString(name);
}

export default HumanNameView;