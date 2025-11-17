import { Database } from '@adonisjs/lucid/database'
import { FieldContext } from '@vinejs/vine/types'

type DatabaseOptions = {
  caseInsensitive?: boolean
}

/**
 * Query the database for a record that matches the given value.
 * @param db The database instance
 * @param table the table name
 * @param column the column name
 * @param value the value to search for
 * @param options the options for the query
 * @returns a promise that resolves to the id of the first matching record
 */
function query(
  db: Database,
  table: string,
  column: string,
  value: string,
  options?: DatabaseOptions
) {
  return db
    .from(table)
    .select('id')
    .if(
      options?.caseInsensitive,
      (truthy) => truthy.whereILike(column, value),
      (falsy) => falsy.where(column, value)
    )
}

/**
 * Check if a record exists in the database.
 * @param table the table name
 * @param column the column name
 * @param options the options for the query
 * @returns a promise that resolves to true if the record exists, false otherwise
 */
export function exists(table: string, column: string, options?: DatabaseOptions) {
  return async (db: Database, value: string, _field: FieldContext) => {
    const result = await query(db, table, column, value, options)
    return !!result.length
  }
}

/**
 * Check if a record is unique in the database.
 * @param table the table name
 * @param column the column name
 * @param options the options for the query
 * @returns a promise that resolves to true if the record is unique, false otherwise
 */
export function unique(table: string, column: string, options?: DatabaseOptions) {
  return async (db: Database, value: string, _field: FieldContext) => {
    const result = await query(db, table, column, value, options)
    return !result.length
  }
}
