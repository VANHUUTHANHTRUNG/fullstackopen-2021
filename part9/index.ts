import express,{Request, Response} from 'express';
import calculateBMI from './bmiCalculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack');
});

app.get('/bmi', (req : Request, res : Response)=> {
 const {height , weight}= req.query;
 try{res.json({
   height: Number(height),
   weight: Number(weight),
   bmi: calculateBMI(Number(height), Number(weight))
 }).end();
}
 catch(error) {
   if(error instanceof Error) res.status(400).json({error : error.message}).end();
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});