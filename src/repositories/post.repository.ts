import { GetAllPostsPaginationDTO } from '@/contracts/dtos/response/post-response.dto';
import { Post } from '../entities/Post';
import { BaseRepository } from './base.repository';
import { GetAllPostsRequestDTO } from '@/contracts/dtos/request/post-request.dto';

export class PostRepository extends BaseRepository<Post> {
  constructor() {
    super(Post);
  }

  async getAllPosts(
    request: GetAllPostsRequestDTO,
  ): Promise<GetAllPostsPaginationDTO> {
    const {
      ids,
      publisherId,
      initialDate,
      finalDate,
      tags,
      page = 1,
      pageSize = 10,
      s: search,
    } = request;

    const query = this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.publisher', 'publisher')
      .leftJoinAndSelect('post.dateInfo', 'dateInfo')
      .leftJoinAndSelect('post.tags', 'tags');

    if (ids && ids.length > 0) {
      query.andWhere('post.id IN (:...ids)', { ids });
    }

    if (publisherId) {
      query.andWhere('post.publisherId = :publisherId', { publisherId });
    }

    if (initialDate) {
      query.andWhere('dateInfo.postDate >= :startDate', {
        startDate: new Date(initialDate),
      });
    }

    if (finalDate) {
      query.andWhere('dateInfo.postDate <= :endDate', {
        endDate: new Date(finalDate),
      });
    }

    if (tags && tags.length > 0) {
      query.andWhere('tags.tagTitle IN (:...tagTitles)', { tagTitles: tags });
    }

    if (search) {
      query.andWhere(
        '(post.title ILIKE :search OR post.textContent ILIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    // Count total items without applying pagination
    const totalItems = await query.getCount();

    // Apply pagination
    const posts = await query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      posts,
      pageSize: +pageSize,
      currentPage: +page,
      totalItems,
      totalPages,
    };
  }
}
