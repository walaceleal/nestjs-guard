import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtService) {
        super();
    }

    //presupoem um BODY (POST) com os dados 'username' e 'password'
    async validate(username: string, password: string) {
        const infoToken = {
            id: 1, nome: 'Walace', acl: [
                "admin",
                "superadmin"
            ]
        };
        return this.jwtService.sign(infoToken);
    }
}