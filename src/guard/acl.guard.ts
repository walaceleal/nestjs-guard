import { CanActivate, ExecutionContext, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ACLGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //busca as referências para a função que será executada e classe que contém essa função.
    const ACLHandler = context.getHandler();
    const ACLClass = context.getClass();

    //busca os decoradores utilizados
    const ACL = this.reflector.getAll<string[]>('ACL', [ACLClass, ACLHandler]);

    if (ACL == null) {
      throw new ForbiddenException({
        classe: 'acl.guard.ts',
        msg: 'ACL não definida',
      });
    }

    const req = context.switchToHttp().getRequest();

    if (req.user == null) {
      throw new ForbiddenException({
        classe: 'acl.guard.ts',
        msg: 'usuário nulo'
      });
    }

    if (typeof req.user.acl !== typeof Array) {
      throw new ForbiddenException({
        classe: 'acl.guard.ts',
        msg: 'acl inválida'
      });
    }

    if (req.user.acl.indexOf(ACL) === -1) {
      throw new ForbiddenException({
        classe: 'acl.guard.ts',
        msg: 'usuário sem a permissão necessária'
      });
    }

    return true;
  }
}
