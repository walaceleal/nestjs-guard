import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt"

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const options: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT
        }
        super(options);
    }

    async validate(payload: any) {
        return payload;
    }
}