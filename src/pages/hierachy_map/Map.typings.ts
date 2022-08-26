export type AlertsAndTickets = {
  ou: string;
  createdBy: number;
  createdAt: number;
  id: number;
  lastChangedBy: number;
  lastChangedAt: number;
  discarded: boolean;
  discardedAt: number;
  country: string;
  alerts: number;
  tickets: number;
  tickets_display_name: string;
  alerts_display_name: string;
};

export type EnergyRanking = {
  country: string;
  createdAt: number;
  createdBy: string;
  discarded: true;
  discardedAt: number;
  buildingname: string;
  energy: number;
  energy_density: number;
  id: number;
  lastChangedAt: number;
  lastChangedBy: string;
  ou: string;
};

export type EnergyRankingResponse = {
  code: number;
  message: string;
  data: EnergyRanking[];
};

export type EnergyDensityRanking = {
  [key: string]: number;
};

export type APIResponse = {
  code: number;
  message: string;
  [key: string]: any;
};

export type General = {
  total_floor_area: number;
  total_assets: number;
  YTD_energy: number;
  energy_density: number;
};

export type GeneralResponse = {
  data: General;
} & APIResponse;

export type GeojsonMapOfACountryResponse = {
  data: string;
} & APIResponse;

export type GeojsonMapPropertyListOfACountryResponse = {
  data: string;
} & APIResponse;

export type Region = {
  ou: string | any;
  createdBy: string | number | any;
  createdAt: string | number | any;
  id: number;
  lastChangedBy: string | number | any;
  lastChangedAt: string | number | any;
  discarded: false;
  discardedAt: string | number | any;
  country: string;
  regionname: string;
  map_properties: string;
  buildings: number;
  floor_area: number;
  energy_densisty_YTD: number;
  active_alerts: number;
  open_tickets: number;
  energy_consumption: number;
  coordinates: string[];
  energy_densisty_YTD_formatted?: string;
  energy_consumption_formatted?: string;
  active_alerts_formatted?: string;
  open_tickets_formatted?: string;
  floor_area_formatted?: string;
  buildings_formatted?: string;
};

export type RegionResponse = {
  data: Region;
} & APIResponse;

export type AlertsAndTicketsResponse = {
  data: AlertsAndTickets;
  code: number;
  message: {
    "Total Active Tickets": number;
    "Total Active Alerts": number;
  };
};

export type EnergyConsumption = {
  country: string;
  regionname: string;
  energyconsumption: number;
};

export type EnergyConsumptionResponse = {
  data: EnergyConsumption[];
} & APIResponse;

export type EnergyDensityRankingResponse = {
  data: EnergyRanking;
} & APIResponse;

export type ListCountryResponse = {
  data: string[];
} & APIResponse;

export type RegionListResponse = {
  data: string[];
} & APIResponse;

export type MapProperty = {
  id: string | number | any;
  name: string;
  mapProperties: any;
};

export type Country = {
  id: number;
  country: string;
  actived: boolean | null;
};

export type CountryStatusListResponse = {
  data: Country[];
} & APIResponse;

export type GeojsonPropertyList = {
  countryId: number;
  propertyList: string[];
};

export type EnergyConsumptionUnit =
  | "baseWatt"
  | "kgWatt"
  | "megaWatt"
  | "gigaWatt";

export type EnergyConsumptionItem = {
  value: number;
  unit: EnergyConsumptionUnit;
};

export type RegionProperty =
  | "regionname"
  | "map_properties"
  | "energy_consumption"
  | "energy_densisty_YTD"
  | "open_tickets"
  | "active_alerts"
  | "buildings"
  | "floor_area"
  | "time";

export type EnergyRankingProperty =
  | "buildingname"
  | "energy"
  | "energy_density";

export type AlertsAndTicketsProperty =
  | "alerts"
  | "alerts_display_name"
  | "tickets"
  | "tickets_display_name"
  | "display_name";
