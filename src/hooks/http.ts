import { message } from 'antd';
import { useHistory } from 'react-router-dom';

import { HttpError } from 'src/models/http-error';
import { useAppDispatch, useAppSelector } from './store';
import { logout, selectCurrentToken } from 'src/slices/auth';
import { GLOBAL_CONSTANTS } from 'src/constants/global';

export const useHttpError = () => {
  const dispatch = useAppDispatch();
  const currentToken = useAppSelector(selectCurrentToken);
  const history = useHistory();

  return (error: any, showMessage: boolean = true) => {
    if (error.data && error.data.message) {
      if (showMessage) {
        message.error((error.data as HttpError).message);
      }

      if ((error.data as HttpError).code === 401 && currentToken) {
        dispatch(logout());
        localStorage.removeItem(GLOBAL_CONSTANTS.LOCAL_STORE_JWT_TOKEN);

        history.push('/');
      }

      if ((error.data as HttpError).code === 403 && currentToken) {
        history.push('/signup/step-two');
      }

      return;
    }

    if (showMessage) {
      message.error(
        'Đã xảy ra lỗi! Xin vui lòng thử lại sau.'
      );
    }
  };
};
