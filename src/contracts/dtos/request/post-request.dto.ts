export interface GetPostByIdRequestDTO {
  id: string;
}

export interface GetAllPostsRequestDTO {
  ids?: string[];
  publisherId?: string;
  initialDate?: string;
  finalDate?: string;
  tags?: string[];
  page?: number;
  pageSize?: number;
  s?: string;
}

export interface CreatePostRequestDTO {
  title: string;
  description: string;
  link: string;
  postDate: string;
  expireDate: string;
  tags: string[];
  imagePath: string;
  publisherEmail: string;
}

export interface EditPostRequestDTO extends Partial<CreatePostRequestDTO> {
  id: string;
  removeImg: string;
}

export interface DeletePostRequestDTO {
  id: string;
}
