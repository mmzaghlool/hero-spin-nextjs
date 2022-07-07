import { useCallback, useContext, useState } from 'react';
import { API } from '../backend/utils/constants';
import { UserContext } from '../configs/UserContext';

// Default Headers containing headers to be set by default to any request unless it overwritten
const defaultHeaders = { 'Content-Type': 'application/json' };

type methodsType = 'GET' | 'POST' | 'PUT' | 'DELETE';
type bodyType = { [key: string]: any };
type objectStringsType = { [key: string]: string };
type executeType = {
  endPoint: string;
  body?: bodyType;
  method?: methodsType;
  headers?: objectStringsType;
};
type useFetchType = [
  loading: boolean,
  execute: (data: executeType) => Promise<any>,
  data: any,
  error: objectStringsType | string | undefined,
];

function useFetch(): useFetchType {
  const { accessToken } = useContext(UserContext);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<objectStringsType>();

  const execute = useCallback(async (data: executeType): Promise<any> => {
    const { endPoint, body, headers, method = 'GET' } = data;
    setLoading(true);
    setData(undefined);
    setError(undefined);

    const finalUrl = `${API}/api/${endPoint}`;
    const finalHeaders: Record<string, string> = { ...defaultHeaders, ...headers };
    const stringifyBody = body ? JSON.stringify(body) : undefined;

    if (accessToken) {
      finalHeaders['auth-token'] = accessToken;
    }

    return new Promise((resolve, reject) => {
      fetch(finalUrl, { method, headers: finalHeaders, body: stringifyBody })
        .then((res) => res.json())
        .then((d) => {
          setData(d);
          resolve(d);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          reject(err);
          setLoading(false);
        });
    });
  }, [accessToken]);

  return [loading, execute, data, error];
}

export default useFetch;
