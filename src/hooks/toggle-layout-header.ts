import { useEffect } from 'react';

import { toggleLayoutHeader } from 'src/slices/global';
import { useAppDispatch } from './store';

export const useToggleLayoutHeader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleLayoutHeader(false));

    return () => {
      dispatch(toggleLayoutHeader(true));
    };
    //eslint-disable-next-line
  }, []);
};
