import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  migrationsRun: !(process.env.DB_SYNCHRONIZE === 'true'),
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};

export = config;
