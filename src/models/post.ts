import { Location } from './location';

export interface Post {
  name: string;
  price: number;
  locations: Location[];
  images: string[];
}
