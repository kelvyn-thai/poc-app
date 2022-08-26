import * as idb from "idb";

class IndexedDb {
  private database: string;

  private db: idb.IDBPDatabase | undefined;

  constructor(database: string) {
    this.database = database;
  }

  public async createObjectStore(tableNames: string[]) {
    this.db = await idb.openDB(this.database, 1, {
      upgrade(db: idb.IDBPDatabase) {
        tableNames.forEach((tableName) => {
          if (!db.objectStoreNames.contains(tableName)) {
            db.createObjectStore(tableName, {
              autoIncrement: true,
              keyPath: "id",
            });
          }
        });
      },
    });
    return this;
  }

  public async getRecord(tableName: string, key: number) {
    const db = this.db as unknown as idb.IDBPDatabase;
    const tx = db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(key);
    return result;
  }

  public async getAllRecord(tableName: string) {
    const db = this.db as unknown as idb.IDBPDatabase;
    const tx = db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = (await store.getAll()) || [];
    return result.sort((a, b) => b.id - a.id);
  }

  public async addRecord(tableName: string, value: any) {
    const db = this.db as unknown as idb.IDBPDatabase;
    const tx = db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.add(value);
    return result;
  }

  public async addRecordByKey(tableName: string, value: any, key: number) {
    const db = this.db as unknown as idb.IDBPDatabase;
    const tx = db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.add(value, key);
    return result;
  }

  public async putBulkRecord(tableName: string, values: any[]) {
    const db = this.db as unknown as idb.IDBPDatabase;
    const tx = db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result: any[] = values.map((value) => store.add(value));
    await Promise.all(result);
    return this.getAllRecord(tableName);
  }

  public async updateByKey(tableName: string, value: any) {
    const db = this.db as unknown as idb.IDBPDatabase;
    const tx = db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    return result;
  }

  public async deleteRecord(tableName: string, id: number) {
    const db = this.db as unknown as idb.IDBPDatabase;
    const tx = db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      return result;
    }
    await store.delete(id);
    return id;
  }

  public async clearTable(tableName: string) {
    const db = this.db as unknown as idb.IDBPDatabase;
    const tx = db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const clear = await store.clear();
    return clear;
  }
}

export default IndexedDb;
