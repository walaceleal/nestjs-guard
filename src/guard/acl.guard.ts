import { CanActivate, ExecutionContext, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ACL } from 'src/decorator/acl.decorator';

@Injectable()
export class ACLGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //busca as referências para a função que será executada e classe que contém essa função.
    const contextoFuncao = context.getHandler();
    const contextoClasse = context.getClass();

    const is_public = this.reflector.getAllAndOverride<boolean>('is_public', [contextoFuncao, contextoClasse]);

    //não requer qualquer autenticação.
    if (is_public) {
      return true;
    }

    //lança exceção caso não o usuário não seja autenticado!
    const autenticado = await super.canActivate(context);

    if (!autenticado) {
      return false;
    }

    //busca os decoradores utilizados
    const ACLClasse = this.reflector.get('ACL', contextoClasse);
    const ACLFuncao = this.reflector.get('ACL', contextoFuncao);

    let ACL: string;

    if (ACLFuncao == null) {
      ACL = ACLClasse;
    } else if (ACLFuncao.acl != null) {
      ACL = ACLFuncao.acl;
    } else {
      ACL = `${ACLClasse}:${ACLFuncao.verbo}`;
    }


    if (ACL == null) {
      throw new ForbiddenException({
        classe: 'acl.guard.ts',
        msg: 'ACL não definida',
      });
    }

    //qualque usuário autenticado pode acessar!
    if (ACL.indexOf("publico") !== -1) {
      return true;
    }

    const userACL = context.switchToHttp().getRequest().user.acl;

    console.log(ACL, userACL)

    if (!Array.isArray(userACL)) {
      throw new ForbiddenException({
        classe: 'acl.guard.ts',
        msg: 'usuário sem acl válida'
      });
    }

    if (userACL.indexOf(ACL) === -1) {
      throw new ForbiddenException({
        classe: 'acl.guard.ts',
        msg: 'usuário sem a permissão necessária'
      });
    }

    return true;
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    if (err) {
      throw err;
    }

    if (info instanceof Error) {
      const { message, name } = info;

      throw new HttpException({
        name, message
      }, 402)
    }

    return user;
  }
}
