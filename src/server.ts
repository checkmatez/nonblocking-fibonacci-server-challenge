import { createServer } from 'node:http';
import { fibonacciAsync } from './fibonacci';

const PORT = 3000;

export const server = createServer((req, res) => {
  const match = req.url?.match(/^\/(\d+)$/);
  const position = match ? parseInt(match[1]) : NaN;

  if (isNaN(position) || position < 0) {
    return res
      .writeHead(400, { 'Content-Type': 'text/plain' })
      .end('Invalid Fibonacci position');
  }
  console.log('🚀 ~ server ~ position:', position);
  fibonacciAsync(position, result => {
    console.log('🚀 ~ server ~ result:', result);
    res
      .writeHead(200, { 'Content-Type': 'text/plain' })
      .end(`Fibonacci number at position ${position} is ${result}\n`);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
