import {
  RegionProperty,
  EnergyRankingProperty,
  AlertsAndTicketsProperty,
} from "./Map.typings";

export const REGION_NAME = "regionname";
export const REGION_COORDINATES = "map_properties";
export const REGION_ENERGY_CONSUMPTION = "energy_consumption";
export const REGION_ENERGY_DENSITY_CONSUMPTION = "energy_densisty_YTD";
export const REGION_OPEN_TICKETS = "open_tickets";
export const REGION_ALERT_TICKETS = "active_alerts";
export const REGION_BUILDINGS = "buildings";
export const REGION_FLOOR_AREA = "floor_area";
export const REGION_TIME = "time";

export const REGION_RECORD_COLUMN: {
  [key in RegionProperty]: string;
} = {
  [REGION_NAME]: "Region",
  [REGION_COORDINATES]: "Coordinates",
  [REGION_ENERGY_CONSUMPTION]: "Energy Consumption",
  [REGION_ENERGY_DENSITY_CONSUMPTION]: "Energy Density Consumption",
  [REGION_OPEN_TICKETS]: "Open tickets",
  [REGION_ALERT_TICKETS]: "Alert Tickets",
  [REGION_BUILDINGS]: "Buildings",
  [REGION_FLOOR_AREA]: "Floor Area",
  [REGION_TIME]: "Time",
};

export const ENERGY_RANKING_BUILDING_NAME = "buildingname";
export const ENERGY_RANKING_ENERGY = "energy";
export const ENERGY_RANKING_ENERGY_DENSITY = "energy_density";

export const ENERGY_RANKING_RECORD_COLUMN: {
  [key in EnergyRankingProperty]: string;
} = {
  [ENERGY_RANKING_BUILDING_NAME]: "Building Name",
  [ENERGY_RANKING_ENERGY]: "Energy",
  [ENERGY_RANKING_ENERGY_DENSITY]: "Energy Density",
};

export const GEOJSON_INFO_COUNTRY = "country";
export const GEOJSON_INFO_DATA = "geojson";
export const GEOJSON_INFO_RECORD_COLUMN = {
  [GEOJSON_INFO_COUNTRY]: "Country",
  [GEOJSON_INFO_DATA]: "Geojson",
};

export const ALERTS = "alerts";
export const TICKETS = "tickets";
export const ALERTS_DISPLAY_NAME = "alerts_display_name";
export const TICKETS_DISPLAY_NAME = "tickets_display_name";
export const DISPLAY_NAME = "display_name";

export const ALERT_AND_TICKETS_RECORD_COLUMN: {
  [key in AlertsAndTicketsProperty]: string;
} = {
  [ALERTS]: "Alerts",
  [TICKETS]: "Tickets",
  [ALERTS_DISPLAY_NAME]: "",
  [TICKETS_DISPLAY_NAME]: "",
  [DISPLAY_NAME]: "Display name",
};
