/* eslint-disable no-console */
import appPortalSDK, { AppInfo, UserInfo } from "enos-app-portal-sdk";
import { createBareSubscription } from "./bare-subscription";

export const LOCAL_CRED_USERINFO = "ESB_APP_PORTAL_LOCAL_CRED_USERINFO";
export const LOCAL_CRED_APPINFO = "ESB_APP_PORTAL_LOCAL_CRED_APPINFO";

export const IS_IN_APP_PORTAL = window.location !== window.parent.location;

const IS_RUNNING_IN_SIMULATOR =
  process.env.APP_PORTAL_SIMULATOR && !IS_IN_APP_PORTAL;

let simulatorSidebarToggle = true;

const [_subscribeSidebarToggle, notifySidebarToggle] = createBareSubscription(
  () => simulatorSidebarToggle
);

export const subscribeSimulatorSidebarToggle = _subscribeSidebarToggle;

export function setViewMode(viewMode: number) {
  if (IS_RUNNING_IN_SIMULATOR) {
    return Promise.resolve();
  }
  return appPortalSDK.setViewMode(viewMode);
}

export async function getAppInfo() {
  if (IS_RUNNING_IN_SIMULATOR) {
    try {
      const appInfo = localStorage.getItem(LOCAL_CRED_APPINFO);

      if (appInfo) {
        const obj = JSON.parse(appInfo);
        return obj as AppInfo;
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  const appInfo = await appPortalSDK.getAppInfo();
  if (process.env.APP_PORTAL_SIMULATOR && IS_IN_APP_PORTAL) {
    localStorage.setItem(LOCAL_CRED_APPINFO, JSON.stringify(appInfo));
  }
  return appInfo;
}

export async function getUserInfo() {
  if (IS_RUNNING_IN_SIMULATOR) {
    try {
      const userInfo = localStorage.getItem(LOCAL_CRED_USERINFO);
      if (userInfo) {
        const obj = JSON.parse(userInfo);
        return obj as UserInfo;
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  const userInfo = await appPortalSDK.getUserInfo();
  if (process.env.APP_PORTAL_SIMULATOR && IS_IN_APP_PORTAL) {
    localStorage.setItem(LOCAL_CRED_USERINFO, JSON.stringify(userInfo));
  }
  return userInfo;
}

export function setPageTitle(title: string) {
  return appPortalSDK.setPageTitle(title);
}

export function getLocale() {
  return appPortalSDK.getLocale();
}

export function getAvailableLocales() {
  return appPortalSDK.getAvailableLocales();
}

export function switchPage(options: {
  appId?: string;
  appCode?: string;
  menuCode: string;
  openOnNewTab: boolean;
  state: string;
}) {
  return appPortalSDK.switchPage(options);
}

export function toggleMenu(flag: boolean) {
  if (IS_RUNNING_IN_SIMULATOR) {
    simulatorSidebarToggle = flag;
    notifySidebarToggle();
  }
  return appPortalSDK.toggleMenu(flag);
}
