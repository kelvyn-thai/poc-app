type Cache = {
  data: any;
  timeCreated: number;
  timeUpdated?: number;
};

const cache: {
  [key: string]: Cache;
} = {};

type Option = {
  expireTime: number; // default 5s
};

export const cachePromise = async (
  key: string,
  promiseFnc: () => Promise<any>,
  options?: Option
) => {
  const { expireTime = 5e6 } = options || {};
  const now = new Date().getTime();
  const cacheData = cache[key];
  if (cacheData) {
    const { data, timeCreated } = cacheData;
    const isExpired = now - timeCreated > expireTime;
    if (isExpired) {
      delete cache[key];
    } else {
      return data;
    }
  }
  const data = await promiseFnc();
  cache[key] = {
    data,
    timeCreated: now,
  };
  return data;
};
