import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';
import { CredentialAuthDto } from './dtos/credential-auth.dto';
import provider from 'src/common/configs/provider';
import { EncrypterInterface } from 'src/common/adapters/encrypter.interface';
import { AuthTokenInterface } from 'src/common/adapters/auth-token.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @Inject(provider.ENCRYPTER) private readonly encrypter: EncrypterInterface,
    @Inject(provider.AUTH_TOKEN) private readonly authToken: AuthTokenInterface,
  ) {}

  async getAll(): Promise<UserDto[]> {
    const registers: User[] = await this.repository.find();
    return registers.map((item) => {
      const userDto = new UserDto();
      userDto.id = item.getId();
      userDto.name = item.getName();
      userDto.email = item.getEmail();
      userDto.role = item.getRole();
      return userDto;
    });
  }

  async findById(id: number): Promise<UserDto> {
    const register: User = await this.repository.findOne({
      where: { id },
    });

    return register;
  }

  async register(data: UserDto): Promise<void> {
    data.password = await this.encrypter.getHash(data.password);
    const user: User = new User();
    user.setName(data.name);
    user.setEmail(data.email);
    user.setPassword(data.password);
    user.setRole(data.role);
    await this.repository.insert(user);
  }

  async update(id: number, userDto: UserDto) {
    const user: User = await this.repository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (userDto.password) {
      userDto.password = await this.encrypter.getHash(userDto.password);
    }

    return this.repository.update(
      {
        id,
      },
      userDto,
    );
  }

  async delete(id: number) {
    const user: User = await this.repository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.repository.delete(id);
  }

  async authenticate(credential: CredentialAuthDto) {
    const userByEmail = await this.repository.findOne({
      where: {
        email: credential.email,
      },
    });

    if (!userByEmail) {
      throw new HttpException('Email or password is invalid!', 400);
    }

    const isValidPassword = await this.encrypter.isValid(
      userByEmail.getPassword(),
      credential.password,
    );

    if (!isValidPassword) {
      throw new HttpException('Email or password is invalid!', 400);
    }

    return this.authToken.get({
      email: credential.email,
      id: userByEmail.getId(),
      role: userByEmail.getRole(),
    });
  }
}
