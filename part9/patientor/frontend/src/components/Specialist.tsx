import React from 'react';
import { Icon } from 'semantic-ui-react';
const Specialist = ({ specialist }: { specialist: string }): JSX.Element => {
  return (
    <span style={{ display: 'flex' }}>
      <Icon name='doctor' />
      <p>{specialist} as specialist</p>
    </span>
  );
};

export default Specialist;
