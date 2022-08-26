import { HierachyData } from "components/charts/D3Hierachy";
import uniq from "lodash/uniq";
import isEqual from "lodash/isEqual";
import toLower from "lodash/toLower";
import toUpper from "lodash/toUpper";
import isNaN from "lodash/isNaN";
import max from "lodash/max";
import min from "lodash/min";
import {
  EnergyConsumptionItem,
  EnergyConsumptionUnit,
  MapProperty,
} from "./Map.typings";

export const STANDARD_ENERGY_CONSUMPTION_UNIT = "Wh";

export const ENERGY_BASE_UNIT = "Wh";

export const ENERGY_DENSITY_AREA_BASE_UNIT = "m²";

export const CARBON_BASE_UNIT = "CO2e";

export const CARBON_DENSITY_BASE_UNIT = "CO2e/m²";

export const EC_UNITS: {
  [key in EnergyConsumptionUnit]: string;
} = {
  baseWatt: "Wh",
  kgWatt: "kWh",
  megaWatt: "MWh",
  gigaWatt: "GWh",
};

/**
 * convertECByUnit Convert energy consumption value base on unit
 * @param { value, unit } : EnergyConsumptionItem
 * @returns number
 */
export const convertECByUnit = ({ value, unit }: EnergyConsumptionItem) => {
  let valConverted = 0;
  try {
    if (!isNaN(value)) {
      switch (unit) {
        case "kgWatt":
          valConverted = value * 1e3;
          break;
        case "megaWatt":
          valConverted = value * 1e6;
          break;
        case "gigaWatt":
          valConverted = value * 1e9;
          break;
        default:
          valConverted = value;
          break;
      }
    }
  } catch (error) {
    //
  }
  return valConverted;
};

/**
 * findDivideBaseOnValuesEC Find divide base on values energy consumption
 * @param values number[]
 * @returns { divide: number, unit: string }
 */
export const findDivideBaseOnValuesEC = (
  values: number[],
  isDensity = false
) => {
  let divide = 1;
  let unit = EC_UNITS.baseWatt;
  const maxValue = max(values) || 0;

  if (maxValue >= 1e9) {
    divide = 1e9;
    unit = EC_UNITS.gigaWatt;
  } else if (maxValue >= 1e6) {
    divide = 1e6;
    unit = EC_UNITS.megaWatt;
  } else if (maxValue >= 1e3) {
    divide = 1e3;
    unit = EC_UNITS.kgWatt;
  }
  let minFractionDigits = 2;
  const minValue = (min(values) || 0) / divide;
  if (minValue > 0 && minValue < 1) {
    minFractionDigits = -Math.floor(Math.log10(minValue));
  }
  return {
    divide,
    unit: isDensity ? `${unit}/${ENERGY_DENSITY_AREA_BASE_UNIT}` : unit,
    minFractionDigits,
  };
};

export const formatterValueToLocaleString = ({
  value,
  divide = 1,
  fractionDigits = 2,
  unit,
}: {
  value: number;
  divide?: number;
  fractionDigits?: number;
  unit?: string;
}) => {
  try {
    const divided = value / divide;
    const locale = divided.toLocaleString(undefined, {
      minimumFractionDigits: fractionDigits,
    });
    return `${locale} ${unit || ""}`;
  } catch (error) {
    //
  }
  return `${value}`;
};

const createFeature = (
  mapProperty: MapProperty,
  geojson: d3.GeoPermissibleObjects | any,
  listProperties: string[]
) => {
  try {
    const { id, name, mapProperties } = mapProperty;
    const geojsonMapping = geojson.features.map(
      ({ properties, geometry: { coordinates, type } }: any) => ({
        coordinates,
        properties,
        type,
      })
    );
    const coordinates: any = [];
    mapProperties.forEach((i: any) => {
      const splitByComma = i.split(",");
      splitByComma.forEach((propertyName: string) => {
        listProperties.push(propertyName);
        const foundCoordinates = geojsonMapping.find((gItem: any) =>
          isEqual(toLower(gItem.properties.name), toLower(propertyName))
        );
        if (foundCoordinates) {
          switch (foundCoordinates.type) {
            case "LineString": {
              // convert to polygon
              coordinates.push([foundCoordinates.coordinates]);
              break;
            }
            case "Polygon":
              coordinates.push(foundCoordinates.coordinates);
              break;
            case "MultiPolygon": {
              foundCoordinates.coordinates.forEach((polygon: any) => {
                coordinates.push(polygon);
              });
              break;
            }

            default:
              break;
          }
        }
      });
    });
    const feature = {
      type: "Feature",
      id,
      geometry: {
        type: "MultiPolygon",
        coordinates,
      },
      properties: { name },
    };
    return feature;
  } catch (error) {
    //
  }
};

export const convertMapPropertiesToCoordinates = (
  regionMapProperties: MapProperty[],
  hierachyData: HierachyData | undefined
) => {
  const features: any[] = [];
  let listProperties: string[] = [];
  try {
    if (hierachyData) {
      const { geometry } = hierachyData;
      regionMapProperties.forEach((i: MapProperty, index) => {
        const feature = createFeature(i, geometry, listProperties);
        if (feature) {
          const fItem = features[index];
          features[index] = { ...fItem, ...feature };
        }
      });
      listProperties = uniq(listProperties);
    }
  } catch (error) {
    //
  }
  return { listProperties, features };
};

export const convertFromStringToArrayPropertyList = (data: string) =>
  data?.split(",").map((p) => toUpper(p)) || [];
