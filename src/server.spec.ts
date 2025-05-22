import { afterAll, beforeAll, expect, it } from '@jest/globals';
import { server } from './server';

const PORT = 3000;

const throwIfNotOk = (res: Response) => {
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res;
};

beforeAll(() => {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

afterAll(() => {
  server.close(() => {
    console.log('Server closed');
  });
});

it('returns 200 for consequent requests', async () => {
  const res = await fetch('http://localhost:3000/5').then(throwIfNotOk);
  expect(res.status).toBe(200);
  expect(await res.text()).toBe('Fibonacci number at position 5 is 5\n');

  const res2 = await fetch('http://localhost:3000/10').then(throwIfNotOk);
  expect(res2.status).toBe(200);
  expect(await res2.text()).toBe('Fibonacci number at position 10 is 55\n');
});

it('one user should not block others', async () => {
  const ac = new AbortController();
  fetch('http://localhost:3000/100', { signal: ac.signal }).then(throwIfNotOk);

  await new Promise(resolve => setTimeout(resolve, 100));

  const response = await fetch('http://localhost:3000/10', {}).then(
    throwIfNotOk,
  );
  expect(await response.text()).toBe('Fibonacci number at position 10 is 55\n');

  ac.abort();
});
