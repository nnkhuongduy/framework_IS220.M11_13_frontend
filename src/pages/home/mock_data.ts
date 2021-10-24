import { Category } from 'src/models/category';
import { Post } from 'src/models/post';

export const MOCK_CATEGORIES: Category[] = [...Array(12).keys()].map(() => ({
  name: 'Bất động sản',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe0TWhzucjD7LqGRALE_0oFp_XWA88KYnxEQ&usqp=CAU',
}));

export const MOCK_POSTS: Post[] = [...Array(20).keys()].map(() => ({
  name: 'Yamaha NoVo 5 giấy tờ đầy - xe đẹp máy êm ',
  images: [
    'https://cdn.chotot.com/Az3fxbm6miZIlecnvCVJNn-9zXNbHkSpiORfUX2bKwQ/preset:listing/plain/4708216428.jpg',
  ],
  locations: [{ name: 'TP HCM' }],
  price: 8000000,
}));

export const MOCK_KEYWORDS: string[] = [...Array(20).keys()].map(
  () => 'HTC One M7 Dual cũ'
);
