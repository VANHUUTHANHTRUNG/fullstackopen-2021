import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import Diagnosis from '../components/Diagnosis';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}): JSX.Element => {
  return (
    <Segment>
      <div>
        <h4>{entry.date}</h4>
        <span>
          <Icon name='handshake outline' size='big' />
        </span>
      </div>
      <p>{entry.description}</p>
      <Diagnosis
        diagnosisCodes={entry.diagnosisCodes}
        id={entry.id}
      ></Diagnosis>
    </Segment>
  );
};

export default OccupationalHealthcareEntryComponent;
