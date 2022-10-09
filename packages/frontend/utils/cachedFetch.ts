const cache: Partial<Record<string, Promise<Response>>> = {};

export const cachedFetch = async (
  ...args: ConstructorParameters<typeof Request>
) => {
  const req = new Request(...args);
  if (req.method !== "GET") {
    throw new Error("cachedFetch does not support methods other than GET");
  }

  const key = req.url;
  const cached = cache[key];
  console.log('is cached??? ' + cached)
  if (cached) {
    return cached.then((res) => res.clone());
  }

  console.log("request is not cached, fetching instead...")
  const res = fetch(req);
  cache[key] = res;

  // unset cache if fetch fails
  res.catch(() => delete cache[key]);

  return res.then((res) => res.clone());
};
