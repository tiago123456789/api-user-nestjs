import { Role } from 'src/common/types/role';

export class UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}
