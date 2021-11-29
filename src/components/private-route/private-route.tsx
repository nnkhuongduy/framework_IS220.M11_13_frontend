import { FC } from 'react';
import { Redirect, RouteProps, Route } from 'react-router-dom';
import { Spin } from 'antd';

import { useAppSelector } from 'src/hooks/store';
import { selectAuthenticating, selectCurrentUser } from 'src/slices/auth';

export const PrivateRoute: FC<RouteProps> = ({ children, ...props }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const authenticating = useAppSelector(selectAuthenticating);

  if (authenticating) {
    return (
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Spin size="large" />;
      </div>
    );
  }

  return (
    <Route
      {...props}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
