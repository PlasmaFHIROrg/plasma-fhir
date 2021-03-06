import React from 'react';
import { useLocation } from 'react-router-dom';
import { FHIRClientLauncher } from "plasma-fhir-react-client-context";
import config from "../config/config";

interface ILocationState {
  endpoint?: string;
  version?: string;
  authParams?: any;
}

function LaunchScreen() {
  const location = useLocation();
  const locationState = location.state as ILocationState;

  // Element to show while authorization is getting ready...
  const defaultElement = (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-6 relative overflow-hidden sm:py-12">
        <h1 className="text-3xl font-bold text-center pt-8">Loading...</h1>
    </div>
  );

  return (
    <FHIRClientLauncher 
      authParams={locationState.authParams}
      defaultElement={defaultElement}
    />
  );
}

export default LaunchScreen;
