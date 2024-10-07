export interface GetPostByIdRequestDTO {
  id: string;
}

export interface GetAllPostsRequestDTO {
  ids?: number[];
  publisherId?: number;
  dateRange?: string[];
  tags?: string[];
  page : number;
  pageSize : number;
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

export interface EditPostRequestDTO extends CreatePostRequestDTO {
  id: string;
}

export interface DeletePostRequestDTO {
  id: string;
}
