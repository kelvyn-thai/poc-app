import { createStore } from "./index";
import { getAccountState } from "./account";

export interface Organization {
  ouId: string;
}
interface OrganizationState {
  currentOrganization: Organization;
  organizations: Organization[];
  isLoading: boolean;
}
interface OrganizationActions {
  fetchOrganizations: () => Organization[];
  setCurrentOrganization: (ouId: string) => void;
  resetOrganization: () => void;
}

const initialState: OrganizationState = {
  currentOrganization: { ouId: "" },
  organizations: [],
  isLoading: false,
};

export const [
  useOrganizationStore,
  { getState: getOrganizationState, subscribe: subscribeOrganizationStore },
] = createStore<OrganizationState & OrganizationActions>(
  (set, get) => ({
    ...initialState,
    fetchOrganizations: () => {
      set({
        ...initialState,
        isLoading: true,
      });
      const { userInfo } = getAccountState();
      if (userInfo?.currentOu) {
        const organizations = [
          {
            ouId: userInfo.currentOu,
          },
        ];
        set({
          organizations,
          isLoading: false,
        });
        const { setCurrentOrganization } = get();
        setCurrentOrganization(userInfo.currentOu);
        return organizations;
      }
      set({
        isLoading: false,
      });
      throw new Error(
        "There is no organization associated to this account. Please contact the administrator."
      );
    },
    setCurrentOrganization: (ouId) => {
      const { organizations } = get();
      const currentOrganization = organizations.find(
        (item) => item.ouId === ouId
      );
      if (currentOrganization) {
        set({
          currentOrganization,
        });
      } else {
        throw new Error("Organization not found!");
      }
    },
    resetOrganization: () => {
      set(initialState);
    },
  }),
  "useOrganizationStore"
);
