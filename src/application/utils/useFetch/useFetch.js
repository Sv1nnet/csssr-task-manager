import { useReducer, useCallback, useMemo, useContext } from 'react'
import { REFRESH_TOKEN } from '@constants/url'
import { AuthContext } from '@src/application/app/_blocks/auth_context/AuthContext'

const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'
const FETCHING = 'FETCHING'
const TIMEOUT = 'TIMEOUT'
const RESET_STATE = 'RESET_STATE'

const defaultState = {
  GET: {
    fetching: false,
    data: null,
    error: null,
  },
  POST: {
    fetching: false,
    data: null,
    error: null,
  },
  PUT: {
    fetching: false,
    data: null,
    error: null,
  },
  PATCH: {
    fetching: false,
    data: null,
    error: null,
  },
  DELETE: {
    fetching: false,
    data: null,
    error: null,
  },
}

const reducer = (state = defaultState, action) => {
  const {
    type,
    data: {
      data = null,
      error = null,
      method = 'GET',
    } = {},
  } = action

  switch (type) {
    case FETCHING:
      return {
        ...state,
        [method]: {
          ...state[method],
          fetching: true,
        }
      }
    case ERROR:
    case SUCCESS:
      return {
        ...state,
        [method]: {
          fetching: false,
          data,
          error,
        }
      }
    case TIMEOUT:
      return {
        ...state,
        [method]: {
          fetching: false,
          data: null,
          error: {
            code: 504,
            message: 'Gateway Timeout'
          },
        }
      }
    case RESET_STATE:
      return ['POST', 'GET', 'PATCH', 'PUT', 'DELETE'].includes(action.payload)
        ? {
          ...state,
          [action.payload]: { ...defaultState[action.payload] }
        }
        : {
          ...defaultState,
        }
    default:
      return state
  }
}


const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, { ...defaultState })
  const { token, setToken } = useContext(AuthContext)

  const handleResponse = useCallback(async (res, method, timeoutId) => {
    if (timeoutId === null) return {
      data: null,
      status: 504,
      ok: false,
    }
    clearTimeout(timeoutId)

    let result
    if (res instanceof Error) {
      result = {
        data: null,
        status: 500,
        ok: false,
        error: {
          code: 500,
          message: 'Unexpected error',
        }
      }
    } else {
      const parsed = await (res.type.includes('json') ? res.json() : res.text())
      result = {
        data: typeof parsed === 'object' ? parsed.data : parsed,
        error: typeof parsed === 'object' ? parsed.error : null,
        status: res.status,
        ok: typeof parsed === 'object' ? !!parsed.error : res.ok,
      }
    }

    if (result.ok) dispatch({ type: SUCCESS, data: { method, data: result.data, error: result.error } })
    else dispatch({ type: ERROR, data: { method, data: result.data, error: result.error } })

    return result
  }, [])

  const createFetch = useCallback(
    method =>
      (url, options) => {
        let timeoutId = setTimeout(() => {
          dispatch({ type: TIMEOUT, data: { method } })
          timeoutId = null
        }, 15000)

        const doFetch = () => fetch(url, { ...options, method })
          .then(async (res) => {
            const parsed = await res.json()
            if (token && parsed.error?.code === 401) { // handle 401 error
              const refreshRes = await fetch(REFRESH_TOKEN, {}).then(_res => _res.json())
              if (refreshRes.error?.code === 401) { // logout if refresh token request failed
                /* -------------- Mock start -------------- */
                localStorage.setItem('token', '')
                localStorage.setItem('login', '')
                localStorage.setItem('avatar', '')
                localStorage.setItem('name', '')
                localStorage.setItem('surname', '')
                localStorage.setItem('patronymic', '')
                localStorage.setItem('secretQuestion', '')
                localStorage.setItem('taskList', '')
                window.location = '/'
                /* -------------- Mock end -------------- */
                return res
              }

              setToken(refreshRes.data)
              return doFetch()
            }
            return res
          })
          .then((res) => handleResponse(res, method, timeoutId))
          .catch((err) => handleResponse(err, method, timeoutId))


        dispatch({ type: FETCHING, data: { method } })
        return doFetch()
      },
    [handleResponse, setToken],
  )

  const resetState = useCallback(method => dispatch({ type: RESET_STATE, payload: method }), [dispatch])

  const methods = useMemo(() => ({
    GET: createFetch('GET'),
    POST: createFetch('POST'),
    PUT: createFetch('PUT'),
    PATCH: createFetch('PATCH'),
    DELETE: createFetch('DELETE'),
  }), [createFetch])

  return {
    fetchGet: methods.GET,
    fetchPost: methods.POST,
    fetchPut: methods.PUT,
    fetchPatch: methods.PATCH,
    fetchDelete: methods.DELETE,
    resetState,
    state,
  }
}

export default useFetch
