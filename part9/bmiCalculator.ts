interface BodyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>) : BodyValues => {
  if(args.length < 4)  throw new Error('Not enough arguments')
  if(args.length > 4)  throw new Error('Too many arguments')
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBMI = (height: number, weight: number) : void => {
  const bmi : number = weight / Math.pow(height/100, 2);
  if (bmi < 16) console.log('Underweight');
  else if (bmi >= 18.5 && bmi <= 24.9) console.log('Normal (healthy weight)');
  else console.log('Overweight');
  }

  try{
   const {height , weight} = parseArguments(process.argv)
   calculateBMI(height, weight)
  }
  catch (error) {
    console.log('Error: ', error.message)
  }