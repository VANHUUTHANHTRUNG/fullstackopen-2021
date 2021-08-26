import React from 'react';
import { HealthCheckRating } from '../types';
import { Icon, SemanticCOLORS } from 'semantic-ui-react';
import { assertNever } from '../utils';
const HealthCheckRatingIcon = ({
  healthCheckRating,
}: {
  healthCheckRating: HealthCheckRating;
}): JSX.Element => {
  const rateToColor = (
    healthCheckRating: HealthCheckRating
  ): SemanticCOLORS => {
    switch (healthCheckRating) {
      case HealthCheckRating.CriticalRisk:
        return 'red';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.Healthy:
        return 'green';
      default:
        return assertNever(healthCheckRating);
    }
  };
  return <Icon name='heart' color={rateToColor(healthCheckRating)} />;
};

export default HealthCheckRatingIcon;
