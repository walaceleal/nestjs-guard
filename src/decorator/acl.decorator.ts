import { SetMetadata } from '@nestjs/common';

export const ACL = (...args: string[]) => SetMetadata('ACL', args);
export const PUBLIC = (...args: string[]) => SetMetadata('is_public', args);
