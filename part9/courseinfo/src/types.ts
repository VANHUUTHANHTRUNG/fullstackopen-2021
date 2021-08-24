interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: 'normal';
  description: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission';
  description: string;
  exerciseSubmissionLink: string;
}

interface CourseLessInfoPart extends CoursePartBase {
  type: 'lessInfo';
  description?: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: 'special';
  description: string;
  requirements: Array<string>;
}

export type CoursePart =
  | CourseLessInfoPart
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
