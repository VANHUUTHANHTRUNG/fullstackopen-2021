import React from 'react';
import { Header } from 'semantic-ui-react';
import { SickLeave } from '../types';

const SickLeaveComponent = ({
  sickLeave,
}: {
  sickLeave: SickLeave | undefined;
}): JSX.Element => {
  const component = sickLeave ? (
    <div>
      <Header>Sick leave</Header>
      <p>Start date: {sickLeave.startDate}</p>
      <p>End date: {sickLeave.endDate}</p>
    </div>
  ) : (
    <div></div>
  );
  return component;
};

export default SickLeaveComponent;
