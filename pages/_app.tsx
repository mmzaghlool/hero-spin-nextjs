import { useContext, useEffect } from 'react';
import type { AppProps } from 'next/app';
import UserProvider, { UserContext } from '../configs/UserContext';
import TokenStorage from '../configs/TokenLocalStorage';
import { API } from '../backend/utils/constants';
import '../styles/globals.scss';
import AccessCookie from '../configs/AccessCookie';
import UIDCookie from '../configs/UIDCookie';

function Index(props: AppProps) {
  return (
    <UserProvider>
      <App {...props} />
    </UserProvider>
  );
}

function App({ Component, pageProps }: AppProps) {
  const { setUser } = useContext(UserContext);

  /**
   * if there is user logged in update its tokens and data
   */
  useEffect(() => {
    const refreshToken = TokenStorage.getToken();

    if (refreshToken !== null) {
      fetch(`${API}/api/users/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);

          if (res.success == false) {
            TokenStorage.removeToken();
            return;
          }

          const { accessToken, refreshToken, user } = res.data;
          setUser(user);
          TokenStorage.setToken(refreshToken);
          AccessCookie.setToken(accessToken);
          UIDCookie.setUid(user.uid);
        });
    } else {
      setUser(undefined);
    }
  }, [setUser]);

  return <Component {...pageProps} />;
}

export default Index;
