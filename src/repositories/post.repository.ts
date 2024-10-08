import { Post } from '../entities/Post';
import { BaseRepository } from './base.repository';
import { GetAllPostsRequestDTO } from '@/contracts/dtos/request/post-request.dto';

export class PostRepository extends BaseRepository<Post> {
  constructor() {
    super(Post);
  }

  async getAllPosts(request: GetAllPostsRequestDTO): Promise<Post[]> {
    const { ids, publisherId, dateRange, tags, page, pageSize } = request;
    const query = this.repository.createQueryBuilder('post')
      .leftJoinAndSelect('post.publisher', 'publisher')
      .leftJoinAndSelect('post.dateInfo', 'dateInfo')
      .leftJoinAndSelect('post.tags', 'tags');

    if (ids && ids.length > 0) {
      query.andWhere('post.id IN (:...ids)', { ids });
    }

    if (publisherId) {
      query.andWhere('post.publisherId = :publisherId', { publisherId });
    }

    if (dateRange) {
      if (dateRange.start) {
        query.andWhere('dateInfo.postDate >= :startDate', { startDate: dateRange.start });
      }
      if (dateRange.end) {
        query.andWhere('dateInfo.postDate <= :endDate', { endDate: dateRange.end });
      }
    }

    if (tags && tags.length > 0) {
      query.andWhere('tags.id IN (:...tagIds)', { tagIds: tags });
    }

    if (page && pageSize) {
      query.skip((page - 1) * pageSize).take(pageSize);
    }

    return query.getMany();
  }
}