import { useMapStore } from "pages/hierachy_map";
import { HierachyData } from "components/charts/D3Hierachy";
import React from "react";
import {
  useQuery,
  useQueries,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { PieChartItemRender } from "components/charts/D3Pie";
import sum from "lodash/sum";
import { isJSONString } from "utils/isJSONString";
import { RankingChartItem } from "components/charts/Ranking";
import {
  activeGeojsonMap,
  createRegion,
  deleteEnergyRanking,
  deleteGeojsonMap,
  deleteRegion,
  getAlertsTickets,
  getCountryStatusList,
  getEnergyConsumption,
  getEnergyRanking,
  getGeojsonMapOfACountry,
  getPropertyList,
  getRegion,
  getRegionList,
  operationAlertsTickets,
  operationEnergyRanking,
  operationGeojsonMapOfACountry,
  updateRegion,
} from "./Map.services";
import {
  AlertsAndTickets,
  Country,
  EnergyConsumption,
  EnergyRanking,
  MapProperty,
  Region,
} from "./Map.typings";
import {
  convertFromStringToArrayPropertyList,
  convertMapPropertiesToCoordinates,
  ENERGY_DENSITY_AREA_BASE_UNIT,
  findDivideBaseOnValuesEC,
  formatterValueToLocaleString,
} from "./Map.utils";
import {
  ALERTS,
  ALERTS_DISPLAY_NAME,
  TICKETS,
  TICKETS_DISPLAY_NAME,
} from "./Map.constant";

/**
 * useCountryStatusList
 * This hook will use to fetch list country (use to know which country actived too)
 * @returns UseQueryResult<CountryStatusListResponse, unknown>
 */
export const useCountryStatusList = () => {
  const { actionSetSelectedCountry } = useMapStore();
  const countryStatusListQuery = useQuery(
    ["country-status-list"],
    async () => {
      const res = await getCountryStatusList();
      return res?.data || [];
    },
    {
      onSuccess: (data) => {
        let activedCountry = -1;
        if (data.length > 0) {
          activedCountry = data.find((c) => c.actived)?.id || -1;
        }
        actionSetSelectedCountry(activedCountry);
      },
      placeholderData: [],
    }
  );
  return countryStatusListQuery;
};
/**
 * useSelectedCountry
 * This hook will use to find selected country by id
 * @returns Country
 */
export const useSelectedCountry = () => {
  const { country: countryId, geojsonPropertyList } = useMapStore();
  const { data = [] } = useCountryStatusList();
  return {
    country:
      data.find((c: Country) => c.id === countryId) ||
      ({ id: -1, country: "", actived: false } as Country),
    propertyList:
      geojsonPropertyList.find((d) => d.countryId === countryId)
        ?.propertyList || [],
  };
};

/**
 * useActivedCountry
 * This hook will use to determine data of country actived
 * @returns {
 *  country: Country;
 *  countryName: string;
 * }
 */
export const useActivedCountry = () => {
  const { data: countries = [] } = useCountryStatusList();
  const defaultCountry: Country | undefined = countries.find(
    (c: Country) => c.actived
  );
  return {
    country: defaultCountry,
    countryName: defaultCountry?.country || "",
  };
};

/**
 * useRegionList
 * This hook will use to region list country actived
 * @returns UseQueryResult<string[], unknown>
 */
export const useRegionList = () => {
  const {
    country: { country },
  } = useSelectedCountry();
  const query = useQuery(
    ["regionlist", country],
    async () => {
      const res = await getRegionList(country);
      return res?.data || [];
    },
    {
      enabled: !!country,
    }
  );
  return query;
};

/**
 * usePropertyList
 * This hook will use to fetch list property name of country actived
 * @returns UseQueryResult<string[], unknown>
 */
export const usePropertyList = () => {
  const {
    country: { country, id: countryId },
  } = useSelectedCountry();
  const { actionSetGeojsonPropertyList } = useMapStore();
  const propertyListQuery = useQuery(
    ["property-list", country],
    async () => {
      const res = await getPropertyList(country);
      const list = res?.data.split(",") || [];
      return list;
    },
    {
      enabled: !!country,
      onSuccess: (propertyList: string[]) => {
        actionSetGeojsonPropertyList({ countryId, propertyList });
      },
    }
  );
  return propertyListQuery;
};

/**
 * useGeojsonCountry
 * This hook will use to fetch geojson string of country actived
 * @returns UseQueryResult<string, unknown>
 */
export const useGeojsonCountry = () => {
  const {
    country: { country },
  } = useSelectedCountry();
  const geojsonCountryQuery = useQuery(
    ["geojsonmap", country],
    async () => {
      const res = await getGeojsonMapOfACountry(country);
      return res.data || "";
    },
    {
      enabled: !!country,
    }
  );
  return geojsonCountryQuery;
};

/**
 * useRegionListData
 * This hook will use to region list data of country actived
 * 1/ Fetch region list of country
 * 2/ Fetch region details
 * 3/ Re-mapping data
 * @returns {
 * isLoading: boolean;
 * regionList: Region[];
 * regions: string[];
 * regionMapProperties: MapProperty[];
 * regionListIds: number[];
 * regionListName: string[];
 * }
 */
export const useRegionListData = () => {
  const {
    country: { country },
  } = useSelectedCountry();
  const { data = [] } = useRegionList();
  const regionQueries = useQueries({
    queries: data.map((region: string) => ({
      queryKey: ["region-details", region, country],
      queryFn: () => getRegion(country, region),
      enabled: data?.length > 0,
    })),
  });
  return React.useMemo(() => {
    const isLoading = regionQueries.some(
      (regionQuery) => regionQuery.isLoading
    );
    const regionList = regionQueries
      .map((regionQuery) => regionQuery.data?.data)
      .filter((r) => !!r)
      .map((r) => {
        const { energy_densisty_YTD } = r as Region;
        const { divide, unit, minFractionDigits } = findDivideBaseOnValuesEC(
          [energy_densisty_YTD],
          true
        );
        return {
          ...r,
          energy_densisty_YTD_formatted: energy_densisty_YTD
            ? formatterValueToLocaleString({
                value: energy_densisty_YTD,
                unit,
                divide,
                fractionDigits: minFractionDigits,
              })
            : "-",
          buildings_formatted: r?.buildings
            ? formatterValueToLocaleString({
                value: r?.buildings,
              })
            : "-",
          floor_area_formatted: r?.floor_area
            ? formatterValueToLocaleString({
                value: r?.floor_area,
                unit: ENERGY_DENSITY_AREA_BASE_UNIT,
              })
            : "-",
          active_alerts_formatted: r?.active_alerts || "-",
          open_tickets_formatted: r?.open_tickets || "-",
        };
      }) as Region[];
    const regionListIds = regionList.map((r) => r.id);
    const regionListName = regionList.map((r) => r.regionname);
    const regionMapProperties = regionList.map(
      ({ id, regionname, map_properties }) => {
        const mapPropertiesParse =
          !!map_properties && isJSONString(map_properties)
            ? JSON.parse(map_properties)
            : undefined;
        const mapProperties =
          typeof mapPropertiesParse !== "undefined"
            ? mapPropertiesParse
            : [regionname];
        const result = {
          id,
          name: regionname,
          mapProperties,
        };
        return result;
      }
    ) as unknown[] as MapProperty[];
    return {
      isLoading,
      regionList,
      regions: data,
      regionMapProperties,
      regionListIds,
      regionListName,
    };
  }, [regionQueries]);
};

/**
 * useHierachyCountryData
 * This hook will use to get hierachy data of country actived
 * @returns HierachyData
 */
export const useHierachyCountryData = () => {
  const {
    country: { country },
  } = useSelectedCountry();
  const { data: jsonString = "" } = useGeojsonCountry();
  const geojson = isJSONString(jsonString) ? JSON.parse(jsonString) : {};
  return {
    id: country,
    name: country,
    geometry: geojson,
    children: [],
  } as HierachyData;
};

/**
 * useGeojsonRegions
 * This hook will use to get geojson of each region base on property name of country actived
 * Each region will be a collection of properties name -> we have to convert from regions -> coordinates
 * @returns {
 * geojsonRegions:HierachyData;
 * isLoading: boolean;
 * }
 */
export const useGeojsonRegions = () => {
  const {
    country: { country },
  } = useSelectedCountry();
  const { isLoading: loadingGeojson } = useGeojsonCountry();
  const hierachyData = useHierachyCountryData();
  const {
    regionMapProperties,
    regionListName,
    isLoading: loadingRegionList,
  } = useRegionListData();
  const { data: propertyList, isLoading: loadingPropertyList } =
    usePropertyList();
  return React.useMemo(() => {
    const { features: regionCoordinates } = convertMapPropertiesToCoordinates(
      regionMapProperties,
      hierachyData
    );
    let geojson: { type: string; features: any[] } = {
      type: "FeatureCollection",
      features: [],
    };
    if (hierachyData) {
      const { geometry } = hierachyData;
      let { features } = geometry;
      try {
        features = [...features, ...regionCoordinates];
        geojson = { ...geometry, features };
      } catch (error) {
        //
      }
    }
    return {
      geojsonRegions: {
        id: country,
        name: country,
        geometry: geojson,
        children: [],
        regions: regionListName,
      } as HierachyData,
      isLoading: loadingGeojson || loadingPropertyList || loadingRegionList,
    };
  }, [
    hierachyData,
    regionMapProperties,
    propertyList,
    regionListName,
    loadingGeojson,
    loadingPropertyList,
    loadingRegionList,
    country,
  ]);
};

/**
 * useMutationDeleteCountry
 * This hook will use to remove country
 * Will reload 'country-status-list' after remove success
 * @returns UseMutationResult<APIResponse, unknown, number, unknown>
 */
export const useMutationDeleteCountry = () => {
  const queryClient = useQueryClient();
  const deleteCountryMutation = useMutation(
    (countryId: number) => deleteGeojsonMap(countryId),
    {
      onSuccess() {
        queryClient.invalidateQueries(["country-status-list"]);
      },
    }
  );
  return deleteCountryMutation;
};

/**
 * useMutationUpdateActiveCountry
 * This hook will use to update status country => active
 * Will reload 'country-status-list' after remove success
 * @returns UseMutationResult<APIResponse, unknown, number, unknown>
 */
export const useMutationUpdateActiveCountry = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (countryId: number) => activeGeojsonMap(countryId),
    {
      onSuccess() {
        queryClient.invalidateQueries(["country-status-list"]);
      },
    }
  );
  return mutation;
};

