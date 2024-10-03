import {
  GetAllPostsResponseDTO,
  GetPostByIdResponseDTO,
} from '@/contracts/dtos/response/post-response.dto';
import getAllPostsResponse from '@/contracts/mocks/get-all-posts-response.json';
import { Post } from '@/entities/Post';
import { CreatePostRequestDTO } from '@/contracts/dtos/request/post-request.dto';
import { Tag } from '@/entities/Tag';
import { DateInfo } from '@/entities/DateInfo';
import { format } from 'date-fns';
import { Publisher } from '@/entities/Publisher';
import {
  formatDateTime,
  formatDateWithoutTimeZone,
} from '@/helpers/date-helper';

export default class PostParser {
  static parserCreatePost(
    data: CreatePostRequestDTO,
    tags: Tag[],
    publisher: Publisher,
  ): Partial<Post> {
    const dateNow = new Date();
    const postDate = formatDateWithoutTimeZone(data.postDate) || dateNow;
    const expireDate = formatDateWithoutTimeZone(data.expireDate) || undefined;

    const dateInfo = new DateInfo(
      undefined,
      postDate,
      expireDate,
      dateNow,
      dateNow,
    );

    return new Post(
      undefined,
      publisher,
      data.title,
      data.link,
      data.imagePath,
      data.description,
      dateInfo,
      tags,
    );
  }

  static parserPostResponse(data: Post): GetPostByIdResponseDTO {
    const { formatString } = PostParser;

    const tags = data.tags?.map(tag => tag.tagTitle) || [];

    return {
      postId: formatString(data.id),
      title: data.title,
      description: formatString(data.textContent),
      link: formatString(data.link),
      postDate: formatDateTime(data.dateInfo?.postDate),
      expireDate: formatDateTime(data.dateInfo?.expireDate),
      tags,
      imagePath: formatString(data.imagePath),
      publisherId: formatString(data.publisher?.id),
      publisherName: formatString(data.publisher?.name),
      creationDate: formatDateTime(data.dateInfo?.createdAt),
      editionDate: formatDateTime(data.dateInfo?.modifiedAt),
    };
  }

  static parserAllPostsResponse(data: any): GetAllPostsResponseDTO {
    return getAllPostsResponse;
  }

  static formatString(data?: any) {
    return data ? `${data}` : '';
  }
}
