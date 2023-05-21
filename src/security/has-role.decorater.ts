import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/types/role';

export const HasRole = (...roles: Role[]) => SetMetadata('roles', roles);