/**
 * useMutationCreateRegion
 * This hook will use to auto generate region
 * Will reload 'country-status-list' after remove success
 * @returns  UseMutationResult<({
    data: Region;
} & APIResponse)[], unknown, void, unknown>
 */
export const useMutationAutoGenerateRegion = () => {
  const queryClient = useQueryClient();
  const {
    country: { country },
  } = useSelectedCountry();
  const mutation = useMutation(
    async () => {
      const res = await getPropertyList(country);
      const propertyList = convertFromStringToArrayPropertyList(res.data);
      await Promise.all(
        propertyList.map((region) => createRegion(country, region, {}))
      );
      return propertyList;
    },
    {
      onSuccess: (regions: string[]) => {
        queryClient.refetchQueries(["regionlist", country]);
        regions.forEach((region) => {
          const key = ["region-details", region, country];
          queryClient.refetchQueries(key, { type: "all", exact: true });
        });
      },
    }
  );
  return mutation;
};

/**
 * useMutationDeleteRegion
 * This hook will use to remove region
 * @returns UseMutationResult<APIResponse, unknown, number, unknown>
 */
export const useMutationDeleteRegion = () => {
  const {
    country: { country },
  } = useSelectedCountry();
  const queryClient = useQueryClient();
  const mutation = useMutation((regionId: number) => deleteRegion(regionId), {
    onSuccess() {
      queryClient.refetchQueries(["regionlist", country]);
    },
  });
  return mutation;
};

