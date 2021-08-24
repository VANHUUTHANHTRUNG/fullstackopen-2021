import React from 'react';
import { CoursePart } from '../types';

const Course = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  if (coursePart.type === 'normal')
    return (
      <div>
        <p>
          {' '}
          <b>{coursePart.name}</b>{' '}
        </p>
        <p>
          <i>{coursePart.description}</i>
        </p>
      </div>
    );
  else if (coursePart.type === 'groupProject')
    return (
      <div>
        <p>
          {' '}
          <b>{coursePart.name}</b>{' '}
        </p>
        <p>project exercises {coursePart.exerciseCount}</p>
      </div>
    );
  else if (coursePart.type === 'submission')
    return (
      <div>
        <p>
          {' '}
          <b>{coursePart.name}</b>{' '}
        </p>
        <p>submiss to {coursePart.exerciseSubmissionLink}</p>
      </div>
    );
  else if (coursePart.type === 'lessInfo')
    return (
      <div>
        <p>
          {' '}
          <b>{coursePart.name}</b>{' '}
        </p>
        <p>
          <i>{coursePart.description ? coursePart.description : null}</i>
        </p>
      </div>
    );
  else if (coursePart.type === 'special') {
    return (
      <div>
        <p>
          {' '}
          <b>{coursePart.name}</b>{' '}
        </p>
        <p>
          <i>{coursePart.description}</i>
        </p>
        <p>required skills: {coursePart.requirements.join()}</p>
      </div>
    );
  }
  return <div></div>;
};

export default Course;
