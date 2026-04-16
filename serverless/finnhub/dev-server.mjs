import { createServer } from 'node:http';
import {
  handleFinnhubProxyRequest,
  readFinnhubProxyConfig,
} from './shared.mjs';

const config = readFinnhubProxyConfig(process.env);

const server = createServer(async (request, response) => {
  const origin = typeof request.headers.origin === 'string' ? request.headers.origin : '';
  const hostHeader =
    typeof request.headers.host === 'string'
      ? request.headers.host
      : `${config.host}:${config.port}`;
  const absoluteUrl = new URL(request.url || '/', `http://${hostHeader}`).toString();

  try {
    const proxyResponse = await handleFinnhubProxyRequest({
      method: request.method || 'GET',
      url: absoluteUrl,
      origin,
      env: process.env,
      fetchImpl: globalThis.fetch,
    });

    response.writeHead(proxyResponse.status, proxyResponse.headers);
    response.end(proxyResponse.body);
  } catch (error) {
    response.writeHead(500, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    });
    response.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unexpected Finnhub proxy failure.',
      })
    );
  }
});

server.listen(config.port, config.host, () => {
  console.log(
    `[finnhub-proxy] listening on http://${config.host}:${config.port} | key=${config.apiKey ? 'configured' : 'missing'}`
  );
});
