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

interface Rate {
  value: number;
  description: string;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rate;
  target: number;
  average: number;
}

interface Input {
  daily_exercises: Array<number>;
  target: number;
}

const parseArgumentsExercise = (args: Array<string>): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      daily_exercises: args.slice(3, args.length).map((s) => Number(s)),
      target: Number(args[2]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
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

try {
  const input: Input = parseArgumentsExercise(process.argv);
  console.log(calculateExercise(input));
} catch (error) {
  if (error instanceof Error) console.log(error.message);
}
