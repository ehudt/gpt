// main.ts
import { HttpRequestHedging } from './httpRequestHedging.js';

async function main() {
  try {
    const response = await HttpRequestHedging.fetchWithHedging('http://localhost:3000/tail-latency');
    const body = await response.text();
    console.log('Response:', body);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
