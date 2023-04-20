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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
