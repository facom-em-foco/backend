import { Post } from '../entities/Post';
import { BaseRepository } from './base.repository';

export class PostRepository extends BaseRepository<Post> {
  constructor() {
    super(Post);
  }

  // Add custom methods
}
