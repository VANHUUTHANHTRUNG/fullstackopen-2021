import React from 'react';
import { Entry } from '../types';
import { assertNever } from '../utils';
import HealthCheckEntryComponent from './HealthCheckEntryComponent';
import HospitalEntryComponent from './HospitalEntryComponent';
import OccupationalHealthcareEntryComponent from './OccupationalHealthCareEntryComponent';

const EntryComponent = ({ entry }: { entry: Entry }): JSX.Element => {
  const component = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckEntryComponent entry={entry} />;
      case 'Hospital':
        return <HospitalEntryComponent entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryComponent entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
  return <div>{component()}</div>;
};

export default EntryComponent;
