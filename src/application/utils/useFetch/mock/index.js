import { useMemo } from "react"

const getData = (status, parsed, type = 'json') => ({
  json: () => Promise.resolve(parsed),
  text: () => Promise.resolve(parsed),
  status,
  type,
  ok: status >= 200 && status < 400,
})

const error = ({ latency = 500 }) => new Promise((_, rej) => {
  setTimeout(() => {
    rej(new TypeError('Failed to fetch'))
  }, latency)
})
const success = ({ status = 200, data = null, type, error = null, latency = 500 }) => new Promise((res) => {
  setTimeout(() => {
    res(getData(status, { data, error }, type))
  }, latency)
})

const useMockFetch = ({
  fetchGet,
  fetchPost,
  fetchPut,
  fetchPatch,
  fetchDelete,
  ...rest
}) => {
  /**
   * 
   * @param {string} url - fetch url
   * @param {object} options - fetch options
   * @param {object} mockData - data for mock
   * @param {'success' | 'error'} mockData.type - type of fetch result
   * @param {number} mockData.latency - fetch latency
   * @param {number} mockData.status - fetch response status
   * @param {object} mockData.response - fetch result
   * @param {object} mockData.response.error - fetch result error field
   * @param {number} mockData.response.error.code - fetch result error field
   * @param {string} mockData.response.error.message - fetch result error field
   * @param {any} mockData.response.data - fetch result data field
   */
  const mock = fetch => (url, options, { type = 'success', latency = 500, response = { } }) => {
    const originFetch = window.fetch
    window.fetch = () => {
      const req = ({ success, error })[type]({ latency, ...response })
      window.fetch = originFetch
      return req
    }
    return fetch(url, options)
  }

  return {
    ...useMemo(() => ({
      fetchGet: mock(fetchGet),
      fetchPost: mock(fetchPost),
      fetchPut: mock(fetchPut),
      fetchPatch: mock(fetchPatch),
      fetchDelete: mock(fetchDelete),
    }), [fetchGet, fetchPost, fetchPut, fetchPatch, fetchDelete]),
    ...rest
  }
}

export default useMockFetch
