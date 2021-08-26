import React from 'react';
import { Icon, Segment, SegmentGroup } from 'semantic-ui-react';
import Diagnosis from '../components/Diagnosis';
import DischargeComponent from '../components/DischargeComponent';
import { HospitalEntry } from '../types';

const HospitalEntryComponent = ({
  entry,
}: {
  entry: HospitalEntry;
}): JSX.Element => {
  return (
    <Segment>
      <div>
        <h4>{entry.date}</h4>
        <span>
          <Icon name='hospital' size='big' />
        </span>
      </div>
      <p>{entry.description}</p>
      <SegmentGroup>
        <Segment>
          <Diagnosis diagnosisCodes={entry.diagnosisCodes} id={entry.id} />
        </Segment>
        <Segment>
          <DischargeComponent discharge={entry.discharge} />
        </Segment>
      </SegmentGroup>
    </Segment>
  );
};

export default HospitalEntryComponent;
