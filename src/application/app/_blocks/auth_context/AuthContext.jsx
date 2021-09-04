import { createContext, useEffect, useRef, useState } from 'react';
import { REFRESH_TOKEN } from '@constants/url';
import useFetch from '@utils/useFetch/useFetch';
import mockFetch from '@utils/useFetch/mock';

export const AuthContext = createContext({ token: null, fetchingToken: true })

const AuthContextProvider = ({ children }) => {
  const {
    fetchGet,
    state: { GET: { data: _token, fetching } },
  /* -------------- Mock start -------------- */
  } = mockFetch(useFetch())
  /* -------------- Mock end -------------- */
  const [token, setToken] = useState(_token)
  const [tokenRequested, setTokenRequested] = useState(false)
  const mounted = useRef(false)

  // send request for an access token when the app just initialized
  useEffect(() => {
    /* -------------- Mock start -------------- */
    const refresh_token = localStorage.getItem('token')
    /* -------------- Mock end -------------- */
    fetchGet(REFRESH_TOKEN, { },
      /* -------------- Mock start -------------- */
      {
        type: 'success',
        latency: 1000,
        response: {
          data: refresh_token ? 'some-access-token' : null,
          error: refresh_token ? null : { code: 401, message: 'Forbidden. No token sent.'},
        }
      /* -------------- Mock end -------------- */
      })
  }, [fetchGet, setToken])

  useEffect(() => {
    if (mounted.current && !fetching) {
      setToken(_token)
      setTokenRequested(true)
    }
  }, [fetching, _token])

  useEffect(() => {
    mounted.current = true
  }, [])

  return <AuthContext.Provider value={{ token, setToken, tokenRequested, fetchingToken: fetching, }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
