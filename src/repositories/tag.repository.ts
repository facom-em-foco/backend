import { In } from 'typeorm';
import { Tag } from '@/entities/Tag';
import { BaseRepository } from './base.repository';

export class TagRepository extends BaseRepository<Tag> {
  constructor() {
    super(Tag);
  }

  // Custom methods
  async findByTitles(titles: string[]): Promise<Tag[]> {
    return this.repository.findBy({ tagTitle: In(titles) });
  }
}
