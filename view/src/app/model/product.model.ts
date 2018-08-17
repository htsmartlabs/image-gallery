import { Category } from './category.model';
import { User } from './user.model';

export class RequestProduct {
  _id?: string;
  user: string;
  category: string;
  name: string;
  image: null;
  description: string;
}

export class ResponseProduct {
  _id?: string;
  user: User;
  category: Category;
  name: string;
  image: string;
  description: string;
}
