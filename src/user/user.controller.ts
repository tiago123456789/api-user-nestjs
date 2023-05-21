import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { CredentialAuthDto } from './dtos/credential-auth.dto';
import { SecurityGuard } from 'src/security/security.guard';
import { HasRole } from 'src/security/has-role.decorater';
import { Role } from 'src/common/types/role';
import { RequestWithUserId } from 'src/common/types/request-with-userid';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HasRole(Role.ADMIN)
  @UseGuards(SecurityGuard)
  @Get()
  getAll(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @HasRole(Role.EMPLOYEE, Role.ADMIN)
  @UseGuards(SecurityGuard)
  @Get('/me')
  getMe(@Req() request: RequestWithUserId): Promise<UserDto> {
    return this.userService.findById(request.userId);
  }

  @HasRole(Role.EMPLOYEE)
  @UseGuards(SecurityGuard)
  @Get('/only-employee')
  onlyEmployee(): string {
    return 'OK';
  }

  @Post()
  @HttpCode(201)
  register(@Body() userDto: UserDto) {
    return this.userService.register(userDto);
  }

  @Post('/login')
  async authenticate(
    @Body() credentialAuthDto: CredentialAuthDto,
  ): Promise<{ [key: string]: any }> {
    const accessToken = await this.userService.authenticate(credentialAuthDto);
    return {
      accessToken,
    };
  }
}
