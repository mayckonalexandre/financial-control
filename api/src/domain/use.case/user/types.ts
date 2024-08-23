import { User } from 'src/domain/entities/user';

export type NewUser = Pick<User, 'name' | 'password' | 'email'>;
