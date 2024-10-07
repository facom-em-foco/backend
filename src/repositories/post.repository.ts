import { Post } from '../entities/Post';
import { BaseRepository } from './base.repository';
import { GetAllPostsRequestDTO } from '@/contracts/dtos/request/post-request.dto';

export class PostRepository extends BaseRepository<Post> {
  constructor() {
    super(Post);
  }

  async getAllPosts(params?: GetAllPostsRequestDTO): Promise<Post[]> {
    const { ids, publisherId, dateRange, tags, page, pageSize } = params ?? {};
    const query = this.repository.createQueryBuilder('post');

    if (ids) {
      query.andWhere('post.id IN (:...ids)', { ids: ids.map(Number) });
    }
    if (publisherId) {
      query.andWhere('post.publisher.id = :publisherId', { publisherId: Number(publisherId) });
    }
    if (dateRange && dateRange.length === 2) {
      query.andWhere('post.dateInfo.postDate BETWEEN :startDate AND :endDate', {
        startDate: new Date(dateRange[0]),
        endDate: new Date(dateRange[1]),
      });
    }
    if (tags) {
      query.innerJoin('post.tags', 'tag').andWhere('tag.tagName IN (:...tags)', {
        tags,
      });
    }
    if (page && pageSize) {
      query.skip((page - 1) * pageSize).take(pageSize);
    }
    return query.getMany();
  }
}