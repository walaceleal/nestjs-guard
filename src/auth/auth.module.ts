import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT,
            signOptions: { expiresIn: '60s' }
        }),
    ],
    providers: [LocalStrategy, JwtStrategy],
    exports: [LocalStrategy, JwtStrategy]
})
export class AuthModule { }
