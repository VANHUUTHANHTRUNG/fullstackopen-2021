import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Icon, Container } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { genderToIconName } from '../utils';
interface MatchParams {
  id: string;
}

const PatientPage = () => {
  const [{ patients }] = useStateValue();
  const match = useRouteMatch<MatchParams>('/patients/:id');
  const patient = match
    ? Object.values(patients).find((patient) => patient.id === match.params.id)
    : undefined;
  return patient ? (
    <Container>
      <h3>
        {patient.name} <Icon name={genderToIconName(patient.gender)} />
      </h3>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>DOB: {patient.dateOfBirth}</p>
      <p>Entries: {patient.entries}</p>
    </Container>
  ) : (
    <h3>Patient not found</h3>
  );
};

export default PatientPage;
