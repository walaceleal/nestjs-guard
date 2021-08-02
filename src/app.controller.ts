import { Controller, Get, Inject, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ACLGuard } from './guard/acl.guard';
import { ACL } from "src/decorator/acl.decorator";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get() @ACL("admin")
  getHello(): string {
    return this.appService.getHello();
  }
}
