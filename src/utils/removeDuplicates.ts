const removeDuplicates = (arr: Array<any>) => {
  const filtered = Array.from(new Set(arr.map((a) => a.id))).map((id) => {
    return arr.find((a) => a.id === id);
  });
  return filtered;
};
export default removeDuplicates;
