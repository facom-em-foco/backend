import {
  GetAllPostsPaginationDTO,
  GetAllPostsResponseDTO,
  GetPostByIdResponseDTO,
} from '@/contracts/dtos/response/post-response.dto';
import getAllPostsResponse from '@/contracts/mocks/get-all-posts-response.json';
import { Post } from '@/entities/Post';
import {
  CreatePostRequestDTO,
  EditPostRequestDTO,
} from '@/contracts/dtos/request/post-request.dto';
import { Tag } from '@/entities/Tag';
import { DateInfo } from '@/entities/DateInfo';
import { format } from 'date-fns';
import { Publisher } from '@/entities/Publisher';
import {
  formatDateTime,
  formatDateWithoutTimeZone,
} from '@/helpers/date-helper';
import { removeUndefinedProps } from '@/helpers/object-helper';

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

  static parserEditPost(
    post: Post,
    data: EditPostRequestDTO,
    tags?: Tag[],
  ): Post {
    const postDate = formatDateWithoutTimeZone(data.postDate) || undefined;
    const expireDate = formatDateWithoutTimeZone(data.expireDate) || undefined;
    const imagePath =
      data.removeImg?.toLowerCase() === 'true' ? '' : data.imagePath;

    let dateInfo = removeUndefinedProps(
      new DateInfo(undefined, postDate, expireDate),
    );

    // Update post.dateInfo with dateInfo data
    dateInfo = Object.assign({ ...post.dateInfo }, dateInfo);

    const editPost = removeUndefinedProps(
      new Post(
        undefined,
        undefined,
        data.title,
        data.link,
        imagePath,
        data.description,
        dateInfo,
        tags,
      ),
    );

    // Update post with editPost data
    return Object.assign({ ...post }, editPost);
  }

  static parserPostResponse(data: Post): GetPostByIdResponseDTO {
    const { formatString, formatImagePath } = PostParser;

    const tags = data.tags?.map(tag => tag.tagTitle) || [];

    console.log('Teste', data);

    return {
      postId: formatString(data.id),
      title: data.title,
      description: formatString(data.textContent),
      link: formatString(data.link),
      postDate: formatDateTime(data.dateInfo?.postDate),
      expireDate: formatDateTime(data.dateInfo?.expireDate),
      tags,
      imagePath: formatImagePath(data.imagePath),
      publisherId: formatString(data.publisher?.id),
      publisherName: formatString(data.publisher?.name),
      creationDate: formatDateTime(data.dateInfo?.createdAt),
      editionDate: formatDateTime(data.dateInfo?.modifiedAt),
    };
  }

  static parserAllPostsResponse(
    data: GetAllPostsPaginationDTO,
  ): GetAllPostsResponseDTO {
    const { parserPostResponse } = PostParser;

    return {
      totalItems: data.totalItems,
      currentPage: data.currentPage,
      pageSize: data.pageSize,
      totalPages: data.totalPages,
      currentPageItems: data.posts?.length || 0,
      data: data.posts.map(parserPostResponse),
    };
  }

  static formatString(data?: any) {
    return data ? `${data}` : '';
  }

  static formatImagePath(data?: any) {
    const { UPLOADS_PATH = '/uploads' } = process.env;

    return data ? `${UPLOADS_PATH}/${data}` : '';
  }
}
