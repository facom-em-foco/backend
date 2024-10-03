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

export default class PostParser {
  static parserCreatePost(
    data: CreatePostRequestDTO,
    tags: Tag[],
    publisher: Publisher,
  ): Partial<Post> {
    const dateInfo = new DateInfo(
      undefined,
      new Date(data.postDate),
      new Date(data.expireDate),
      new Date(),
      new Date(),
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
    const { formatDate } = PostParser;

    const tags = data.tags?.map(tag => tag.tagTitle);

    return {
      postId: String(data.id),
      title: data.title,
      description: data.textContent,
      link: data.link,
      postDate: formatDate(data.dateInfo?.postDate),
      expireDate: formatDate(data.dateInfo?.expireDate),
      tags,
      imagePath: data.imagePath,
      publisherId: String(data.publisher?.id),
      publisherName: data.publisher?.name,
      creationDate: formatDate(data.dateInfo?.createdAt),
      editionDate: formatDate(data.dateInfo?.modifiedAt),
    };
  }

  static parserAllPostsResponse(data: any): GetAllPostsResponseDTO {
    return getAllPostsResponse;
  }

  static formatDate(date?: Date) {
    return date ? format(date, 'yyyy-MM-dd') : '';
  }
}
