import IndexedDb from "database/IndexedDB";

export interface IChart {
  data: string;
  name: string;
  type: string;
  [x: string]: any;
}

export const TABLE_NAME = "chart";

export const DB_NAME = `presale-poc-database-${TABLE_NAME}`;

export const initDatabase = async () => {
  let indexedDB = new IndexedDb(DB_NAME);
  const objectStore = [TABLE_NAME];
  indexedDB = await indexedDB.createObjectStore(objectStore);
  return indexedDB;
};

export const createChart = async (chart: IChart) => {
  const dbInstance = await initDatabase();
  const stored = await dbInstance.addRecord(TABLE_NAME, chart);
  return stored;
};

export const researchChart = async (chartId: number) => {
  const dbInstance = await initDatabase();
  const chart = await dbInstance.getRecord(TABLE_NAME, chartId);
  return chart;
};

export const getAllCharts = async () => {
  const dbInstance = await initDatabase();
  const charts = await dbInstance.getAllRecord(TABLE_NAME);
  return charts || [];
};

export const updateChart = async (chartId: number, data: string) => {
  const dbInstance = await initDatabase();
  const curChart: IChart = await dbInstance.getRecord(TABLE_NAME, chartId);
  curChart.data = data;
  const updated = await dbInstance.updateByKey(TABLE_NAME, curChart);
  return updated;
};

export const deleteChart = async (chartId: number) => {
  const dbInstance = await initDatabase();
  const removed = await dbInstance.deleteRecord(TABLE_NAME, chartId);
  return removed;
};

export const clearAllChart = async () => {
  const dbInstance = await initDatabase();
  return dbInstance.clearTable(TABLE_NAME);
};
