import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
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
  @Exclude()
  password!: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken?: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blog!: Blog[];

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
