import { Module } from '@nestjs/common';
import { WsRestApiController } from './ws-rest-api.controller';
import { WsRestApiService } from './ws-rest-api.service';
import { UsersModule } from './users/users.module';
import { MysqlModule } from '@samec/databases/mysql/mysql.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { DatabasesModule } from '@samec/databases';

@Module({
  imports: [
    MysqlModule,
    // UsersModule, 
    AuthModule,
    ProductModule,
    // OrderModule,
    DatabasesModule.forRoot()
  ],
  controllers: [WsRestApiController],
  providers: [WsRestApiService],
})
export class WsRestApiModule { }
