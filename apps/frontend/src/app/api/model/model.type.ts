import { Dto } from './dto.base';

export type Model<T extends Dto> = Omit<T, keyof Dto>;