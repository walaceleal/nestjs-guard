import { SetMetadata } from '@nestjs/common';

export const ACL = (...args: string[]) => SetMetadata('ACL', args);