/**
 * useMutationOperationRegion
 * This hook will use to create / update region
 * @returns UseMutationResult<APIResponse, unknown, number, unknown>
 */
export const useMutationOperationRegion = ({
  isCreate,
}: {
  isCreate: boolean;
}) => {
  const {
    country: { country },
  } = useSelectedCountry();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({ region, info }: { region: string; info: any }) => {
      if (isCreate) {
        await createRegion(country, region, info);
      } else {
        await updateRegion(country, region, info);
      }
      return region;
    },
    {
      onSuccess(region: string) {
        if (isCreate) {
          queryClient.refetchQueries(["regionlist", country]);
        } else {
          const key = ["region-details", region, country];
          queryClient.refetchQueries(key, { type: "all", exact: true });
        }
      },
    }
  );
  return mutation;
};

/**
 * useMutationCreateGeojsonMapOfACountry
 * This hook will use to create/update geojson map of a country
 * Will reload 'country-status-list' or 'geojsonmap'
 * @returns UseMutationResult<APIResponse, unknown, number, unknown>
 */
export const useMutationOperationGeojsonMapOfACountry = ({
  isCreate,
}: {
  isCreate: boolean;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({
      country,
      geojson,
    }: {
      country: string;
      geojson: d3.GeoGeometryObjects | any;
    }) => {
      await operationGeojsonMapOfACountry(country, geojson);
      return country;
    },
    {
      onSuccess(country: string) {
        if (isCreate) {
          queryClient.refetchQueries(["country-status-list"]);
        } else {
          queryClient.refetchQueries(["geojsonmap", country]);
        }
      },
    }
  );
  return mutation;
};

