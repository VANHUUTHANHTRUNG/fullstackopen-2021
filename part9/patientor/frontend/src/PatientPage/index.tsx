import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Icon, Container, SegmentGroup } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry } from '../types';
import { genderToIconName } from '../utils';
import EntryComponent from './EntryComponent';

interface MatchParams {
  id: string;
}

const PatientPage = () => {
  const [{ patients }] = useStateValue();
  const match = useRouteMatch<MatchParams>('/patients/:id');
  const patient = match
    ? Object.values(patients).find((patient) => patient.id === match.params.id)
    : undefined;
  const commonInfo = patient ? (
    <div>
      {' '}
      <h3>
        {patient.name} <Icon name={genderToIconName(patient.gender)} />
      </h3>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </div>
  ) : null;

  return patient ? (
    <div>
      <Container>{commonInfo}</Container>
      {patient?.entries && patient?.entries?.length > 0 ? (
        <div>
          <h3>Entries</h3>
          <SegmentGroup>
            {patient.entries.map((entry: Entry) => (
              <EntryComponent key={entry.id} entry={entry} />
            ))}
          </SegmentGroup>
        </div>
      ) : null}
    </div>
  ) : (
    <h3>Patient not found</h3>
  );
};

export default PatientPage;
