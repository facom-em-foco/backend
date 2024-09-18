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
  editionDate: string;
}
