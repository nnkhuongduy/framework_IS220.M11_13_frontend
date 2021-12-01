import { SupplySnapshot } from './supply';
import { UserSnapshot } from './user';

export interface Rating {
  user: UserSnapshot;
  userRef: { id: string };
  ratingOn: UserSnapshot;
  ratingOnRef: { id: string };
  supply: SupplySnapshot;
  supplyRef: { id: string };
  point: number;
  comment: string;
  createdOn: string;
  modifiedOn: string;
}

export type PostRatingBody = Pick<Rating, 'point' | 'comment'> & {
  ratingOnId: string;
  orderId: string;
};
