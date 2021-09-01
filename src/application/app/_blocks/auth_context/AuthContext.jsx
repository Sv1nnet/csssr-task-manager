import { createContext, useEffect, useState } from 'react';
import { REFRESH_TOKEN } from '../../../constants/url';
import useFetch from '../../../utils/useFetch/useFetch';
import mockFetch from '../../../utils/useFetch/mock';

export const AuthContext = createContext({ token: null })

const AuthContextProvider = ({ children }) => {
  const {
    fetchGet,
    state: { GET: { data: _token, fetching } },
  /* -------------- Mock start -------------- */
  } = mockFetch(useFetch())
  /* -------------- Mock end -------------- */
  const [token, setToken] = useState(_token)

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
      }).then((res) => {
        setToken(res.data)
      })
  }, [fetchGet, setToken])

  return <AuthContext.Provider value={{ token, setToken, fetchingToken: fetching }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
