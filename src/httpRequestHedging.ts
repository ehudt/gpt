// httpRequestHedging.ts
import fetch, { RequestInit, Response } from 'node-fetch';

export class HttpRequestHedging {
  private static readonly HEDGING_TIMEOUT = 50;
  private static readonly HEDGING_COUNT = 3;

  public static async fetchWithHedging(uri: string, options?: RequestInit): Promise<Response> {
    const abortControllers: AbortController[] = [];

    const sendRequest = async (signal: AbortSignal, index: number): Promise<Response> => {
      const response = await fetch(uri, { ...options, signal });
      console.log(`Request ${index} finished.`);
      return response;
    };

    const createDelayedRequest = (delay: number, index: number): Promise<Response> =>
      new Promise(async (resolve, reject) => {
        const controller = new AbortController();
        abortControllers.push(controller);

        setTimeout(async () => {
          try {
            const response = await sendRequest(controller.signal, index);
            resolve(response);
          } catch (err) {
            reject(err);
          }
        }, delay);
      });

    const requestPromises: Promise<Response>[] = [];
    for (let i = 0; i < HttpRequestHedging.HEDGING_COUNT; i++) {
      const delay = i === 0 ? 0 : HttpRequestHedging.HEDGING_TIMEOUT;
      requestPromises.push(createDelayedRequest(delay, i));
    }

    const firstResponse = await Promise.race(requestPromises);
    console.log('First response received.');

    // Abort ongoing requests
    for (const controller of abortControllers) {
      controller.abort();
    }

    return firstResponse;
  }
}
