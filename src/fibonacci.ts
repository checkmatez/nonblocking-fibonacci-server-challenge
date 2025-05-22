export function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function fibonacciAsync(n: number, callback: (res: number) => void) {
  if (n <= 0) return callback(0);
  if (n === 1) return callback(1);

  setImmediate(() => {
    fibonacciAsync(n - 1, a => {
      setImmediate(() => {
        fibonacciAsync(n - 2, b => {
          callback(a + b);
        });
      });
    });
  });
}
