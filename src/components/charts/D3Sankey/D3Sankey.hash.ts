export const hashSankey: { [sankeyId: string]: any } = {};

export const removeSankey = (sankeyId: string) => {
  if (hashSankey[sankeyId]) {
    delete hashSankey[sankeyId];
  }
};
