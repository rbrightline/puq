/* eslint-disable spellcheck/spell-checker */

/**
 * Represents the database driver types supported by TypeORM.
 * Used in the `type` field of a TypeORM connection configuration.
 */
export type DatabaseType =
  // Relational Databases
  | 'postgres' // PostgreSQL using `pg`
  | 'mysql' // MySQL using `mysql` or `mysql2`
  | 'mariadb' // MariaDB using `mysql` or `mysql2`
  | 'sqlite' // SQLite using `sqlite3`
  | 'better-sqlite3' // SQLite using `better-sqlite3`
  | 'oracle' // Oracle using `oracledb`
  | 'mssql' // Microsoft SQL Server using `mssql`
  | 'cockroachdb' // CockroachDB using `pg` (PostgreSQL-compatible)

  // NoSQL Databases
  | 'mongodb' // MongoDB using `mongodb`

  // Other/Experimental
  | 'sqljs' // SQL.js (SQLite in JavaScript)
  | 'cordova' // Cordova SQLite plugin
  | 'react-native' // React Native SQLite plugin
  | 'expo' // Expo SQLite plugin
  | 'aurora-data-api' // AWS Aurora Data API (MySQL/PostgreSQL)
  | 'aurora-data-api-pg' // AWS Aurora Data API (PostgreSQL-specific)
  | 'sap' // SAP HANA using `@sap/hana-client`
  | 'spanner'; // Google Cloud Spanner using `@google-cloud/spanner`
