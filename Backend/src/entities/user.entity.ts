import bcrypt from 'bcryptjs';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Blog } from '@/entities/blog.entity';

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

  @OneToMany(() => Blog, (blog) => blog.user)
  blog!: Blog[];

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
