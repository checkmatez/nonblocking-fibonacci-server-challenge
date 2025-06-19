export function* fib(n: number): Generator<number> {
  if (n <= 0) {
    yield 0;
    return;
  }

  let a = 0;
  let b = 1;

  yield a;
  if (n === 1) return;

  yield b;

  for (let i = 2; i <= n; i++) {
    const next = a + b;
    yield next;
    a = b;
    b = next;
  }
}

export async function fibonacci(n: number): Promise<number> {
  const gen = fib(n);
  let result: number = 0;
  let count = 0;

  for (const value of gen) {
    result = value;
    count++;

    // Yield to event loop every 1000 iterations to prevent blocking
    if (count % 1000 === 0) {
      await new Promise(resolve => setImmediate(resolve));
    }
    // Since this solution works very fast due to generator function having internal state
    // that works as a cache for intermediate values, you will need to uncomment
    // the following lines lines to block the event loop for testing purposes.
    // if (count >= 1000) {
    //   await new Promise(resolve => setTimeout(resolve, 100_000));
    // }
  }

  return result;
}
