import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { AppDataSource } from '@/config/appDataSource';
import { BlogDto } from '@/dto/blog.dto';
import { Blog } from '@/entities/blog.entity';
import { User } from '@/entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

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

  async deleteBlog(id: number, userId: number) {
    const blog = await this.findOne({ where: { id: id }, relations: ['user'] });
    if (!blog) {
      throw new Error('Блог не найден');
    }
    if (blog.user.id !== userId) {
      throw new Error('Это не ваш Блог');
    }
    await this.delete(id);
    return blog;
  }

  async addNewBlog(body: BlogDto) {
    const user = await userRepository.findOne({ where: { id: body.userId } });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    const blog = new Blog();
    blog.user = user;
    blog.date = body.date;
    if (body.text) blog.text = body.text;
    if (body.media) blog.media = body.media;
    const saveBlog = await this.save(blog);
    return saveBlog;
  }

  async patchBlog(id: number, userId: number, blogDto: BlogDto) {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const blog = await this.findOne({ where: { id: id } });
    if (!blog) {
      throw new Error('Блог не найден');
    }
    blog.text = blogDto.text;
    blog.media = blogDto.media;
    blog.user = user;
    const newBlog = await this.save(blog);
    return newBlog;
  }
}
