import { createContext, Dispatch, SetStateAction, useState } from 'react';
import User from '../types/User';

type t = { accessToken?: string; user?: User };
type contextType = t & { setConfig: Dispatch<SetStateAction<t>> };
export const UserContext = createContext<contextType>({ setConfig: (c) => {} });

function UserProvider({ children }: { children: any }) {
  const [config, setConfig] = useState<t>({});

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
