import { Role } from 'src/common/types/role';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 70 })
  public name: string;

  @Column({ type: 'varchar', length: 150 })
  public email: string;

  @Column({ type: 'varchar', length: 255 })
  public password: string;

  @Column({ type: 'varchar', length: 50 })
  public role: Role;

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getRole(): Role {
    return this.role;
  }

  setRole(role: Role) {
    this.role = role;
  }
}
