import Dexie, { type EntityTable } from "dexie"

type ElementType<T> = T extends (infer U)[] ? U : never

type TableSchema = Record<string, unknown>
type TableItem = TableSchema & { id: number }
type DbData = Record<string, TableItem[]>
type TypedDexie<D extends DbData> = Dexie & {
  [K in keyof D]: EntityTable<ElementType<D[K]>, "id">
}

const getSchemaDefinition = (seedData: object) => {
  return Object.fromEntries(
    Object.keys(seedData).map((tableName) => [tableName, "id"])
  )
}

const seedDb = async <D extends DbData>(db: TypedDexie<D>, seedData: D) => {
  await Promise.all(
    Object.entries(seedData).map(async ([tableName, items]) => {
      const table = db[tableName]
      if (typeof table === "undefined") {
        return
      }
      await table.bulkPut(items as [])
    })
  )
}

export const createTestDb = async <D extends DbData>(seedData: D) => {
  const dbName = crypto.randomUUID()
  const db = new Dexie(dbName) as TypedDexie<D>
  db.version(1).stores(getSchemaDefinition(seedData))
  await seedDb(db, seedData)
  return db
}
