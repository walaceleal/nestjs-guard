import { Reflector } from '@nestjs/core';
import { ACLGuard } from './acl.guard';

describe('AclGuard', () => {
  it('should be defined', () => {
    expect(new ACLGuard( new Reflector() )).toBeDefined();
  });
});
