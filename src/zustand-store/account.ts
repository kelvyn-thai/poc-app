import dayjs, { Dayjs } from "dayjs";
import flatten from "lodash/flatten";
import type { Menu, Permission } from "enos-app-portal-sdk";
import { UserInfo as AppPortalUserInfo } from "enos-app-portal-sdk";
import { IS_IN_APP_PORTAL } from "sdk/esb-app-portal-sdk";
import {
  TOKEN_SESSION_STORAGE_FIELD,
  USERINFO_SESSION_STORAGE_FIELD,
} from "http-request/account";
import { createStore } from "./index";

export interface UserInfo {
  idLogin: string;
  currentOu: string;
  nickname: string;
}
interface TokenInfo {
  accessToken: string;
  refreshToken?: string; // not using for now
}
export interface AccountState {
  userInfo: UserInfo | null;
  tokenInfo: TokenInfo | null;
  signedIn: boolean;
  menuList: Menu[];
  isLoading: boolean;
  isUnableToLogin: boolean;
  loginTime: Dayjs | null;
  lastScanTime: Dayjs | null;
  isSiteSpecialist: boolean;
  isCompanyManager: boolean;
  isGroupLevelManager: boolean;
  permissionList: Permission[];
}

const cachedUserInfo = IS_IN_APP_PORTAL
  ? null
  : localStorage.getItem(USERINFO_SESSION_STORAGE_FIELD);
const cachedAccessToken = IS_IN_APP_PORTAL
  ? null
  : localStorage.getItem(TOKEN_SESSION_STORAGE_FIELD);

const initialState: AccountState = {
  userInfo: cachedUserInfo ? JSON.parse(cachedUserInfo) : null,
  tokenInfo: cachedAccessToken ? { accessToken: cachedAccessToken } : null,
  signedIn: IS_IN_APP_PORTAL
    ? false
    : Boolean(
        localStorage.getItem(TOKEN_SESSION_STORAGE_FIELD) &&
          localStorage.getItem(USERINFO_SESSION_STORAGE_FIELD)
      ),
  isUnableToLogin: false,
  menuList: [],
  permissionList: [],
  isSiteSpecialist: false,
  isCompanyManager: false,
  isGroupLevelManager: false,
  isLoading: false,
  loginTime: null,
  lastScanTime: null, // lastScanTime for determining alert notification display
};

interface AccountActions {
  login(user: AppPortalUserInfo): Promise<
    Partial<TokenInfo> & {
      userInfo: UserInfo | null;
    }
  >;
  setMenuList(menuList: Menu[]): void;
  setLastScanTime(lastScanTime: Dayjs): Promise<void>;
  setPermissionList(permissionList: Permission[]): Promise<void>;
}

export const [
  useAccountStore,
  { getState: getAccountState, subscribe: subscribeAccountStore },
] = createStore<AccountState & AccountActions>(
  (set, get) => ({
    ...initialState,
    setMenuList: (menuList) => {
      set({
        menuList: flatten(
          menuList.map((items) =>
            items.children.length > 0 ? items.children : items
          )
        ),
      });
    },
    setPermissionList: async (permissionList) => {
      const permissionsObj: { [key: string]: boolean } = {};

      permissionList.forEach((permission) => {
        permissionsObj[permission.code] = true;
      });

      set({
        permissionList,
        isSiteSpecialist:
          permissionsObj.statechange_rqt_creation &&
          permissionsObj.statechange_rqt_owner_save &&
          permissionsObj.statechange_rqt_owner_edit &&
          permissionsObj.statechange_rqt_owner_submit &&
          permissionsObj.statechange_rqt_owner_delete &&
          permissionsObj.statechange_rqt_owner_view,
        isCompanyManager:
          permissionsObj.statechange_rqt_view &&
          permissionsObj.record_view &&
          !permissionsObj.statechange_rqt_approval,
        isGroupLevelManager:
          permissionsObj.statechange_rqt_edit &&
          permissionsObj.statechange_rqt_delete &&
          permissionsObj.statechange_rqt_view &&
          permissionsObj.statechange_rqt_approval &&
          permissionsObj.record_view &&
          permissionsObj.record_edit &&
          permissionsObj.record_delete &&
          permissionsObj.table_col_display_modification,
      });
    },
    login: async (user) => {
      const { signedIn } = get();
      if (!signedIn) {
        set({
          ...initialState,
          isLoading: true,
          isUnableToLogin: false,
        });
        try {
          const userInfo = {
            ...user,
            currentOu: user.organization.id,
            nickname: user.nickName ?? user.name,
            idLogin: user.id,
          };
          const tokenInfo = {
            accessToken: user.accessToken,
          };
          localStorage.setItem(
            USERINFO_SESSION_STORAGE_FIELD,
            JSON.stringify(userInfo)
          );
          localStorage.setItem(
            TOKEN_SESSION_STORAGE_FIELD,
            tokenInfo.accessToken
          );
          set({
            userInfo,
            tokenInfo,
            signedIn: true,
            isLoading: false,
            loginTime: dayjs(),
            lastScanTime: dayjs(),
          });
          return {
            ...tokenInfo,
            userInfo,
          };
        } catch (ex) {
          set({
            isLoading: false,
            isUnableToLogin: true,
          });
          throw ex;
        }
      }
      const { userInfo, tokenInfo } = get();
      return {
        ...tokenInfo,
        userInfo,
      };
    },
    setLastScanTime: async (lastScanTime) => {
      set({ lastScanTime });
    },
  }),
  "useAccountStore"
);
