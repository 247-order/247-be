import { EntityRepository, Repository } from 'typeorm';
import { Profile } from '../entities/Profile';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {}
