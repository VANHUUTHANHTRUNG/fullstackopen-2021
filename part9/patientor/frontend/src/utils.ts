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