/**
 * This function use for get energy consumption of actived country
 * @returns UseQueryResult<
  EnergyConsumption[],
  unknown
>
 */
export const useQueryEnergyConsumption: () => UseQueryResult<
  EnergyConsumption[],
  unknown
> = () => {
  const { countryName: country } = useActivedCountry();
  const query = useQuery(
    [`energy-consumption-${country}`],
    async () => {
      let result: EnergyConsumption[] = [];
      try {
        const res = await getEnergyConsumption(country);
        result = res?.data || [];
      } catch (error) {
        //
      }
      return result;
    },
    { enabled: !!country, placeholderData: [] }
  );
  return query;
};

export const useEnergyConsumptionData = () => {
  const query = useQueryEnergyConsumption();
  const { data = [], isLoading } = query;
  return React.useMemo(() => {
    const values = data.map((i) => i.energyconsumption);
    const { divide, unit } = findDivideBaseOnValuesEC(values);
    const energyConsumptionData =
      data.map(({ regionname, energyconsumption }: EnergyConsumption) => ({
        id: regionname,
        label: regionname,
        value: energyconsumption / divide,
      })) || [];
    const total = sum(energyConsumptionData.map((i) => i.value));
    const formatterValue = (item: PieChartItemRender) =>
      `${formatterValueToLocaleString({
        value: item.value,
        divide: 1,
        unit,
      })} | ${item.percent}%`;
    const renderTooltipValue = (item: PieChartItemRender) =>
      `${item.label} - ${formatterValueToLocaleString({
        value: item.value,
        divide: 1,
        unit,
      })} | ${item.percent}%`;
    const result = {
      donutText: !isLoading
        ? `${formatterValueToLocaleString({ value: total, divide: 1, unit })}`
        : "-",
      subDonutText: "YTD Energy",
      pieData: energyConsumptionData,
      isLoading,
      formatterValue,
      renderTooltipValue,
    };
    return result;
  }, [query]);
};

/**
 * useQueryEnergyRanking
 * This hook will use to query energy ranking
 * @param country: string
 * @returns UseQueryResult<EnergyRanking[] | undefined, unknown>
 */
export const useQueryEnergyRanking = (country: string) => {
  const query = useQuery(
    [`energy-ranking-${country}`],
    async () => {
      try {
        const res = await getEnergyRanking(country);
        return res.data || [];
      } catch (error) {
        //
      }
    },
    { enabled: !!country, placeholderData: [] }
  );
  return query;
};

/**
 * useEnergyRankingData
 * This hook will use to get energy ranking data
 * @param isDensity: boolean;
 * @param country: string
 * @returns { isLoading: boolean; data: RankingChartItem[]; unit: string; minFractionDigits: number;dataResource: EnergyRanking[];}
 */
