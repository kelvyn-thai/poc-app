import { ENV } from "env";
import HTTP from "http-request";
import {
  RegionResponse,
  AlertsAndTicketsResponse,
  EnergyRankingResponse,
  EnergyConsumptionResponse,
  GeneralResponse,
  GeojsonMapOfACountryResponse,
  GeojsonMapPropertyListOfACountryResponse,
  ListCountryResponse,
  RegionListResponse,
  APIResponse,
  CountryStatusListResponse,
} from "./Map.typings";

const http = new HTTP({ baseURL: `${ENV.API_DOMAIN_URL}/map` });

/**
 * getMapGeneral: Get general information
 */
export const getMapGeneral: () => Promise<GeneralResponse> = () =>
  http.get("general");

/**
 * getGeojsonMapOfACountryResponse: Get geojson map of a country
 * @param country: string;
 */
export const getGeojsonMapOfACountry: (
  country: string
) => Promise<GeojsonMapOfACountryResponse> = (country) =>
  http.get(`geojsonmap?Country=${country}`);

/**
 * operationGeojsonMapOfACountry: Create / Update geojson map of a country
 * @param country: string;
 * @param geojson: d3.GeoGeometryObjects | any;
 */
export const operationGeojsonMapOfACountry: (
  country: string,
  geojson: d3.GeoGeometryObjects | any
) => Promise<GeojsonMapOfACountryResponse> = (country, geojson) =>
  http.post(`geojsonmap?Country=${country}`, geojson);

/**
 * getPropertyList: Get property (name) list of a country
 * @param country: string;
 */
export const getPropertyList: (
  country: string
) => Promise<GeojsonMapPropertyListOfACountryResponse> = (country) =>
  http.get(`geojsonmappropertylist?Country=${country}`);

/**
 * getRegion: Get details info of a region
 * @param country: string;
 * @param region: string;
 */
export const getRegion: (
  country: string,
  region: string
) => Promise<RegionResponse> = (country, region) =>
  http.get(`region?Country=${country}&Region=${region}`);

/**
 * createRegion: Create general details info of a region
 * @param country: string;
 * @param region: string;
 */
export const createRegion: (
  country: string,
  region: string,
  updateInfo: {
    map_properties?: string;
    buildings?: number;
    floor_area?: number;
    energy_densisty_YTD?: number;
    active_alerts?: number;
    open_tickets?: number;
    energy_consumption?: number;
  }
) => Promise<RegionResponse> = (country, region, updateInfo) =>
  http.post(`region`, {
    country,
    regionname: region,
    ...updateInfo,
  });

/**
 * updateRegion: Update general details info of a region
 * @param country: string;
 * @param region: string;
 */
export const updateRegion: (
  country: string,
  region: string,
  updateInfo: {
    map_properties?: string;
    buildings?: number;
    floor_area?: number;
    energy_densisty_YTD?: number;
    active_alerts?: number;
    open_tickets?: number;
    energy_consumption?: number;
  }
) => Promise<RegionResponse> = (country, region, updateInfo) =>
  http.put(`region`, {
    country,
    regionname: region,
    ...updateInfo,
  });

/**
 * deleteRegion: Delete a region
 * @param id: number | string;
 */
export const deleteRegion: (id: any) => Promise<APIResponse> = (id: any) =>
  http.post(`${id}/region`, {});

/**
 * getAlertsTickets: Get alerts & tickets of country
 * @return AlertsAndTicketsResponse
 */
export const getAlertsTickets: (
  country: string
) => Promise<AlertsAndTicketsResponse> = (country) =>
  http.get(`alertstickets?Country=${country}`);

/**
 * operationAlertsTickets: Create / update alerts & tickets of country
 * @return AlertsAndTicketsResponse
 */
export const operationAlertsTickets: (body: {
  country: string;
  alerts: number;
  tickets: number;
}) => Promise<APIResponse> = (body) => http.post(`alertstickets`, body);

/**
 * getEnergyConsumption: Get energy consumption of a country
 * @param country: string
 */
export const getEnergyConsumption: (
  country: string
) => Promise<EnergyConsumptionResponse> = (country) =>
  http.get(`energyconsumption?Country=${country}`);

/**
 * getEnergyRanking: Get energy ranking by country
 */
export const getEnergyRanking: (
  country: string
) => Promise<EnergyRankingResponse> = (country) =>
  http.get(`energyranking?Country=${country}`);

/**
 * getListCountry
 * @returns string[]
 */
export const getListCountry: () => Promise<ListCountryResponse> = () =>
  http.get("countrylist");

/**
 * getRegionList: Get list region of country
 */
export const getRegionList: (country: string) => Promise<RegionListResponse> = (
  country
) => http.get(`regionlist?Country=${country}`);

/**
 * deleteGeojsonMap: Delete geoJson map data by id
 */
export const deleteGeojsonMap: (countyId: number) => Promise<APIResponse> = (
  countryId
) => http.delete(`${countryId}/geojsonmap`);

/**
 * activeGeojsonMap: Update geoJson map data actived
 */
export const activeGeojsonMap: (countyId: number) => Promise<APIResponse> = (
  countryId
) => http.post(`${countryId}/geojsonmap`);

/**
 * getCountryStatusList: Get country list
 */
export const getCountryStatusList: () => Promise<CountryStatusListResponse> =
  () => http.get(`countrystatuslist`);

/**
 * operationEnergyRanking: Create / update energy ranking item
 * @param country: string;
 * @param buildingname: string;
 */
export const operationEnergyRanking: (
  country: string,
  buildingname: string,
  updateInfo: {
    energy: number;
    energy_density: number;
  }
) => Promise<RegionResponse> = (country, buildingname, updateInfo) =>
  http.post(`energyranking?Country=${country}`, {
    country,
    buildingname,
    ...updateInfo,
  });

/**
 * deleteEnergyRanking: Delete energy ranking record
 * @param id: number | string;
 */
export const deleteEnergyRanking: (id: any) => Promise<APIResponse> = (
  id: any
) => http.post(`${id}/energyranking`, {});
