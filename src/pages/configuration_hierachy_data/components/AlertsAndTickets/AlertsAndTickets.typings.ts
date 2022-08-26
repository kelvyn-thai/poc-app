import { AlertsAndTickets } from "pages/hierachy_map";

export type ModalOperation = {
  isVisible: boolean;
  isCreate: boolean;
  resource?: AlertsAndTickets;
};
