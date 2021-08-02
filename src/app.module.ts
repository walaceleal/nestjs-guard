import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ACLGuard } from './guard/acl.guard';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ACLGuard],
})
export class AppModule {}
