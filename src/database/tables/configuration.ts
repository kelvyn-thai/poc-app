import IndexedDb from "database/IndexedDB";

export interface IConfiguration {
  data: any;
  name: string;
  [x: string]: any;
}
export const TABLE_NAME = "configuration";

export const DB_NAME = `presale-poc-database-${TABLE_NAME}`;

export const initDatabase = async () => {
  let indexedDB = new IndexedDb(DB_NAME);
  const objectStore = [TABLE_NAME];
  indexedDB = await indexedDB.createObjectStore(objectStore);
  return indexedDB;
};

export const createConfiguration = async (configuration: IConfiguration) => {
  const dbInstance = await initDatabase();
  const stored = await dbInstance.addRecord(TABLE_NAME, configuration);
  return stored;
};

export const researchConfiguration = async (configurationId: number) => {
  const dbInstance = await initDatabase();
  const configuration = await dbInstance.getRecord(TABLE_NAME, configurationId);
  return configuration;
};

export const getAllConfigurations = async () => {
  const dbInstance = await initDatabase();
  const configurations = await dbInstance.getAllRecord(TABLE_NAME);
  return configurations || [];
};

export const updateConfiguration = async (
  configurationId: number,
  data: string
) => {
  const dbInstance = await initDatabase();
  const curConfiguration: IConfiguration = await dbInstance.getRecord(
    TABLE_NAME,
    configurationId
  );
  curConfiguration.data = data;
  const updated = await dbInstance.updateByKey(TABLE_NAME, curConfiguration);
  return updated;
};

export const deleteConfiguration = async (configurationId: number) => {
  const dbInstance = await initDatabase();
  const removed = await dbInstance.deleteRecord(TABLE_NAME, configurationId);
  return removed;
};

export const clearAllConfiguration = async () => {
  const dbInstance = await initDatabase();
  return dbInstance.clearTable(TABLE_NAME);
};
