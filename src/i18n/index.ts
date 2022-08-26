import localization from "./localization/default.json";

export const useI18n = () => {
  const t = (key: string | any) => {
    const localizationObj: {
      [key: string]: string;
    } = { ...localization };
    return localizationObj[key] || key;
  };
  return t;
};
