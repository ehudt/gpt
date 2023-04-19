// httpRequestHedging.ts
export class HttpRequestHedging {
  private static readonly HEDGING_TIMEOUT = 50;
  private static readonly HEDGING_COUNT = 3;

  public static async fetchWithHedging(uri: string, options?: RequestInit): Promise<Response> {
    const requestPromises: Promise<Response>[] = [];

    const requestWrapper = (resolve: (response: Response) => void, reject: (reason: any) => void) => {
      fetch(uri, options)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    };

    return new Promise((resolve, reject) => {
      const firstPromise = new Promise(requestWrapper);
      requestPromises.push(firstPromise);

      const hedgingTimeout = setTimeout(() => {
        if (requestPromises.length < HttpRequestHedging.HEDGING_COUNT) {
          for (let i = requestPromises.length; i < HttpRequestHedging.HEDGING_COUNT; i++) {
            requestPromises.push(new Promise(requestWrapper));
          }
        }
      }, HttpRequestHedging.HEDGING_TIMEOUT);

      firstPromise
        .then(response => {
          clearTimeout(hedgingTimeout);
          resolve(response);
        })
        .catch(err => {
          clearTimeout(hedgingTimeout);
          reject(err);
        });

      Promise.race(requestPromises)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
    
// main.ts
import { HttpRequestHedging } from './httpRequestHedging';

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
