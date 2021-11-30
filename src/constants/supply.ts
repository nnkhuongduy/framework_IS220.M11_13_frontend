import { PostSupplyStep } from 'src/models/supply';

interface SupplyConstansts {
  DEFAULT_STEPS: PostSupplyStep[];
  STATUS_COLOR: ['warning', 'error', 'success', 'default'];
  SUPPLY_CACHE_ID: 'SUPPLY_CACHE_ID';
}

export const SUPPLY_CONSTANTS: SupplyConstansts = {
  DEFAULT_STEPS: [
    { title: 'Danh mục tin đăng', content: {}, finished: false },
    { title: 'Danh mục con', content: {}, finished: false },
    { title: 'Khu vực bán', content: {}, finished: false },
    {
      title: 'Thông tin chi tiết sản phẩm',
      content: {},
      finished: false,
    },
    {
      title: 'Xem trước',
      content: {},
      finished: false,
    },
    {
      title: 'Hoàn tất',
      content: {},
      finished: false,
    },
  ],
  STATUS_COLOR: ['warning', 'error', 'success', 'default'],
  SUPPLY_CACHE_ID: 'SUPPLY_CACHE_ID',
};
