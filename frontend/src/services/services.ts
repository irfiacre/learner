import Redis from "ioredis";

const redis = new Redis();

export const getGeneratedCourses = async () => {
  const cachedData = await redis.get("courses");
  if (cachedData === null) {
    return [];
  }
  return JSON.parse(cachedData);
};
