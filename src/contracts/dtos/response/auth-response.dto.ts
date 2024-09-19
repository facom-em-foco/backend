export interface LoginResponseDTO {
  userId: string;
  name: string;
  email: string;
  registrationDate: string;
  active: boolean;
  isAdmin: boolean;
  totalPosts: number;
}
