import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { acl } from 'src/constantes';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtService) {
        super();
    }

    //presupoem um BODY (POST) com os dados 'username' e 'password'
    async validate(username: string, password: string) {
        const infoToken = {
            id: 1, nome: 'Walace',
            acl: [
                `usuario:${acl.get}`,
                `usuario: ${acl.post}`,
                `usuario: ${acl.put} `,
                `usuario: ${acl.delete} `,
            ]
        };
        return this.jwtService.sign(infoToken);
    }
}