import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';

const HealthCheckEntryComponent = ({
  entry,
}: {
  entry: HealthCheckEntry;
}): JSX.Element => {
  return (
    <Segment>
      <div>
        {entry.date}
        <span>
          <Icon name='calendar check outline' size='big' />
        </span>
      </div>
      <p>{entry.description}</p>
    </Segment>
  );
};

export default HealthCheckEntryComponent;
