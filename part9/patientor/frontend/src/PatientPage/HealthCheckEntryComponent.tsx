import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import HealthCheckRatingIcon from '../components/HealthCheckRatingIcon';
import { HealthCheckEntry } from '../types';

const HealthCheckEntryComponent = ({
  entry,
}: {
  entry: HealthCheckEntry;
}): JSX.Element => {
  return (
    <Segment>
      <div>
        <h4>{entry.date}</h4>
        <span>
          <Icon name='calendar check outline' size='big' />
        </span>
      </div>
      <p>{entry.description}</p>
      <HealthCheckRatingIcon healthCheckRating={entry.healthCheckRating} />
    </Segment>
  );
};

export default HealthCheckEntryComponent;
