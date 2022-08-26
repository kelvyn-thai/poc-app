declare module "enos-app-portal-sdk" {
  export enum LanguageCode {
    ENGLISH = "en-US",
    CHINESE = "zh-CN",
  }

  export interface Menu {
    id: string;
    code: string;
    name: string;
    url: string;
    displayOrder: number;
    parentId: string;
    children: Menu[];
  }
  export interface Permission {
    id: string;
    code: string;
    name: string;
  }
  export interface AppInfo {
    id: string;
    category: {
      id: number;
      name: string;
    };
    name: string;
    status: boolean;
    permissions: Permission[];
    menus: Menu[];
  }

  export interface Organization {
    id: string;
    name: string;
  }

  export interface UserInfo {
    id: string;
    name: string;
    nickName: string;
    phoneArea: string;
    phone: string;
    email: string;
    createdTime: string;
    organization: Organization;
    accessToken: string;
  }

  export interface AppAsset {
    id: string;
    parentId: string;
    name: string;
    tag: string;
    children: AppAsset[];
  }

  class AppPortalSDK {
    public setViewMode(viewMode: number): void;
    public getAppInfo(): Promise<AppInfo>;
    public getUserInfo(): Promise<UserInfo>;
    public setPageTitle(title: string): void;
    public getLocale(): Promise<LanguageCode>;
    public getAppAssets(): Promise<AppAsset[]>;
    public logout(): Promise<void>;
    public toggleMenu(flag: boolean): Promise<void>;
    public getAvailableLocales(): Promise<LanguageCode[]>;
    public getTheme(): Promise<string>;
    public setNotificationUrl(url: string): Promise<void>;
    public setHelpUrl(url: string): Promise<void>;
    public switchPage(options: {
      appId?: string;
      appCode?: string;
      menuCode: string;
      openOnNewTab: boolean;
      state: string;
    }): boolean;
  }
  const instance: AppPortalSDK;
  export default instance;
}
