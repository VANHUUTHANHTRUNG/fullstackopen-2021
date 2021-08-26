import { Gender } from './types';
import { SemanticICONS } from 'semantic-ui-react';

export const genderToIconName = (gender: Gender): SemanticICONS => {
  switch (gender) {
    case 'male':
      return 'man';
    case 'female':
      return 'woman';
    default:
      return 'other gender';
  }
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
