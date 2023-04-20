// server.ts
import express from 'express';

const app = express();
const port = 3000;

app.get('/test', (req, res) => {
  const delay = parseInt(req.query.delay as string) || 0;
  setTimeout(() => {
    res.send(`Responding after ${delay}ms`);
  }, delay);
});

app.get('/delayed-response/:delay', (req, res) => {
  const baseDelay = parseInt(req.params.delay, 10);
  const randomDelay = Math.floor(Math.random() * 300); // Generate a random delay between 0ms and 300ms
  const totalDelay = Math.max(baseDelay + randomDelay, 0); // Ensure the total delay is non-negative

  setTimeout(() => {
    res.send(`Response after ${totalDelay}ms delay`);
  }, totalDelay);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
