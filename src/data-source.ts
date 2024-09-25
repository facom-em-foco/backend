import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import config from './ormconfig';

dotenv.config();

const appDataSourceConfig: any = {
  ...config,
};

export const AppDataSource = new DataSource(appDataSourceConfig);
