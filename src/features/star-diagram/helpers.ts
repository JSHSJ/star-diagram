export const isCool = true;

export const createSegmentId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
