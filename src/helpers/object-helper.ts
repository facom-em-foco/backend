export const removeUndefinedProps = (obj: any) => {
  const cleanedObj: any = {};

  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) {
      cleanedObj[key] = obj[key];
    }
  });

  return cleanedObj;
};
