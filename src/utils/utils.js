const objectFromInitialData = (arr) => {
  return arr.reduce((acc, item) => ({
    ...acc, [item.id]: item
  }), {});
};

export { objectFromInitialData };
