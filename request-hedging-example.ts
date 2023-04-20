// main.ts
import { HttpRequestHedging } from './request-hedging';

async function main() {
  try {
    const response = await HttpRequestHedging.fetchWithHedging('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
  }
}

main();
