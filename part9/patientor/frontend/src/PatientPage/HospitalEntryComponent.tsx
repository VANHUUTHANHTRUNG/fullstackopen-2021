import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const HospitalEntryComponent = ({
  entry,
}: {
  entry: HospitalEntry;
}): JSX.Element => {
  return (
    <Segment>
      <div>
        {entry.date}
        <span>
          <Icon name='hospital' size='big' />
        </span>
      </div>
      <p>{entry.description}</p>
    </Segment>
  );
};

export default HospitalEntryComponent;
