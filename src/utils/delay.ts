/* eslint-disable no-promise-executor-return */
export const delay = (ms = 2e3) =>
  new Promise((resolve) => setTimeout(resolve, ms));
