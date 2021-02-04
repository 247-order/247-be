module.exports = {
  type: 'mariadb',
  host: process.env.MARIADB_HOST,
  port: 3306,
  username: 'samec',
  password: 'samec@110320!',
  database: 'samec',
  entities: ['libs/databases/src/entities/*.ts'],
  migrationsTableName: 'migration_table',
  migrations: ['libs/databases/migrations/*.ts'],
  cli: {
    migrationsDir: 'libs/databases/migrations',
    entitiesDir: 'libs/databases/src/entities',
  },
};
