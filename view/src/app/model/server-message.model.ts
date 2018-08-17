import { User } from './user.model';
import { Category } from './category.model';
import { ResponseProduct } from './product.model';

export class ServerMessage {
  status: boolean;
  message: string;
  token?: string;
}
