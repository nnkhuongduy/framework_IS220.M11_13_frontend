import React from 'react';
import { AiFillHome, AiFillProfile, AiFillMessage } from 'react-icons/ai';

interface MenuItem {
  label: string;
  link?: string;
  onlyUser: boolean;
  Icon: React.ReactNode;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Trang chủ',
    link: '/',
    onlyUser: false,
    Icon: <AiFillHome />,
  },
  {
    label: 'Quản Lý Tin',
    link: '/management',
    onlyUser: true,
    Icon: <AiFillProfile />,
  },
  {
    label: 'Chat',
    link: '/contact',
    onlyUser: true,
    Icon: <AiFillMessage />,
  },
];
