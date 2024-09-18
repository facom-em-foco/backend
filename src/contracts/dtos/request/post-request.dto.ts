export interface GetPostByIdRequestDTO {
  id: string;
}

export interface GetAllPostsRequestDTO {
  search: string;
  tags: string;
  page: number;
  pageSize: number;
}

export interface CreatePostRequestDTO {
  title: string;
  description: string;
  link: string;
  postDate: string;
  expireDate: string;
  tags: string[];
}
