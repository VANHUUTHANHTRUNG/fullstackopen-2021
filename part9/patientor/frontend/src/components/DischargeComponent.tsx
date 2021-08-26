import React from 'react';
import { Header } from 'semantic-ui-react';
import { Discharge } from '../types';

const DischargeComponent = ({
  discharge,
}: {
  discharge: Discharge | undefined;
}): JSX.Element => {
  return discharge ? (
    <div>
      <Header>Discharge</Header>
      <p> {discharge.date} </p>
      <p>{discharge.criteria}</p>
    </div>
  ) : (
    <div></div>
  );
};
export default DischargeComponent;
