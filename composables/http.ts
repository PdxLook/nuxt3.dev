import { ref } from 'vue'
import md5 from 'js-md5'

/**
 * 生成并配置 HTTP 请求的选项。
 * @param {object} [options={}] - 请求选项。
 * @returns {object} - 配置后的请求选项。
 */
function useGetFetchOptions(options: FetchOptions = {}): FetchOptions {
  // 获取运行时配置
  const config = useRuntimeConfig()
  // 模拟用户认证信息
  const userAuth = { token: '1111' }
  const time = Math.floor(Date.now() / 1000) // 获取当前时间戳（秒）
  const random = Math.random().toString().substr(2, 6) // 生成随机数
  const sign = md5(`${time}&${random}${userAuth.token}`) // 生成签名

  // 设置基础 URL
  options.baseURL = options.baseURL ?? config.public.apiBase

  // 如果请求方法是 POST，设置 body 数据
  if (options.method === 'POST') {
    options.body = {
      ...options.body,
      time,
      random,
      sign,
      ...userAuth,
    }
  }

  return options
}

/**
 * 执行 HTTP 请求。
 * @param {string} url - 请求的 URL。
 * @param {object} [options={}] - 请求选项。
 * @returns {Promise<any>} - 返回一个 Promise，解析请求结果。
 * @throws {Error} - 请求失败时抛出错误。
 */
export async function useHttp(url: string, options: FetchOptions = {}): Promise<any> {
  options = useGetFetchOptions(options)
  const data = ref(null) // 用于存储请求结果的数据

  try {
    if (options.$) {
      // 使用 $fetch 进行请求
      const res = await $fetch(url, options)
      data.value = res
    } else {
      // 使用 useFetch 进行请求
      const res = await useFetch(url, {
        ...options,
        transform: (res) => res,
      })
      data.value = res.data.value

      // 客户端错误处理
      if (import.meta.client && res.error.value) {
        const msg = res.error.value?.data?.data
        console.error(msg || '服务端错误')
      }

      if (data.value?.code !== 200 && !data.value?.status) {
        return console.error(data.value?.msg || '服务端错误')
      }
    }
  } catch (err) {
    const msg = err?.data?.data || err?.message || '服务器错误'
    console.error('Fetch error:', err) // 记录详细的错误信息

    if (import.meta.client) {
      console.error(msg)
    }

    throw new Error(msg) // 抛出错误
  }

  return data.value
}

/**
 * 执行 GET 请求。
 * @param {string} url - 请求的 URL。
 * @param {object} [options={}] - 请求选项。
 * @returns {Promise<any>} - 返回一个 Promise，解析请求结果。
 */
export function useHttpGet(url: string, options: FetchOptions = {}): Promise<any> {
  options.method = 'GET'
  return useHttp(url, options)
}

/**
 * 执行 POST 请求。
 * @param {string} url - 请求的 URL。
 * @param {object} [options={}] - 请求选项。
 * @returns {Promise<any>} - 返回一个 Promise，解析请求结果。
 */
export function useHttpPost(url: string, options: FetchOptions = {}): Promise<any> {
  options.method = 'POST'
  return useHttp(url, options)
}

// TypeScript 接口

interface FetchOptions {
  method?: 'GET' | 'POST'
  body?: Record<string, any>
  baseURL?: string
  $?: boolean
}
