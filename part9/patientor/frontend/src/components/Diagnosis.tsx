import React from 'react';
import { Segment, SegmentGroup, Header } from 'semantic-ui-react';
import { Diagnose } from '../../../backend/src/types';
import { useStateValue } from '../state';

const Diagnosis = ({
  diagnosisCodes,
  id,
}: {
  diagnosisCodes: Array<Diagnose['code']> | undefined;
  id: string;
}): JSX.Element => {
  const [{ diagnosis }] = useStateValue();
  const matchDiagnosis = diagnosisCodes?.reduce(
    (result: Diagnose[], currentCode: string) => {
      const currentFound = diagnosis.find((d) => d.code === currentCode);
      return currentFound ? [...result, currentFound] : result;
    },
    []
  );
  return diagnosisCodes?.length !== 0 ? (
    <div>
      <Header>Diagnosis</Header>
      <SegmentGroup>
        {matchDiagnosis?.map((m) => (
          <Segment key={`${m.code}-${id}`}>
            <p>Diagnosis code: {m.code}</p>
            <p>Name: {m.name}</p>
            <p>Latin: {m.latin ? m.latin : 'not available'}</p>
          </Segment>
        ))}
      </SegmentGroup>
    </div>
  ) : (
    <p>No diagnosis available</p>
  );
};

export default Diagnosis;
