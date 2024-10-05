export const cleanNumArr = (arr: Array<number>) =>
  Array.from(new Set(arr.filter((a) => a !== null))).sort((a, b) => a - b);

export const addOrRemove = <T>(arr: Array<T>, item: T): Array<T> => {
  const exists = arr.includes(item);

  if (exists) {
    return arr.filter((c) => {
      return c !== item;
    });
  } else {
    return [...arr, item];
  }
};

export const arrOverlap = <T>(
  bigArr: Array<T>,
  smallArr: Array<T>
): boolean => {
  if (smallArr.length === 0) return false;
  return smallArr.some((i) => bigArr.includes(i));
};

export const arrAllIncludes = <T>(
  bigArr: Array<T>,
  smallArr: Array<T>
): boolean => {
  return smallArr.every((i) => bigArr.includes(i));
};