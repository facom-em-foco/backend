export const splitBy = (data: string, splitter: string) => {
  return data ? data.replace(/\s/g, '').split(splitter) : [];
};
