// eslint-disable-next-line import/prefer-default-export
export const throttle = (func) => {
  setTimeout(func, (Math.floor(Math.random() * 500) + 300));
};
