import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '@/entities/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  text!: string;

  @Column({ nullable: true })
  media!: string;

  @Column()
  date!: Date;

  @ManyToOne(() => User, (user) => user.blog)
  user!: User;
}
