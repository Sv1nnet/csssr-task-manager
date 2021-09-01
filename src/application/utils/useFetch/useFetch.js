import { useReducer, useCallback, useMemo } from 'react'

const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'
const FETCHING = 'FETCHING'
const TIMEOUT = 'TIMEOUT'

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
    },
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
    default:
      return state
  }
}


const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, { ...defaultState })

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
        ok:  typeof parsed === 'object' ? !!parsed.error : res.ok,
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

        dispatch({ type: FETCHING, data: { method } })
        return fetch(url, { ...options, method })
          .then((res) => handleResponse(res, method, timeoutId))
          .catch((err) => handleResponse(err, method, timeoutId))
      },
    [handleResponse],
  )

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
    createFetch,
    state,
    fetching: state.fetching,
  }
}

export default useFetch
