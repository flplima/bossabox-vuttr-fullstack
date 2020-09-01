import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'vuttr',
  entities: [`${__dirname}/entities/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsRun: true,
  logging: true,
  cli: {
    migrationsDir: 'src/db/migrations',
    entitiesDir: 'src/db/entities',
  },
};

export = config;