export const useEnergyRankingData: (
  isDensity: boolean,
  country: string
) => {
  isLoading: boolean;
  data: RankingChartItem[];
  unit: string;
  minFractionDigits: number;
  dataResource: EnergyRanking[];
} = (isDensity, country) => {
  const query = useQueryEnergyRanking(country);
  const { data = [], isLoading } = query;
  return React.useMemo(() => {
    const values = data.map((i) => (isDensity ? i.energy_density : i.energy));
    const { divide, unit, minFractionDigits } = findDivideBaseOnValuesEC(
      values,
      isDensity
    );
    const dataResource: EnergyRanking[] = [];
    const result = {
      isLoading,
      data: data.map((i) => {
        const { energy, energy_density, id, buildingname } = i;
        const value = isDensity ? energy_density : energy;
        const dividedValue = value / divide;
        return {
          id: String(id),
          label: buildingname,
          value: dividedValue,
        };
      }) as RankingChartItem[],
      unit,
      minFractionDigits,
      dataResource,
    };
    return result;
  }, [query, isDensity]);
};

/**
 * useMutationOperationEnergyRanking
 * This hook will use to create / update energy ranking
 * @returns UseMutationResult<APIResponse, unknown, number, unknown>
 */
export const useMutationOperationEnergyRanking = (country: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({ buildingname, info }: { buildingname: string; info: any }) => {
      await operationEnergyRanking(country, buildingname, info);
    },
    {
      onSuccess() {
        queryClient.refetchQueries([`energy-ranking-${country}`]);
      },
    }
  );
  return mutation;
};

/**
 * useMutationDeleteEnergyRanking
 * This hook will use to remove energy ranking record
 * @returns UseMutationResult<APIResponse, unknown, number, unknown>
 */
export const useMutationDeleteEnergyRanking = (country: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (regionId: number) => deleteEnergyRanking(regionId),
    {
      onSuccess() {
        queryClient.refetchQueries([`energy-ranking-${country}`]);
      },
    }
  );
  return mutation;
};

/**
 * useQueryAlertsAndTickets
 * This hook will use for query alerts and tickets data
 * @returns UseMutationResult<AlertsAndTickets, unknown, number, unknown>
 */
export const useQueryAlertsAndTickets = (country: string) => {
  const query = useQuery([`alerts-and-tickets-${country}`], async () => {
    const response = await getAlertsTickets(country);
    return response.data;
  });
  return query;
};

/**
 * useQueryAlertsAndTicketsData
 * This hook will use for mapping alerts and tickets data
 * @returns { isLoading: boolean; alerts: string; tickets: string; resource: AlertsAndTickets | undefined;}
 */
export const useQueryAlertsAndTicketsData: (country: string) => {
  isLoading: boolean;
  alertsFormatted: string;
  ticketsFormatted: string;
  alertsDisplayName: string;
  ticketsDisplayName: string;
  resource: AlertsAndTickets | undefined;
} = (country) => {
  const query = useQueryAlertsAndTickets(country);
  return React.useMemo(() => {
    const { data, isLoading } = query;
    if (!data) {
      return {
        isLoading,
        resource: undefined,
        alertsFormatted: "-",
        ticketsFormatted: "-",
        alertsDisplayName: "-",
        ticketsDisplayName: "-",
      };
    }
    const result = {
      isLoading,
      alertsFormatted: `${data[ALERTS]}`,
      ticketsFormatted: `${data[TICKETS]}`,
      resource: data,
      alertsDisplayName: data[ALERTS_DISPLAY_NAME],
      ticketsDisplayName: data[TICKETS_DISPLAY_NAME],
    };
    return result;
  }, [query]);
};

export const useMutationAlertsAndTickets = (country: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (info: {
      [ALERTS]: number;
      [TICKETS]: number;
      [ALERTS_DISPLAY_NAME]: string;
      [TICKETS_DISPLAY_NAME]: string;
    }) => operationAlertsTickets({ country, ...info }),
    {
      onSuccess() {
        queryClient.refetchQueries([`alerts-and-tickets-${country}`]);
      },
    }
  );
  return mutation;
};
