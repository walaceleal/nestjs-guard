import {
    Get as _Get, Post as _Post, Delete as _Delete, Patch as _Patch,
    applyDecorators, SetMetadata
} from '@nestjs/common';

import { acl as constantes } from 'src/constantes';

export const ACL = (...args: string[]) => SetMetadata('ACL', args);
export const Public = (...args: string[]) => SetMetadata('is_public', args);

function rota_acl(verbo: typeof _Get, nomeVerbo, caminho: string, acl: string) {
    return applyDecorators(
        verbo(caminho),
        SetMetadata("ACL", { verbo: nomeVerbo, acl })
    )
}

export function Get(caminho: string, acl: string = null) {
    return rota_acl(_Get, constantes.get, caminho, acl);
}

export function Post(caminho: string, acl: string = null) {
    return rota_acl(_Post, constantes.post, caminho, acl);
}

export function Patch(caminho: string, acl: string = null) {
    return rota_acl(_Patch, constantes.patch, caminho, acl);
}

export function Delete(caminho: string, acl: string = null) {
    return rota_acl(_Delete, constantes.delete, caminho, acl);
}

