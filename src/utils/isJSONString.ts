/**
 * isJSONString is a function to check a valid json string
 * reference link: https://thewebdev.info/2021/06/12/how-to-check-if-a-string-is-json-in-javascript/
 * @param jsonString - a json string
 * @returns boolean
 */
export const isJSONString = (jsonString: string) => {
  let result = true;
  try {
    JSON.parse(jsonString);
  } catch (e) {
    result = false;
  }
  return result;
};
