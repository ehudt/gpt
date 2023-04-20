// main.ts
import { HttpRequestHedging } from './request-hedging';

async function main() {
  try {
    const response = await HttpRequestHedging.fetchWithHedging('http://localhost:3000/test?delay=100');
    const body = await response.text();
    console.log('Response:', body);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
