export const generateId = (text?: string): string => {
  const baseText = text ? text.split(" ").join("_").toLowerCase() : "";
  return `${baseText}-${new Date().getTime()}`;
};

export const generateFileName = (text?: string): string => {
  const baseText = text ? text.split(" ").join("_").toLowerCase() : "";
  return `${new Date().getTime()}-${baseText}`;
};

export const formatNumber = (num: number | string): string => {
  return Number(num).toLocaleString(undefined, { maximumFractionDigits: 0 });
};
