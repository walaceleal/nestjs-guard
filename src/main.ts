import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ACLGuard } from './guard/acl.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  const acl = new ACLGuard(reflector);

  app.useGlobalGuards(acl);

  await app.listen(3000);
}
bootstrap();
