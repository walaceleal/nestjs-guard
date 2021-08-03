import { Controller, Get, Inject, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ACL, Public } from "src/decorator/acl.decorator";
import { AuthGuard } from '@nestjs/passport';

@Controller()
@ACL("publico")
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get('/admin')
  @ACL("admin", "superadmin")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @Public()
  @UseGuards(AuthGuard("local"))
  login(@Request() req) {
    return {
      token: req.user
    }
  }

  @Get()
  info(@Request() req){
    return req.user;
  }
}
