import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { AppDataSource } from '@/config/appDataSource';
import { BlogDto } from '@/dto/blog.dto';
import { Blog } from '@/entities/blog.entity';
import { User } from '@/entities/user.entity';

export class BlogRepository extends Repository<Blog> {
  constructor() {
    super(Blog, AppDataSource.createEntityManager());
  }

  async getAll() {
    const blogs = await this.find({ relations: { user: true } });

    const result = blogs.map((blog) => ({
      ...blog,
      user: plainToClass(User, blog.user),
    }));

    return result;
  }

  async addNewBlog(body: BlogDto) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: body.userId } });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    const userWithoutSensitiveData = plainToClass(User, user);

    const blog = new Blog();
    blog.user = userWithoutSensitiveData;
    blog.date = body.date;
    if (body.text) blog.text = body.text;
    if (body.media) blog.media = body.media;
    const saveBlog = await this.save(blog);
    return saveBlog;
  }
}
