import { BlogDto } from '@/dto/blog.dto';
import { Blog } from '@/entities/blog.entity';
import { IBlog } from '@/interfaces/IBlog.inteface';
import { BlogRepository } from '@/repository/blog.repository';

export class BlogService {
  private repository: BlogRepository;
  constructor() {
    this.repository = new BlogRepository();
  }

  getAll = async (): Promise<Blog[]> => {
    return await this.repository.getAll();
  };

  deleteBlog = async (id: number, userId: number): Promise<Blog> => {
    return await this.repository.deleteBlog(id, userId);
  };

  addNewBlog = async (blogDto: BlogDto): Promise<IBlog> => {
    return await this.repository.addNewBlog(blogDto);
  };

  patchBlog = async (id: number, userId: number, blogDto: BlogDto): Promise<IBlog> => {
    return await this.repository.patchBlog(id, userId, blogDto);
  };
}
