import React from 'react';
import { CoursePart } from '../types';
import Course from './Course';
import { assertNever } from '../utils';
const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  const parts = courseParts.map((coursePart) => {
    switch (coursePart.type) {
      case 'normal':
        return <Course coursePart={coursePart} />;
      case 'groupProject':
        return <Course coursePart={coursePart} />;
      case 'submission':
        return <Course coursePart={coursePart} />;
      case 'lessInfo':
        return <Course coursePart={coursePart} />;
      case 'special':
        return <Course coursePart={coursePart} />;
      default:
        return assertNever(coursePart);
    }
  });
  return <div>{parts}</div>;
};

export default Content;
