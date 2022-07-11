/* eslint-disable no-undef */
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import User from '../types/User';

/**
 * user has 3 types
 * null: initial value to handle login button disabled
 * undefined: loading completed but no user logged in
 * object: user logged in
 */
type contextType = { user?: User | null; setUser: Dispatch<SetStateAction<User | null | undefined>> };
export const UserContext = createContext<contextType>({ user: null, setUser: (c) => {} });

function UserProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null | undefined>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export default UserProvider;
