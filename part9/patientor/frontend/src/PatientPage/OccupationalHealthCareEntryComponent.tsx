import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}): JSX.Element => {
  return (
    <Segment>
      <div>
        {entry.date}
        <span>
          <Icon name='handshake outline' size='big' />
        </span>
      </div>
      <p>{entry.description}</p>
    </Segment>
  );
};

export default OccupationalHealthcareEntryComponent;
