import { SetMetadata } from '@nestjs/common';

export const ACL = (...args: string[]) => SetMetadata('ACL', args);
export const Public = (...args: string[]) => SetMetadata('is_public', args);
