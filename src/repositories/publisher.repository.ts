import { In } from 'typeorm';
import { Tag } from '@/entities/Tag';
import { BaseRepository } from './base.repository';
import { Publisher } from '@/entities/Publisher';

export class PublisherRepository extends BaseRepository<Publisher> {
  constructor() {
    super(Publisher);
  }

  // Custom methods
  async findByEmail(email: string): Promise<Publisher | null> {
    return this.repository.findOneBy({ emailAddress: email });
  }
}
