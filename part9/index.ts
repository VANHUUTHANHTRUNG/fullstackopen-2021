import express, { Request, Response } from 'express';
const app = express();
import calculate, { Input, Result } from './calculate';

interface CustomRequest<T> extends Request {
  body: T;
}

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;
  try {
    return res
      .json({
        height: Number(height),
        weight: Number(weight),
        bmi: calculate.calculateBMI(Number(height), Number(weight)),
      })
      .end();
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message }).end();
  }
});

app.post('/exercises', (req: CustomRequest<Input>, res: Response) => {
  if (req.params === undefined)
    return res.status(400).json({ error: 'parameters missing' });
  try {
    const { daily_exercises, target }: Input = req.body;
    const result: Result = calculate.calculateExercise({
      daily_exercises,
      target,
    });
    return res.status(200).json(result).end();
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
