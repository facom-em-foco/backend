import { Post } from '@/entities/Post';

export interface GetPostByIdResponseDTO {
  postId: string;
  title: string;
  description: string;
  link: string;
  postDate: string;
  expireDate: string;
  tags: string[];
  imagePath: string;
  publisherId: string;
  publisherName: string;
  creationDate: string;
  editionDate?: string;
}

export interface GetAllPostsResponseDTO {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  currentPageItems: number;
  data: GetPostByIdResponseDTO[];
}

export interface GetAllPostsPaginationDTO {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  posts: Post[];
}

export interface CreatePostResponseDTO extends GetPostByIdResponseDTO {}

export interface EditPostResponseDTO extends GetPostByIdResponseDTO {}

export interface DeletePostResponseDTO extends GetPostByIdResponseDTO {}
