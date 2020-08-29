import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'dev',
  entities: [`${__dirname}/entities/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/db/migrations',
    entitiesDir: 'src/db/entities',
  },
};

export = config;
