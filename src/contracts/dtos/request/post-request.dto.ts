export interface GetPostByIdRequestDTO {
  id: string;
}

export interface GetAllPostsRequestDTO {
  search: string;
  tags: string;
  page: number;
  pageSize: number;
}
