import { createConnection } from 'typeorm';
import { MYSQL_MAIN_CONNECTION } from './constants/db.constants';
import entities from './entities';

export const databaseProviders = [
  {
    provide: MYSQL_MAIN_CONNECTION,
    useFactory: async () => await createConnection({
      type: 'mariadb',
      host: process.env.MARIADB_HOST,
      port: 3306,
      username: 'samec',
      password: 'samec@110320!',
      database: 'samec',
      entities: [...entities],
      // debug: true,
      synchronize: true,
      // cache: {
      //   type: 'redis',
      //   options: {
      //     host: process.env.REDIS_HOST,
      //     port: 6379,
      //   },
      // },
    }),
  },
];