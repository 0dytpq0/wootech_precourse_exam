const compareNumbers = (a, b) => {
  return a - b;
};

export const sortArray = (arr) => {
  return arr.sort(compareNumbers);
};
