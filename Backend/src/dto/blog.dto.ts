import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class BlogDto {
  @Expose()
  @IsString()
  text!: string;

  @Expose()
  media!: string;

  @Expose()
  date!: Date;

  @Expose()
  userId!: number;
}
