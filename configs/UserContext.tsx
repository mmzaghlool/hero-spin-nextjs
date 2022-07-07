/* eslint-disable no-undef */
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import User from '../types/User';

/**
 * user has 3 types
 * null: initial value to handle login button disabled
 * undefined: loading completed but no user logged in
 * object: user logged in
 */
type t = { accessToken?: string; user?: User | null };
type contextType = t & { setConfig: Dispatch<SetStateAction<t>> };
export const UserContext = createContext<contextType>({ setConfig: (c) => {} });

function UserProvider({ children }: { children: JSX.Element }) {
  const [config, setConfig] = useState<t>({ user: null });

  return (
    <UserContext.Provider
      value={{
        user: config?.user,
        accessToken: config?.accessToken,
        setConfig,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
