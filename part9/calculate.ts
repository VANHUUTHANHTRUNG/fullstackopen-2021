const Rating = [
  {
    value: 1,
    description: 'failed',
  },
  {
    value: 2,
    description: 'not bad but could be better',
  },
  {
    value: 3,
    description: 'better than expected',
  },
];

export interface Rate {
  value: number;
  description: string;
}

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rate;
  target: number;
  average: number;
}

export interface Input {
  daily_exercises: Array<number>;
  target: number;
}

const calculateBMI = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight))
    throw new Error('Mal-formatted parameters');
  const bmi: number = weight / Math.pow(height / 100, 2);
  if (bmi < 16) return 'Underweight';
  else if (bmi >= 18.5 && bmi <= 24.9) return 'Normal (healthy weight)';
  else return 'Overweight';
};
const calculateExercise = ({ daily_exercises, target }: Input): Result => {
  const average =
    daily_exercises.reduce((sum, current) => sum + current, 0) /
    daily_exercises.length;
  const finished = average / target;
  let rating;
  if (finished < 0.75) rating = Rating[0];
  else if (0.75 <= finished && finished < 1) rating = Rating[1];
  else rating = Rating[2];
  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter((hour) => hour > 0).length,
    success: average >= target,
    rating,
    target,
    average,
  };
};

const calculate = { calculateBMI, calculateExercise };

export default calculate;
