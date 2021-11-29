import { Category } from 'src/models/category';
import { Post } from 'src/models/post';

export const MOCK_CATEGORIES: Category[] = [];

export const MOCK_POSTS: Post[] = [];

export const MOCK_KEYWORDS: string[] = [...Array(20).keys()].map(
  () => 'HTC One M7 Dual cũ'
);
