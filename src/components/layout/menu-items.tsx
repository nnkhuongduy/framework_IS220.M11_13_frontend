import React from 'react';
import { AiFillHome, AiFillProfile, AiFillMessage } from 'react-icons/ai';

interface MenuItem {
  label: string;
  link?: string;
  Icon: React.ReactNode;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Trang chủ',
    link: '/',
    Icon: <AiFillHome />,
  },
  {
    label: 'Quản Lý Tin',
    link: '/',
    Icon: <AiFillProfile />,
  },
  {
    label: 'Chat',
    link: '/',
    Icon: <AiFillMessage />,
  },
];
