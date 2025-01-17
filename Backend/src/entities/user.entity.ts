import bcrypt from 'bcryptjs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  refreshToken?: string;

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
