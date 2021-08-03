import { Controller, Get, Inject, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ACL } from "src/decorator/acl.decorator";
import { AuthGuard } from '@nestjs/passport';

@Controller()
@ACL("publico")
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get('/admin') @ACL("admin")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @UseGuards(AuthGuard("local"))
  login(@Request() req) {
    return {
      token: req.user
    }
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  info(@Request() req){
    return req.user;
  }
}
