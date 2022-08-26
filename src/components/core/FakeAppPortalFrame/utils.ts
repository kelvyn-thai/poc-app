import type { Menu } from "enos-app-portal-sdk";

export const processAppPortalUrlToLocalDevUrl = (url: string) => {
  const appPortalUrlRegExp = /\/poc-availability-mgmt\/#(.+)/;
  const group = appPortalUrlRegExp.exec(url);
  if (group === null) {
    return "";
  }
  const [, featureUrl] = group;
  return `/${featureUrl}`;
};

export const filterOutNonLocalAppMenus = (menus: Menu[]) =>
  menus
    .map((menu) => ({
      ...menu,
      children: menu.children.filter((item) =>
        item.url.startsWith("/poc-availability-mgmt/")
      ),
    }))
    .filter((menu) => menu.children.length > 0);
