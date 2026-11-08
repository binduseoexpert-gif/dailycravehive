type Entry<T> = { expires: number; value: T };

const stores = new Map<string, Map<string, Entry<unknown>>>();

// Short in-process cache so a warm Fluid instance does not repeat GitHub fan-out.
export function ttlDelete(bucket: string, key?: string) {
  const store = stores.get(bucket);
  if (!store) return;
  if (key === undefined) store.clear();
  else store.delete(key);
}

export async function ttlCache<T>(bucket: string, key: string, ttlMs: number, load: () => Promise<T>): Promise<T> {
  let store = stores.get(bucket);
  if (!store) {
    store = new Map();
    stores.set(bucket, store);
  }
  const hit = store.get(key) as Entry<T> | undefined;
  if (hit && hit.expires > Date.now()) return hit.value;
  const value = await load();
  store.set(key, { expires: Date.now() + ttlMs, value });
  return value;
}
