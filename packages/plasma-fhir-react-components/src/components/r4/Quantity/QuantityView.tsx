import React from "react";
import { Quantity } from "fhir/r4";
import { Resources } from "plasma-fhir-app-utils";

export interface IQuantityViewProps { quantity?: Quantity };
export default function QuantityView(props: IQuantityViewProps) {
    // Check if data is available...
    if (!props.quantity) { return <div />; }

    const display = Resources.Quantity.toString(props.quantity);
    return <span className="QuantityView_container">{display}</span>;
}