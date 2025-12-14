const store: Record<string, string> = {};

const mockAsyncStorage = {
  getItem: jest.fn(async (key: string) => store[key] ?? null),
  setItem: jest.fn(async (key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: jest.fn(async (key: string) => {
    delete store[key];
  }),
  clear: jest.fn(async () => {
    Object.keys(store).forEach((key) => delete store[key]);
  }),
};

export default mockAsyncStorage;
