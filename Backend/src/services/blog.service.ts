import { BlogDto } from '@/dto/blog.dto';
import { IBlog } from '@/interfaces/IBlog.inteface';
import { BlogRepository } from '@/repository/blog.repository';

export class BlogService {
  private repository: BlogRepository;
  constructor() {
    this.repository = new BlogRepository();
  }

  addNewBlog = async (blogDto: BlogDto): Promise<IBlog> => {
    return await this.repository.addNewBlog(blogDto);
  };
}
