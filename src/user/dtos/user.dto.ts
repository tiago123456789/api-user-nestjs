import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/types/role';

export class UserDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: Role;
}
