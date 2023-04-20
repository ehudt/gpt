// server.ts
import express from 'express';

const app = express();
const port = 3000;

app.get('/tail-latency', (req, res) => {
  const randomValue = Math.random();
  const delay = randomValue < 0.5 ? 45 : 1000; // 50ms half of the time, 1000ms the other half

  setTimeout(() => {
    res.send(`Response after ${delay}ms delay`);
  }, delay);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
