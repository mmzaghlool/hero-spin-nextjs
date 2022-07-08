import { useContext, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { setCookie } from 'cookies-next';
import UserProvider, { UserContext } from '../configs/UserContext';
import TokenStorage from '../configs/TokenLocalStorage';
import { API } from '../backend/utils/constants';
import '../styles/globals.scss';

function Index(props: AppProps) {
  return (
    <UserProvider>
      <App {...props} />
    </UserProvider>
  );
}

function App({ Component, pageProps }: AppProps) {
  const { setConfig } = useContext(UserContext);

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
          setConfig({ accessToken, user });
          TokenStorage.setToken(refreshToken);
          setCookie('ACCESS', accessToken, { maxAge: 60 * 12 });
          setCookie('UID', user.uid, { maxAge: 60 * 12 });
        });
    } else {
      setConfig({});
    }
  }, [setConfig]);

  return <Component {...pageProps} />;
}

export default Index;
