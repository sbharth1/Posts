import  app  from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
console.log(PORT,'---port')

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
