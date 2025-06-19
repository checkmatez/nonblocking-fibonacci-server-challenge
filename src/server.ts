import { createServer } from 'node:http';
import { fibonacci } from './fibonacci';

const PORT = 3000;

// GET /12  -> 144

export const server = createServer(async (req, res) => {
  const match = req.url?.match(/^\/(\d+)$/);
  const position = match ? parseInt(match[1]) : NaN;

  if (isNaN(position) || position < 0) {
    return res
      .writeHead(400, { 'Content-Type': 'text/plain' })
      .end('Invalid Fibonacci position');
  }

  const result = await fibonacci(position);

  res
    .writeHead(200, { 'Content-Type': 'text/plain' })
    .end(`Fibonacci number at position ${position} is ${result}\n`);
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
