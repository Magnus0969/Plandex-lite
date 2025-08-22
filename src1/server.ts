import express from 'express';
import { config } from './config';

const app = express();
const port = config.PORT;

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
