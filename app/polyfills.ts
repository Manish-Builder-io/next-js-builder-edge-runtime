// Polyfills for Edge Runtime compatibility
if (typeof global === 'undefined') {
  (global as any) = {};
}

if (typeof process === 'undefined') {
  (global as any).process = { env: {} };
}

// Ensure Buffer is available
if (typeof Buffer === 'undefined') {
  (global as any).Buffer = {
    from: (str: string) => {
      const bytes = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
      }
      return bytes;
    },
    alloc: (size: number) => new Uint8Array(size),
  };
}

// Ensure crypto is available
if (typeof crypto === 'undefined') {
  (global as any).crypto = {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
  };
}
